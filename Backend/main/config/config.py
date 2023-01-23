from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token,  get_jwt_identity
from flask_mail import Mail, Message
from werkzeug.utils import secure_filename
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from itsdangerous import URLSafeSerializer, SignatureExpired, URLSafeTimedSerializer, BadTimeSignature, BadSignature

SECRET_KEY: str = "Ce3Pi0"
MAIL_SERVER: str = 'smtp-mail.outlook.com'
MY_MAIL: str = "hristijannikolovski56@outlook.com"
MAIL_PASSWORD: str = "TestPass123"
FRONTEND_DOMAIN: str = "192.168.0.179:8100"

app = Flask(__name__)

app.config.update(dict(
    DEBUG = True,
    MAIL_SERVER = MAIL_SERVER,
    MAIL_PORT = 587,
    MAIL_USE_TLS = True,
    MAIL_USE_SSL = False,
    MAIL_USERNAME = MY_MAIL,
    MAIL_PASSWORD = MAIL_PASSWORD,
))

mail = Mail(app=app)

s = URLSafeTimedSerializer(SECRET_KEY)

limiter = Limiter(app=app, key_func=get_remote_address)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
db = SQLAlchemy(app)
CORS(app)

# app.config["UPLOAD_FOLDER"] = "D:/Projects/Plastic-Report-App/Static/" # Desktop
app.config["UPLOAD_FOLDER"] = "C:/projects/Plastic-Report-App/Static/" # Laptop

app.config["JWT_SECRET_KEY"] = SECRET_KEY
jwt = JWTManager(app)

PASS_LEN: int = 6  