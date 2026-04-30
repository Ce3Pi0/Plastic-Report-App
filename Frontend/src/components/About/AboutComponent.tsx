import React from "react";

import { IonFabButton, IonIcon, IonText, IonTitle } from "@ionic/react";
import { arrowDownOutline } from "ionicons/icons";

import img from "../../images/programmer.png";

interface Props {
  scrollToElement: React.RefObject<HTMLDivElement>;
}

const AboutComponent: React.FC<Props> = ({ scrollToElement }: Props) => (
  <div className="text-center mb-[200px]">
    <IonTitle>
      <h1 className="text-[62px]">About Me</h1>
    </IonTitle>

    <div className="w-[100%] flex justify-center items-center">
      <img src={img} className="min-[800px]:w-[20%] max-[800px]:w-[40%]" />
    </div>

    <IonText>
      <h4 className="text-[24px]">
        On this page you will get to know more about me
      </h4>
    </IonText>

    <div
      id="container"
      className="pt-[2%] min-[800px]:pt-[4%] max-[800px]:pt-[20%] m-auto flex justify-center items-center"
    >
      <IonFabButton
        onClick={() =>
          scrollToElement.current?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <IonIcon icon={arrowDownOutline} />
      </IonFabButton>
    </div>
  </div>
);

export default AboutComponent;
