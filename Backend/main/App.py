from flask import request
from flask_jwt_extended import jwt_required

from config.config import *
from utils.utils import createReqeust, customAbort
from routes.baseRoute import BaseRoute
from routes.userRoute import UserRouteInstance 
from routes.userAuthRoute import UserAuthRouteInstance

test = BaseRoute()

@app.route('/user', methods=["POST", "GET", "PUT", "DELETE"])
@jwt_required()
def user():
    return createReqeust(request, UserRouteInstance)

@app.route('/user/register', methods=["POST"])
def user_register():
    return UserAuthRouteInstance.register(request)

@app.route('/user/login', methods=["POST"])
def user_login():
    return UserAuthRouteInstance.login(request)

@app.route('/user/refresh_token', methods=["GET"])
@jwt_required(refresh=True)
def get_token():
    return UserAuthRouteInstance.refresh()

@app.errorhandler(404)
def not_found():
    return customAbort("Page not found!", 404)

if __name__ == "__main__":
    app.run(debug=True)