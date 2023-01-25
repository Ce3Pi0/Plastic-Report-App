import React, { useContext, useState } from "react";

import { IonButton, IonInput, IonTitle, useIonAlert } from "@ionic/react";

import { GlobalContext } from "../../context/Context";

import { UserLogin, ContextInterface } from "../../interfaces/interfaces";

import { handleRequest } from "../../utils/hooks/userRequest";
import { DOMAIN } from "../../utils/utils";


const Login: React.FC = () => {

    const [presentAlert] = useIonAlert();

    const { setLoggedIn, updateTokens } = useContext(GlobalContext) as ContextInterface;

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [message, setMessage] = useState<string | null>(null);
    const [mistake, setMistake] = useState<boolean>(false);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const new_user: UserLogin = {
            username,
            password
        }

        handleRequest(`https://${DOMAIN}/user/login`, "POST", new_user, setMessage, setMistake, setLoggedIn, undefined, updateTokens, presentAlert);
    }


    return (
        <div id="container">
            <form id="form" onSubmit={handleSubmit}>
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

export default Login;