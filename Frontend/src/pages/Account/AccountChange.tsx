import { IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/react';

/* Components */
import Change from '../../components/account/change';
import { handleRefresh } from '../../utils/utils';

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
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <Change />
      </IonContent>
    </IonPage>
  );
};

export default AccountChange;
