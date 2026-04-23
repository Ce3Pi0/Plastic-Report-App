from werkzeug.datastructures import FileStorage
from config.config import db
from services.base_service import BaseService
from validators.report_validators import ReportCreateSchema
from config.errorCodes import HttpError
from utils.httpAbort import abort
from classes.classes import Report, User
from utils.utils import validate_privilege, validate_report_status
from cloudinary.uploader import upload, destroy

class ReportService(BaseService):
    @staticmethod
    def create(user_id, body: ReportCreateSchema, image: FileStorage):
        user = User.query.filter_by(id = user_id).first()

        if user is None:
            abort(HttpError.NOT_FOUND, "User not found")
        
        result = upload(image, folder="reports", unique_filename=True)

        img_url = result["secure_url"]
        public_url = result["public_id"]

        report = Report(lat=body.lat, lon=body.lon, url=img_url, public_url=public_url, status="pending", user_id = user_id)

        db.session.add(report)
        db.session.commit()

    @staticmethod
    def read(user_id: str, report_id: str | None, report_status: str | None):
        user = User.query.filter_by(id = user_id).first()

        if user is None:
            abort(HttpError.NOT_FOUND, "User not found")
        
        if report_id is not None:
            report = Report.query.filter_by(id=report_id).first()

            if report is None:
                abort(HttpError.NOT_FOUND, "Report not found")

            if report.user_id != user_id and user.type != "admin":
                abort(HttpError.UNAUTHORIZED, "Unauthorized")

            if user.id != report.user_id:
                user = User.query.filter_by(id=report.user_id).first()
                username = user.username

            return {
                "id":report.id,
                "lat":report.lat,
                "lon":report.lon,
                "url":report.url,
                "username":username,
                "user_id":user.id,
                "status":report.status
            }

        if report_status is not None:
            if not validate_report_status(report_status):
                abort(HttpError.NOT_ACCEPTABLE, "Invalid status")

            reports = None
            if validate_privilege(user.type):
                reports = Report.query.filter_by(status = report_status)
            else:
                reports = Report.query.filter_by(status = report_status, user_id = user.id)

            output = []
            for report in reports:
                username = ""
                if user.type == "admin":
                    cur_user = User.query.filter_by(id=report.user_id).first()
                    username = cur_user.username
                else:
                    username = user.username

                data = {
                    "id":report.id,
                    "lat":report.lat,
                    "lon":report.lon,
                    "url":report.url,
                    "username":username,
                    "user_id":report.id,
                    "status":report.status
                }
                output.append(data)
            
            return output

        all_reports = None
        if validate_privilege(user.type):
            all_reports = Report.query.all()
        else:
            all_reports = Report.query.filter_by(user_id = user.id)

        output = []
        for report in all_reports:
            data = {
                "id":report.id,
                "lat":report.lat,
                "lon":report.lon,
                "url":report.url,
                "username":report.user.username,
                "user_id":report.id,
                "status":report.status
            }
            output.append(data)

        return output

    @staticmethod
    def update(user_id: str, report_id: str, report_status: str):
        user = User.query.filter_by(id=user_id).first()

        if user is None:
            abort(HttpError.NOT_FOUND, "User not found")

        if not validate_privilege(user.type):
            abort(HttpError.UNAUTHORIZED, "User privilege to low")

        if not validate_report_status(report_status):
            abort(HttpError.NOT_ACCEPTABLE, "Invalid status")

        report = Report.query.filter_by(id=report_id).first()

        if report is None:
            abort(HttpError.NOT_FOUND, "Report not found")
        
        if report.status == report_status:
            abort(HttpError.CONFLICT, "Can't change to the same status")
        
        report.status = report_status
        db.session.commit()

    @staticmethod
    def delete(user_id: str, report_id: str):
        user = User.query.filter_by(id=user_id).first()

        if user is None:
            abort(HttpError.NOT_FOUND, "User not found")
        
        if not validate_privilege(user.type):
            abort(HttpError.UNAUTHORIZED, "User privilege to low")
        
        report = Report.query.filter_by(id=report_id).first()
        
        if report is None:
            abort(HttpError.NOT_FOUND, "Report not found")

        if report.public_id:
            destroy(report.public_id)

        db.session.delete(report)
        db.session.commit()