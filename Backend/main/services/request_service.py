from datetime import datetime, timedelta
from config.config import db
from services.base_service import BaseService
from config.errorCodes import HttpError
from utils.httpAbort import abort
from classes.classes import User, Request
from utils.utils import validate_privilege, validate_request_type
from config.get_env import get_env

class RequestService(BaseService):
    @staticmethod
    def create(user_id: str, request_type: str, request_user_id: str):
        user = User.query.filter_by(id=user_id).first()

        if user is None:
            abort(HttpError.NOT_FOUND, "User not found")
        
        if not validate_privilege(user.type):
            abort(HttpError.UNAUTHORIZED, "Unauthorized")
        
        test_request = Request.query.filter_by(user_id=request_user_id, type=request_type).first()

        if test_request is not None:
            abort(HttpError.UNAUTHORIZED, "Cannot create another record of this type for this user")

        user_request = Request(type=request_type, time=None, user_id=request_user_id)

        db.session.add(user_request)
        db.session.commit()

    @staticmethod
    def read(user_id: str, request_id: str | None, request_user_id: str | None):
        user = User.query.filter_by(id = user_id).first()

        if user is None:
            abort(HttpError.NOT_FOUND, "User not found")
        
        if not validate_privilege(user.type):
            abort(HttpError.UNAUTHORIZED, "Unauthorized")
        
        if request_id is not None:
            current_request = Request.query.filter_by(id=request_id).first()

            if current_request is None:
                abort(HttpError.NOT_FOUND, "Request not found")
            
            return {
                current_request.id,
                current_request.type,
                current_request.time,
                current_request.user_id
            }
        if request_user_id is not None:
            current_user_requests = Request.query.filter_by(id=request_user_id)

            output = []
            for current_user_request in current_user_requests:
                data = {
                    current_user_request.id,
                    current_user_request.type,
                    current_user_request.time,
                    current_user_request.user_id
                }
                output.append(data)
            return output
        
        all_requests = Request.query.all()

        output = []
        for current_request in all_requests:
            data = {
                "id": current_request.id,
                "type": current_request.type,
                "time": current_request.time,
                "user_id": current_request.user_id
            }
            output.append(data)

        return output

    @staticmethod
    def update(user_id: str, request_user_id: str, request_type: str):
        user = User.query.filter_by(id=user_id).first()

        if user is None:
            abort(HttpError.NOT_FOUND, "User not found")
        
        if not validate_privilege(user.type):
            abort(HttpError.UNAUTHORIZED, "Unauthorized")
        
        if not validate_request_type(request_type):
            abort(HttpError.BAD_REQUEST, "Invalid request type")

        current_request = Request.query.filter_by(type=request_type, user_id=request_user_id).first()

        if current_request is None:
            abort(HttpError.NOT_FOUND, "Request not found")

        if current_request.time is not None:
            if datetime.now() - datetime.strptime(current_request.time, '%Y-%m-%d %H:%M:%S.%f') > timedelta(minutes=int(get_env.get("REQUEST_TIMER_LIMIT") or 5)):
                current_request.time = datetime.now()
            else:
                abort(HttpError.UNAUTHORIZED, "Too many requests")
        else:
            current_request.time = datetime.now()

        db.session.commit()

    @staticmethod
    def delete(user_id: str, request_id: str | None, request_user_id: str | None):
        user = User.query.filter_by(id=user_id).first()

        if user is None:
            abort(HttpError.NOT_FOUND, "User not found")
        
        if not validate_privilege(user.type):
            abort(HttpError.UNAUTHORIZED, "Unauthorized")
        
        if request_id is not None:
            current_request = Request.query.filter_by(id=request_id).first()

            if current_request is None:
                abort(HttpError.NOT_FOUND, "Request not found")
            
            db.session.delete(current_request)
            db.session.commit()

        if request_user_id is not None:
            current_user_requests = Request.query.filter_by(user_id=request_user_id)

            for current_user_request in current_user_requests:
                db.session.delete(current_user_request)
            db.session.commit()