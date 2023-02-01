import { IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/react';

/* Components */
import AccountRegisterComponent from '../../components/Account/AccountRegisterComponent';

import { HandleRefresh } from '../../utils/utils';

import './Account.css';


const AccounRegisterPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={HandleRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <AccountRegisterComponent />
      </IonContent>
    </IonPage>
  );
};

export default AccounRegisterPage;
