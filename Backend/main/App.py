# TODO: Add /api/v1 to all frontend requests
from config.config import *
from config.getEnv import getEnv
from routes import register_routes
from config.errorHandler import register_error_handlers

if __name__ == "__main__":
    register_routes(app)
    register_error_handlers(app)
    app.run(debug=True, host=getEnv["HOST"], port=getEnv["PORT"])