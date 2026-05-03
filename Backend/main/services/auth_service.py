import hmac
from datetime import timedelta
from flask_jwt_extended import create_access_token, create_refresh_token
from config.config import db, s
from config.mailConfig import MailHandlerInstance
from classes.classes import User, Request
from validators.auth_validators import *
from utils.utils import genSalt, hashPassword, decode_postgres_bytea, check_last_request_time, get_user_email
from utils.httpAbort import abort
from config.errorCodes import HttpError

class AuthService:
    @staticmethod
    def register(body: AuthRegisterSchema):

        existing_username = User.query.filter_by(username = body.username).first()
        existing_email = User.query.filter_by(email=body.email).first()

        if existing_email is not None or existing_username is not None:        
            abort(HttpError.CONFLICT, "User already exists")

        salt = genSalt()
        hashed_pw = hashPassword(body.password, salt)

        new_user = User(name=body.name, username=body.username, url = None,
        confirmed = False, email=body.email, salt = salt, password=hashed_pw, gender=body.gender, type="client")

        db.session.add(new_user)
        db.session.commit()

        user_request_email = Request(type="password_request", time=None, user_id=new_user.id)
        user_request_password = Request(type="email_request", time=None, user_id=new_user.id)

        db.session.add(user_request_email)
        db.session.add(user_request_password)

        db.session.commit()

    @staticmethod
    def login(body: AuthLoginSchema):
        user = User.query.filter_by(username = body.username).first()

        if user is None:
            abort(HttpError.NOT_FOUND, "User not found")

        user_password = decode_postgres_bytea(user.password)
        user_salt = decode_postgres_bytea(user.salt)

        if user_password is None or user_salt is None:
            abort(HttpError.INTERNAL_SERVER_ERROR, "User data corrupted")
        
        hashed_pw = hashPassword(body.password, user_salt).decode("UTF-8") 

        if not hmac.compare_digest(hashed_pw, user_password.decode("UTF-8")):
            abort(HttpError.UNAUTHORIZED, "Wrong password")

        if user.confirmed == False:
            abort(HttpError.PRECONDITION_FAILED, "User email not confirmed")

        new_token = create_access_token(identity = user.id, fresh = True, expires_delta = timedelta(days=7))
        refresh_token = create_refresh_token(identity = user.id, expires_delta = timedelta(days=30))

        return {'id':user.id, 'username':user.username, 'gender':user.gender, 'type':user.type, 'access_token': new_token, 'refresh_token': refresh_token, 'img_url': user.url}

    @staticmethod
    def refresh(user_id: str):
        new_token = create_access_token(identity = user_id, fresh = True, expires_delta = timedelta(days=7))
        refresh_token = create_refresh_token(user_id, expires_delta = timedelta(days=30))

        return {'access_token': new_token, 'refresh_token': refresh_token}

    @staticmethod
    def send_confirm_email(email: str):
        user = User.query.filter_by(email=email).first()

        if user is None: 
            abort(HttpError.NOT_FOUND, "User not found")

        if user.confirmed == True:
            abort(HttpError.CONFLICT, "User email already confirmed")

        current_request = Request.query.filter_by(user_id = user.id, type="email_request").first()
        
        # Updates request time or throws an error
        check_last_request_time(current_request)
        db.session.commit()

        token = s.dumps(email, salt='email-confirm')

        MailHandlerInstance.send_link("Welcome new user!", "When you click this link, you will be able to confirm your email!", email, f"{get_env["FRONTEND_DOMAIN"]}/account/confirm_email?token={token}")

    @staticmethod
    def confirm_email(token: str):
        email = get_user_email(token, salt="email-confirm")

        user = User.query.filter_by(email=email).first()

        if user is None:
            abort(HttpError.NOT_FOUND, "User not found")

        if user.confirmed:
            abort(HttpError.CONFLICT, "User email already confirmed")

        user.confirmed = True

        db.session.commit()

    @staticmethod
    def get_reset_token(email: str):
        user = User.query.filter_by(email=email).first()

        if user is None: 
            abort(HttpError.NOT_FOUND, "User not found")

        current_request = Request.query.filter_by(user_id = user.id, type="password_request").first()

        # Updates request time or throws an error
        check_last_request_time(current_request)
        db.session.commit()

        token = s.dumps(email, salt='password-forgot')

        MailHandlerInstance.send_link("Welcome user!", "When you click this link, you will be able to change your password!", email, f"{get_env["FRONTEND_DOMAIN"]}/account/forgot_change?token={token}")

    @staticmethod
    def verify_reset_token(token: str, password: str):
        email = get_user_email(token, salt="password-forgot")

        user = User.query.filter_by(email=email).first()

        if user is None:
            abort(HttpError.NOT_FOUND, "User not found")
        
        if len(password) < (get_env.get("PASS_LEN") or 6):
            abort(HttpError.NOT_ACCEPTABLE, "Password to weak")

        salt = genSalt()

        user_password = decode_postgres_bytea(user.password)
        user_salt = decode_postgres_bytea(user.salt)

        if user_password is None or user_salt is None:
            abort(HttpError.INTERNAL_SERVER_ERROR, "User data corrupted")

        hashed_test_pw = hashPassword(password, user_salt)

        if hmac.compare_digest(hashed_test_pw, user_password):
            abort(HttpError.CONFLICT, "New password cannot be the same as the old one")

        hashed_pw = hashPassword(password, salt)

        user.password = hashed_pw
        user.salt = salt

        db.session.commit()
