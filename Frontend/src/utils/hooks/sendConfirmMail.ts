import { DOMAIN, validateEmail } from "../utils"


export const sendConfirmEmail = (url: string, presentAlert: any) => {
    fetch(url, {
        method: "POST"
    })
        .then(res => {
            if (res.status === 404) {
                throw new Error("User doesn't exist")
            } else if (res.status === 405) {
                throw new Error("Token has expired")
            } else if (res.status === 406) {
                throw new Error("Token not valid")
            }
            if (res.status === 429){
                throw Error("Too many requests sent!")
            }

            if (!res.ok) {
                throw new Error("Something went wrong!");
            }
            return res.json();
        })
        .then(json => {
            if (json.msg === "success") {
                window.location.assign("/account/login");
            }
        })
        .catch(err => {
            if (err.message === "Token has expired") {
                presentAlert({
                    subHeader: 'Error',
                    message: `${err.message}, enter your email and try again!`,
                    buttons: [{
                        text: 'OK',
                        role: 'confirm',
                        handler: (e: any) => {
                            if (!validateEmail(e[0])) {
                                return;
                            }
                            fetch(`https://${DOMAIN}/user/send_confirm_email_token?email=${e[0]}`, {
                                method: "POST"
                            })
                                .then((res) => {
                                    if (!res.ok) {
                                        throw Error("Something went wrong!")
                                    }
                                    return res.json();
                                })
                                .then((json) => {
                                    if (json.msg !== "success") {
                                        new Error("Something went wrong")
                                    }
                                })
                                .catch((err) => new Error(err.message))
                        }
                    },],
                    inputs: [{
                        placeholder: 'Email',
                    }
                    ]

                })
                return;
            }
            if (err.message === "Too many requests sent!"){
                presentAlert({
                    subHeader: 'Fail',
                    message: 'To many requests sent... Slow down!',
                    buttons: [{
                        text: 'OK',
                        role: 'confirm',
                    },],
                });
            }
            presentAlert({
                subHeader: 'Error',
                message: err.message,
                buttons: [{
                    text: 'OK',
                    role: 'confirm',
                },],

            })
        })
}