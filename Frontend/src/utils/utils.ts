import { UserChange, UserLogin, UserRegister } from "../interfaces/interfaces";

export const domain: string = '127.0.0.1:5000';
export const UNSAFE_PASSWORD: number = 6
export type methodType = "POST" | "PUT" | "GET" | "DELETE"


const FetchData = (url: string, myHeaders: Headers, AbtCnt: AbortController, setData: any, setLoading: any, setErr: any) => {
    fetch(url, {
        method: "GET",
        headers: myHeaders,
        body: null,
        signal: AbtCnt.signal
    })
    .then(data => {
        setLoading(false);
        if (!data.ok){
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
}

const FetchUserChange = (url: string, method: methodType, myHeaders: Headers, user: UserChange | UserRegister | UserLogin, setMessage: any, setMistake: any) => {
    fetch(url, {
        method:method,
        headers:myHeaders,
        body:JSON.stringify(user),
    })
    .then(data => {
            if(!data.ok){
                throw Error("Something went wrong!")
                }
            return data.json();

    })
    .then(json => {
        if(json.message === "Properties updated successfully!"){
            setMistake(false);
            setMessage('');
        }
    })
    .catch((err) => {
        setMistake(true)
    })
}

export const FetchRefreshToken = (url: string, method: methodType | undefined, AbtCnt: AbortController | undefined, user: UserChange | UserRegister | UserLogin | undefined, setData: any, setLoading: any, setErr: any,
     setMessage: any, setMistake: any, fetchData: boolean) => {
    let refreshHeaders = new Headers();
    
    refreshHeaders.append("Authorization", `Bearer ${window.localStorage.getItem("refresh_token")}`);
    refreshHeaders.append("Content-Type", "application/json");

    fetch(`http://${domain}/user/refresh_token`, {
        method:"GET",
        headers: refreshHeaders
    })
    .then(data => {
        if (!data.ok)
            throw Error("There was a mistake!")
        return data.json();
    })
    .then(json => {
        localStorage.setItem("access_token", json.access_token);
        localStorage.setItem("refresh_token", json.refresh_token);

        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${json.access_token}`);
        myHeaders.append("Content-Type", "application/json");

        if (fetchData)
            FetchData(url, myHeaders, AbtCnt!, setData, setLoading, setErr);
        else
            FetchUserChange(url, method!, myHeaders, user!, setMessage, setMistake);
    })
    .catch(e => {
        if (window.localStorage.getItem('logged_in') === "true"){
            window.alert("Session expired!");
            window.location.assign('/account/login');
            window.localStorage.clear();    
        }
    })
}