import { ErrorCodes } from "../../config";
import {
  handleExpiredTokenError,
  handleGenericError,
  handleNotFoundAlert,
  handleTokenExpiredError,
  handleTooManyRequestsError,
} from "../alerts";
import { DOMAIN } from "../../config";
import { validateEmail } from "../utils";
import { UseIonRouterResult } from "@ionic/react";

export const sendConfirmEmail = async (
  url: string,
  presentAlert: any,
  router: UseIonRouterResult,
) => {
  try {
    const data = await fetch(url, {
      method: "POST",
    });

    if (!data.ok) throw { status: data.status };

    router.push("/account/login", "back");
  } catch (err: any) {
    switch (err.status) {
      case ErrorCodes.NOT_FOUND:
        handleNotFoundAlert(presentAlert, "User not found");
        break;
      case ErrorCodes.NOT_ALLOWED:
        handleTokenExpiredError(
          presentAlert,
          "Token had expired",
          "Error",
          async (e?: string) => {
            const email = e !== undefined ? e[0] : "";

            if (!validateEmail(email)) {
              return;
            }
            const data = await fetch(
              `{DOMAIN}/auth/send_confirm_email_token?email=${email}`,
              {
                method: "GET",
              },
            );

            if (!data.ok) throw Error("Something went wrong!");
          },
        );
        break;
      case ErrorCodes.NOT_ACCEPTABLE:
        handleExpiredTokenError(presentAlert, "Token not valid");
        break;
      case ErrorCodes.TOO_MANY_REQUESTS:
        handleTooManyRequestsError(presentAlert);
        break;
      default:
        handleGenericError(presentAlert);
        break;
    }
  }
};
