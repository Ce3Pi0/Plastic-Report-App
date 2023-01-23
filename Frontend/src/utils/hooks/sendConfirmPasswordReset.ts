export const sendConfirmPasswordReset = (url: string, presentAlert: any) => {

    fetch(url, {
        method: "POST",
    })
        .then(res => {
            if (res.status === 404) {
                throw new Error("User doesn't exist")
            } else if (res.status === 405) {
                throw new Error("Token has expired")
            } else if (res.status === 406) {
                throw new Error("Token not valid")
            } else if (res.status === 409) {
                throw new Error("Password cannot be the same as the old one")
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
                    message: `${err.message}, try again!`,
                    buttons: [{
                        text: 'OK',
                        role: 'confirm'
                    },]
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