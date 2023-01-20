import { FetchRefreshToken, methodType } from "../utils";


export const reportIssueRequest = (url: string, method: methodType, body: BodyInit | undefined, updateTokens: any, presentAlert: any) => {

    let myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${window.localStorage.getItem("access_token")}`);
    myHeaders.append("Content-Type", "application/json");

    fetch(url, {
        method: method,
        headers: myHeaders,
        body: body
    })
        .then(res => {
            if (res.status === 429) {
                presentAlert({
                    subHeader: 'Fail',
                    message: 'To many requests sent... Slow down!',
                    buttons: [{
                        text: 'OK',
                        role: 'confirm',
                    },],
                });

                throw Error("Too many requests sent!")
            }
            if (res.status === 401 || res.status === 422) {
                if (method === "POST") FetchRefreshToken(url, method, undefined, body, undefined, undefined, undefined, undefined, undefined, undefined, "create_issue", updateTokens, presentAlert, undefined);
                else if (method === "PUT") FetchRefreshToken(url, method, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "update_issue", updateTokens, undefined, undefined);
            } else {
                if (!res.ok) {
                    throw Error("Something went wrong!")
                }
                return res.json();
            }
        })
        .then(json => {

            if (json.msg !== "success") throw Error("Something went wrong!")

            if (presentAlert !== undefined && method === "POST") {
                presentAlert({
                    subHeader: 'Success!',
                    message: 'Issue report sent successfully!',
                    buttons: [{
                        text: 'OK',
                        role: 'confirm'
                    },],
                });
            } else window.location.reload();
        })
        .catch(err => Error(err))

}