from flask_jwt_extended import get_jwt_identity, create_access_token, create_refresh_token
import datetime 

class BaseRoute:
    __instance = None

    def __new__(cls):
        if cls.__instance is None:
            cls.__instance = super().__new__(cls)
        return cls.__instance

    def __init__(self) -> None:
        self.create_req = None
        self.read_req = None
        self.update_req = None
        self.delete_req = None
        self.login_req = None
        self.register_req = None

    def create(self, request):
        pass

    def read(self, request):
        pass

    def update(self, request):
        pass

    def delete(self, request):
        pass

    def register(self, request):
        pass

    def login(self, request):
        pass

    def refresh(self):
        current_user = get_jwt_identity()
        new_token = create_access_token(identity = current_user, fresh = True, expires_delta = datetime.timedelta(days=7))
        refresh_token = create_refresh_token(current_user, expires_delta = datetime.timedelta(days=30))

        return {'access_token': new_token, 'refresh_token': refresh_token}