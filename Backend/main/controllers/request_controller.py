from flask import Request
from flask_jwt_extended import get_jwt_identity
from config.errorCodes import HttpError
from utils.httpAbort import abort
from controllers.base_controller import BaseController
from utils.utils import validate_request_type
from services.request_service import RequestService

class RequestController(BaseController):
    @staticmethod
    def create(request: Request): 
        request_type = request.args.get("type")
        request_user_id = request.args.get("user_id")

        if request_type is None or request_user_id is None:
            abort(HttpError.BAD_REQUEST, "Key not in request")

        if not validate_request_type(request_type):
            abort(HttpError.METHOD_NOT_ALLOWED, "Type not allowed")

        user_id = str(get_jwt_identity())

        RequestService.create(user_id, request_type, request_user_id)
        
        return {"msg":"success"}
    
    @staticmethod
    def read(request: Request):    
        user_id = str(get_jwt_identity())
        request_id = request.args.get("id")
        request_user_id = request.args.get("user_id")

        if user_id is None:
            abort(HttpError.UNAUTHORIZED, "Invalid credentials")
        
        data = RequestService.read(user_id, request_id, request_user_id)

        if request_id is not None:
            return {"request" : data}

        return {"requests": data}
    
    @staticmethod
    def update(request: Request):    
        user_id = str(get_jwt_identity())
        request_user_id = request.args.get("user_id")
        request_type = request.args.get("type")

        if user_id is None:
            abort(HttpError.UNAUTHORIZED, "Invalid credentials")

        if request_user_id is None or request_type is None:
            abort(HttpError.BAD_REQUEST, "Key not in request")
        
        RequestService.update(user_id, request_user_id, request_type)

        return {"msg":"success"}
    
    @staticmethod
    def delete(request: Request):    
        user_id = str(get_jwt_identity())
        request_id = request.args.get("id")
        request_user_id = request.args.get("user_id")

        if user_id is None:
            abort(HttpError.UNAUTHORIZED, "Invalid credentials")

        if request_id is None or request_user_id is None:
            abort(HttpError.BAD_REQUEST, "Key not in request")

        RequestService.delete(user_id, request_id, request_user_id)
    
        return {"msg":"success"}
