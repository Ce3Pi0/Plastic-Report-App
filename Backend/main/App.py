from flask import request
from flask_jwt_extended import jwt_required

from config.config import *
from utils.utils import createReqeust, customAbort
from routes.userRoute import UserRouteInstance
from routes.reportRoute import ReportRouteInstance
from routes.issueRoute import IssueRouteInstance 
from routes.userAuthRoute import UserAuthRouteInstance

# POST routes (limited) #
@app.route('/user', methods=["POST", "PUT"])
@jwt_required()
@limiter.limit('1000/day;100/hour;10/minute', key_func=get_jwt_identity)
def user_create():
    return createReqeust(request, UserRouteInstance)

@app.route('/report', methods=["POST"])
@jwt_required()
@limiter.limit('1000/day;100/hour;10/minute', key_func=get_jwt_identity)
def report_create():
    return createReqeust(request, ReportRouteInstance)

@app.route('/issue', methods=["POST"])
@jwt_required()
@limiter.limit('1000/day;100/hour;10/minute', key_func=get_jwt_identity)
def issue_create():
    return createReqeust(request, IssueRouteInstance)

# Other routes #
@app.route('/user', methods=["GET", "DELETE"])
@jwt_required()
def user():
    return createReqeust(request, UserRouteInstance)

@app.route('/report', methods=["GET", "PUT", "DELETE"])
@jwt_required()
def report():
    return createReqeust(request, ReportRouteInstance)

@app.route('/issue', methods=["GET", "PUT", "DELETE"])
@jwt_required()
def issue():
    return createReqeust(request, IssueRouteInstance)

# User auth routes #
@app.route('/user/register', methods=["POST"])
@limiter.limit('1000/day;100/hour;10/minute')
def user_register():
    return UserAuthRouteInstance.register(request)

@app.route('/user/login', methods=["POST"])
@limiter.limit('2500/day;500/hour;30/minute')
def user_login():
    return UserAuthRouteInstance.login(request)

# Token routes #
@app.route('/user/refresh_token', methods=["GET"])
@jwt_required(refresh=True)
def get_token():
    return UserAuthRouteInstance.refresh()

@app.route('/user/send_confirm_email_token', methods=["POST"])
def send_token():
    return UserAuthRouteInstance.send_confirm_mail(request)

@app.route('/user/confirm_email', methods=["POST"])
def confirm_email():
    return UserAuthRouteInstance.confirm_mail(request)

# Not found route #
@app.errorhandler(404)
def not_found():
    return customAbort("Page not found!", 404)

if __name__ == "__main__":
    app.run(debug=True)