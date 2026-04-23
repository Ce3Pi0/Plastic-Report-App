from typing import Dict, Any
from pydantic import ValidationError
from flask import Request
from flask_jwt_extended import get_jwt_identity
from services.user_service import UserService
from utils.httpAbort import abort
from utils.utils import boolean_str_to_boolean
from config.httpException import HttpError
from controllers.base_controller import BaseController
from validators.user_validators import UserCreateSchema, UserUpdateSchema

class UserController(BaseController):
    @staticmethod
    def create(request: Request):
        data: Dict[str, Any] = request.json or {}
        try:
            body = UserCreateSchema(**data)
        except ValidationError as e:
            abort(HttpError.BAD_REQUEST, e.json())

        UserService.create(body)

        return {"msg":"success"}
    
    @staticmethod
    def read(request: Request):    
        user_id = get_jwt_identity()
        query = request.args.get("query")
        user_to_read_id = request.args.get("id")

        if user_id is None:
            abort(HttpError.UNAUTHORIZED, "Invalid Credentials")

        should_query = boolean_str_to_boolean(query) if query is not None else False
        
        data = UserService.read(user_id, user_to_read_id, should_query)

        if should_query:
            return {"users": data}
        return {"user":data}
    
    @staticmethod
    def update(request: Request):    
        user_id = get_jwt_identity()
        user_to_update_id = request.args.get("id")
        image = request.files.get("image")

        body = None
        if image is None:
            data: Dict[str, Any] = request.json or {}
            try:
                body = UserUpdateSchema(**data)
            except ValidationError as e:
                abort(HttpError.BAD_REQUEST, e.json())

        if user_id is None:
            abort(HttpError.UNAUTHORIZED, "Invalid Credentials")
        
        UserService.update(user_id, user_to_update_id, image, body)

        return {"msg":"success"}
    
    @staticmethod
    def delete(request: Request):    
        user_id = get_jwt_identity()
        user_to_delete_id = request.args.get("id")

        if user_id is None:
            abort(HttpError.UNAUTHORIZED, "Invalid credentials")

        if user_to_delete_id is None:
            return abort(HttpError.BAD_REQUEST, "Key not in request")

        UserService.delete(user_id, user_to_delete_id)          

        return {"msg":"success"}