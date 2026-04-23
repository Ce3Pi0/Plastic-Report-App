from flask import Flask
from flask_jwt_extended import JWTManager
from config.get_env import get_env

def jwt_config(app: Flask) -> JWTManager:
    if not get_env.get("JWT_SECRET"):
        raise RuntimeError("JWT Secret not found")

    app.config["JWT_SECRET_KEY"] = get_env.get("JWT_SECRET")
    jwt = JWTManager(app)

    @jwt.unauthorized_loader
    def missing_token(err):
        return {"message": "Missing Authorization Header"}, 401

    @jwt.invalid_token_loader
    def invalid_token(err):
        return {"message": "Invalid token"}, 401

    return jwt