import React from 'react';

import { IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/react';

/* Components */
import Login from '../../components/account/login';

import './Account.css';
import { handleRefresh } from '../../utils/utils';


const AccountLogin: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login to your account:</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <Login />
      </IonContent>
    </IonPage>
  );
};

export default AccountLogin;
