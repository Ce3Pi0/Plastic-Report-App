import { ErrorCodes } from "../../config";
import {
  handleGenericError,
  handleNotFoundAlert,
  handleSuccessAlert,
  handleTooManyRequestsError,
} from "../alerts";
import { getAuthToken } from "../utils";

export const changePasswordRequest = async (
  url: string,
  setMessage: any,
  presentAlert: any,
) => {
  const accessHeaders = getAuthToken();

  try {
    const data = await fetch(url, {
      method: "GET",
      headers: accessHeaders,
    });

    if (!data.ok) {
      throw { status: data.status };
    }

    setMessage("");
    handleSuccessAlert(
      presentAlert,
      "Password reset link sent",
      "Reset link sent",
    );
  } catch (err: any) {
    if (err.status === ErrorCodes.NOT_FOUND)
      handleNotFoundAlert(presentAlert, "User not found");
    else if (err.status === ErrorCodes.TOO_MANY_REQUESTS)
      handleTooManyRequestsError(presentAlert);
    else handleGenericError(presentAlert);
    setMessage(err.message);
  }
};
