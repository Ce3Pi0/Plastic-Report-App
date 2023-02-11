import React from "react";

import { IonFabButton, IonIcon, IonText, IonTitle } from "@ionic/react";
import { arrowDownOutline } from "ionicons/icons";

import logo from "../../images/logo.png";


const AboutComponent: React.FC = () => (
    <div className="about-first-page">
        <IonTitle>
            <h1>
                About us
            </h1>
        </IonTitle>

        <IonText>
            <h4>
                On this page you will get to know our team
            </h4>
        </IonText>

        <img className="about-logo" src={logo} alt="3D factory"/>


        <div id="container">
            <IonFabButton onClick={() => document.querySelector(".team-component")!.scrollIntoView({ behavior: "smooth" })}>
                <IonIcon icon={arrowDownOutline} />
            </IonFabButton>
        </div>

    </div>
)

export default AboutComponent;