import { UseIonRouterResult } from "@ionic/react";
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

export const reportRequest = async (
  url: string,
  method: methodType,
  body: BodyInit | undefined,
  updateTokens: any,
  presentAlert: any,
  contentType: string | undefined,
  setLoading: any,
  router: UseIonRouterResult,
  refreshing: boolean = true,
) => {
  const accessHeaders = getAuthToken(contentType);
  setLoading(true);

  try {
    const data = await fetch(url, {
      method: method,
      headers: accessHeaders,
      body: body,
    });

    if (
      (data.status === ErrorCodes.UNAUTHORIZED ||
        data.status === ErrorCodes.UNPROCESSABLE_CONTENT) &&
      refreshing
    ) {
      FetchRefreshToken({
        updateTokens,
        contentType,
        retryFunction: () =>
          reportRequest(
            url,
            method,
            body,
            updateTokens,
            presentAlert,
            contentType,
            setLoading,
            router,
            false,
          ),
        router,
      });
      return;
    }

    if (!data.ok) throw { status: data.status };

    if (presentAlert !== undefined)
      handleSuccessAlert(presentAlert, "Report updated successfully!");
    else window.location.reload();
  } catch (err: any) {
    if (err.status === ErrorCodes.TOO_MANY_REQUESTS)
      handleTooManyRequestsError(presentAlert);
    else if (err.status === ErrorCodes.NOT_ALLOWED)
      handleNotAllowedError(presentAlert);
    else handleGenericError(presentAlert);
  } finally {
    setLoading(false);
  }
};
