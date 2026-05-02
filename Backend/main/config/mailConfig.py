import threading
from flask import Flask, current_app
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
            MAIL_DEBUG= True # Testing Only
        ))
        self.__mail = Mail(app)
    
    def send_async_email(self, app: Flask, msg):
        with app.app_context():
            print(f"DEBUG: Attempting to send email to {msg.recipients}...")
            try:
                if self.__mail is None:
                    raise RuntimeError("MailHandler not initialized. Call MailHandler.init_app(app) before using this method.")
                self.__mail.send(msg)
            except Exception as e:
                print(f"Async email error: {e}")

    def send_link(self, message: str, recipient: str, link) -> None:
        if self.__mail is None:
            raise RuntimeError("MailHandler not initialized. Call MailHandler.init_app(app) before using this method.")
        
        msg = Message(message, sender=get_env.get("MAIL_USERNAME"), recipients=[recipient])
        msg.body = f"Your link is {link}"

        app = current_app._get_current_object() #type: ignore
        thread = threading.Thread(target=self.send_async_email, args=(app, msg))
        thread.start()

    def __validate_mail_config(self) -> None:
        if not get_env.get("MAIL_SERVER") or not get_env.get("MAIL_USERNAME") or not get_env.get("MAIL_PASSWORD") or not get_env.get("MY_MAIL"):
            raise RuntimeError("Mail Server environment variables not found.")

MailHandlerInstance = MailHandler()