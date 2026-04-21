from flask import request, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from config.config import limiter
from utils.utils import createRequest
from controllers.report_controller import ReportController

report_bp = Blueprint('report', __name__)

@report_bp.route("/report", methods=["POST"])
@jwt_required()
@limiter.limit('1000/day;100/hour;10/minute', key_func=get_jwt_identity)
def issue_create():
    return createRequest(request, ReportController)

@report_bp.route('/report', methods=["GET", "PUT", "DELETE"])
@jwt_required()
def issue():
    return createRequest(request, ReportController)