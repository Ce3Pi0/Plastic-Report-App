import React from 'react';

import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

/* Components */
import Menu from '../../components/home/menu';

import './Home.css';
import ContactComponent from '../../components/home/contact/contact';
import Footer from '../../components/home/contact/footer';


const Contact: React.FC = () => {
  return (
    <>
      {window.location.pathname.includes("home") && <Menu />}

      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Contact</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent
          fullscreen={true}>
          <ContactComponent />
          <br />
          <br />
          <br />
          <Footer />
        </IonContent>
      </IonPage>
    </>
  );
};

export default Contact;