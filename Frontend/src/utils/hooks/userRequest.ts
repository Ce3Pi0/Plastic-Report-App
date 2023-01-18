import { UserLogin, UserChange, UserRegister, UserInterface } from '../../interfaces/interfaces';

import { FetchRefreshToken, methodType, InstanceOfUserChange, InstanceOfUserRegister } from '../utils';


export const handleRequest = (url: string, method: methodType, user: UserChange | UserLogin | UserRegister, setMessage:any, setMistake:any, setLoggedIn:any, setUserExists:any, updateTokens: any, presentAlert: any) => {

    let myHeaders = new Headers();
        
    myHeaders.append("Authorization", `Bearer ${window.localStorage.getItem("access_token")}`);
    myHeaders.append("Content-Type", "application/json");

    fetch(url, {
        method: method,
        headers: myHeaders,
        body: JSON.stringify(user)
    })
    .then(res => {
        if (res.status === 404){
            if (setMessage !== undefined)
                setMessage("User not found!");
            throw Error("User not found!")
        }
        if (res.status === 429){
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
        if (res.status === 405){
            throw Error("Wrond username or password")
        }
        if (res.status === 401 || res.status === 422 && InstanceOfUserChange(user)){
            let refreshHeaders = new Headers();
                        
            refreshHeaders.append("Authorization", `Bearer ${window.localStorage.getItem("refresh_token")}`);
            refreshHeaders.append("Content-Type", "application/json");
                            
            FetchRefreshToken(url, method, undefined, undefined, user, undefined, undefined, undefined, setMessage, setMistake, "user", updateTokens, undefined, undefined);
        } else {
            if(!res.ok){
                throw Error("Something went wrong!")
            }
            return res.json();
        }
    })
    .then(json => {
        if (InstanceOfUserChange(user) && json.msg === "success"){
            setMistake(false);
            setMessage('');
            window.location.assign('/');
        } else if (InstanceOfUserRegister(user)){
            window.location.assign('/account/login');
        } else if (!InstanceOfUserChange(user) && !InstanceOfUserRegister(user)){
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
        }
    })
    .catch((err) => {
        if (!InstanceOfUserChange(user) && !InstanceOfUserRegister(user) && setMistake !== undefined){
            if (err.message === "User not found!"){
                setMessage(err.message)
                setMistake(false)
            }
            else if (err.message === "Wrond username or password"){
                setMessage('')    
                setMistake(true);
            }
            else{
                setMessage("Something went wrong!");
                setMistake(false);
            }
        } else if (InstanceOfUserRegister(user)){
            if (err.name === "TypeError")
                setMessage("An error has occured");
            else
                setUserExists(true);
        }
        else if (InstanceOfUserChange(user))
            setMistake(true)
    })
}