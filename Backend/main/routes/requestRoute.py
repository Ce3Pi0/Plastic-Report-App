from routes.baseRoute import BaseRoute
from config.config import get_jwt_identity, db
from classes.classes import User, Request
from utils.utils import customAbort, REQUEST_TIMER_LIMIT
from datetime import datetime, timedelta

class RequestRoute(BaseRoute):
    __types = ["password_request", "email_request"]

    def __init__(self) -> None:
        self.update_req = ["user_id", "req_type"]

    def create(self, request):
        if "type" not in request.args:
            return customAbort("Key not in request", 400)

        if request.args["type"] not in self.__types:
            return customAbort("Type not allowed", 405)

        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first()

        if user is None:
            return customAbort("User not found", 404)

        if user.type != "admin":
            return customAbort("Unauthorized", 405)

        if "user_id" not in request.json:
            return customAbort("Key not in request", 400)

        test_request = Request.query.filter_by(user_id=request.json["user_id"], type=request.args['type']).first()

        if test_request is not None:
            return customAbort("Cannot create another table of this type for this user", 405)

        user_request = Request(type=request.args["type"], time=None, user_id=request.json["user_id"])

        db.session.add(user_request)
        db.session.commit()
        
        return {"msg":"success"}

    def read(self, request):
        user_id = get_jwt_identity()
        user = User.query.filter_by(id = user_id).first()

        if user is None:
            return customAbort("User not found", 404)

        if user.type != "admin":
            return customAbort("Unauthorized", 405)

        if "id" in request.args:
            current_request = Request.query.filter_by(id=request.args["id"]).first()

            if current_request is None:
                return customAbort("Request not found", 404)

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
            return customAbort("User not found", 404)

        if user.type != "admin":
            return customAbort("Unauthorized", 405)

        for key in self.update_req:
            if key not in request.args:
                return customAbort("Key not in request", 400)

        if request.args["req_type"] not in self.__types:
            return customAbort("Invalid request type", 400)

        current_request = Request.query.filter_by(type=request.args["req_type"], user_id=request.args["user_id"]).first()

        if current_request is None:
            return customAbort("Not found", 404)

        if current_request.time is not None:
            if datetime.now() - datetime.strptime(current_request.time, '%Y-%m-%d %H:%M:%S.%f') > timedelta(hours=REQUEST_TIMER_LIMIT):
                current_request.time = datetime.now()
            else:
                return customAbort("Too many requests", 429)
        else:
            current_request.time = datetime.now()

        db.session.commit()

        return {"msg":"success"}

    def delete(self, request):
        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first()

        if user is None:
            return customAbort("User not found", 404)

        if user.type != "admin":
            return customAbort("Unauthorized", 405)

        if "id" in request.args:
            current_request = Request.query.filter_by(id=request.args["id"]).first()

            if current_request is None:
                return customAbort("Request not found", 404)

            db.session.delete(current_request)
            db.session.commit() 

            return {"msg":"success"}

        if "user_id" in request.args:
            current_requests = Request.query.filter_by(user_id = request.args["user_id"])

            for request in current_requests:
                db.session.delete(request)
                db.session.commit

            return {"msg":"success"}

        return customAbort("Key not in request", 400)



RequestRouteInstance = RequestRoute()