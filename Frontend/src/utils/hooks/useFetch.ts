import { useState, useEffect, Dispatch, SetStateAction } from "react";

import { IFetch } from "../../interfaces/interfaces";

import { getAuthToken } from "../utils";
import { ErrorCodes } from "../../config";
import { FetchRefreshToken } from "./fetchRefreshTokenRequest";
import { UseIonRouterResult } from "@ionic/react";

const useFetch = (
  url: string,
  updateTokens: any,
  router: UseIonRouterResult,
): IFetch => {
  const [data, setData] = useState<JSON | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const AbtCnt = new AbortController();

    fetchData(url, AbtCnt, setData, setErr, setLoading, updateTokens, router);

    return () => AbtCnt.abort();
  }, []);

  return { data, err, loading };
};

const fetchData = async (
  url: string,
  AbtCnt: AbortController,
  setData: Dispatch<SetStateAction<JSON | null>>,
  setErr: Dispatch<SetStateAction<string | null>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  updateTokens: any,
  router: UseIonRouterResult,
  refreshing: boolean = true,
) => {
  const accessHeaders = getAuthToken();

  try {
    const data = await fetch(url, {
      method: "GET",
      headers: accessHeaders,
      signal: AbtCnt.signal,
    });

    if (
      (data.status === ErrorCodes.UNAUTHORIZED ||
        data.status === ErrorCodes.UNPROCESSABLE_CONTENT) &&
      refreshing
    ) {
      FetchRefreshToken({
        updateTokens,
        retryFunction: () =>
          fetchData(
            url,
            AbtCnt,
            setData,
            setErr,
            setLoading,
            updateTokens,
            router,
            false,
          ),
        router,
      });
      return;
    }
    if (!data.ok) throw new Error("Something went wrong!");

    const json = await data.json();

    setData(json);

    setLoading(false);
    setErr(null);
  } catch (err: any) {
    setErr(err.message);
    setLoading(false);
  }
};

export default useFetch;
