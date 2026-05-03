from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from config.serializerConfig import serializer_config
from config.mailConfig import MailHandlerInstance
from config.supabaseConfig import SupabaseConfig
from config.jwtConfig import jwt_config
from config.get_env import get_env
from config.cloudinaryConfig import CloudinaryConfig

# Configure Flask App
app = Flask(__name__, static_folder='../../../Frontend/dist', 
            static_url_path='/')

MailHandlerInstance.init_app()
# Configure CORS
if get_env.get("ENV") == "DEVELOPMENT":
    CORS(app)
else:
    CORS(app, resources={r"/api/v1/*": {"origins": "https://plastic-report-app.onrender.com"}}, supports_credentials=True)

# Configure SQLAlchemy
SupabaseConfig.init_app(app)
db = SQLAlchemy(app)

# Configure Cloudinary
CloudinaryConfig.init()

# Configure JWT
jwt = jwt_config(app)

# Configure Limiter
limiter = Limiter(app=app, key_func=get_remote_address, enabled=get_env.get("ENV") != "DEVELOPMENT")

# Configure Serializer
s = serializer_config()