import React from 'react';

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

/* Components */
import ForgotChange from '../../components/account/forgotChange';

import './Account.css';


const AccountForgotChange: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Enter your new password:</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ForgotChange />
      </IonContent>
    </IonPage>
  );
};

export default AccountForgotChange;
