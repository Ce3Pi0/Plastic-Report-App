import React, { createRef, useState } from 'react';

import {
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  ScrollDetail,
} from '@ionic/react';

/* Components */
import Menu from '../../components/home/menu';

import './Home.css';
import ContactComponent from '../../components/home/contact/contact';
import Footer from '../../components/home/contact/footer';
import { chevronUpOutline } from 'ionicons/icons';


const Contact: React.FC = () => {
  
  const contentRef = createRef<HTMLIonContentElement>();
  const [backToTop, setBackToTop] = useState<boolean>(false);

  const scrollToTop = () => contentRef.current?.scrollToTop(500);

  const handleScroll = (ev: CustomEvent<ScrollDetail>) => {
    if (ev.detail.scrollTop > 20) setBackToTop(true);
    else setBackToTop(false);
  }
  
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
          scrollEvents={true}
          onIonScroll={handleScroll}
          ref={contentRef}>
          <ContactComponent />
          <br />
          <br />
          <br />
          <Footer />
        </IonContent>

        {backToTop && <IonFab slot="fixed" vertical="bottom" horizontal="end" className='back-to-top'>
          <IonFabButton onClick={() => scrollToTop()}>
            <IonIcon icon={chevronUpOutline}></IonIcon>
          </IonFabButton>
        </IonFab>}
      </IonPage>
    </>
  );
};

export default Contact;