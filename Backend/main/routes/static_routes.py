import os
from flask import Blueprint, send_from_directory
from pathlib import Path

current_file = Path(__file__).resolve()
dist_path = current_file.parents[3] / "Frontend" / "dist"

static_bp = Blueprint('static', __name__)


@static_bp.route('/', defaults={'path': ''})
@static_bp.route('/<path:path>')
def serve_frontend(path):
    folder = os.path.abspath(str(dist_path))
    
    full_path = os.path.normpath(os.path.join(folder, path))

    if path != "" and os.path.exists(full_path):
        return send_from_directory(folder, path)
    
    return send_from_directory(folder, 'index.html')