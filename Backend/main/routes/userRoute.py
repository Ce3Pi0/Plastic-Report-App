from flask import jsonify
from config.config import db
from routes.baseRoute import BaseRoute
from classes.classes import User
from utils.utils import customAbort, genSalt, hashPassword

import hmac

class UserRoute(BaseRoute):
    __types = ["client", "admin"]

    def __init__(self) -> None:
        self.create_req = ["name", "username", "email", "password", "type"]
        self.update_req = ["username", "email", "password"]
        self.delete_req = ["username", "email", "password"]

    def create(self, request):
        for key in self.create_req:
            if key not in request.json:
                return customAbort("Key not in request", 400)

        for key in request.json:
            setattr(self, key, request.json[key])

        check_user = User.query.filter_by(username = self.username, 
        email = self.email).first()

        if check_user is not None:
            return customAbort("User already exists!", 400)

        if self.type not in self.__types:
            return customAbort("User type not allowed", 405)
        
        salt = genSalt()
        hashed_pw = hashPassword(self.password, salt)

        new_user = User(name = self.name, username = self.username,
        email = self.email, password = hashed_pw, salt = salt, type = self.type)

        db.session.add(new_user)
        db.session.commit()

        return {"msg":"New user added successfully!"}

    def read(self, request):
        if "id" not in request.args:
            all_users = User.query.all()

            output = []
            for user in all_users:
                data = {"id":user.id, "name":user.name,
                "username":user.username, "email":user.email,
                "type":user.type,
                "password":user.password.decode('UTF-8')}
                output.append(data)

            return {"Users": output}

        user = User.query.filter_by(id=request.args['id']).first()

        if user is None:
            return customAbort("User not found!", 404)

        data = {"id":user.id, "name":user.name,
                "username":user.username, "email":user.email,
                "type":user.type}
        return {"user":data}

    def update(self, request):
        if "id" not in request.args:
            return customAbort("Id not in request!", 400)
        
        for key in self.update_req:
            if key not in request.json:
                return customAbort("Key not in reuqest!", 400)

        for key in request.json:
            setattr(self, key, request.json[key])

        user = User.query.filter_by(id=request.args['id'], username=self.username,
         email=self.email).first()

        if user is None:
            return customAbort("User doesn't exists!", 404)

        salt = user.salt
        hashed_pass = hashPassword(self.password, salt)
        
        if not hmac.compare_digest(user.password, hashed_pass):
            return customAbort("Password doesn't match!", 405)

        if "new_password" not in request.json:
            return customAbort("New password not in request!", 400)

        if self.password == self.new_password:
            return customAbort("New password cannot be the same as the old one!", 400)

        salt = genSalt()
        new_hashed_pw = hashPassword(self.new_password, salt)

        user.salt = salt
        user.password = new_hashed_pw

        db.session.commit()

        return {"msg":"Password updated successfully!"}

    def delete(self, request):
        if "id" not in request.args:
            return customAbort("Id not in request!", 400)

        for key in self.delete_req:
            if key not in request.json:
                return customAbort("Key not in request!", 400)

        user = User.query.filter_by(id=request.args["id"], username=request.json["username"], email=request.json["email"]).first()

        if user is None:
            return customAbort("User not found!", 404)

        salt = user.salt
        hashed_pass = hashPassword(request.json["password"], salt)
        
        if not hmac.compare_digest(user.password, hashed_pass):
            return customAbort("Password doesn't match!", 405)

        db.session.delete(user)
        db.session.commit()  

        return {"msg":"User deleted successfully!"}
            

UserRouteInstance =  UserRoute()