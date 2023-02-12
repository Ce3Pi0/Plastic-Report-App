import React, { useContext, useState } from "react";

import { IonButton, IonInput, IonLoading, IonTitle, useIonAlert } from "@ionic/react";

import { GlobalContext } from "../../context/Context";

import { IUserLogin, IContext } from "../../interfaces/interfaces";

import { userRequest } from "../../utils/hooks/userRequest";
import { DOMAIN } from "../../utils/utils";


const AccountLoginComponent: React.FC = () => {

    const [presentAlert] = useIonAlert();

    const { setLoggedIn, updateTokens } = useContext(GlobalContext) as IContext;

    const [loading, setLoading] = useState<boolean>(false);

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [message, setMessage] = useState<string | null>(null);
    const [mistake, setMistake] = useState<boolean>(false);


    const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const user: IUserLogin = {
            username,
            password
        }

        userRequest(`https://${DOMAIN}/user/login`, "POST", user, setMessage, setMistake, setLoggedIn, undefined, updateTokens, presentAlert, setLoading);
    }


    return (
        <div id="container">
            <IonLoading isOpen={loading} message={"Logging in..."}/>
            
            <form id="form" onSubmit={HandleSubmit}>
                <IonTitle id="title">Login</IonTitle>

                <br />

                <IonInput onIonChange={e => {
                    if (e.detail.value === undefined) return;
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
                <a id="forgot" href="/account/forgot"><p>forgot password</p></a>
            </form>
        </div>
    );
}

export default AccountLoginComponent;