from flask import Request
from typing import Dict, Any
from flask_jwt_extended import get_jwt_identity
from config.errorCodes import HttpError
from utils.httpAbort import abort
from controllers.base_controller import BaseController
from validators.report_validators import ReportCreateSchema
from services.report_service import ReportService

class ReportController(BaseController):
    @staticmethod
    def create(request: Request):    
        user_id = get_jwt_identity()
        
        if user_id is None:
            abort(HttpError.UNAUTHORIZED, "Invalid credentials")
        
        data: Dict[str, Any] = request.form.to_dict() or {}
        try:
            body = ReportCreateSchema(**data)
        except Exception as e:
            abort(HttpError.BAD_REQUEST, str(e))
        
        image = request.files.get("image")
        if image is None:
            abort(HttpError.BAD_REQUEST, "Missing image")
        
        ReportService.create(user_id, body, image)

        return { "msg" : "success"}
    
    @staticmethod
    def read(request: Request):    
        user_id = get_jwt_identity()
        report_id = request.args.get("id")
        report_status = request.args.get("status")

        data = ReportService.read(user_id, report_id, report_status)

        if report_id is not None:
            return {"report" : data}
        
        if report_status is not None:
            return {report_status : data}
        
        return {"reports" : data}
    
    @staticmethod
    def update(request: Request):   
        report_id = request.args.get("id")
        report_status = request.args.get("status")

        if report_id is None or report_status is None:
            abort(HttpError.BAD_REQUEST, "Key not in request")

        user_id = get_jwt_identity()

        ReportService.update(user_id, report_id, report_status)

        return {"msg":"success"}   

    @staticmethod
    def delete(request: Request):  
        user_id = get_jwt_identity()
        report_id = request.args.get("id")

        if user_id is None:
            abort(HttpError.UNAUTHORIZED, "Invalid credentials")
        
        if report_id is None:
            abort(HttpError.BAD_REQUEST, "Invalid report id")


        ReportService.delete(user_id, report_id)

        return {"msg":"success"}   