import { UseIonRouterResult } from "@ionic/react";
import { ErrorCodes } from "../../config";
import { methodType } from "../../types";
import {
  handleGenericError,
  handleSuccessAlert,
  handleTooManyRequestsError,
} from "../alerts";
import { getAuthToken } from "../utils";
import { FetchRefreshToken } from "./fetchRefreshTokenRequest";

export const userImageRequest = async (
  url: string,
  method: methodType,
  body: BodyInit | undefined,
  updateTokens: any,
  presentAlert: any,
  setLoading: any,
  contentType: string | undefined,
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
          userImageRequest(
            url,
            method,
            body,
            updateTokens,
            presentAlert,
            setLoading,
            contentType,
            router,
            false,
          ),
        router,
      });
      return;
    }
    if (!data.ok) throw { status: data.status };

    handleSuccessAlert(
      presentAlert,
      "User image updated successfully!",
      "Success!",
      () => {
        window.location.reload();
      },
    );
  } catch (err: any) {
    if (err.status === ErrorCodes.TOO_MANY_REQUESTS) {
      handleTooManyRequestsError(presentAlert);
    } else handleGenericError(presentAlert);
  } finally {
    setLoading(false);
  }
};
