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
  ScrollDetail
} from '@ionic/react';
import { chevronUpOutline } from 'ionicons/icons';

/* Components */
import Menu from '../../components/home/menu';

import './Home.css';
import AboutComponent from '../../components/home/about/about';
import Team from '../../components/home/about/team';


const About: React.FC = () => {
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
            <IonTitle>About</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent 
        scrollEvents={true}
        onIonScroll={handleScroll}
        fullscreen={true} 
        ref={contentRef}>
          <AboutComponent />
          <Team /> 
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

export default About;