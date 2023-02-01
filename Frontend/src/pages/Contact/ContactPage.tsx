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
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  ScrollDetail,
} from '@ionic/react';
import { chevronUpOutline } from 'ionicons/icons';

/* Components */
import MenuComponent from '../../components/Menu/MenuComponent';
import ContactComponent from '../../components/Contact/ContactComponent';
import FooterComponent from '../../components/Contact/FooterComponent';

import { HandleRefresh } from '../../utils/utils';

import './Contact.css';


const ContactPage: React.FC = () => {

  const contentRef = createRef<HTMLIonContentElement>();
  const [backToTop, setBackToTop] = useState<boolean>(false);

  const ScrollToTop = () => contentRef.current?.scrollToTop(500);

  const HandleScroll = (ev: CustomEvent<ScrollDetail>) => {
    if (ev.detail.scrollTop > 20) setBackToTop(true);
    else setBackToTop(false);
  }

  return (
    <>
      {window.location.pathname.includes("home") && <MenuComponent />}

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
          onIonScroll={HandleScroll}
          ref={contentRef}>
          <IonRefresher slot="fixed" onIonRefresh={HandleRefresh}>
            <IonRefresherContent />
          </IonRefresher>
          <ContactComponent />
          <br />
          <br />
          <br />
          <FooterComponent />
        </IonContent>

        {backToTop && <IonFab slot="fixed" vertical="bottom" horizontal="end" className='back-to-top'>
          <IonFabButton onClick={() => ScrollToTop()}>
            <IonIcon icon={chevronUpOutline}></IonIcon>
          </IonFabButton>
        </IonFab>}
      </IonPage>
    </>
  );
};

export default ContactPage;