import { UserLogin, UserChange, UserRegister, UserInterface } from '../../interfaces/interfaces';

import { FetchRefreshToken, methodType, InstanceOfUserChange, InstanceOfUserRegister, DOMAIN, validateEmail } from '../utils';


export const handleRequest = (url: string, method: methodType, user: UserChange | UserLogin | UserRegister, setMessage: any, setMistake: any, setLoggedIn: any, setUserExists: any, updateTokens: any, presentAlert: any) => {

    let myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${window.localStorage.getItem("access_token")}`);
    myHeaders.append("Content-Type", "application/json");

    fetch(url, {
        method: method,
        headers: myHeaders,
        body: JSON.stringify(user)
    })
        .then(res => {
            if (res.status === 404) {
                if (setMessage !== undefined)
                    setMessage("User not found!");
                throw Error("User not found!")
            }
            if (res.status === 429) {
                presentAlert({
                    subHeader: 'Fail',
                    message: 'To many requests sent... Slow down!',
                    buttons: [{
                        text: 'OK',
                        role: 'confirm',
                        handler: () => {
                            window.location.assign("/account/login");
                        }
                    },],
                });

                throw Error("Too many requests sent!")
            }
            if (res.status === 406){
                presentAlert({
                    subHeader: 'Error',
                    message: 'Enter your email and try again!',
                    buttons: [{
                        text: 'OK',
                        role: 'confirm',
                        handler: (e: string) => {
                            if (!validateEmail(e[0])) {
                                return;
                            }
                            fetch(`http://${DOMAIN}/user/send_confirm_email_token?email=${e[0]}`, {
                                method: "GET"
                            })
                                .then((res) => {
                                    if (res.status === 429){
                                        throw Error("To many requests!")
                                    }
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
                                .catch((err) => {
                                    if (err.message === "To many requests!"){
                                        setMessage("To many requests!")
                                    }
                                })
                        }
                    },],
                    inputs: [{
                        placeholder: 'Email',
                    }
                    ]

                })
                throw Error("Email not confirmed")
            }
            if (res.status === 405) {
                throw Error("Wrond username or password")
            }
            if (res.status === 401 || res.status === 422 && InstanceOfUserChange(user)) {
                FetchRefreshToken(url, method, undefined, undefined, user, undefined, undefined, undefined, setMessage, setMistake, "user", updateTokens, undefined, undefined);
            } else {
                if (!res.ok) {
                    throw Error("Something went wrong!")
                }
                return res.json();
            }
        })
        .then(json => {
            if (InstanceOfUserChange(user) && json.msg === "success") {
                setMistake(false);
                setMessage('');
                window.location.assign('/');
            } else if (InstanceOfUserRegister(user) && json.msg === "success") {
                setMessage("")
                setUserExists(false);
                
                fetch(`http://${DOMAIN}/user/send_confirm_email_token?email=${user.email}`, {
                    method: "GET"
                })
                    .then((res) => {
                        if (!res.ok) {
                            throw Error("Something went wrong!")
                        }
                        return res.json();
                    })
                    .then((json) => {
                        if (json.msg === "success") {
                            presentAlert({
                                subHeader: 'Message',
                                message: 'Open your email to confirm your account!',
                                buttons: [{
                                    text: 'OK',
                                    role: 'confirm',
                                },],

                            }
                            )
                        }
                    })
                    .catch((err) => new Error("Something went wrong"))

            } else if (!InstanceOfUserChange(user) && !InstanceOfUserRegister(user)) {
                window.localStorage.setItem("id", json.id);
                window.localStorage.setItem("username", json.username);
                window.localStorage.setItem("gender", json.gender);
                window.localStorage.setItem("type", json.type);
                window.localStorage.setItem("access_token", json.access_token);
                window.localStorage.setItem("refresh_token", json.refresh_token);
                window.localStorage.setItem("logged_in", "true");

                const current_user: UserInterface = {
                    id: json.id,
                    username: json.username,
                    gender: json.gender,
                    type: json.type,
                    access_token: json.access_token,
                    refresh_token: json.refresh_token
                }
                window.location.assign('/home');

                setLoggedIn(true, current_user);
                setMistake(false);
                setMessage("");
            }
        })
        .catch((err) => {
            if (!InstanceOfUserChange(user) && !InstanceOfUserRegister(user) && setMistake !== undefined) {
                if (err.message === "User not found!") {
                    setMessage(err.message)
                    setMistake(false)
                }
                else if (err.message === "Wrond username or password") {
                    setMessage('')
                    setMistake(true);
                }
                else if (err.message === "Email not confirmed"){
                    setMessage(err.message)
                    setMistake(false)
                }
                else {
                    setMessage("Something went wrong!");
                    setMistake(false);
                }
            } else if (InstanceOfUserRegister(user)) {
                if (err.name === "TypeError")
                    setMessage("An error has occured");
                else
                    setUserExists(true);
            }
            else if (InstanceOfUserChange(user))
                setMistake(true)
        })
}