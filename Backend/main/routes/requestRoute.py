from routes.baseRoute import BaseRoute
from flask_jwt_extended import get_jwt_identity
from config.config import db
from classes.classes import User, Request
from config.getEnv import getEnv
from utils.httpAbort import badRequest, notFound, methodNotAllowed
from datetime import datetime, timedelta

class RequestRoute(BaseRoute):
    def __init__(self) -> None:
        self.update_req = ["user_id", "req_type"]

    def read(self, request):
        user_id = get_jwt_identity()
        user = User.query.filter_by(id = user_id).first()

        if user is None:
            return notFound("User not found")

        if user.type != "admin":
            return methodNotAllowed("Unauthorized")

        if "id" in request.args:
            current_request = Request.query.filter_by(id=request.args["id"]).first()

            if current_request is None:
                return notFound("Request not found")

            return {"request":{
                current_request.id,
                current_request.type,
                current_request.time,
                current_request.user_id
            }}

        if "user_id" in request.args:
            current_user_requests = Request.query.filter_by(id=request.args["user_id"])

            output = []
            for current_user_request in current_user_requests:
                data = {
                    current_user_request.id,
                    current_user_request.type,
                    current_user_request.time,
                    current_user_request.user_id
                }
                output.append(data)

            return {"requests": output}

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

        return {"requests": output}

    def update(self, request):
        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first()

        if user is None:
            return notFound("User not found")

        if user.type != "admin":
            return methodNotAllowed("Unauthorized")

        for key in self.update_req:
            if key not in request.args:
                return badRequest("Key not in request")

        if request.args["req_type"] not in self.__types:
            return badRequest("Invalid request type")

        current_request = Request.query.filter_by(type=request.args["req_type"], user_id=request.args["user_id"]).first()

        if current_request is None:
            return notFound("Request not found")

        if current_request.time is not None:
            if datetime.now() - datetime.strptime(current_request.time, '%Y-%m-%d %H:%M:%S.%f') > timedelta(minutes=getEnv["REQUEST_TIMER_LIMIT"]):
                current_request.time = datetime.now()
            else:
                return methodNotAllowed("Too many requests")
        else:
            current_request.time = datetime.now()

        db.session.commit()

        return {"msg":"success"}

    def delete(self, request):
        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first()

        if user is None:
            return notFound("User not found")

        if user.type != "admin":
            return methodNotAllowed("Unauthorized")

        if "id" in request.args:
            current_request = Request.query.filter_by(id=request.args["id"]).first()

            if current_request is None:
                return notFound("Request not found")

            db.session.delete(current_request)
            db.session.commit() 

            return {"msg":"success"}

        if "user_id" in request.args:
            current_requests = Request.query.filter_by(user_id = request.args["user_id"])

            for request in current_requests:
                db.session.delete(request)
                db.session.commit

            return {"msg":"success"}

        return badRequest("Key not in request")



RequestRouteInstance = RequestRoute()