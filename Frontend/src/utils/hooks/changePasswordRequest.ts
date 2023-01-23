export const changePasswordRequest = (url: string, setMessage: any, presentAlert: any) => {
    let myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${window.localStorage.getItem("access_token")}`);

    fetch(url, {
        method: "GET",
        headers: myHeaders,
    })
        .then(res => {
            if (res.status === 404) {
                throw Error("User not found")
            }

            if (res.status === 429){
                throw Error("Too many requests sent")
            }

            if (!res.ok) {
                throw Error("Something went wrong")
            }
            setMessage("");
            return res.json();
        })
        .then(json => {
            if (json.msg === "success") {
                presentAlert({
                    subHeader: 'Reset link sent',
                    message: 'Open your email to reset your password',
                    buttons: [{
                        text: 'OK',
                        role: 'confirm',
                    },],
                })
            }
        })
        .catch(err => setMessage(err.message))
}