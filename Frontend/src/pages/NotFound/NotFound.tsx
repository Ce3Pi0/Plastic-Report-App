import React from "react";

import { IonButton } from "@ionic/react";

import './NotFound.css';


const NotFound: React.FC = () => {
    return (
        <div className="not-found">
            <h1>Oops, that wasn't suposed to happen :/</h1>
            <IonButton shape="round" href="/home" slot="center">Go back home</IonButton>
        </div>
    );
}

export default NotFound;