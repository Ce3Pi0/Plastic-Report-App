import React from "react";

import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

/* Components */
import MenuComponent from "../../components/Menu/MenuComponent";
import HomeComponent from "../../components/Home/HomeComponent";

import { handleRefresh } from "../../utils/utils";

const HomePage: React.FC = () => {
  return (
    <>
      <MenuComponent />
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen={true}>
          <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent />
          </IonRefresher>
          <HomeComponent />
        </IonContent>
      </IonPage>
    </>
  );
};

export default HomePage;
