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

@app.route('/user/auth', methods=["POST"])
def user_auth():
    return createReqeust(request, UserAuthRouteInstance)

@app.errorhandler(404)
def not_found():
    return customAbort("Page not found!", 404)

if __name__ == "__main__":
    app.run(debug=True)