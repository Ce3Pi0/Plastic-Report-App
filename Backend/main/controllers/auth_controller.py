from flask import Request
from flask_jwt_extended import get_jwt_identity
from typing import Dict, Any
from pydantic import ValidationError
from validators.auth_validators import *
from config.errorCodes import HttpError
from utils.httpAbort import abort
from services.auth_service import AuthService 

class AuthController:
    @staticmethod
    def register(request: Request):
        data: Dict[str, Any] = request.json or {}
        try:
            body = AuthRegisterSchema(**data)
        except ValidationError as e:
            abort(HttpError.BAD_REQUEST, e.json())

        AuthService.register(body)

        return {"msg":"success"}

    @staticmethod
    def login(request: Request):
        data: Dict[str, Any] = request.json or {}
        try:
            body = AuthLoginSchema(**data)
        except ValidationError as e:
            abort(HttpError.BAD_REQUEST, e.json())

        user = AuthService.login(body)

        return user

    @staticmethod
    def refresh(_: Request):
        user_id = str(get_jwt_identity())

        if user_id is None:
            abort(HttpError.UNAUTHORIZED, "Invalid credentials")

        tokens = AuthService.refresh(user_id)
        
        return tokens

    @staticmethod
    def send_confirm_email(request: Request):
        email = request.args.get("email")

        if email is None:
            abort(HttpError.BAD_REQUEST, "Key not in request")

        AuthService.send_confirm_email(email)        

        return {"msg":"success"}

    @staticmethod
    def confirm_email(request: Request):
        token = request.args.get("token")

        if token is None:
            abort(HttpError.BAD_REQUEST, "Key not in request")
        
        AuthService.confirm_email(token)

        return {"msg":"success"}

    @staticmethod
    def get_reset_token(request: Request):
        email = request.args.get("email")

        if email is None:
            abort(HttpError.BAD_REQUEST, "Key not in request")

        AuthService.get_reset_token(email)
       
        return {"msg":"success"}

    @staticmethod
    def verify_reset_token(request: Request):
        token = request.args.get("token")
        password = request.args.get("password")

        if token is None or password is None: 
            abort(HttpError.BAD_REQUEST, "Key not in request")

        AuthService.verify_reset_token(token, password)

        return {"msg":"success"}