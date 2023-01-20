import { FetchRefreshToken, methodType } from "../utils";


export const updateUserImage = (url: string, method: methodType, body: BodyInit | undefined, updateTokens: any, presentAlert: any, contentType: string | undefined) => {
    let myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${window.localStorage.getItem("access_token")}`);
    if (contentType !== "form") myHeaders.append("Content-Type", "application/json");

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
                if (contentType === "form") FetchRefreshToken(url, method, undefined, body, undefined, undefined, undefined, undefined, undefined, undefined, "update_image", updateTokens, presentAlert, contentType);
            } else {
                if (!res.ok) {
                    throw Error("Something went wrong!")
                }
                return res.json();
            }
        })
        .then(json => {
            if (json.msg !== "success") throw Error("Something went wrong!")

            if (presentAlert !== undefined) {
                presentAlert({
                    subHeader: 'Success!',
                    message: 'User image updated successfully!',
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