import React, { createRef, useState } from "react";

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
} from "@ionic/react";
import { chevronUpOutline } from "ionicons/icons";

/* Components */
import MenuComponent from "../../components/Menu/MenuComponent";
import ContactComponent from "../../components/Contact/ContactComponent";
import FooterComponent from "../../components/Contact/FooterComponent";

import { handleRefresh } from "../../utils/utils";

const ContactPage: React.FC = () => {
  const contentRef = createRef<HTMLIonContentElement>();
  const [backToTop, setBackToTop] = useState<boolean>(false);

  const scrollToTop = () => contentRef.current?.scrollToTop(500);

  const handleScroll = (ev: CustomEvent<ScrollDetail>) => {
    if (ev.detail.scrollTop > 20) setBackToTop(true);
    else setBackToTop(false);
  };

  return (
    <>
      <MenuComponent />
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
          ref={contentRef}
        >
          <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent />
          </IonRefresher>
          <ContactComponent />
          <FooterComponent />
        </IonContent>

        {backToTop && (
          <IonFab
            slot="fixed"
            vertical="bottom"
            horizontal="end"
            className="mr-4"
          >
            <IonFabButton onClick={() => scrollToTop()}>
              <IonIcon icon={chevronUpOutline}></IonIcon>
            </IonFabButton>
          </IonFab>
        )}
      </IonPage>
    </>
  );
};

export default ContactPage;
