from config.get_env import get_env

class SupabaseConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(SupabaseConfig, cls).__new__(cls)
        return cls._instance
    
    def init_app(self, app):
        if not get_env["DATABASE_URL"]:
            raise RuntimeError("Database configuration error - DATABASE_URL not found.")
        app.config["SQLALCHEMY_DATABASE_URI"] = get_env["DATABASE_URL"]

SupabaseConfigInstance = SupabaseConfig()