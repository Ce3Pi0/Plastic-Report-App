# TODO: Add /api/v1 to all frontend requests
from config.config import *
from config.get_env import get_env
from routes import register_routes
from config.errorHandler import register_error_handlers

if __name__ == "__main__":
    register_routes(app)
    register_error_handlers(app)
    app.run(debug=True, host=get_env["HOST"], port=get_env["PORT"])