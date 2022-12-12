import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Change from '../../components/account/change';
import Info from '../../components/account/info';
import './Account.css';

const Account: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Account Info:</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Info/>
      </IonContent>
    </IonPage>
  );
};

export default Account;
