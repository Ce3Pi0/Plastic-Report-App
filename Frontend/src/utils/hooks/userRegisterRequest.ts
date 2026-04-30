import { ErrorCodes } from "../../config";
import { IUserRegister } from "../../interfaces/interfaces";
import { methodType } from "../../types";
import { handleGenericError, handleSuccessAlert } from "../alerts";

import { DOMAIN } from "../../config";
import { getAuthToken } from "../utils";

export const userRegisterRequest = async (
  url: string,
  method: methodType,
  user: IUserRegister,
  setMessage: any,
  setUserExists: any,
  presentAlert: any,
  setLoading: any,
) => {
  const accessHeaders = getAuthToken();
  setLoading(true);
  try {
    const data = await fetch(url, {
      method: method,
      headers: accessHeaders,
      body: JSON.stringify(user),
    });

    if (!data.ok) throw { status: data.status };

    sendConfirmEmailRequest(user.email, presentAlert);

    setMessage("");
    setUserExists(false);
  } catch (err: any) {
    switch (err.status) {
      case ErrorCodes.TOO_MANY_REQUESTS:
        setMessage("Too many requests... Slow down!");
        break;
      case ErrorCodes.CONFLICT:
        setUserExists(true);
        break;
      default:
        setMessage("Something went wrong!");
        break;
    }
  } finally {
    setLoading(false);
  }
};

const sendConfirmEmailRequest = async (email: string, presentAlert: any) => {
  const data = await fetch(
    `http://${DOMAIN}/auth/send_confirm_email_token?email=${email}`,
    {
      method: "GET",
    },
  );

  if (!data.ok) handleGenericError(presentAlert);

  handleSuccessAlert(
    presentAlert,
    "Open your email to confirm your account!",
    "Message",
  );
};
