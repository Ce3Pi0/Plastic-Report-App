
from itsdangerous import URLSafeTimedSerializer
from config.get_env import get_env

def serializer_config() -> URLSafeTimedSerializer:
    if not get_env["SECRET_KEY"]:
        raise RuntimeError("Secret key not found")
    
    s = URLSafeTimedSerializer(get_env["SECRET_KEY"])
    return s