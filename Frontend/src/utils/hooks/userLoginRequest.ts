import { ErrorCodes } from "../../config";
import { IUserLogin, IUser } from "../../interfaces/interfaces";
import { methodType } from "../../types";
import {
  handleGenericError,
  handleNotAcceptableError,
  handleTooManyRequestsError,
} from "../alerts";
import { DOMAIN } from "../../config";
import { getAuthToken, getUser, setUserData, validateEmail } from "../utils";

export const userLoginRequest = async (
  url: string,
  method: methodType,
  user: IUserLogin,
  setMessage: any,
  setMistake: any,
  setLoggedIn: any,
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

    const json = await data.json();

    setUserData(json);

    const current_user: IUser = getUser(json);
    window.location.assign("/home");

    setLoggedIn(true, current_user);
    setMistake(false);
    setMessage("");
  } catch (err: any) {
    switch (err.status) {
      case ErrorCodes.NOT_FOUND:
        setMessage("User not found!");
        setMistake(false);
        break;
      case ErrorCodes.TOO_MANY_REQUESTS:
        handleTooManyRequestsError(presentAlert, () =>
          window.location.assign("/account/login"),
        );
        break;
      case ErrorCodes.PRECONDITION_FAILED:
        handleNotAcceptableError(
          presentAlert,
          "User email not confirmed",
          "Error",
          async (e?: string) => {
            const email = e !== undefined ? e[0] : "";

            if (!validateEmail(email)) {
              return;
            }
            const data = await fetch(
              `http://${DOMAIN}/auth/send_confirm_email_token?email=${email}`,
              {
                method: "GET",
              },
            );

            if (data.status === ErrorCodes.TOO_MANY_REQUESTS)
              setMessage("To many requests!");

            if (!data.ok) setMessage("Something went wrong!");
          },
        );
        setMessage("Email not confirmed!");
        setMistake(false);
        break;
      case ErrorCodes.UNAUTHORIZED:
        setMessage("");
        setMistake(true);
        break;
      default:
        handleGenericError(presentAlert);
        break;
    }
  } finally {
    setLoading(false);
  }
};
