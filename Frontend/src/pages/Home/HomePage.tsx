import React from 'react';

import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar
} from '@ionic/react';

/* Components */
import MenuComponent from '../../components/Menu/MenuComponent';
import HomeComponent from '../../components/Home/HomeComponent';

import { HandleRefresh } from '../../utils/utils';

import './Home.css';


const HomePage: React.FC = () => {

  return (
    <>
      {window.location.pathname.includes("home") && <MenuComponent />}

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
          fullscreen={true}>
          <IonRefresher slot="fixed" onIonRefresh={HandleRefresh}>
            <IonRefresherContent />
          </IonRefresher>
          <HomeComponent />
        </IonContent>
      </IonPage>
    </>
  );
};

export default HomePage;