import { UseIonRouterResult } from "@ionic/react";
import { ErrorCodes } from "../../config";
import {
  handleConflictError,
  handleExpiredTokenError,
  handleGenericError,
  handleNotFoundAlert,
  handleTooManyRequestsError,
} from "../alerts";

export const sendConfirmPasswordReset = async (
  url: string,
  presentAlert: any,
  router: UseIonRouterResult,
) => {
  try {
    const data = await fetch(url, {
      method: "POST",
    });

    if (!data.ok) throw { status: data.status };

    router.push("/account", "back");
  } catch (err: any) {
    switch (err.status) {
      case ErrorCodes.NOT_FOUND:
        handleNotFoundAlert(presentAlert, "User not found");
        break;
      case ErrorCodes.NOT_ALLOWED:
        handleExpiredTokenError(presentAlert);
        break;
      case ErrorCodes.NOT_ACCEPTABLE:
        handleExpiredTokenError(presentAlert, "Token not valid");
        break;
      case ErrorCodes.CONFLICT:
        handleConflictError(
          presentAlert,
          "Password cannot be the same as the old one",
        );
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
