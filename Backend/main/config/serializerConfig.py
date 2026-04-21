
from itsdangerous import URLSafeTimedSerializer
from config.getEnv import getEnv

def serializer_config() -> URLSafeTimedSerializer:
    if not getEnv["SECRET_KEY"]:
        raise RuntimeError("Secret key not found")
    
    s = URLSafeTimedSerializer(getEnv["SECRET_KEY"])
    return s