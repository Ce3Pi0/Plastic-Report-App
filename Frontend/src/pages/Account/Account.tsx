import { IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/react';

/* Components */
import Info from '../../components/account/info';
import { handleRefresh } from '../../utils/utils';

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
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <Info />
      </IonContent>
    </IonPage>
  );
};

export default Account;
