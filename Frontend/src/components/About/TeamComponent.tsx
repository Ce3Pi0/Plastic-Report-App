import React from "react";
import { RiCodeBlock } from "react-icons/ri";

import { IonIcon } from "@ionic/react";
import { peopleOutline } from "ionicons/icons";

/* Components */
import MemberComponent from "./MemberComponent";

import HristijanImg from "../../images/Hristijan.jpg";

const TeamComponent: React.FC = () => {
  return (
    <div
      className="box-border p-0 m-0 w-[100%] font-['Roboto',_sans-serif] bg-[var(--ion-color-light)] flex justify-center flex-col me-component"
      id="test"
    >
      <div className="mx-[30px] py-5 flex items-center justify-center text-center flex-col">
        <div>
          <IonIcon
            className="bg-[var(--ion-color-secondary)] p-[8px] rounded-[100%] text-white w-[40px] h-[40px] text-[1rem] mx-0 py[20px] shadow-[2px_5px_30px_rgba(22,115,41,0.4)]"
            size="large"
            icon={peopleOutline}
          />
        </div>
        <h1 className="text-[1.3rem] mx-[30px] text-[var(--ion-color-light-contrast)] font-medium">
          Team
        </h1>
      </div>

      <div className="w-[100%] flex justify-center items-center flex-wrap pb-[4rem]">
        <MemberComponent
          MemberIcon={RiCodeBlock}
          msg={
            "I am the main developer of this application which was built as a part of a bigger project during my High School education. The project's goals was to create a business focusing on circular economy. My main roles included designing and developing the Frontend and Backend systems of this application."
          }
          img={HristijanImg}
          name="Hristijan Nikolovski-Postler"
          email="hristijannikolovski16@gmail.com"
        />
      </div>
    </div>
  );
};

export default TeamComponent;
