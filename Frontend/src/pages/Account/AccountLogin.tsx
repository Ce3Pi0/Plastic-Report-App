import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import Login from '../../components/account/login';
import './Account.css';

const AccountLogin: React.FC<{setPath: React.Dispatch<React.SetStateAction<string>>}> = ({setPath}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login to your account:</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Login setPath={setPath}/>
      </IonContent>
    </IonPage>
  );
};

export default AccountLogin;
