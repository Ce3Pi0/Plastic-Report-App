import React from 'react';

import { IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/react';

/* Components */
import AccountLoginComponent from '../../components/Account/AccountLoginComponent';

import { HandleRefresh } from '../../utils/utils';

import './Account.css';


const AccountLoginPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login to your account:</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={HandleRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <AccountLoginComponent />
      </IonContent>
    </IonPage>
  );
};

export default AccountLoginPage;
