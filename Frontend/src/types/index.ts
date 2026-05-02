import { UseIonRouterResult } from "@ionic/react";

//types
export type methodType = "POST" | "PUT" | "GET" | "DELETE";

export type gendersType = "male" | "female" | "other";

export type RefreshDataType = {
  updateTokens?: any;
  contentType?: string | undefined;
  retryFunction: () => void | Promise<void>;
  router: UseIonRouterResult;
};

export type DirectionType = "left" | "down";
