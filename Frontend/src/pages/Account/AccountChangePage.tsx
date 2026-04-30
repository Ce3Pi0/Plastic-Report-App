import {
  IonContent,
  IonHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

/* Components */
import AccountChangeComponent from "../../components/Account/AccountChangeComponent";

import { handleRefresh } from "../../utils/utils";

const AccountChangePage: React.FC = () => {
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
        <AccountChangeComponent />
      </IonContent>
    </IonPage>
  );
};

export default AccountChangePage;
