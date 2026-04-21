from flask_jwt_extended import get_jwt_identity
from config.config import db, app
from routes.baseRoute import BaseRoute
from classes.classes import User, Request
from utils.utils import decode_postgres_bytea, genSalt, hashPassword, checkMail, get_random_alphanumerical
from utils.httpAbort import badRequest, unauthorized, notFound, methodNotAllowed, notAcceptable, conflict, internalServerError
from config.getEnv import getEnv
import hmac
import os


class UserRoute(BaseRoute):
    __privilege = {"client":1, "admin":2}
    __genders = ["male", "female", "other"]

    def __init__(self) -> None:
        # self.create_req = ["name", "username", "email", "password", "type", "gender"]
        self.create_req = ["current_username", "current_password", "name", "username", "email", "password", "type", "gender"]
        self.update_req = ["username", "password", "new_password"]
        self.delete_req = ["username", "password"]

    def create(self, request):
        for key in self.create_req:
            if key not in request.json:
                return badRequest("Key not in request")

        user = User.query.filter_by(username=request.json["current_username"]).first()

        if user is None:
            return notFound("User not found")

        salt = user.salt
        hashed_pass = hashPassword(request.json["current_password"], salt).decode("UTF-8")
        
        if not hmac.compare_digest(user.password, hashed_pass):
            return unauthorized("Password doesn't match")

        if request.json["type"] not in self.__privilege.keys():
            return notAcceptable("Type not allowed")
        if request.json["gender"] not in self.__genders:
            return notAcceptable("gender not allowed")

        if self.__privilege[user.type] < self.__privilege[request.json["type"]]:
            return methodNotAllowed("Unauthorized")

        if not checkMail(request.json["email"]):
            return badRequest("Email not valid")

        check_username = User.query.filter_by(username = request.json["username"]).first()
        check_email = User.query.filter_by(email = request.json["email"]).first()

        if check_username is not None or check_email is not None:
            return conflict("User already exists")
        
        if len(request.json["password"]) < getEnv["PASS_LEN"]:
            return notAcceptable("Password to weak")

        salt = genSalt()
        hashed_pw = hashPassword(request.json["password"], salt)

        new_user = User(name = request.json["name"], username = request.json["username"], url = None,
        confirmed = True, email = request.json["email"], password = hashed_pw, salt = salt, type = request.json["type"], gender = request.json["gender"])

        user_request_email = Request(type="password_request", time=None, user_id=new_user.id)
        user_request_password = Request(type="email_request", time=None, user_id=new_user.id)
        
        db.session.add(new_user)
        db.session.commit()

        user_request_email = Request(type="password_request", time=None, user_id=new_user.id)
        user_request_password = Request(type="email_request", time=None, user_id=new_user.id)

        db.session.add(user_request_email)
        db.session.add(user_request_password)

        db.session.commit()

        return {"msg":"success"}

    def read(self, request):        
        user_id = get_jwt_identity()
        user = User.query.filter_by(id = user_id).first()

        if user is None:
            return notFound("User not found")

        view_user = user

        if "query" in request.args and user.type == "admin":
            all_users = User.query.all()

            output = []
            for user in all_users:
                data = {
                    "id":user.id, 
                    "name":user.name,
                    "username":user.username,
                    "img_url": user.url,
                    "confirmed":user.confirmed,
                    "email":user.email,
                    "type":user.type,
                    "gender":user.gender
                    }
                output.append(data)

            return {"users": output}

        if "id" in request.args:
            if request.args["id"] != view_user.id and user.type == "admin": 
                view_user = User.query.filter_by(id=request.args['id']).first()

        if view_user is None:
            return notFound("User not found")

        data = {
            "id":view_user.id,
            "name":view_user.name,
            "username":view_user.username,
            "img_url": view_user.url,
            "confirmed":view_user.confirmed,
            "email":view_user.email,
            "type":view_user.type,
            "gender": view_user.gender
            }
        return {"user":data}

    def update(self, request):
        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first()
 
        if user is None:
            return notFound("User not found")

        user_to_update = user

        if "id" in request.args:
            if user_id != request.args["id"] and user.type == "admin":
                user_to_update = User.query.filter_by(id=request.args["id"]).first()

        if "image" in request.files:

            img = request.files["image"]
            img_ext = img.filename.split(".")[len(img.filename.split(".")) - 1]
            
            img_name = get_random_alphanumerical() + "." + img_ext

            img.save(os.path.join(app.config['UPLOAD_FOLDER'], img_name))
            img.save(app.config["UPLOAD_FOLDER"] + img_name)
            
            if user_to_update.url is not None:
                if os.path.exists(os.path.join(app.config["UPLOAD_FOLDER"], user_to_update.url)):
                    os.remove(os.path.join(app.config["UPLOAD_FOLDER"], user_to_update.url))

            user_to_update.url = img_name
            db.session.commit()

            return {"msg":"success"}
        
        for key in self.update_req:
            if key not in request.json:
                return badRequest("Key not in request")

        if user.type != "admin" or user.id == user_to_update.id:
            user_password = decode_postgres_bytea(user.password)
            user_salt = decode_postgres_bytea(user.salt)

            if user_password is None or user_salt is None:
                return internalServerError("User data corrupted")

            hashed_pass = hashPassword(request.json["password"], user_salt).decode("UTF-8")
        
            if not hmac.compare_digest(user_password.decode("UTF-8"), hashed_pass):
                return unauthorized("Password doesn't match")

        if request.json["password"] == request.json["new_password"]:
            return conflict("New password cannot be the same as the old one")

        if len(request.json["new_password"]) < getEnv["PASS_LEN"]:
            return notAcceptable("Password too short")

        salt = genSalt()
        new_hashed_pw = hashPassword(request.json["new_password"], salt)

        user_to_update.salt = salt
        user_to_update.password = new_hashed_pw

        db.session.commit()

        return {"msg":"success"}

    def delete(self, request):
        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first()

        if user is None:
            return notFound("User not found")

        if user.type != "admin":
            return methodNotAllowed("Privilege too low!")

        if "id" not in request.args:
            return badRequest("Key not in request")

        user_to_delete = User.query.filter_by(id=request.args["id"]).first()

        if user_to_delete is None:
            return notFound("User not found")

        if user_to_delete.type == "admin":
            return methodNotAllowed("Cannot delete an admin user")

        db.session.delete(user_to_delete)
        db.session.commit()  

        return {"msg":"success"}
            

UserRouteInstance =  UserRoute()