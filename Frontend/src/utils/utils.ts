import { RefresherEventDetail, UseIonRouterResult } from "@ionic/react";
import {
  IUserChange,
  IUserRegister,
  ILocation,
  IUser,
} from "../interfaces/interfaces";

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

export const getRefreshToken = () => {
  let refreshHeaders = new Headers();

  refreshHeaders.append(
    "Authorization",
    `Bearer ${window.localStorage.getItem("refresh_token")}`,
  );
  refreshHeaders.append("Content-Type", "application/json");

  return refreshHeaders;
};

export const setTokens = (json: any) => {
  localStorage.setItem("access_token", json.access_token);
  localStorage.setItem("refresh_token", json.refresh_token);
};

export const handleExpiredSession = (router: UseIonRouterResult) => {
  if (window.localStorage.getItem("logged_in") === "true") {
    window.alert("Session expired!");
    router.push("/account/login", "back");
    window.localStorage.clear();
  }
  window.localStorage.setItem("logged_in", "false");
};

export const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
  setTimeout(() => {
    event.detail.complete();
  }, 2000);
  window.location.reload();
};

export const getLocation = (
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

export const instanceOfUserChange = (data: any): data is IUserChange => {
  return "new_password" in data;
};

export const instanceOfUserRegister = (data: any): data is IUserRegister => {
  return "name" in data;
};

export const validateEmail = (email: string): boolean => {
  const res =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return res.test(String(email).toLowerCase());
};

export const setUserData = (user: IUser) => {
  window.localStorage.setItem("id", user.id.toString());
  window.localStorage.setItem("username", user.username);
  window.localStorage.setItem("gender", user.gender);
  window.localStorage.setItem("type", user.type);
  window.localStorage.setItem("view", user.type);
  window.localStorage.setItem("access_token", user.access_token);
  window.localStorage.setItem("refresh_token", user.refresh_token);
  window.localStorage.setItem("logged_in", "true");
  window.localStorage.setItem("url", user.url?.toString() || "");
};

export const getUser = (json: any): IUser => {
  return {
    id: json.id,
    username: json.username,
    gender: json.gender,
    type: json.type,
    view: json.type,
    access_token: json.access_token,
    refresh_token: json.refresh_token,
    url: json.img_url,
  };
};

export const checkStatus = (status: string): string => {
  if (status === "completed") return "success";
  else if (status === "pending") return "warning";
  return "danger";
};

export const hideTooltip = (hidden: boolean, setHidden: any) => {
  if (hidden)
    document.getElementById("first_tooltip_text")!.style.visibility = "hidden";
  else
    document.getElementById("first_tooltip_text")!.style.visibility = "visible";
  setHidden(!hidden);
};
