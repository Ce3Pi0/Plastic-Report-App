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
# from dotenv import load_dotenv
from utils.utils import get_domain

# Load .env Environment Variables
# load_dotenv()

app = Flask(__name__)

# Environment type
ENV: str = os.getenv("ENV", "DEVELOPMENT")

# Mail Server Variables
MY_MAIL: str | None = os.getenv("MY_MAIL")
MAIL_SERVER: str | None  = os.getenv("MAIL_SERVER")
MAIL_PORT: int = int(os.getenv("MAIL_PORT", 587))
MAIL_USERNAME: str | None = os.getenv("MAIL_USERNAME",)
MAIL_PASSWORD: str | None = os.getenv("MAIL_PASSWORD")

# SQL Server Variables
SQL_USERNAME: str | None = os.getenv("SQL_USERNAME")
SQL_PASSWORD: str | None = os.getenv("SQL_PASSWORD")
SQL_HOST: str | None = os.getenv("SQL_HOST", "localhost")
SQL_NAME: str | None = os.getenv("SQL_NAME")

# Mail Server Variables Validation
if not MAIL_SERVER or not MAIL_PORT or not MAIL_USERNAME or not MAIL_PASSWORD:
    raise RuntimeError("Some of the Mail Server environment variables are missing.")

# Mail account validation
if not MY_MAIL:
    raise RuntimeError("System Email account error")

# SQL Server Variables Validation
if not SQL_USERNAME or not SQL_PASSWORD or not SQL_HOST:
    raise RuntimeError("Some of the Database Server environment variables are missing.")

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

SECRET_KEY: str | None = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    raise RuntimeError("Secret key not found")
s = URLSafeTimedSerializer(SECRET_KEY)

limiter = Limiter(app=app, key_func=get_remote_address)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
# For MySQL Server
uri = f"mysql+pymysql://{SQL_USERNAME}:{SQL_PASSWORD}@{SQL_HOST}/{SQL_NAME}?&autocommit=false"
db = SQLAlchemy(app)
CORS(app)

# FOLDER DESTINATION FOR STATIC IMAGES
app.config["UPLOAD_FOLDER"] = "C:/Projects/Plastic-Report-App/Static/" # Laptop
# app.config["UPLOAD_FOLDER"] = "/home/3dfactory.mk/static/" # Linux Server

JWT_SECRET: str | None = os.getenv("SECRET_KEY")
if not JWT_SECRET:
    raise RuntimeError("JWT Secret not found")
app.config["JWT_SECRET_KEY"] = JWT_SECRET
jwt = JWTManager(app)


PASS_LEN: int = int(os.getenv("PASS_LEN", "6"))

# Frontend domain variables
FRONTEND_PORT: str = os.getenv("FRONTEND_PORT", "5173")
DEV_FRONTEND_DOMAIN: str = os.getenv("DEV_FRONTEND_DOMAIN", "localhost:")
PROD_FRONTEND_DOMAIN: str | None = os.getenv("PROD_FRONTEND_DOMAIN")

FRONTEND_DOMAIN = get_domain(ENV, PROD_FRONTEND_DOMAIN, DEV_FRONTEND_DOMAIN) + FRONTEND_PORT