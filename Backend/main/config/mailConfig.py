from flask import Flask
from flask_mail import Mail, Message
from config.get_env import get_env

class MailHandler:
    _instance = None
    __mail: Mail | None = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(MailHandler, cls).__new__(cls)
        return cls._instance
    def init_app(self, app: Flask):
        self.__validate_mail_config()
        app.config.update(dict(
            MAIL_SERVER = get_env.get("MAIL_SERVER"),
            MAIL_PORT = get_env.get("MAIL_PORT"),
            MAIL_USE_TLS = True,
            MAIL_USE_SSL = False,
            MAIL_USERNAME = get_env.get("MAIL_USERNAME"),
            MAIL_PASSWORD = get_env.get("MAIL_PASSWORD"),
        ))
        self.__mail = Mail(app)
    
    def send_link(self, message: str, recipient: str, link) -> None:
        if self.__mail is None:
            raise RuntimeError("MailHandler not initialized. Call MailHandler.init_app(app) before using this method.")
        
        msg = Message(message, sender=get_env.get("MAIL_USERNAME"), recipients=[recipient])
        msg.body = f"Your link is {link}"

        self.__mail.send(msg)

    def __validate_mail_config(self) -> None:
        if not get_env.get("MAIL_SERVER") or not get_env.get("MAIL_USERNAME") or not get_env.get("MAIL_PASSWORD") or not get_env.get("MY_MAIL"):
            raise RuntimeError("Mail Server environment variables not found.")

MailHandlerInstance = MailHandler()