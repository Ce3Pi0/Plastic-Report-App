import { RefresherEventDetail } from "@ionic/react";
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

export const handleExpiredSession = () => {
  if (window.localStorage.getItem("logged_in") === "true") {
    window.alert("Session expired!");
    window.location.assign("/account/login");
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

export function instanceOfUserChange(data: any): data is IUserChange {
  return "new_password" in data;
}

export function instanceOfUserRegister(data: any): data is IUserRegister {
  return "name" in data;
}

export function validateEmail(email: string): boolean {
  const res =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return res.test(String(email).toLowerCase());
}

export const setUserData = (json: any) => {
  window.localStorage.setItem("id", json.id);
  window.localStorage.setItem("username", json.username);
  window.localStorage.setItem("gender", json.gender);
  window.localStorage.setItem("type", json.type);
  window.localStorage.setItem("access_token", json.access_token);
  window.localStorage.setItem("refresh_token", json.refresh_token);
  window.localStorage.setItem("logged_in", "true");
  window.localStorage.setItem("url", json.img_url);
};

export const getUser = (json: any): IUser => {
  return {
    id: json.id,
    username: json.username,
    gender: json.gender,
    type: json.type,
    access_token: json.access_token,
    refresh_token: json.refresh_token,
    url: json.img_url,
  };
};
