import React from 'react';

import { IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/react';

/* Components */
import ForgotChange from '../../components/account/forgotChange';

import './Account.css';
import { handleRefresh } from '../../utils/utils';


const AccountForgotChange: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Enter your new password:</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <ForgotChange />
      </IonContent>
    </IonPage>
  );
};

export default AccountForgotChange;
