from config.config import db    
from routes.baseRoute import BaseRoute
from classes.classes import User, Report
from utils.utils import customAbort

class ReportRoute(BaseRoute):
    __statuses = ["pending", "completed"]
    
    def __init__(self) -> None:
        self.create_req = ["location", "url", "user_id"]
        self.delete_req = ["id", "user_id"]

    def create(self, request):
        for key in self.create_req:
            if key not in request.json:
                return customAbort("Key not in request", 400)

        user = User.query.filter_by(id=request.json["user_id"]).first()

        if user is None:
            return customAbort("User not found", 404)

        if user.type == "admin":
            return customAbort("Admin can't send report", 405)

        report = Report(location = request.json["location"], url=request.json["url"],
        status="pending", user_id = request.json["user_id"])

        db.session.add(report)
        db.session.commit()

        return {"msg":"success"}        

    def read(self, request):
        if "id" in request.args:
            report = Report.query.filter_by(id=request.args["id"]).first()

            if report is None:
                return customAbort("Report not found", 404)

            data = {
                "id":report.id,
                "location":report.location,
                "url":report.url,
                "user_id":report.user_id,
                "status":report.status
            }

            return {"report":data}
        
        if "status" in request.args:
            if request.args["status"] not in self.__statuses:
                customAbort("Invalid status", 406)

            reports = Report.query.filter_by(status = request.args["status"])

            output = []
            for report in reports:
                data = {
                    "id":report.id,
                    "location":report.location,
                    "url":report.url,
                    "user_id":report.user_id,
                    "status":report.status
                }
                output.append(data)
            
            return {request.args["status"] : output}

        if "user_id" in request.args:
            user = User.query.filter_by(id = request.args["user_id"]).first()

            if user is None:
                return customAbort("User not found", 404)

            reports = Report.query.filter_by(user_id = request.args["user_id"])

            output = []
            for report in reports:
                data = {
                    "id":report.id,
                    "location":report.location,
                    "url":report.url,
                    "user_id":report.user_id,
                    "status":report.status
                }
                output.append(data)
            
            return {"reports" : output}

        if "user_id" in request.args and "status" in request.args:
            if request.args["status"] not in self.__statuses:
                customAbort("Invalid status", 406)

            user = User.query.filter_by(id = request.args['id']).first()

            if user is None:
                return customAbort("User not found", 404)

            reports = Report.query.filter_by(user_id = request.args["user_id"], status = request.args["status"])

            output = []
            for report in reports:
                data = {
                    "id":report.id,
                    "location":report.location,
                    "url":report.url,
                    "user_id":report.user_id,
                    "status":report.status
                }
                output.append(data)
            
            return {"reports" : output}
        
        return customAbort("Key not in request", 400)

    def update(self, request):
        if "id" not in request.args and "user_id" not in request.args and "status" not in request.args:
            return customAbort("Key not in request", 400)

        if request.args["status"] not in self.__statuses:
            return customAbort("Invalid status", 406)

        user = User.query.filter_by(id=request.args["id"]).first()

        if user is None:
            return customAbort("User not found", 404)

        if user.type != "admin":
            return customAbort("User privillage to low", 405)

        report = Report.query.filter_by(id=request.args["id"], user_id=request.args["user_id"]).first()

        if report is None:
            return customAbort("Report not found", 404)

        if report.status == request.args["status"]:
            return customAbort("Can't change to the same status", 406)

        report.status = request.args["status"]
        db.session.commit()

        return {"msg":"success"}        
    
    def delete(self, request):
        for key in self.delete_req:
            if key not in request.args:
                return customAbort("Key not in request", 400)

        user = User.query.filter_by(id=request.args["user_id"]).first()

        if user is None:
            return customAbort("User not found", 404)

        if user.type != "admin":
            return customAbort("User privillage to low", 405)

        report = Report.query.filter_by(id=request.args["id"]).first()

        db.session.delete(report)
        db.session.commit()

        return {"msg":"success"}        


ReportRouteInstance = ReportRoute()

#fix authentication for delete and update 