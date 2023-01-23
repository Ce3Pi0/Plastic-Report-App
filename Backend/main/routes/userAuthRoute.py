from config.config import db, PASS_LEN, get_jwt_identity, create_access_token, create_refresh_token, Mail, Message, mail, s, MY_MAIL, FRONTEND_DOMAIN, SignatureExpired, BadTimeSignature, BadSignature
from routes.baseRoute import BaseRoute
from classes.classes import User, Request
from utils.utils import customAbort, genSalt, hashPassword, checkMail

import datetime
import hmac


class UserAuthRoute(BaseRoute):
    __genders = ["male", "female", "other"]

    def __init__(self) -> None:
        self.register_req = ["name", "username", "email", "password", "gender"]
        self.login_req = ["username", "password"]
        self.verify_reset_token_req = ["token", "password"]

    def register(self, request):
        for key in self.register_req:
            if key not in request.json:
                return customAbort("Key not in request", 400)

        if not checkMail(request.json["email"]):
            return customAbort("Email not valid", 400)

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

        new_user = User(name=request.json["name"], username=request.json["username"], url = None,
        confirmed = False, email=request.json["email"], salt = salt, password=hashed_pw, gender=request.json["gender"], type="client")

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

        if user.confirmed == False:
            return customAbort("User email not confirmed", 406)

        new_token = create_access_token(identity = user.id, fresh = True, expires_delta = datetime.timedelta(days=7))
        refresh_token = create_refresh_token(identity = user.id, expires_delta = datetime.timedelta(days=30))

        return {'id':user.id, 'username':user.username, 'gender':user.gender, 'type':user.type, 'access_token': new_token, 'refresh_token': refresh_token}
    
    def send_confirm_mail(self, request):
        if "email" not in request.args:
            return customAbort("Key not in request", 400)

        user = User.query.filter_by(email=request.args["email"]).first()

        if user is None: 
            return customAbort("User not found", 404)

        if user.confirmed == True:
            return customAbort("User email already confirmed", 405)

        # get current user email request type and calc time diff and throw error when neccessary

        token = s.dumps(request.args["email"], salt='email-confirm')

        msg = Message("Confirm Email", sender=MY_MAIL, recipients=[request.args["email"]])

        link = f"http://{FRONTEND_DOMAIN}/account/confirm_email?token={token}"

        msg.body = f"Your link is {link}"

        mail.send(msg)

        return {"msg":"success"}

    def confirm_mail(self, request):
        if "token" not in request.args:
            return customAbort("Key not in request", 400)
        
        try:
            email = s.loads(request.args["token"], salt="email-confirm", max_age=3600)
        except SignatureExpired:
            return customAbort("Token has expired", 405)
        except BadTimeSignature:
            return customAbort("The token you submited was incorrect", 406)
        except BadSignature:
            return customAbort("The token you submited was incorrect", 406)
        
        
        user = User.query.filter_by(email=email).first()

        if user is None:
            return customAbort("User not found", 404)

        user.confirmed = True

        db.session.commit()

        return {"msg":"success"}

    def get_reset_token(self, request):
        if "email" not in request.args:
            return customAbort("Key not in request", 400)

        user = User.query.filter_by(email=request.args["email"]).first()

        if user is None: 
            return customAbort("User not found", 404)

        # get current user email request type and calc time diff and throw error when neccessary

        token = s.dumps(request.args["email"], salt='password-forgot')

        msg = Message("Change your password", sender=MY_MAIL, recipients=[request.args["email"]])

        link = f"http://{FRONTEND_DOMAIN}/account/forgot_change?token={token}"

        msg.body = f"Your link is {link}"

        mail.send(msg)

        return {"msg":"success"}
        
    def verify_reset_token(self, request):
        for key in self.verify_reset_token_req:
            if key not in request.args:
                return customAbort("Key not in request", 400)

        try:
            email = s.loads(request.args["token"], salt="password-forgot", max_age=500)
        except SignatureExpired:
            return customAbort("Token has expired", 405)
        except BadTimeSignature:
            return customAbort("The token you submited was incorrect", 406)
        except BadSignature:
            return customAbort("The token you submited was incorrect", 406)
        
        
        user = User.query.filter_by(email=email).first()

        if user is None:
            return customAbort("User not found", 404)

        if len(request.args["password"]) < PASS_LEN:
            return customAbort("Password to weak", 405)

        salt = genSalt()
        password = request.args["password"]

        hashed_test_pw = hashPassword(password, user.salt)

        if hmac.compare_digest(hashed_test_pw, user.password):
            return customAbort("New password cannot be the same as the old one", 409)

        hashed_pw = hashPassword(password, salt)

        user.password = hashed_pw
        user.salt = salt

        db.session.commit()

        return {"msg":"success"}


    def refresh(self):
        user_id = get_jwt_identity()
        new_token = create_access_token(identity = user_id, fresh = True, expires_delta = datetime.timedelta(days=7))
        refresh_token = create_refresh_token(user_id, expires_delta = datetime.timedelta(days=30))

        return {'access_token': new_token, 'refresh_token': refresh_token}

UserAuthRouteInstance = UserAuthRoute()