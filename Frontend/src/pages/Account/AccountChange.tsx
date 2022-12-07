import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Change from '../../components/account/change';
import './Account.css';

const AccountChange: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Change password</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Change />
      </IonContent>
    </IonPage>
  );
};

export default AccountChange;
