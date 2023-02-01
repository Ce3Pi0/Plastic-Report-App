import { useState, useEffect } from "react";

import { IFetch } from "../../interfaces/interfaces";


const useAddressFetch = (url: string): IFetch => {
    const [data, setData] = useState<JSON | null>(null);
    const [err, setErr] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const AbtCnt = new AbortController();

        fetch(url, {
            method: "GET",
            signal: AbtCnt.signal
        })
            .then(data => {
                setLoading(false);
                if (!data.ok) {
                    throw Error("Something went wrong!")
                }
                return data.json()
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

    return { data, err, loading };
}

export default useAddressFetch;