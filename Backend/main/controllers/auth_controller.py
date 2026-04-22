from flask import Request
from typing import Dict, Any
from validators.auth_validators import AuthRegisterSchema
from config.errorCodes import HttpError
from utils.httpAbort import abort
from services.auth_service import AuthService 

# from flask_jwt_extended import get_jwt_identity, create_access_token, create_refresh_token
# from itsdangerous import SignatureExpired, BadTimeSignature, BadSignature
# from config.config import db, s
# from routes.baseRoute import BaseRoute
# from classes.classes import User, Request
# from utils.utils import decode_postgres_bytea, genSalt, hashPassword, checkMail
# from utils.httpAbort import badRequest, notFound, methodNotAllowed, notAcceptable, conflict, preconditionFailed, tooManyRequests, internalServerError
# from config.mailConfig import MailHandlerInstance
# from config.get_env import get_env

# from datetime import datetime, timedelta
# import hmac

#  __genders = ["male", "female", "other"]

#     def __init__(self) -> None:
#         self.register_req = ["name", "username", "email", "password", "gender"]
#         self.login_req = ["username", "password"]
#         self.verify_reset_token_req = ["token", "password"]


class AuthController:
    @staticmethod
    def register(request: Request):
        data: Dict[str, Any] = request.form.to_dict() or {}
        try:
            body = AuthRegisterSchema(**data)
        except Exception as e:
            abort(HttpError.BAD_REQUEST, str(e))

        AuthService.register(body)

        return {"msg":"success"}

    @staticmethod
    def login(request: Request):
        for key in self.login_req:
            if key not in request.json:
                return badRequest("Key not in request")

        user = User.query.filter_by(username = request.json["username"]).first()

        if user is None:
            return notFound("User not found")

        user_password = decode_postgres_bytea(user.password)
        user_salt = decode_postgres_bytea(user.salt)

        if user_password is None or user_salt is None:
            return internalServerError("User data corrupted")

        hashed_pw = hashPassword(request.json["password"], user_salt).decode("UTF-8") 

        if not hmac.compare_digest(hashed_pw, user_password.decode("UTF-8")):
            return methodNotAllowed("Password doesn't match")

        if user.confirmed == False:
            return notAcceptable("User email not confirmed")

        new_token = create_access_token(identity = user.id, fresh = True, expires_delta = timedelta(days=7))
        refresh_token = create_refresh_token(identity = user.id, expires_delta = timedelta(days=30))

        return {'id':user.id, 'username':user.username, 'gender':user.gender, 'type':user.type, 'access_token': new_token, 'refresh_token': refresh_token}

    @staticmethod
    def refresh(request: Request):
        user_id = get_jwt_identity()
        new_token = create_access_token(identity = user_id, fresh = True, expires_delta = timedelta(days=7))
        refresh_token = create_refresh_token(user_id, expires_delta = timedelta(days=30))

        return {'access_token': new_token, 'refresh_token': refresh_token}

    @staticmethod
    def send_confirm_email(request: Request):
        if "email" not in request.args:
            return badRequest("Key not in request")

        user = User.query.filter_by(email=request.args["email"]).first()

        if user is None: 
            return notFound("User not found")

        if user.confirmed == True:
            return conflict("User email already confirmed")
        
        current_request = Request.query.filter_by(user_id = user.id, type="email_request").first()

        if current_request.time is not None:
            if datetime.now() - datetime.strptime(current_request.time, '%Y-%m-%d %H:%M:%S.%f') < timedelta(minutes=get_env["REQUEST_TIMER_LIMIT"]):
                current_request.time = datetime.now()
            else:
                return tooManyRequests("Too many requests")
        else:
            current_request.time = datetime.now()
        db.session.commit()

        token = s.dumps(request.args["email"], salt='email-confirm')

        MailHandlerInstance.send_link("Welcome new user! When you click this link, you will be able to confirm your email!", request.args["email"], f"{get_env["FRONTEND_DOMAIN"]}/account/confirm_email?token={token}")

        return {"msg":"success"}

    @staticmethod
    def confirm_email(request: Request):
        if "token" not in request.args:
            return badRequest("Key not in request")
        
        try:
            email = s.loads(request.args["token"], salt="email-confirm", max_age=3600)
        except SignatureExpired:
            return preconditionFailed("Token has expired")
        except BadTimeSignature:
            return notAcceptable("The token you submitted was incorrect")
        except BadSignature:
            return notAcceptable("The token you submitted was incorrect")


        user = User.query.filter_by(email=email).first()

        if user is None:
            return notFound("User not found")

        user.confirmed = True

        db.session.commit()

        return {"msg":"success"}

    @staticmethod
    def get_reset_token(request: Request):
        if "email" not in request.args:
            return badRequest("Key not in request")

        user = User.query.filter_by(email=request.args["email"]).first()

        if user is None: 
            return notFound("User not found")

        current_request = Request.query.filter_by(user_id = user.id, type="password_request").first()
        if current_request.time is not None:
            if datetime.now() - datetime.strptime(current_request.time, '%Y-%m-%d %H:%M:%S.%f') > timedelta(minutes=get_env["REQUEST_TIMER_LIMIT"]):
                current_request.time = datetime.now()
            else:
                return tooManyRequests("Too many requests")
        else:
            current_request.time = datetime.now()
        db.session.commit()

        token = s.dumps(request.args["email"], salt='password-forgot')

        MailHandlerInstance.send_link("Welcome user! When you click this link, you will be able to change your password!", request.args["email"], f"{get_env["FRONTEND_DOMAIN"]}/account/forgot_change?token={token}")

        return {"msg":"success"}

    @staticmethod
    def verify_reset_token(request: Request):
        for key in self.verify_reset_token_req:
            if key not in request.args:
                return badRequest("Key not in request")

        try:
            email = s.loads(request.args["token"], salt="password-forgot", max_age=500)
        except SignatureExpired:
            return preconditionFailed("Token has expired")
        except BadTimeSignature:
            return notAcceptable("The token you submitted was incorrect")
        except BadSignature:
            return notAcceptable("The token you submitted was incorrect")
        
        user = User.query.filter_by(email=email).first()

        if user is None:
            return notFound("User not found")

        if len(request.args["password"]) < get_env["PASS_LEN"]:
            return notAcceptable("Password to weak")

        salt = genSalt()
        password = request.args["password"]

        user_password = decode_postgres_bytea(user.password)
        user_salt = decode_postgres_bytea(user.salt)

        if user_password is None or user_salt is None:
            return internalServerError("User data corrupted")

        hashed_test_pw = hashPassword(password, user_salt)

        if hmac.compare_digest(hashed_test_pw, user_password):
            return conflict("New password cannot be the same as the old one")

        hashed_pw = hashPassword(password, salt)

        user.password = hashed_pw
        user.salt = salt

        db.session.commit()

        return {"msg":"success"}