from config.config import db
from routes.baseRoute import BaseRoute
from classes.classes import User
from utils.utils import customAbort, genSalt, hashPassword

import hmac

class UserRoute(BaseRoute):
    __privilage = {"client":1, "admin":2}
    __genders = ["male", "female", "other"]

    def __init__(self) -> None:
        self.create_req = ["name", "username", "email", "password", "type", "gender"]
        self.update_req = ["username", "password"]
        self.delete_req = ["username", "password"]

    def create(self, request):
        if "id" not in request.args:
            return customAbort("Id not in request", 400)

        for key in self.create_req:
            if key not in request.json:
                return customAbort("Key not in request", 400)

        current_user = User.query.filter_by(id=request.args["id"]).first()

        if request.json["type"] not in self.__privilage.keys():
            return customAbort("User type not allowed", 405)

        if request.json["gender"] not in self.__genders:
            return customAbort("User gender not allowed", 405)

        if self.__privilage[current_user.type] < self.__privilage[request.json["type"]]:
            return customAbort("Cannot create a user with bigger privilage than your own!", 405) 

        check_username = User.query.filter_by(username = request.json["username"]).first()
        check_email = User.query.filter_by(email = request.json["email"]).first()

        if check_username is not None and check_email is not None:
            return customAbort("User already exists!", 400)       
        
        salt = genSalt()
        hashed_pw = hashPassword(request.json["password"], salt)

        new_user = User(name = request.json["name"], username = request.json["username"],
        email = request.json["email"], password = hashed_pw, salt = salt, type = request.json["type"], gender = request.json["gender"])

        db.session.add(new_user)
        db.session.commit()

        return {"msg":"success"}

    def read(self, request):
        if "id" not in request.args:
            all_users = User.query.all()

            output = []
            for user in all_users:
                data = {
                    "id":user.id, 
                    "name":user.name,
                    "username":user.username,
                    "email":user.email,
                    "type":user.type,
                    "gender":user.gender
                    }
                output.append(data)

            return {"users": output}

        user = User.query.filter_by(id=request.args['id']).first()

        if user is None:
            return customAbort("User not found!", 404)

        data = {
            "id":user.id,
            "name":user.name,
            "username":user.username,
            "email":user.email,
            "type":user.type,
            "gender": user.gender
            }
        return {"user":data}

    def update(self, request):
        if "id" not in request.args:
            return customAbort("Id not in request!", 400)
        
        for key in self.update_req:
            if key not in request.json:
                return customAbort("Key not in reuqest!", 400)

        user = User.query.filter_by(id=request.args['id'], username=request.json["username"]).first()

        if user is None:
            return customAbort("User doesn't exists!", 404)

        salt = user.salt
        hashed_pass = hashPassword(request.json["password"], salt)
        
        if not hmac.compare_digest(user.password, hashed_pass):
            return customAbort("Password doesn't match!", 405)

        if "new_password" not in request.json:
            return customAbort("New password not in request!", 400)

        if self.password == self.new_password:
            return customAbort("New password cannot be the same as the old one!", 405)

        salt = genSalt()
        new_hashed_pw = hashPassword(self.new_password, salt)

        user.salt = salt
        user.password = new_hashed_pw

        db.session.commit()

        return {"msg":"success"}

    def delete(self, request):
        if "id" not in request.args:
            return customAbort("Id not in request!", 400)

        for key in self.delete_req:
            if key not in request.json:
                return customAbort("Key not in request!", 400)

        user = User.query.filter_by(id=request.args["id"], username=request.json["username"]).first()

        if user is None:
            return customAbort("User not found!", 404)

        salt = user.salt
        hashed_pass = hashPassword(request.json["password"], salt)
        
        if not hmac.compare_digest(user.password, hashed_pass):
            return customAbort("Password doesn't match!", 405)

        db.session.delete(user)
        db.session.commit()  

        return {"msg":"success"}
            

UserRouteInstance =  UserRoute()