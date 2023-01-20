import React from 'react';

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

/* Components */
import Forgot from '../../components/account/forgot';

import './Account.css';


const AccountForgot: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Change your password:</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Forgot />
      </IonContent>
    </IonPage>
  );
};

export default AccountForgot;
