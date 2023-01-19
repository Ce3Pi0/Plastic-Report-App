from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager, get_jwt_identity
from werkzeug.utils import secure_filename
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

app = Flask(__name__)

limiter = Limiter(app=app, key_func=get_remote_address)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
db = SQLAlchemy(app)
CORS(app)

# app.config["UPLOAD_FOLDER"] = "D:/Projects/Plastic-Report-App/Static/" # Desktop
app.config["UPLOAD_FOLDER"] = "C:/projects/Plastic-Report-App/Static/" # Laptop

app.config["JWT_SECRET_KEY"] = "Ce3Pi0"
jwt = JWTManager(app)

PASS_LEN: int = 6  