import { UseIonRouterResult } from "@ionic/react";
import { ErrorCodes } from "../../config";
import {
  IUserLogin,
  IUserChange,
  IUserRegister,
} from "../../interfaces/interfaces";
import { methodType } from "../../types";
import { handleGenericError, handleTooManyRequestsError } from "../alerts";

import { getAuthToken } from "../utils";
import { FetchRefreshToken } from "./fetchRefreshTokenRequest";

export const userChangeRequest = async (
  url: string,
  method: methodType,
  user: IUserChange | IUserLogin | IUserRegister,
  setMessage: any,
  setMistake: any,
  updateTokens: any,
  presentAlert: any,
  setLoading: any,
  router: UseIonRouterResult,
  refreshing: boolean = true,
) => {
  const accessHeaders = getAuthToken();
  setLoading(true);
  try {
    const data = await fetch(url, {
      method: method,
      headers: accessHeaders,
      body: JSON.stringify(user),
    });

    if (
      (data.status === ErrorCodes.UNAUTHORIZED ||
        data.status === ErrorCodes.UNPROCESSABLE_CONTENT) &&
      refreshing
    ) {
      await FetchRefreshToken({
        updateTokens,
        retryFunction: () =>
          userChangeRequest(
            url,
            method,
            user,
            setMessage,
            setMistake,
            updateTokens,
            presentAlert,
            setLoading,
            router,
            false,
          ),
        router,
      });
      return;
    }

    if (!data.ok) throw { status: data.status };

    setMistake(false);
    setMessage("");

    router.push("/", "root");
  } catch (err: any) {
    switch (err.status) {
      case ErrorCodes.NOT_FOUND:
        setMessage("User not found!");
        setMistake(false);
        break;
      case ErrorCodes.TOO_MANY_REQUESTS:
        handleTooManyRequestsError(presentAlert, () =>
          router.push("/account/login", "back"),
        );
        break;
      case ErrorCodes.UNAUTHORIZED:
        handleGenericError(presentAlert, "Wrong password");
        setMessage("");
        setMistake(true);
        break;
      case ErrorCodes.PRECONDITION_FAILED:
        handleGenericError(
          presentAlert,
          "New password cannot be the same as the old one",
        );
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
