import { ErrorCodes } from "../../config";
import { RefreshDataType } from "../../types";
import { DOMAIN } from "../../config";
import { getRefreshToken, handleExpiredSession, setTokens } from "../utils";

export const FetchRefreshToken = async ({
  updateTokens,
  contentType,
  retryFunction,
}: RefreshDataType) => {
  const refreshHeaders = getRefreshToken();

  try {
    const data = await fetch(`http://${DOMAIN}/auth/refresh_token`, {
      method: "GET",
      headers: refreshHeaders,
    });

    if (!data.ok) throw Error("There was a mistake!");

    const json = await data.json();

    setTokens(json);
    updateTokens();

    const accessHeaders = new Headers();

    accessHeaders.append("Authorization", `Bearer ${json.access_token}`);
    if (contentType !== "form")
      accessHeaders.append("Content-Type", "application/json");

    if (data.status === ErrorCodes.OK) retryFunction();
  } catch (err: any) {
    handleExpiredSession();
  }
};
