from config.config import db, PASS_LEN
from routes.baseRoute import BaseRoute
from classes.classes import User
from utils.utils import customAbort, genSalt, hashPassword

from flask_jwt_extended import create_access_token, create_refresh_token
import datetime
import hmac


class UserAuthRoute(BaseRoute):
    __genders = ["male", "female", "other"]

    def __init__(self) -> None:
        self.register_req = ["name", "username", "email", "password", "gender"]
        self.login_req = ["username", "password"]

    def register(self, request):
        for key in self.register_req:
            if key not in request.json:
                return customAbort("Key not in request", 400)

        check_username = User.query.filter_by(username = request.json["username"]).first()
        check_email = User.query.filter_by(email=request.json["email"]).first()

        if check_username is not None or check_email is not None:
            return customAbort("User already exists", 409)

        if len(request.json["password"]) < PASS_LEN:
            return customAbort("Password to weak", 405)

        salt = genSalt()
        hashed_pw = hashPassword(request.json["password"], salt)

        if request.json["gender"] not in self.__genders:
            return customAbort("Gender not allowed", 406)

        new_user = User(name=request.json["name"], username=request.json["username"], 
        email=request.json["email"], salt = salt, password=hashed_pw, gender=request.json["gender"], type="client")

        db.session.add(new_user)
        db.session.commit()

        return {"msg":"success"}

    def login(self, request):
        for key in self.login_req:
            if key not in request.json:
                return customAbort("Key not in request", 400)

        user = User.query.filter_by(username = request.json["username"]).first()

        if user is None:
            return customAbort("User no found", 404)

        hashed_pw = hashPassword(request.json["password"], user.salt) 

        if not hmac.compare_digest(hashed_pw, user.password):
            return customAbort("Password doesn't match", 405)

        new_token = create_access_token(identity = user.id, fresh = True, expires_delta = datetime.timedelta(days=7))
        refresh_token = create_refresh_token(identity = user.id, expires_delta = datetime.timedelta(days=30))

        return {'id':user.id, 'username':user.username, 'gender':user.gender, 'type':user.type, 'access_token': new_token, 'refresh_token': refresh_token}

UserAuthRouteInstance = UserAuthRoute()