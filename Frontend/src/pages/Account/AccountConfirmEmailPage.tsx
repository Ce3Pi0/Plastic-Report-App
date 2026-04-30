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

import AccountConfirmEmailComponent from "../../components/Account/AccountConfirmEmailComponent";

import { handleRefresh } from "../../utils/utils";

const AccountConfirmEmailPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Confirm email:</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <AccountConfirmEmailComponent />
      </IonContent>
    </IonPage>
  );
};

export default AccountConfirmEmailPage;
