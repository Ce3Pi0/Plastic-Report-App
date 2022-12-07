import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Login from '../../components/account/login';
import './Account.css';

const AccountLogin: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login to your account:</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Login />
      </IonContent>
    </IonPage>
  );
};

export default AccountLogin;
