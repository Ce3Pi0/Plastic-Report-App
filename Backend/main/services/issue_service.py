from config.config import db
from services.base_service import BaseService
from utils.utils import validate_privilege, validate_boolean_str
from config.errorCodes import HttpError
from utils.httpAbort import abort
from classes.classes import Issue, User
from validators.issue_validators import *

class IssueService(BaseService):
    @staticmethod
    def create(user_id: str, body: IssueCreateSchema):
        user = User.query.filter_by(id=user_id).first()

        if user is None:
            abort(HttpError.NOT_FOUND, "User not found")

        issue = Issue(name=body.name, description=body.description, fixed=False, user_id=user_id)

        db.session.add(issue)
        db.session.commit()

    @staticmethod
    def read(user_id: str, issue_id: str | None):
        user = User.query.filter_by(id = user_id).first()

        if user is None:
            abort(HttpError.NOT_FOUND, "User not found")
        
        if issue_id:
            issue = None
            if user.type == "admin":
                issue = Issue.query.filter_by(id=issue_id).first()
            else:
                issue = Issue.query.filter_by(id=issue_id, user_id = user_id).first()

            if issue is None:
                abort(HttpError.NOT_FOUND, "Issue report not found")
            
            return {
                "id":issue.id,
                "name":issue.name,
                "description":issue.description,
                "fixed": issue.fixed,
                "user_id":issue.user_id
            }
        
        all_issues = None
        if user.type == "admin":
            all_issues = Issue.query.all()
        else:
            all_issues = Issue.query.filter_by(user_id = user_id)

        output = []
        for issue in all_issues:
            data = {
                "id":issue.id,
                "name":issue.name,
                "description":issue.description,
                "fixed": issue.fixed,
                "user_id":issue.user_id
            }
            output.append(data)

        return output

    @staticmethod
    def update(user_id: str, issue_id: str, issue_fixed: str):
        user = User.query.filter_by(id=user_id).first()

        if user is None:
            abort(HttpError.NOT_FOUND, "User not found")
        
        if not validate_privilege(user.type):
            abort(HttpError.UNAUTHORIZED,"Unauthorized")
        
        if not validate_boolean_str(issue_fixed):
            abort(HttpError.NOT_ACCEPTABLE, "Fixed arg must be True or False")

        issue = Issue.query.filter_by(id=issue_id).first()

        if issue is None:
            abort(HttpError.NOT_FOUND, "Issue report not found")
        
        issue.fixed = issue_fixed.upper() == "TRUE"

        db.session.commit()

    @staticmethod
    def delete(user_id: str, issue_id: str):
        user = User.query.filter_by(id=user_id).first()

        if user is None:
            abort(HttpError.NOT_FOUND, "User not found")

        if not validate_privilege(user.type):
            abort(HttpError.UNAUTHORIZED, "Unauthorized")

        issue = Issue.query.filter_by(id=issue_id).first()

        if issue is None:
            abort(HttpError.NOT_FOUND, "Report issue not found")
        
        db.session.delete(issue)
        db.session.commit()
