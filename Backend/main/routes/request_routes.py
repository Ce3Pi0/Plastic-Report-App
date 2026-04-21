from flask import request, Blueprint
from flask_jwt_extended import jwt_required
from utils.utils import createRequest
from controllers.request_controller import RequestController

request_bp = Blueprint('request', __name__)

@request_bp.route('/request', methods=["POST", "GET", "PUT", "DELETE"])
@jwt_required()
def user_request():
    return createRequest(request, RequestController)