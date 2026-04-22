from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from config.serializerConfig import serializer_config
from config.mailConfig import MailHandlerInstance
from config.supabaseConfig import SupabaseConfigInstance
from config.jwtConfig import jwt_config

# Configure Flask App
app = Flask(__name__)
MailHandlerInstance.init_app(app)
CORS(app)

# Configure SQLAlchemy
SupabaseConfigInstance.init_app(app)
db = SQLAlchemy(app)

# Configure JWT
jwt = jwt_config(app)

# Configure Limiter
limiter = Limiter(app=app, key_func=get_remote_address)

# Configure Serializer
s = serializer_config()
app.config["UPLOAD_FOLDER"] = "C:/Projects/Plastic-Report-App/Static/" # TODO: Rework for cloudinary integration