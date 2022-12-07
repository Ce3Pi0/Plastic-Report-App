from config.config import db
from routes.baseRoute import BaseRoute
from classes.classes import User
from utils.utils import customAbort, genSalt, hashPassword

from flask_jwt_extended import create_access_token, create_refresh_token
import datetime
import hmac

class UserAuthRoute(BaseRoute):
    def __init__(self) -> None:
        self.register_req = ["name", "username", "email", "password"]
        self.login_req = ["username", "password"]

    def register(self, request):
        for key in request.json:
            if key not in self.register_req:
                return customAbort("Key not in request!", 400)

        for key in request.json:
            setattr(self, key, request.json[key])

        check_user = User.query.filter_by(username = self.username, 
        email = self.email).first()

        if check_user is not None:
            return customAbort("User already exists!", 400)

        salt = genSalt()
        hashed_pw = hashPassword(self.password, salt)

        new_user = User(name = self.name, username = self.username,
        email = self.email, password = hashed_pw, salt = salt, type = "client")

        db.session.add(new_user)
        db.session.commit()

        return {"msg":"User registered successfully!"}

    def login(self, request):
        for key in self.login_req:
            if key not in request.json:
                return customAbort("Key not in request!", 400)

        user = User.query.filter_by(username = request.json["username"]).first()

        if user is None:
            return customAbort("User doesn't exist!", 404)

        hashed_pw = hashPassword(request.json["password"], user.salt) 

        if not hmac.compare_digest(hashed_pw, user.password):
            return customAbort("Password doesn't match!", 405)

        new_token = create_access_token(identity = user.id, fresh = True, expires_delta = datetime.timedelta(days=7))
        refresh_token = create_refresh_token(identity = user.id, expires_delta = datetime.timedelta(days=30))

        return {'access_token': new_token, 'refresh_token': refresh_token}

UserAuthRouteInstance = UserAuthRoute()