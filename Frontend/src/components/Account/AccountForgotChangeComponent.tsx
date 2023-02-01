import React, { useContext, useState } from "react";
import { useHistory } from "react-router";

import { IonButton, IonFab, IonFabButton, IonIcon, IonInput, IonTitle, useIonAlert } from "@ionic/react";
import { arrowBack } from "ionicons/icons";

import { DOMAIN, UNSAFE_PASSWORD } from "../../utils/utils";
import { sendConfirmPasswordReset } from "../../utils/hooks/sendConfirmPasswordReset";


const AccountForgotChangeComponent: React.FC = () => {

    const queryParams = new URLSearchParams(window.location.search)
    const token = queryParams.get("token")

    const [presentAlert] = useIonAlert();

    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const [message, setMessage] = useState<string | null>(null);

    const history = useHistory();

    const SendResetToken = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password!.length < UNSAFE_PASSWORD) {
            setMessage("Password too weak!");

            return;
        }

        if (password !== passwordConfirm) {
            setMessage("You didn't confirm the password correctly!");

            return;
        }

        sendConfirmPasswordReset(`https://${DOMAIN}/user/forgot_password?token=${token}&password=${password}`, presentAlert);
    }

    return (
        <div id="container">
            {token &&
                <form id="form" onSubmit={SendResetToken}>
                    <IonFab horizontal="start" vertical="top">
                        <IonFabButton size={"small"} onClick={() => history.push('/account/login')}>
                            <IonIcon icon={arrowBack} />
                        </IonFabButton>
                    </IonFab>
                    <IonTitle id="title">Reset your password</IonTitle>

                    <br />

                    <IonInput type="password" onIonChange={e => {
                        if (e.detail.value === undefined) return;
                        setPassword(e.detail.value!);
                    }} clearInput={true} value={password} id="username" placeholder="Enter new password" required={true} />

                    <br />

                    <IonInput type="password" onIonChange={e => {
                        if (e.detail.value === undefined) return;
                        setPasswordConfirm(e.detail.value!);
                    }} clearInput={true} value={passwordConfirm} id="username" placeholder="Confirm new password" required={true} />

                    <p id="warning">{!message && <br></br>} {message}</p>

                    <IonButton type="submit" expand="block" id="button">Reset</IonButton>

                </form>}
            {!token &&
                <>
                    <h2 className='middle-confirm-text'>
                        Token not specified!
                    </h2>
                    <IonFab horizontal='center' vertical='center' className='center-align-text'>
                        <IonFabButton color={"danger"} onClick={() => window.location.assign('/account/login')}>
                            <IonIcon icon={arrowBack} />
                        </IonFabButton>
                    </IonFab>
                </>
            }
        </div>
    );
}

export default AccountForgotChangeComponent;