import { IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/react';

/* Components */
import Create from '../../components/account/create';
import { handleRefresh } from '../../utils/utils';

import './Account.css';


const AccountCreate: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <Create />
      </IonContent>
    </IonPage>
  );
};

export default AccountCreate;
