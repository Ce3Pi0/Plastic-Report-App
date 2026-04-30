from config.config import app
from config.get_env import get_env
from routes import register_routes
from config.errorHandler import register_error_handlers

register_routes(app)
register_error_handlers(app)

if __name__ == "__main__":
    app.run(debug=True, host=get_env.get("HOST"), port=get_env["PORT"])