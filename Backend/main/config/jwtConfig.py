from flask import Flask
from flask_jwt_extended import JWTManager
from config.get_env import get_env

def jwt_config(app: Flask) -> JWTManager:
    if not get_env["JWT_SECRET"]:
        raise RuntimeError("JWT Secret not found")

    app.config["JWT_SECRET_KEY"] = get_env["JWT_SECRET"]
    jwt = JWTManager(app)

    return jwt