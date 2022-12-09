import { useState, useEffect } from "react";
import { fetchReturn } from "../interfaces/interfaces";
import { domain } from './utils';

const useFetch = (url: string): fetchReturn => {
    const [data, setData] = useState<JSON|null>(null);
    const [err, setErr] = useState<string|null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const AbtCnt = new AbortController();

        let myHeaders = new Headers();
        
        myHeaders.append("Authorization", `Bearer ${window.localStorage.getItem("session_id")}`);
        myHeaders.append("Content-Type", "application/json");

        fetch(url, {
            method: "GET",
            headers: myHeaders,
            body: null,
            signal: AbtCnt.signal
        })
            .then(data => {
                if (data.status === 401)
                    window.location.reload();

                if (data.status === 422 || data.status === 401){
                
                    let refreshHeaders = new Headers();
                    
                    refreshHeaders.append("Authorization", `Bearer ${window.localStorage.getItem("refresh_token")}`);
                    refreshHeaders.append("Content-Type", "application/json");
                                    
                    fetch(`http://${domain}/users/refresh_token`, {
                        method:"GET",
                        headers: refreshHeaders
                    })
                    .then(data => {
                        if (!data.ok)
                            throw Error("There was a mistake!")
                        return data.json();
                    })
                    .then(json => {
                        localStorage.setItem("session_id", json.access_token);
                        localStorage.setItem("refresh_token", json.refresh_token);

                        let myHeaders = new Headers();
                        myHeaders.append("Authorization", `Bearer ${json.access_token}`);
                        myHeaders.append("Content-Type", "application/json");

                        fetch(url, {
                            method: "GET",
                            headers: myHeaders,
                            body: null,
                            signal: AbtCnt.signal
                        })
                        .then(data => {
                            if(setLoading !== undefined)
                                setLoading(false);
                            if (!data.ok){
                                throw Error("Something went wrong!")
                            }
                            return data.json()
                        })
                        .then(json => {
                            if (setLoading !== undefined && setData !== undefined && setErr !== undefined) {
                                setLoading(false);
                                setData(JSON.parse(JSON.stringify(data)));
                                setErr(null);
                            } else window.location.reload();
                        })
                        .catch(err => {
                            if (setErr !== undefined && setLoading !== undefined) {
                                setLoading(false);
                                setErr(err.message);
                            }
                        })
                    })
                    .catch(e => {
                        if (window.localStorage.getItem('logged_in') === "true"){
                            window.alert("Session expired!");
                            window.location.assign('/account');
                            window.localStorage.clear();    
                        }
                    })}
                else{
                    if(setLoading !== undefined)
                        setLoading(false);
                    if (!data.ok){
                        throw Error("Something went wrong!")
                    }
                    return data.json()
                }
            })
            .then(json => {
                if (setLoading !== undefined && setData !== undefined && setErr !== undefined) {
                    setLoading(false);
                    setData(JSON.parse(JSON.stringify(json)));
                    setErr(null);
                } else window.location.reload();
            })
            .catch(err => {
                if (setErr !== undefined && setLoading !== undefined) {
                    setLoading(false);
                    setErr(err.message);
                }
            })


        return () => AbtCnt.abort();
    }, []);

    return {data, err, loading};
}

export default useFetch;