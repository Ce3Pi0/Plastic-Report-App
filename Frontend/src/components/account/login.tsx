import { IonButton, IonInput, IonTitle } from "@ionic/react";
import { domain } from "../../utils/utils";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { contextInterface, GlobalContext } from "../../context/Context";
import { UserLogin } from "../../interfaces/interfaces";
import { handleRequest } from "../../utils/userRequest";


const Login:React.FC<{setPath: React.Dispatch<React.SetStateAction<string>>}> = ({setPath}) => {

    const {loggedIn, setLoggedIn} = useContext(GlobalContext) as contextInterface;
    
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
    const [message, setMessage] = useState<string | null>(null);
    const [mistake, setMistake] = useState<boolean>(false);

    const history = useHistory();

    const logOut = () => {
        window.localStorage.clear();
        setPath('/account/login');
        setLoggedIn(false);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();    

        const new_user: UserLogin = {
            username,
            password
        } 
        
        handleRequest(`http://${domain}/user/login`, "POST", new_user, setMessage, setMistake, setLoggedIn, undefined, setPath);        
    }


    return (  
    <>
        {!loggedIn &&
        <div id="container">
            <form name="form1" className="box" onSubmit={handleSubmit}>
                <h2>Login<span /></h2>
                <h5>Sign in to your account.</h5>
                <IonInput onIonChange={e => {
                    if(e.detail.value === undefined) return;
                    setUsername(e.detail.value!);
                }} clearInput={true} value={username} id="username" placeholder="Enter username" required={true} />
                <i className="typcn typcn-eye" id="eye"></i>
                <IonInput type="password" onIonChange={e => {
                    if (e.detail.value === undefined) return;
                    setPassword(e.detail.value!)
                }} clearInput={true} value={password} id="password" placeholder="Enter password" required={true} />
                <p id="warning">{!message && !mistake && <br></br>} {message} {mistake && "Incorrect password or username"}</p>
                <a href="/account/change" className="forgetpass">Change Password?</a>
                <input type="submit" value="Login" className="btn1" />
            </form>
            <a href="/account/create" className="dnthave">Don’t have an account? Sign up</a>
        </div>}
        {loggedIn &&
            <div className="container">
                <div>
                    <h2> You are already logged in!</h2>
                    <IonButton expand="block" onClick={() => logOut()}>Logout</IonButton>
                    <IonButton expand="block" onClick={() => history.push('/account/change')}>Change Password</IonButton>
                </div>
            </div>} 
    </>
    );
}
 
export default Login;