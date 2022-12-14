import { UserLogin, UserChange, UserRegister, UserInterface } from '../interfaces/interfaces';
import { FetchRefreshToken, methodType } from './utils';

function instanceOfUserChange(data: any): data is UserChange {
    return 'new_password' in data;
}

function instanceOfUserRegister(data: any): data is UserRegister {
    return 'name' in data;
}

export const handleRequest = (url: string, method: methodType, user: UserChange | UserLogin | UserRegister, setMessage:any, setMistake:any, setLoggedIn:any, setUserExists:any) => {

    let myHeaders = new Headers();
        
    myHeaders.append("Authorization", `Bearer ${window.localStorage.getItem("session_id")}`);
    myHeaders.append("Content-Type", "application/json");

    fetch(url, {
        method: method,
        headers: myHeaders,
        body: JSON.stringify(user)
    })
    .then(response => {
        if (response.status === 401 || response.status === 422 && instanceOfUserChange(user)){
            let refreshHeaders = new Headers();
                        
            refreshHeaders.append("Authorization", `Bearer ${window.localStorage.getItem("refresh_token")}`);
            refreshHeaders.append("Content-Type", "application/json");
                            
            FetchRefreshToken(url, method, undefined, user, undefined, undefined, undefined, setMessage, setMistake, false);
        } else {
            if(!response.ok){
                throw Error("Something went wrong!")
            }
            return response.json();
        }
    })
    .then(json => {
        if (instanceOfUserChange(user) && json.msg === "success"){
            setMistake(false);
            setMessage('');
            window.location.assign('/');
        } else if (instanceOfUserRegister(user)){
            window.location.assign('/account/login');
        }
         else if (!instanceOfUserChange(user) && !instanceOfUserRegister(user)){
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
                access_token: json.acces_token,
                refresh_token: json.refresh_token
            }
            window.location.assign('/');

            setLoggedIn(true, current_user);
            setMistake(false);
        }
    })
    .catch((err) => {
        if (!instanceOfUserChange(user) && !instanceOfUserRegister(user) && setMistake !== undefined){
            if(err.status === 400)
                setMistake(true);
            else
                setMessage("Something went wrong!");
        } else if (instanceOfUserRegister(user)){
            if (err.name === "TypeError")
                setMessage("An error has occured");
            else
                setUserExists(true);
        }
        else if (instanceOfUserChange(user))
            setMistake(true)
    })
}