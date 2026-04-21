from flask import Flask
from flask_jwt_extended import JWTManager
from config.getEnv import getEnv

def jwt_config(app: Flask) -> JWTManager:
    if not getEnv["JWT_SECRET"]:
        raise RuntimeError("JWT Secret not found")

    app.config["JWT_SECRET_KEY"] = getEnv["JWT_SECRET"]
    jwt = JWTManager(app)

    return jwt