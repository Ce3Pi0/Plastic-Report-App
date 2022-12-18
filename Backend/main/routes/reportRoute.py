from config.config import db, app, secure_filename
from routes.baseRoute import BaseRoute
from classes.classes import User, Report
from utils.utils import customAbort
from flask_jwt_extended import get_jwt_identity
from flask import jsonify
import random 

def get_random_alphanumerical(_len = 16):
    asciiCodes = []
    alphanumerical = ""
    asciiCodes += random.sample(range(97, 122), int(round(0.375 * _len)))
    asciiCodes += random.sample(range(65, 90), int(round(0.375 * _len)))
    asciiCodes += random.sample(range(48, 57), int(round(0.25 * _len)))
    random.shuffle(asciiCodes)
    for char in asciiCodes:
        alphanumerical += chr(char)
    return alphanumerical


class ReportRoute(BaseRoute):
    __statuses = ["pending", "completed", "rejected"]
    
    def __init__(self) -> None:
        self.create_req = ["lat", "lon"]
        self.delete_req = ["id"]

    def create(self, request):
        self.lat = str(request.form["lat"])
        self.lon = str(request.form["lon"])
        self.image = str(request.form["image"])

        if not self.lat or not self.lon or not self.image:
            return customAbort("Key not in request", 400)

        user_id = get_jwt_identity()

        user = User.query.filter_by(id=user_id).first()

        if user is None:
            return customAbort("User not found", 404)

        if user.type == "admin":
            return customAbort("Admin can't send report", 405)


        if "image" not in request.files:
            return customAbort("Missing image", 400)

        img = request.files["image"]
        img_ext = img.filename.split(".")[len(img.filename.split(".")) - 1]
        

        img_name = get_random_alphanumerical() + "." + img_ext
        img.save(secure_filename(app.config["UPLOAD_FOLDER"] + img_name))
        
        report = Report(location = f'{self.lat}&{self.lon}', url=img_name, status="pending", user_id = user_id)

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
        if "id" not in request.args or "user_id" not in request.args or "status" not in request.args:
            return customAbort("Key not in request", 400)

        if request.args["status"] not in self.__statuses:
            return customAbort("Invalid status", 406)

        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first()

        if user is None:
            return customAbort("User not found", 404)

        if user.type != "admin":
            return customAbort("User privillage to low", 405)

        report = Report.query.filter_by(id=request.args["id"]).first()

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

        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first()

        if user is None:
            return customAbort("User not found", 404)

        if user.type != "admin":
            return customAbort("User privillage to low", 405)

        report = Report.query.filter_by(id=request.args["id"]).first()

        db.session.delete(report)
        db.session.commit()

        return {"msg":"success"}        


ReportRouteInstance = ReportRoute()