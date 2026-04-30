import { ErrorCodes } from "../../config";
import { methodType } from "../../types";
import {
  handleGenericError,
  handleNotAllowedError,
  handleSuccessAlert,
  handleTooManyRequestsError,
} from "../alerts";
import { getAuthToken } from "../utils";
import { FetchRefreshToken } from "./fetchRefreshTokenRequest";

export const issueRequest = async (
  url: string,
  method: methodType,
  body: BodyInit | undefined,
  updateTokens: any,
  presentAlert: any,
) => {
  const accessHeaders = getAuthToken();

  try {
    const data = await fetch(url, {
      method: method,
      headers: accessHeaders,
      body: body,
    });

    if (
      data.status === ErrorCodes.UNAUTHORIZED ||
      data.status === ErrorCodes.UNPROCESSABLE_CONTENT
    ) {
      FetchRefreshToken({
        updateTokens,
        retryFunction: () =>
          issueRequest(url, method, body, updateTokens, presentAlert),
      });
      return;
    }

    if (!data.ok) throw { status: data.status };

    if (presentAlert !== undefined && method === "POST")
      handleSuccessAlert(presentAlert, "Issue report sent successfully!");
    else window.location.reload();
  } catch (err: any) {
    if (err.status === ErrorCodes.TOO_MANY_REQUESTS)
      handleTooManyRequestsError(presentAlert);
    else if (err.status === ErrorCodes.NOT_ALLOWED)
      handleNotAllowedError(presentAlert);
    else handleGenericError(presentAlert);
  }
};
