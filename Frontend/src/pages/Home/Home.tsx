import React from 'react';

import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonHeader,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { menuController } from "@ionic/core"

/* Components */
import Menu from '../../components/home/menu';
import Main from '../../components/home/main';

import './Home.css';


const Home: React.FC = () => {


  return (
    <>
      {window.location.pathname.includes("home") && <Menu />}

      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent
          scrollEvents={true}
          fullscreen={true}>
          <Main />
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;