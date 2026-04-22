from config.httpException import HttpException
from flask import jsonify

def register_error_handlers(app):
    @app.errorhandler(HttpException)
    def handle_http_exception(err):
        return jsonify({
            "message": err.message,
            "code": err.code
        }), err.code