import React, { useContext, useState } from "react";
import { useHistory } from "react-router";

import { IonButton, IonFab, IonFabButton, IonIcon, IonInput, IonTitle, useIonAlert } from "@ionic/react";
import { arrowBack } from "ionicons/icons";

import { changePasswordRequest } from "../../utils/hooks/changePasswordRequest";
import { DOMAIN } from "../../utils/utils";


const Forgot: React.FC = () => {

    const [presentAlert] = useIonAlert();

    const [email, setEmail] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const history = useHistory();

    const sendResetToken = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        changePasswordRequest(`http://${DOMAIN}/user/forgot_password_token?email=${email}`, setMessage, presentAlert);
    }

    return (
        <div id="container">
            <form id="form" onSubmit={sendResetToken}>
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