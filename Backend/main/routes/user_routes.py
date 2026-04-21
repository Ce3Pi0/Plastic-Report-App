from flask import request, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils.utils import createRequest
from controllers.user_controller import UserController
from config.config import limiter

user_bp = Blueprint('user', __name__)

@user_bp.route('/user', methods=["POST", "PUT"])
@jwt_required()
@limiter.limit('1000/day;100/hour;10/minute', key_func=get_jwt_identity)
def user_create():
    return createRequest(request, UserController)

@user_bp.route('/user', methods=["GET", "DELETE"])
@jwt_required()
def user():
    return createRequest(request, UserController)