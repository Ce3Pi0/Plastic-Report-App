import { IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/react';

/* Components */
import AccountChangeComponent from '../../components/Account/AccountChangeComponent';

import { HandleRefresh } from '../../utils/utils';

import './Account.css';


const AccountChangePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Change password</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={HandleRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <AccountChangeComponent />
      </IonContent>
    </IonPage>
  );
};

export default AccountChangePage;
