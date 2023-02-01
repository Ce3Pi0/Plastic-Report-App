import React, { useContext, useState } from "react";
import { useHistory } from "react-router";

import { IonButton, IonTitle, IonInput, IonFab, IonFabButton, IonIcon, IonRadioGroup, IonItem, IonLabel, IonRadio, useIonAlert } from "@ionic/react";
import { arrowBack } from "ionicons/icons";

import { GlobalContext } from "../../context/Context";

import { IContext, IUserRegister } from "../../interfaces/interfaces";

import { userRequest } from "../../utils/hooks/userRequest";
import { DOMAIN, UNSAFE_PASSWORD } from "../../utils/utils";


const AccountRegisterComponent: React.FC = () => {

    const [presentAlert] = useIonAlert();

    const { updateTokens } = useContext(GlobalContext) as IContext;

    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [userExists, setUserExists] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const history = useHistory();

    const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage('');

        if (gender === '') {
            setMessage('Please select a gender!')

            return;
        }
        if (password.length < UNSAFE_PASSWORD) {
            setMessage("Password too weak!")

            return;
        }

        const newUser: IUserRegister = {
            name,
            username,
            email,
            password,
            gender
        };

        userRequest(`https://${DOMAIN}/user/register`, "POST", newUser, setMessage, undefined, undefined, setUserExists, updateTokens, presentAlert);
    }

    return (
        <div id="container">
            <form id="form" onSubmit={HandleSubmit}>
                <IonFab horizontal="start" vertical="top">
                    <IonFabButton size={"small"} onClick={() => history.push('/account/login')}>
                        <IonIcon icon={arrowBack}></IonIcon>
                    </IonFabButton>
                </IonFab>

                <IonTitle id="title">Create account</IonTitle>

                <br />

                <IonInput type="email" onIonChange={e => {
                    if (e.detail.value === undefined) return;
                    setEmail(e.detail.value!);
                }} clearInput={true} value={email} id="username" placeholder="Enter your email" required={true} />

                <br />

                <IonInput onIonChange={e => {
                    if (e.detail.value === undefined) return;
                    setName(e.detail.value!);
                }} clearInput={true} value={name} id="username" placeholder="Enter your name" required={true} />

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

                <IonRadioGroup value={gender} onIonChange={(e) => setGender(e.detail.value)}>
                    <IonItem className="gender" color={"light"}>
                        <IonLabel>Male</IonLabel>
                        <IonRadio slot="end" value="male"></IonRadio>
                    </IonItem>


                    <IonItem className="gender" color={"light"}>
                        <IonLabel>Female</IonLabel>
                        <IonRadio slot="end" value="female"></IonRadio>
                    </IonItem>

                    <IonItem className="gender" color={"light"}>
                        <IonLabel>Other</IonLabel>
                        <IonRadio slot="end" value="other"></IonRadio>
                    </IonItem>
                </IonRadioGroup>

                {userExists && !message && <p id="warning">User already exists!</p>}
                {!userExists && message && <p id="warning">{message}</p>}
                {!userExists && !message && <br />}

                <IonButton type="submit" expand="block" id="button">Create</IonButton>
            </form>
        </div>
    );
}

export default AccountRegisterComponent;


