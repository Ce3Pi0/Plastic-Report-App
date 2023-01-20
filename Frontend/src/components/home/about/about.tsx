import React from "react";

import { IonFabButton, IonIcon, IonText, IonTitle } from "@ionic/react";
import { arrowDownOutline } from "ionicons/icons";

import logo from "../../../images/logo.png";


const AboutComponent: React.FC = () => {

    const scrollToTeam = (e: React.MouseEvent<HTMLIonFabButtonElement, MouseEvent>) => {
        e.preventDefault();

        document.querySelector(".team-component")!.scrollIntoView({ block: "end", inline: "nearest", behavior: "smooth" });

        return;
    }

    return (
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

            <img className="about-logo" src={logo} />


            <div id="container">
                <IonFabButton onClick={(e) => scrollToTeam(e)}>
                    <IonIcon icon={arrowDownOutline} />
                </IonFabButton>
            </div>

        </div>
    );
}

export default AboutComponent;