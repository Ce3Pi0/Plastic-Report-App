from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
db = SQLAlchemy(app)
CORS(app)

app.config["UPLOAD_FOLDER"] = "C:/projects/Plastic-Report-App/Static/"

app.config["JWT_SECRET_KEY"] = "Ce3Pi0"
jwt = JWTManager(app)