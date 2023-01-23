from routes.baseRoute import BaseRoute
from config.config import get_jwt_identity, db
from classes.classes import User, Request
from utils.utils import customAbort
from datetime import datetime

class RequestRoute(BaseRoute):
    __types = ["password_request", "email_request"]

    def __init__(self) -> None:
        super().__init__()

    def create(self, request):
        if "type" not in request.args:
            return customAbort("Key not in request", 400)

        if request.args["type"] not in self.__types:
            return customAbort("Type not allowed", 405)

        user_id = get_jwt_identity()

        user = User.query.filter_by(id=user_id).first()

        if user is None:
            return customAbort("User not found", 404)

        user_request = Request(type=request.args["type"], time=None, user_id=user_id)

        db.session.add(user_request)
        db.session.commit()
        
        return {"msg":"success"}

    def read(self, request):
        user_id = get_jwt_identity()

        user = User.query.filter_by(id=user_id).first()

        if user is None:
            return customAbort("User not found", 404)

        if "id" in request.args:
            current_request = Request.query.filter_by(id=request.args["id"], user_id=user_id).first()

            if current_request is None:
                return customAbort("Request not found", 404)

            return {"request":{
                request.id,
                request.type,
                request.time,
                request.user_id
            }}

        current_user_requests = Request.query.filter_by(user_id=user_id)

        if current_user_requests is None:
            return customAbort("Request not found", 404)

        output = []
        for current_request in current_user_requests:
            data = {
                request.id,
                request.type,
                request.time,
                request.user_id
            }
            output.append(data)

        return {"requests": output}

    def update(self, request):
        user_id = get_jwt_identity()

        user = User.query.filter_by(id=user_id).first()

        if user is None:
            return customAbort("User not found", 404)

        if "id" not in request.args:
            return customAbort("Key not in request", 400)

        current_request = Request.query.filter_by(id=request.args["id"], user_id=user_id)

        if current_request.time is not None:
            return current_request.time - datetime.time()
            # current_request.time = datetime.time() if current_request.time - datetime.time()
        else:
            current_request.time = datetime.time()

        db.session.commit()

        return {"msg":"success"}

    def delete(self, request):
        user_id = get_jwt_identity()

        user = User.query.filter_by(id=user_id).first()

        if user is None:
            return customAbort("User not found", 404)

        if "id" not in request.args:
            return customAbort("Key not in request", 400)

        current_request = Request.query.filter_by(id=request.args["id"], user_id=user_id).first()

        if current_request is None:
            return customAbort("Request not found", 404)

        db.session.delete(current_request)
        db.session.commit() 

        return {"msg":"success"}
        

RequestRouteInstance = RequestRoute()