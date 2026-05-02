import React, { useContext } from "react";

import {
  IonButton,
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
import { GlobalContext } from "../../context/Context";
import { IContext } from "../../interfaces/interfaces";
import { RiAdminLine, RiUser3Line } from "react-icons/ri";

const HomePage: React.FC = () => {
  const { user, setView } = useContext(GlobalContext) as IContext;

  return (
    <>
      <MenuComponent />
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            {user?.type === "admin" && (
              <IonButton
                slot="end"
                onClick={() => {
                  setView(user?.view === "admin" ? "client" : "admin");
                }}
                color={"primary"}
              >
                {user?.view === "admin" ? <RiUser3Line /> : <RiAdminLine />}
                {user?.view === "admin" ? "Client" : "Admin"} view
              </IonButton>
            )}
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
