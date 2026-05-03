import threading
from brevo import Brevo
from brevo.transactional_emails import SendTransacEmailRequestSender, SendTransacEmailRequestToItem
from config.get_env import get_env

class MailHandler:
    _instance = None
    _client: Brevo | None = None
    _sender_email: str | None = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(MailHandler, cls).__new__(cls)
        return cls._instance

    def init_app(self):
        self._client = Brevo(api_key=get_env.get("BREVO_API_KEY") or "")
        self._sender_email = get_env.get("MY_MAIL")

    def _check_init(self):
        if self._client is None:
            raise RuntimeError("MailHandler not initialized - client is None.")
        if self._sender_email is None:
            raise RuntimeError("MailHandler not initialized - sender_email is None.")
    def _execute_sdk_send(self, subject, recipient, body, link):
        self._check_init()

        try:
            if self._client is not None: 
                self._client.transactional_emails.send_transac_email(
                    subject=subject,
                    html_content=f"<html><body><p>{body}</p><a href='{link}'>Click here</a></body></html>",
                    sender=SendTransacEmailRequestSender(
                        email=self._sender_email,
                        name="Hristijan"
                    ),
                    to=[SendTransacEmailRequestToItem(email=recipient)]
                )
                print(f"SDK: Email sent successfully to {recipient}")
        except Exception as e:
            print(f"SDK Error: {e}")

    def send_link(self, subject: str, body: str, recipient: str, link: str) -> None:
        thread = threading.Thread(
            target=self._execute_sdk_send, 
            args=(subject, recipient, body, link)
        )
        thread.start()

MailHandlerInstance = MailHandler()