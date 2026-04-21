from flask import Request

class AuthController:
    @staticmethod
    def register(request: Request):
        return {}

    @staticmethod
    def login(request: Request):
        return {}

    @staticmethod
    def refresh(request: Request):
        return {}

    @staticmethod
    def send_confirm_email(request: Request):
        return {}

    @staticmethod
    def confirm_email(request: Request):
        return {}

    @staticmethod
    def get_reset_token(request: Request):
        return {}

    @staticmethod
    def verify_reset_token(request: Request):
        return {}