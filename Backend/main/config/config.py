import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token,  get_jwt_identity
from flask_mail import Mail, Message
from werkzeug.utils import secure_filename
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from itsdangerous import URLSafeSerializer, SignatureExpired, URLSafeTimedSerializer, BadTimeSignature, BadSignature

app = Flask(__name__)

MAIL_SERVER = os.getenv("MAIL_SERVER")
MAIL_PORT = int(os.getenv("MAIL_PORT", 587)
MAIL_USERNAME = os.getenv("MAIL_USERNAME")
MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")

if not MAIL_SERVER or not MAIL_PORT or not MAIL_USERNAME or not MAIL_PASSWORD:
    raise RuntimeError("Some of the Mail Server environment variables are missing.")


app.config.update(dict(
    DEBUG = True,
    MAIL_SERVER = MAIL_SERVER,
    MAIL_PORT = MAIL_PORT,
    MAIL_USE_TLS = True,
    MAIL_USE_SSL = False,
    MAIL_USERNAME = MAIL_USERNAME,
    MAIL_PASSWORD = MAIL_PASSWORD,
))

mail = Mail(app)

s = URLSafeTimedSerializer(os.getenv("SECRET_KEY"))

limiter = Limiter(app=app, key_func=get_remote_address)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
uri = "mysql+pymysql://root:TFrcwRMuZMFqcKgU@localhost/PlasticReport?&autocommit=false"
db = SQLAlchemy(app)
CORS(app)

# FOLDER DESTINATION FOR STATIC IMAGES
# app.config["UPLOAD_FOLDER"] = "D:/Projects/Plastic-Report-App/Static/" # Desktop
# app.config["UPLOAD_FOLDER"] = "C:/projects/Plastic-Report-App/Static/" # Laptop
app.config["UPLOAD_FOLDER"] = "/home/3dfactory.mk/static/" # Linux Server

app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY")
jwt = JWTManager(app)


PASS_LEN: int = 6  

