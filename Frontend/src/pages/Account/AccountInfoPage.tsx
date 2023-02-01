import { IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/react';

/* Components */
import AccountInfoComponent from '../../components/Account/AccountInfo/AccountInfoComponent';

import { HandleRefresh } from '../../utils/utils';

import './Account.css';


const AccountInfoPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Account Info:</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={HandleRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <AccountInfoComponent />
      </IonContent>
    </IonPage>
  );
};

export default AccountInfoPage;
