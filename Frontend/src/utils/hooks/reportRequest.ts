import { FetchRefreshToken, methodType } from "../utils";

export const reportRequest = (url: string, method: methodType) => {
    let myHeaders = new Headers();
        
    myHeaders.append("Authorization", `Bearer ${window.localStorage.getItem("access_token")}`);
    myHeaders.append("Content-Type", "application/json");

    fetch(url, {
        method: method,
        headers: myHeaders,
    })
    .then(response => {
        if (response.status === 401 || response.status === 422){
            let refreshHeaders = new Headers();
                        
            refreshHeaders.append("Authorization", `Bearer ${window.localStorage.getItem("refresh_token")}`);
            refreshHeaders.append("Content-Type", "application/json");
                            
            FetchRefreshToken(url, method, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "report");
        } else {
            if(!response.ok){
                throw Error("Something went wrong!")
            }
            return response.json();
        }
    })
    .then(json => {
        if(json.msg === "success") window.location.reload();
    })
    .catch(err => Error(err.message))

}