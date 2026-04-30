//types
export type methodType = "POST" | "PUT" | "GET" | "DELETE";

export type RefreshDataType = {
  updateTokens?: any;
  contentType?: string | undefined;
  retryFunction: () => void | Promise<void>;
};
