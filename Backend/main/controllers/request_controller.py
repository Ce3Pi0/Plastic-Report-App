from flask import Request
from flask_jwt_extended import get_jwt_identity
from controllers.base_controller import BaseController
from utils.httpAbort import badRequest, methodNotAllowed
from utils.utils import validate_request_type
from services.request_service import RequestService

class RequestController(BaseController):
    @staticmethod
    def create(request: Request): 
        request_type = request.args.get("type")
        request_user_id = request.args.get("user_id")

        if request_type is None or request_user_id is None:
            return badRequest("Key not in request")

        if not validate_request_type(request_type):
            return methodNotAllowed("Type not allowed")

        user_id = get_jwt_identity()

        RequestService.create(user_id, request_type, request_user_id)
        
        return {"msg":"success"}
    
    @staticmethod
    def read(request: Request):    
        return {}
    
    @staticmethod
    def update(request: Request):    
        return {}
    
    @staticmethod
    def delete(request: Request):    
        return {}