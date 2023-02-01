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
  ScrollDetail
} from '@ionic/react';
import { chevronUpOutline } from 'ionicons/icons';

/* Components */
import AboutComponent from '../../components/About/AboutComponent';
import TeamComponent from '../../components/About/TeamComponent';
import MenuComponent from '../../components/Menu/MenuComponent';

import { HandleRefresh } from '../../utils/utils';

import './About.css';


const AboutPage: React.FC = () => {

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
            <IonTitle>About</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent
          scrollEvents={true}
          onIonScroll={HandleScroll}
          ref={contentRef}>
          <IonRefresher slot="fixed" onIonRefresh={HandleRefresh}>
            <IonRefresherContent />
          </IonRefresher>
          <AboutComponent />
          <TeamComponent />
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

export default AboutPage;