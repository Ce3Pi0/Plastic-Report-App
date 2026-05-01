import os
from flask import jsonify, send_from_directory
from pathlib import Path
from config.httpException import HttpException

current_file = Path(__file__).resolve()
dist_path = current_file.parents[3] / "Frontend" / "dist"
folder = str(dist_path)

def register_error_handlers(app):
    
    @app.errorhandler(HttpException)
    def handle_http_exception(err):
        return jsonify({
            "message": err.message,
            "code": err.code
        }), err.code

    @app.errorhandler(404)
    def handle_404(err):
        print(folder)
        return send_from_directory(folder, 'index.html')
    
    import os