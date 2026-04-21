# TODO: Change user to auth

from flask import request, Blueprint
from flask_jwt_extended import jwt_required
from config.config import limiter
from controllers.auth_controller import AuthController

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/user/register', methods=["POST"])
@limiter.limit('1000/day;100/hour;10/minute')
def user_register():
    return AuthController.register(request)

@auth_bp.route('/user/login', methods=["POST"])
@limiter.limit('2500/day;500/hour;30/minute')
def user_login():
    return AuthController.login(request)

@auth_bp.route('/user/refresh_token', methods=["GET"])
@jwt_required(refresh=True)
def get_token():
    return AuthController.refresh(request)

@auth_bp.route('/user/send_confirm_email_token', methods=["GET"])
def send_token():
    return AuthController.refresh(request)

@auth_bp.route('/user/confirm_email', methods=["POST"])
def confirm_email():
    return AuthController.confirm_email(request)

@auth_bp.route('/user/forgot_password_token', methods=["GET"])
def send_reset_token():
    return AuthController.get_reset_token(request)

@auth_bp.route('/user/forgot_password', methods=["POST"])
def confirm_reset_token():
    return AuthController.verify_reset_token(request)