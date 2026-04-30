import React, { createRef, useRef, useState } from "react";

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
import AboutComponent from "../../components/About/AboutComponent";
import TeamComponent from "../../components/About/TeamComponent";
import MenuComponent from "../../components/Menu/MenuComponent";

import { handleRefresh } from "../../utils/utils";

const AboutPage: React.FC = () => {
  const contentRef = createRef<HTMLIonContentElement>();
  const scrollToElement = useRef<HTMLDivElement | null>(null);

  const [backToTop, setBackToTop] = useState<boolean>(false);

  const ScrollToTop = () => contentRef.current?.scrollToTop(500);

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
              <IonMenuButton />
            </IonButtons>
            <IonTitle>About</IonTitle>
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
          <AboutComponent scrollToElement={scrollToElement} />
          <TeamComponent scrollToElement={scrollToElement} />
        </IonContent>

        {backToTop && (
          <IonFab
            slot="fixed"
            vertical="bottom"
            horizontal="end"
            className="mr-4"
          >
            <IonFabButton onClick={() => ScrollToTop()}>
              <IonIcon icon={chevronUpOutline}></IonIcon>
            </IonFabButton>
          </IonFab>
        )}
      </IonPage>
    </>
  );
};

export default AboutPage;
