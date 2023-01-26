import { FetchRefreshToken, methodType } from "../utils";


export const reportRequest = (url: string, method: methodType, body: BodyInit | undefined, updateTokens: any, presentAlert: any, contentType: string | undefined, setLoading: any) => {
    let myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${window.localStorage.getItem("access_token")}`);
    if (contentType !== "form") myHeaders.append("Content-Type", "application/json");

    setLoading(true);
    fetch(url, {
        method: method,
        headers: myHeaders,
        body: body
    })
        .then(res => {
            if (res.status === 429) {
                setLoading(false);
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
                if (contentType === "form") FetchRefreshToken(url, method, undefined, body, undefined, undefined, setLoading, undefined, undefined, undefined, "create_report", updateTokens, presentAlert, contentType);
                else FetchRefreshToken(url, method, undefined, undefined, undefined, undefined, setLoading, undefined, undefined, undefined, "report", updateTokens, undefined, undefined);
            } else {
                if (!res.ok) {
                    setLoading(false);
                    throw Error("Something went wrong!")
                }
                return res.json();
            }
        })
        .then(json => {
            setLoading(false);
            if (json.msg !== "success") throw Error("Something went wrong!")

            if (presentAlert !== undefined) {
                presentAlert({
                    subHeader: 'Success!',
                    message: 'Report sent successfully!',
                    buttons: [{
                        text: 'OK',
                        role: 'confirm',
                        handler: () => {
                            window.location.reload();
                        },
                    },],
                });
            } else window.location.reload();
        })
        .catch(err => Error(err))
}