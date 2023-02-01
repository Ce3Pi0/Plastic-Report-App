import React from "react";
import { FaRecycle, FaMobileAlt } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { GiSewingMachine } from "react-icons/gi";

import { IonIcon } from "@ionic/react";
import { peopleOutline } from "ionicons/icons";

/* Components */
import MemberComponent from "./MemberComponent";

import BobanImg from '../../images/Boban.png';
import EvaImg from '../../images/Eva.png'
import AnaImg from '../../images/Ana.png'
import HristijanImg from '../../images/Hristijan.png'


const TeamComponent: React.FC = () => {

    const HristijanText: string = "Coordinator of all activities and responsible for concluding partnerships of various types and customer relationships.";
    const BobanText: string = "Responsible for research and development of the mobile application";
    const EvaText: string = "Responsible for research and development of the 3D printer.";
    const AnaText: string = "Responsible for research and development of the recycling machine";

    return (
        <div className="team-component" id="test">
            <h1 className="h1-text">
                <IonIcon size="large" icon={peopleOutline} />Team Members
            </h1>

            <div className="about-container container">
                <MemberComponent MemberIcon={RiTeamFill} msg={HristijanText} img={HristijanImg} name="Hristijan Nikolovski" email="hristijannikolovski16@gmail.com" />
                <MemberComponent MemberIcon={FaMobileAlt} msg={BobanText} img={BobanImg} name="Boban Boshevski" email="ibprod8333@gmail.com " />
                <MemberComponent MemberIcon={GiSewingMachine} msg={EvaText} img={EvaImg} name="Eva Acevska" email="kk.evaacevska@gmail.com" />
                <MemberComponent MemberIcon={FaRecycle} msg={AnaText} img={AnaImg} name="Ana Acevska" email="ana1308006@gmail.com " />
            </div>
        </div>
    );
}

export default TeamComponent;
