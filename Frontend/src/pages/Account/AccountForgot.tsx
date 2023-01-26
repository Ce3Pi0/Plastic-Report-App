import React from 'react';

import { IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/react';

/* Components */
import Forgot from '../../components/account/forgot';

import './Account.css';
import { handleRefresh } from '../../utils/utils';


const AccountForgot: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Change your password:</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <Forgot />
      </IonContent>
    </IonPage>
  );
};

export default AccountForgot;
