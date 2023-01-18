import { useState, useEffect } from "react";

import { FetchReturn } from "../../interfaces/interfaces";

import { FetchRefreshToken } from '../utils';


const useFetch = (url: string, updateTokens: any): FetchReturn => {
    const [data, setData] = useState<JSON|null>(null);
    const [err, setErr] = useState<string|null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const AbtCnt = new AbortController();

        let myHeaders = new Headers();
        
        myHeaders.append("Authorization", `Bearer ${window.localStorage.getItem("access_token")}`);
        myHeaders.append("Content-Type", "application/json");

        fetch(url, {
            method: "GET",
            headers: myHeaders,
            body: null,
            signal: AbtCnt.signal
        })
            .then(data => {
                if (data.status === 422 || data.status === 401){
                    let refreshHeaders = new Headers();
                    
                    refreshHeaders.append("Authorization", `Bearer ${window.localStorage.getItem("refresh_token")}`);
                    refreshHeaders.append("Content-Type", "application/json");
                                    
                    FetchRefreshToken(url, undefined, AbtCnt, undefined, undefined, setData, setLoading, setErr, undefined, undefined, "data", updateTokens, undefined, undefined);
                }
                else{
                    setLoading(false);
                    if (!data.ok){
                        throw Error("Something went wrong!")
                    }
                    return data.json()
                }
            })
            .then(json => {
                setLoading(false);
                setData(json);
                setErr(null);
            })
            .catch(err => {
                setLoading(false);
                setErr(err.message);
            })

        return () => AbtCnt.abort();
    }, []);

    return {data, err, loading};
}

export default useFetch;