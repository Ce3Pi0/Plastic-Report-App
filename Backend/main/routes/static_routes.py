import os
from config.get_env import get_env
from flask import Blueprint, send_from_directory

build_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), str(get_env.get("FRONTEND_DIST"))))

static_bp = Blueprint('static', __name__, static_folder=build_dir)

@static_bp.route('/', defaults={'path': ''})
@static_bp.route('/<path:path>')
def serve_frontend(path: str):
    folder = static_bp.static_folder
    
    if not folder:
        return "Static folder not found", 500

    full_path = os.path.join(folder, path)
    
    if path != "" and os.path.exists(full_path):
        return send_from_directory(folder, path)
    
    return send_from_directory(folder, 'index.html')