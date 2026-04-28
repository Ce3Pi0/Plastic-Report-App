import { RefresherEventDetail } from "@ionic/react";
import {
  IUserChange,
  IUserLogin,
  IUserRegister,
  ILocation,
} from "../interfaces/interfaces";

//constants
// export const DOMAIN: string = 'api.3dfactory.mk';
export const DOMAIN: string = "localhost:5000/api/v1";
export const UNSAFE_PASSWORD: number = 6;
export const MACEDONIA_CENTER = {
  lat: 41.56,
  lng: 21.8,
};
export const DEFAULT_ZOOM = 9.5;

//types
export type methodType = "POST" | "PUT" | "GET" | "DELETE";
type FetchDataType = {
  url: string;
  accessHeaders: Headers;
  method: methodType | undefined;
  AbtCnt: AbortController | undefined;
  body: undefined | BodyInit;
  user: IUserChange | IUserRegister | IUserLogin | undefined;
  setData: any;
  setLoading: any;
  setErr: any;
  setMessage: any;
  setMistake: any;
  presentAlert: any;
};

// Error codes
enum ErrorCodes {
  TOO_MANY_REQUESTS = 429,
}

const tooManyRequestsAlert = {
  subHeader: "Fail",
  message: "To many requests sent... Slow down!",
  buttons: [
    {
      text: "OK",
      role: "confirm",
    },
  ],
};

const reFetch = (fetchType: string, fetchData: FetchDataType) => {
  const fetches: Map<string, () => void> = new Map([
    [
      "data",
      async () => {
        await FetchData(fetchData);
      },
    ],
    [
      "report",
      async () => {
        await FetchReportChange(fetchData);
      },
    ],
    [
      "user",
      async () => {
        await FetchUserChange(fetchData);
      },
    ],
    [
      "issue",
      async () => {
        await FetchIssueChange(fetchData);
      },
    ],
    [
      "update_image",
      async () => {
        await FetchUserImageChange(fetchData);
      },
    ],
  ]);
  fetches.get(fetchType);
};

const successAlert = (message: string) => {
  return {
    subHeader: "Success!",
    message,
    buttons: [
      {
        text: "OK",
        role: "confirm",
      },
    ],
  };
};

const handleTooManyRequestsError = (presentAlert: any) => {
  presentAlert(tooManyRequestsAlert);
  throw Error("Too many requests sent!");
};

export const getAuthToken = (contentType: string | undefined = undefined) => {
  const accessHeaders = new Headers();

  accessHeaders.append(
    "Authorization",
    `Bearer ${window.localStorage.getItem("access_token")}`,
  );
  if (contentType !== "form")
    accessHeaders.append("Content-Type", "application/json");

  return accessHeaders;
};

const getRefreshToken = () => {
  let refreshHeaders = new Headers();

  refreshHeaders.append(
    "Authorization",
    `Bearer ${window.localStorage.getItem("refresh_token")}`,
  );
  refreshHeaders.append("Content-Type", "application/json");

  return refreshHeaders;
};

const setTokens = (json: any) => {
  localStorage.setItem("access_token", json.access_token);
  localStorage.setItem("refresh_token", json.refresh_token);
};

const handleExpiredSession = () => {
  if (window.localStorage.getItem("logged_in") === "true") {
    window.alert("Session expired!");
    window.location.assign("/account/login");
    window.localStorage.clear();
  }
  window.localStorage.setItem("logged_in", "false");
};

//fetches
const FetchData = async ({
  url,
  accessHeaders,
  AbtCnt,
  setData,
  setLoading,
  setErr,
}: FetchDataType) => {
  try {
    const data = await fetch(url, {
      method: "GET",
      headers: accessHeaders,
      body: null,
      signal: AbtCnt?.signal,
    });

    if (!data.ok) {
      throw new Error("Something went wrong!");
    }

    setLoading(false);
    setData(data.json());
    setErr(null);
  } catch (err: any) {
    setLoading(false);
    setErr(err.message);
  }
};

