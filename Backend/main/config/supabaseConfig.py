from config.get_env import get_env

class SupabaseConfig:
    @staticmethod
    def init_app(app):
        if not get_env.get("DATABASE_URL"):
            raise RuntimeError("Database configuration error - DATABASE_URL not found.")
        app.config["SQLALCHEMY_DATABASE_URI"] = get_env.get("DATABASE_URL")
