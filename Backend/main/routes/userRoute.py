from config.config import db, PASS_LEN, app, get_jwt_identity
from routes.baseRoute import BaseRoute
from classes.classes import User, Request
from utils.utils import customAbort, genSalt, hashPassword, checkMail, get_random_alphanumerical
import hmac


class UserRoute(BaseRoute):
    __privilage = {"client":1, "admin":2}
    __genders = ["male", "female", "other"]

    def __init__(self) -> None:
        self.create_req = ["current_username", "current_password", "name", "username", "email", "password", "type", "gender"]
        self.update_req = ["username", "password", "new_password"]
        self.delete_req = ["username", "password"]

    def create(self, request):
        for key in self.create_req:
            if key not in request.json:
                return customAbort("Key not in request", 400)

        user = User.query.filter_by(username=request.json["current_username"]).first()

        if user is None:
            return customAbort("User not found", 404)

        salt = user.salt
        hashed_pass = hashPassword(request.json["current_password"], salt)
        
        if not hmac.compare_digest(user.password, hashed_pass):
            return customAbort("Password doesn't match", 401)

        if request.json["type"] not in self.__privilage.keys():
            return customAbort("Type not allowed", 406)
        if request.json["gender"] not in self.__genders:
            return customAbort("gender not allowed", 406)

        if self.__privilage[user.type] < self.__privilage[request.json["type"]]:
            return customAbort("Cannot create a user with bigger privilage than your own", 405) 

        if not checkMail(request.json["email"]):
            return customAbort("Email not valid", 400)

        check_username = User.query.filter_by(username = request.json["username"]).first()
        check_email = User.query.filter_by(email = request.json["email"]).first()

        if check_username is not None or check_email is not None:
            return customAbort("User already exists", 409)       
        
        if len(request.json["password"]) < PASS_LEN:
            return customAbort("Password to weak", 405)

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
        if "id" not in request.args:
            all_users = User.query.all()

            if all_users is None:
                return customAbort("Users not found", 404)

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

        user = User.query.filter_by(id=request.args['id']).first()

        if user is None:
            return customAbort("User not found", 404)

        data = {
            "id":user.id,
            "name":user.name,
            "username":user.username,
            "img_url": user.url,
            "confirmed":user.confirmed,
            "email":user.email,
            "type":user.type,
            "gender": user.gender
            }
        return {"user":data}

    def update(self, request):
        if "id" not in request.args:
            return customAbort("Key not in request", 400)

        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first()

        if user is None:
            return customAbort("User not found", 404)


        if str(user_id) != request.args["id"] and user.type != "admin":
            return customAbort("You cannot update this user", 405)

        if user_id != request.args["id"]:
            user = User.query.filter_by(id=request.args["id"]).first()

        if "image" in request.files:

            img = request.files["image"]
            img_ext = img.filename.split(".")[len(img.filename.split(".")) - 1]
            
            img_name = get_random_alphanumerical() + "." + img_ext
            img.save(app.config["UPLOAD_FOLDER"] + img_name)
            
            user.url = img_name
            db.session.commit()

            return {"msg":"success"}
        
        for key in self.update_req:
            if key not in request.json:
                return customAbort("Key not in reuqest", 400)

        salt = user.salt
        hashed_pass = hashPassword(request.json["password"], salt)
        
        if not hmac.compare_digest(user.password, hashed_pass):
            return customAbort("Password doesn't match", 405)

        if request.json["password"] == request.json["new_password"]:
            return customAbort("New password cannot be the same as the old one", 409)

        if len(request.json["new_password"]) < PASS_LEN:
            return customAbort("Password to short", 409)

        salt = genSalt()
        new_hashed_pw = hashPassword(request.json["new_password"], salt)

        user.salt = salt
        user.password = new_hashed_pw

        db.session.commit()

        return {"msg":"success"}

    def delete(self, request):
        user_id = get_jwt_identity()

        user = User.query.filter_by(id=user_id).first()

        if user is None:
            return customAbort("User not found", 404)

        if user.type != "admin":
            return customAbort("Clients cannot delete account", 405)
                
        if "id" not in request.args:
            return customAbort("Key not in request", 400)

        user_to_delete = User.query.filter_by(id=request.args["id"]).first()

        if user_to_delete is None:
            return customAbort("User not found", 404)

        if user_to_delete.type == "admin":
            return customAbort("Cannot delete and admin user", 405)

        db.session.delete(user_to_delete)
        db.session.commit()  

        return {"msg":"success"}
            

UserRouteInstance =  UserRoute()