import React from 'react';

import { IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/react';

/* Components */
import AccountForgotComponent from '../../components/Account/AccountForgotComponent';

import { HandleRefresh } from '../../utils/utils';

import './Account.css';


const AccountForgotPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Change your password:</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={HandleRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <AccountForgotComponent />
      </IonContent>
    </IonPage>
  );
};

export default AccountForgotPage;
