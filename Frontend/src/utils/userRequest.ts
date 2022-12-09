import { UserLogin, UserChange, UserRegister } from '../interfaces/interfaces';
import { domain } from './utils';

type methodType = "POST" | "PUT" | "GET" | "DELETE"

function instanceOfUserChange(data: any): data is UserChange {
    return 'new_password' in data;
}

function instanceOfUserRegister(data: any): data is UserRegister {
    return 'name' in data;
}

export const handleRequest = (url: string, method: methodType, user: UserChange | UserLogin | UserRegister, setMessage:any, setMistake:any, setLoggedIn:any, setUserExists:any , setPath: any) => {

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
                            
            fetch(`http://${domain}/user`, {
                method:"GET",
                headers: refreshHeaders
            })
            .then(data => {
                if (!data.ok)
                    throw Error("There was a mistake!")
                return data.json();
            })
            .then(json => {
                localStorage.setItem("session_id", json.access_token);
                localStorage.setItem("refresh_token", json.refresh_token);

                let myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${json.access_token}`);
                myHeaders.append("Content-Type", "application/json");

                fetch(url, {
                    method:method,
                    headers:myHeaders,
                    body:JSON.stringify(user),
                })
                .then(data => {
                        if(!data.ok){
                            throw Error("Something went wrong!")
                            }
                        return data.json();

                })
                .then(json => {
                    if(json.message === "Properties updated successfully!"){
                        setMistake(false);
                        setMessage('');
                    }
                })
                .catch((err) => {
                    setMistake(true)
                })
            })
            .catch(e => {
                if (window.localStorage.getItem('logged_in') === "true"){
                    window.alert("Session expired!");
                    window.location.assign('/account');
                    window.localStorage.clear();    
                }
            })}
            else {
                if(!response.ok){
                  throw Error("Something went wrong!")
                }
                return response.json();
            }
    })
    .then(json => {
        if (instanceOfUserChange(user) && json.msg === "Password updated successfully!"){
            setMistake(false);
            setMessage('');
            window.location.assign('/');
        } else if (instanceOfUserRegister(user)){
            window.location.assign('/account/login');
        }
         else if (!instanceOfUserChange(user) && !instanceOfUserRegister(user)){
            window.localStorage.setItem("username", json.username);
            window.localStorage.setItem("session_id", json.access_token);
            window.localStorage.setItem("refresh_token", json.refresh_token);
            window.localStorage.setItem("id", json.id);

            setLoggedIn(true);
            setMistake(false);

            window.localStorage.setItem("logged_in", "true");

            setPath('/account');
            window.location.assign('/');
        }
    })
    .catch((err) => {
        if (!instanceOfUserChange(user) && !instanceOfUserRegister(user) && setMistake !== undefined){
            if(err.message === "Something went wrong!")
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