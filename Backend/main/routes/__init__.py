from routes.user_routes import user_bp
from routes.report_routes import report_bp
from routes.issue_routes import issue_bp
from routes.request_routes import request_bp
from routes.auth_routes import auth_bp

def register_routes(app):
    app.register_blueprint(user_bp, url_prefix="/api/v1")
    app.register_blueprint(report_bp, url_prefix="/api/v1")
    app.register_blueprint(issue_bp, url_prefix="/api/v1")
    app.register_blueprint(request_bp, url_prefix="/api/v1")
    app.register_blueprint(auth_bp, url_prefix="/api/v1")