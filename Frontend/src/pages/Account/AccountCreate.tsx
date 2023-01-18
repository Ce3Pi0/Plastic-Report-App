import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

/* Components */
import Create from '../../components/account/create';

import './Account.css';


const AccountCreate: React.FC = ()=> {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Create/>
      </IonContent>
    </IonPage>
  );
};

export default AccountCreate;
