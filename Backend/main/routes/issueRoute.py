from config.config import get_jwt_identity, db
from routes.baseRoute import BaseRoute
from classes.classes import Issue, User
from utils.utils import customAbort


class IssueRoute(BaseRoute):
    
    __privilage = {"client":1, "admin":2}

    def __init__(self) -> None:
        self.create_req = ["name"]
        self.update_req = ["id", "fixed"]
        self.delete_req = ["id"]

    def create(self, request):
        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first()

        if user is None:
            return customAbort("User not found", 404)

        for key in self.create_req:
            if key not in request.json:
                return customAbort("Key not in request", 400)

        issue = Issue(name=request.json["name"], description=request.json["description"] if "description" in
        request.json else None, fixed=False, user_id=user_id)

        db.session.add(issue)
        db.session.commit()

        return {"msg":"success"}

    def read(self, request):
        if "id" in request.args:

            report = Issue.query.filter_by(id=request.args["id"]).first()

            if report is None:
                return customAbort("Issue report not found", 404)
            
            return {"issue":{
                "id":report.id,
                "name":report.name,
                "description":report.description,
                "fixed": report.fixed,
                "user_id":report.user_id
            }}

        all_reports = Issue.query.all()

        if all_reports is None:
            return customAbort("Issue reports not found", 404)

        output = []
        for report in all_reports:
            data = {
                "id":report.id,
                "name":report.name,
                "description":report.description,
                "fixed": report.fixed,
                "user_id":report.user_id
            }
            output.append(data)

        return {"issues":output}

    def update(self, request):
        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first()

        if user is None:
            return customAbort("User not found", 404)

        if self.__privilage[user.type] < self.__privilage["admin"]:
            return customAbort("Clients cannot update issues", 405) 

        for key in self.update_req:
            if key not in request.args:
                return customAbort("Key not in request", 400)

        if request.args["fixed"] != "True" and request.args["fixed"] != "False":
            return customAbort("Fixed arg must be True or False", 405)

        issue = Issue.query.filter_by(id=request.args["id"]).first()

        if issue is None:
            return customAbort("Issue report not found", 404)

        issue.fixed = request.args["fixed"] == "True"

        db.session.commit()

        return {"msg":"success"}
        
    def delete(self, request):
        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first()

        if user is None:
            return customAbort("User not found", 404)

        if self.__privilage[user.type] < self.__privilage["admin"]:
            return customAbort("Clients cannot delete issues", 405)

        for key in self.delete_req:
            if key not in request.args:
                return customAbort("Key not in request", 400)

        issue = Issue.query.filter_by(id=request.args["id"]).first()

        if issue is None:
            return customAbort("Report issue not found", 404)
        
        db.session.delete(issue)
        db.session.commit()

        return {"msg":"success"}

IssueRouteInstance = IssueRoute()