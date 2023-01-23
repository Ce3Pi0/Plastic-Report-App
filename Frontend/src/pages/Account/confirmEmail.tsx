import React from 'react';

import { IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Account.css';
import ConfirmEmailComp from '../../components/account/confirmEmailComponent';


const ConfiemEmail: React.FC = () => {

    //email: hristijannikolovski56@outlook.com
    //pass: TestPass123

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Confirm your email:</IonTitle>
                </IonToolbar>
            </IonHeader>
            <ConfirmEmailComp />
        </IonPage>
    );
};

export default ConfiemEmail;
