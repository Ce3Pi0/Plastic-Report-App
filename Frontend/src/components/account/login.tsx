import { IonButton, IonInput, IonTitle } from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";

const loggedIn: boolean = false;

const handleSubmit = () => {

}

const logOut = () => {

}

const Login:React.FC = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
    const [message, setMessage] = useState<string | null>(null);
    const [mistake, setMistake] = useState<boolean>(false);

    const history = useHistory();

    return (  
        <div className="container"> 
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
            <IonButton expand="block" onClick={() => history.push('/account_change')}>Change Password</IonButton>
        </div>
        }
    </div>
    );
}
 
export default Login;