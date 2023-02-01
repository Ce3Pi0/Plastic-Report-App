import React from "react";

import { IonFab, IonFabButton, IonIcon, useIonAlert } from "@ionic/react";
import { arrowBack, checkmark } from "ionicons/icons";

import { sendConfirmEmail } from "../../utils/hooks/sendConfirmMail";
import { DOMAIN } from "../../utils/utils";


const AccountConfirmEmailComponent:React.FC = () => {

    const queryParams = new URLSearchParams(window.location.search);
    const token: string | null = queryParams.get("token");

    const [presentAlert] = useIonAlert();

    return token === null? (
    <>
        <h2 className='middle-confirm-text'>
            {"Token not specified"}
        </h2>

        <IonFab horizontal='center' vertical='center' className='center-align-text'>
            <IonFabButton color={"danger"} onClick={() => window.location.assign('/account/login')}>
                <IonIcon icon={arrowBack} />
            </IonFabButton>
        </IonFab>
    </>): (
    <>
        <h2 className='middle-confirm-text'>
            {"Confirm your email"}
        </h2>
        <IonFab horizontal='center' vertical='center' className='center-align-text'>
            <IonFabButton color={"success"} onClick={() => sendConfirmEmail(`https://${DOMAIN}/user/confirm_email?token=${token}`, presentAlert)}>
                <IonIcon icon={checkmark} />
            </IonFabButton>
        </IonFab>
    </>)
}

export default AccountConfirmEmailComponent;