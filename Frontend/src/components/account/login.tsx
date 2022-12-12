import { IonButton, IonInput, IonTitle } from "@ionic/react";
import { domain } from "../../utils/utils";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { contextInterface, GlobalContext } from "../../context/Context";
import { UserLogin } from "../../interfaces/interfaces";
import { handleRequest } from "../../utils/userRequest";


const Login:React.FC = () => {

    const {loggedIn, setLoggedIn} = useContext(GlobalContext) as contextInterface;
    
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
    const [message, setMessage] = useState<string | null>(null);
    const [mistake, setMistake] = useState<boolean>(false);

    const history = useHistory();

    const logOut = () => {
        window.localStorage.clear();
        setLoggedIn(false, null);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();    

        const new_user: UserLogin = {
            username,
            password
        } 
        
        handleRequest(`http://${domain}/user/login`, "POST", new_user, setMessage, setMistake, setLoggedIn, undefined);        
    }


    return ( 
        <div id="container"> 
            {!loggedIn && <form id="form" onSubmit={handleSubmit}>
                <IonTitle id="title">Login to your account</IonTitle>
                <br />
                <IonInput onIonChange={e => {
                    if(e.detail.value === undefined) return;
                    setUsername(e.detail.value!);
                }} clearInput={true} value={username} id="username" placeholder="Enter username" required={true} />
                <br />
                <IonInput type="password" onIonChange={e => {
                    if (e.detail.value === undefined) return;
                    setPassword(e.detail.value!)
                }} clearInput={true} value={password} id="password" placeholder="Enter password" required={true} />
                <p id="warning">{!message && !mistake && <br></br>} {message} {mistake && "Incorrect password or username"}</p>
                <IonButton type="submit" expand="block" id="button">Login</IonButton>
                <a id="create" href="/account/create"><p>create an account</p></a>
                <a id="forgot" href="/account/change"><p>change password</p></a>
            </form>}
            {loggedIn && 
            <div>
                <h2> You are already logged in!</h2>
                <IonButton expand="block" onClick={() => logOut()}>Logout</IonButton>
                <IonButton expand="block" onClick={() => history.push('/account/change')}>Change Password</IonButton>
            </div>
            }
        </div> 
    );
}
 
export default Login;