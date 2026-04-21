from flask import request, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from config.config import limiter
from utils.utils import createRequest
from controllers.issue_controller import IssueController

issue_bp = Blueprint('issue', __name__)

@issue_bp.route("/issue", methods=["POST"])
@jwt_required()
@limiter.limit('1000/day;100/hour;10/minute', key_func=get_jwt_identity)
def issue_create():
    return createRequest(request, IssueController)

@issue_bp.route('/issue', methods=["GET", "PUT", "DELETE"])
@jwt_required()
def issue():
    return createRequest(request, IssueController)