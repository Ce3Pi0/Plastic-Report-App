import React from 'react';

import { IonButton, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';

import './Account.css';
import { arrowBack, checkmark } from 'ionicons/icons';
import { DOMAIN, validateEmail } from '../../utils/utils';


const ConfiemEmail: React.FC = () => {

    //email: idkwhattodo324@outlook.com
    //pass: testpass123


    const queryParams = new URLSearchParams(window.location.search)
    const token = queryParams.get("token")

    const [presentAlert] = useIonAlert();

    const sendConfirmEmail = () => {
        fetch(`http://${DOMAIN}/user/confirm_email?token=${token}`, {
            method: "POST"
        })
            .then(res => {
                if (res.status === 404) {
                    throw new Error("User doesn't exist")
                } else if (res.status === 405) {
                    throw new Error("Token has expired")
                } else if (res.status === 406) {
                    throw new Error("Token not valid")
                }

                if (!res.ok) {
                    throw new Error("Something went wrong!");
                }
                return res.json();
            })
            .then(json => {
                if (json.msg === "success") {
                    window.location.assign("/account/login");
                }
            })
            .catch(err => {
                if (err.message === "Token has expired") {
                    presentAlert({
                        subHeader: 'Error',
                        message: `${err.message}, enter your email and try again!`,
                        buttons: [{
                            text: 'OK',
                            role: 'confirm',
                            handler: e => {
                                if (!validateEmail(e[0])) {
                                    return;
                                }
                                fetch(`http://${DOMAIN}/user/send_confirm_email_token?email=${e[0]}`, {
                                    method: "POST"
                                })
                                    .then((res) => {
                                        if (!res.ok) {
                                            throw Error("Something went wrong!")
                                        }
                                        return res.json();
                                    })
                                    .then((json) => {
                                        if (json.msg !== "success") {
                                            new Error("Something went wrong")
                                        }
                                    })
                                    .catch((err) => new Error("Something went wrong"))
                            }
                        },],
                        inputs: [{
                            placeholder: 'Email',
                        }
                        ]

                    })
                    return;
                }
                presentAlert({
                    subHeader: 'Error',
                    message: err.message,
                    buttons: [{
                        text: 'OK',
                        role: 'confirm',
                    },],

                })
            })
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Confirm your email:</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <h2 className='middle-confirm-text'>
                    {token !== null && "Click this button to confirm your email"}
                    {token === null && "Token not specified"}
                </h2>
                {token !== null && <IonFab horizontal='center' vertical='center' className='center-align-text'>
                    <IonFabButton color={"success"} onClick={() => sendConfirmEmail()}>
                        <IonIcon icon={checkmark} />
                    </IonFabButton>
                </IonFab>}
                {
                    token === null && <IonFab horizontal='center' vertical='center' className='center-align-text'>
                        <IonFabButton color={"danger"} onClick={() => window.location.assign('/account/login')}>
                            <IonIcon icon={arrowBack} />
                        </IonFabButton>
                    </IonFab>}
            </IonContent>
        </IonPage>
    );
};

export default ConfiemEmail;
