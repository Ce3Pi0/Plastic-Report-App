import React, { createRef, useState } from 'react';
import { 
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  ScrollDetail
} from '@ionic/react';
import './Home.css';
import { chevronUpOutline } from 'ionicons/icons';
import logo from '../../images/logo.png'

const Home: React.FC = () => {
  const contentRef = createRef<HTMLIonContentElement>();
  const [backToTop, setBackToTop] = useState<boolean>(false);

  const scrollToTop = () =>{  
    contentRef.current?.scrollToTop(500);
  } 

  const handleScroll = (ev: CustomEvent<ScrollDetail>) => {

    if (ev.detail.scrollTop > 20) {
      setBackToTop(true);
    } else {
      setBackToTop(false);
    }
  }

  return (
    <>
      {window.location.pathname.includes("home") && <IonMenu contentId="main-content">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">Menu content.</IonContent>
      </IonMenu>}
      <IonPage id="main-content" onScroll={() => console.log('test')}>
        <IonHeader>
          <IonToolbar>
              <IonButtons slot="start">
                <IonMenuButton></IonMenuButton>
              </IonButtons>
            <IonTitle>Home</IonTitle>
          </IonToolbar>
        </IonHeader>

      <IonContent 
      scrollEvents={true}
      onIonScroll={handleScroll}
      fullscreen={true} ref={contentRef}>
        <div className='container'>
          <img className='logo-image' src={logo} />
        </div>

      </IonContent>

        {backToTop && <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton onClick={() => scrollToTop()}>
            <IonIcon icon={chevronUpOutline}></IonIcon>
          </IonFabButton>
        </IonFab>}

        
      </IonPage>
    </>
  );
};

export default Home;