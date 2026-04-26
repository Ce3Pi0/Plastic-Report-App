import React from "react";

import { IonButton } from "@ionic/react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center">
      <h1>Oops, that wasn't supposed to happen :/</h1>
      <IonButton shape="round" href="/home" slot="center">
        Go back home
      </IonButton>
    </div>
  );
};

export default NotFoundPage;
