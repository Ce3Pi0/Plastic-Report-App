import React, { useContext, useState } from "react";

import { IonButton, IonFab, IonFabButton, IonIcon, IonInput, IonTitle, useIonAlert } from "@ionic/react";

import { GlobalContext } from "../../context/Context";

import { UserLogin, ContextInterface } from "../../interfaces/interfaces";

import { handleRequest } from "../../utils/hooks/userRequest";
import { DOMAIN } from "../../utils/utils";
import { arrowBack } from "ionicons/icons";
import { useHistory } from "react-router";


const Forgot: React.FC = () => {

    const [email, setEmail] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const history = useHistory();


    return (
        <div id="container">
            <form id="form">
                <IonFab horizontal="start" vertical="top">
                    <IonFabButton size={"small"} onClick={() => history.push('/account/login')}>
                        <IonIcon icon={arrowBack} />
                    </IonFabButton>
                </IonFab>
                <IonTitle id="title">Forgot password</IonTitle>

                <br />

                <IonInput type="email" onIonChange={e => {
                    if (e.detail.value === undefined) return;
                    setEmail(e.detail.value!);
                }} clearInput={true} value={email} id="username" placeholder="Enter your email" required={true} />

                <p id="warning">{!message && <br></br>} {message}</p>

                <IonButton type="submit" expand="block" id="button">Reset</IonButton>

            </form>
        </div>
    );
}

export default Forgot;