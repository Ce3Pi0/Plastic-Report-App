from config.config import db
from classes.classes import User, Request
from validators.auth_validators import AuthRegisterSchema
from utils.utils import genSalt, hashPassword
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
    def login():
        pass

    @staticmethod
    def refresh():
        pass

    @staticmethod
    def send_confirm_email():
        pass

    @staticmethod
    def confirm_email():
        pass

    @staticmethod
    def get_reset_token():
        pass

    @staticmethod
    def verify_reset_token():
        pass