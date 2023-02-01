import React from 'react';

import { IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/react';

/* Components */
import AccountForgotChangeComponent from '../../components/Account/AccountForgotChangeComponent';

import { HandleRefresh } from '../../utils/utils';

import './Account.css';


const AccountForgotChangePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Enter your new password:</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={HandleRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <AccountForgotChangeComponent />
      </IonContent>
    </IonPage>
  );
};

export default AccountForgotChangePage;
