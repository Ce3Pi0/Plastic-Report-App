from config.getEnv import getEnv

class SupabaseConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(SupabaseConfig, cls).__new__(cls)
        return cls._instance
    
    def init_app(self, app):
        if not getEnv["DATABASE_URL"]:
            raise RuntimeError("Database configuration error - DATABASE_URL not found.")
        app.config["SQLALCHEMY_DATABASE_URI"] = getEnv["DATABASE_URL"]

SupabaseConfigInstance = SupabaseConfig()