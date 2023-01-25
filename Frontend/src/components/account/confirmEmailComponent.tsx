import { IonContent, IonFab, IonFabButton, IonIcon, useIonAlert } from "@ionic/react";
import { arrowBack, checkmark } from "ionicons/icons";

import { sendConfirmEmail } from "../../utils/hooks/sendConfirmMail";
import { DOMAIN } from "../../utils/utils";


const ConfirmEmailComp = () => {

    const queryParams = new URLSearchParams(window.location.search)
    const token = queryParams.get("token")

    const [presentAlert] = useIonAlert();

    return (
        <IonContent fullscreen>
            <h2 className='middle-confirm-text'>
                {token !== null && "Confirm your email"}
                {token === null && "Token not specified"}
            </h2>
            {token !== null && <IonFab horizontal='center' vertical='center' className='center-align-text'>
                <IonFabButton color={"success"} onClick={() => sendConfirmEmail(`https://${DOMAIN}/user/confirm_email?token=${token}`, presentAlert)}>
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
    );
}

export default ConfirmEmailComp;