const FetchUserChange = async ({
  url,
  method,
  accessHeaders,
  user,
  setMessage,
  setMistake,
  presentAlert,
}: FetchDataType) => {
  try {
    const data = await fetch(url, {
      method: method,
      headers: accessHeaders,
      body: JSON.stringify(user),
    });

    if (data.status === ErrorCodes.TOO_MANY_REQUESTS)
      handleTooManyRequestsError(presentAlert);

    if (!data.ok) throw new Error("Something went wrong!");

    setMistake(false);
    setMessage("");
  } catch (err: any) {
    setMistake(true);
    setMessage("");
  }
};

const FetchReportChange = async ({
  url,
  method,
  accessHeaders,
  body,
  presentAlert,
  setLoading,
}: FetchDataType) => {
  const data = await fetch(url, {
    method: method,
    headers: accessHeaders,
    body: body,
  });

  if (data.status === ErrorCodes.TOO_MANY_REQUESTS) {
    setLoading(false);
    handleTooManyRequestsError(presentAlert);
  }

  if (!data.ok) {
    setLoading(false);
    throw Error("Something went wrong!");
  }

  setLoading(false);

  presentAlert !== undefined
    ? presentAlert(presentAlert(successAlert("Report sent successfully!")))
    : window.location.reload();
};

const FetchIssueChange = async ({
  url,
  method,
  accessHeaders,
  body,
  presentAlert,
}: FetchDataType) => {
  const data = await fetch(url, {
    method: method,
    headers: accessHeaders,
    body: body,
  });

  if (data.status === ErrorCodes.TOO_MANY_REQUESTS)
    handleTooManyRequestsError(presentAlert);

  if (!data.ok) throw new Error("Something went wrong");

  presentAlert !== undefined
    ? presentAlert(successAlert("Issue report sent successfully!"))
    : window.location.reload();
};

const FetchUserImageChange = async ({
  url,
  method,
  accessHeaders,
  body,
  presentAlert,
}: FetchDataType) => {
  const data = await fetch(url, {
    method: method,
    headers: accessHeaders,
    body: body,
  });

  if (data.status === ErrorCodes.TOO_MANY_REQUESTS) {
    handleTooManyRequestsError(presentAlert);
  }

  if (!data.ok) throw new Error("Something went wrong");

  presentAlert !== undefined
    ? presentAlert(successAlert("User image updated successfully!"))
    : window.location.reload();
};

export const FetchRefreshToken = async (
  url: string,
  method: methodType | undefined,
  AbtCnt: AbortController | undefined,
  body: undefined | BodyInit,
  user: IUserChange | IUserRegister | IUserLogin | undefined,
  setData: any,
  setLoading: any,
  setErr: any,
  setMessage: any,
  setMistake: any,
  fetchType: string,
  updateTokens: any,
  presentAlert: any,
  contentType: string | undefined,
) => {
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

    const accessHeaders = getAuthToken(contentType);
    accessHeaders.append("Authorization", `Bearer ${json.access_token}`);

    reFetch(fetchType, {
      url,
      method,
      accessHeaders,
      AbtCnt,
      body,
      user,
      setData,
      setLoading,
      setErr,
      setMessage,
      setMistake,
      presentAlert,
    });
  } catch (err: any) {
    handleExpiredSession();
  }
};

//functions
export const HandleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
  setTimeout(() => {
    event.detail.complete();
  }, 2000);
  window.location.reload();
};

export const GetLocation = (
  setLocation: React.Dispatch<React.SetStateAction<ILocation>>,
) => {
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude.toFixed(2);
    let long = position.coords.longitude.toFixed(2);
    setLocation({
      lat: lat,
      lng: long,
    });
  });
};

export function InstanceOfUserChange(data: any): data is IUserChange {
  return "new_password" in data;
}

export function InstanceOfUserRegister(data: any): data is IUserRegister {
  return "name" in data;
}

export function ValidateEmail(email: string): boolean {
  const res =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return res.test(String(email).toLowerCase());
}
