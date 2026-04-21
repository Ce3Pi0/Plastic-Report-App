from config.config import db
from services.base_service import BaseService
from classes.classes import User, Request
from utils.httpAbort import methodNotAllowed, notFound
from utils.utils import validate_privilege

class RequestService(BaseService):
    @staticmethod
    def create(user_id: str, request_type: str, request_user_id: str):
        user = User.query.filter_by(id=user_id).first()

        if user is None:
            return notFound("User not found")
        
        if not validate_privilege(user.type):
            return methodNotAllowed("Unauthorized")
        
        test_request = Request.query.filter_by(user_id=request_user_id, type=request_type).first()

        if test_request is not None:
            return methodNotAllowed("Cannot create another record of this type for this user")

        user_request = Request(type=request_type, time=None, user_id=request_user_id)

        db.session.add(user_request)
        db.session.commit()

    @staticmethod
    def read():
        pass

    @staticmethod
    def update():
        pass

    @staticmethod
    def delete():
        pass