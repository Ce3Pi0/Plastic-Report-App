import React from "react";

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
import AccountForgotComponent from "../../components/Account/AccountForgotComponent";

import { handleRefresh } from "../../utils/utils";

const AccountForgotPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Change your password:</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <AccountForgotComponent />
      </IonContent>
    </IonPage>
  );
};

export default AccountForgotPage;
