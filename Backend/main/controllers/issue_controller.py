from flask import Request
from typing import Dict, Any
from pydantic import ValidationError
from flask_jwt_extended import get_jwt_identity
from config.errorCodes import HttpError
from utils.httpAbort import abort
from controllers.base_controller import BaseController
from services.issue_service import IssueService
from validators.issue_validators import IssueCreateSchema

class IssueController(BaseController):
    @staticmethod
    def create(request: Request):
        user_id = str(get_jwt_identity())

        if user_id is None:
            abort(HttpError.UNAUTHORIZED, "Invalid credentials")

        data: Dict[str, Any] = request.get_json() or {}
        try:
            body = IssueCreateSchema(**data)
        except ValidationError as e:
            abort(HttpError.BAD_REQUEST, e.json())
        
        IssueService.create(user_id, body)

        return {"msg":"success"}

    @staticmethod
    def read(request: Request):
        user_id = str(get_jwt_identity())
        issue_id = request.args.get("id")

        if user_id is None:
            abort(HttpError.UNAUTHORIZED, "Invalid credentials")
        
        data = IssueService.read(user_id, issue_id)

        if issue_id is not None: return {
            "issue": data
        }

        return {
            "issues": data
        }

    @staticmethod
    def update(request: Request):
        user_id = str(get_jwt_identity())
        issue_id = request.args.get("id")
        issue_fixed = request.args.get("fixed")

        if user_id is None:
            abort(HttpError.UNAUTHORIZED, "Invalid credentials")
        
        if issue_id is None or issue_fixed is None:
            abort(HttpError.BAD_REQUEST, "Invalid Issue parameters")

        IssueService.update(user_id, issue_id, issue_fixed)

        return {"msg":"success"}

    @staticmethod
    def delete(request: Request):
        user_id = str(get_jwt_identity())
        issue_id = request.args.get("id")

        if issue_id is None:
            abort(HttpError.BAD_REQUEST, "Invalid Issue parameters")
        
        IssueService.delete(user_id, issue_id)

        return {"msg":"success"}