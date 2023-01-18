import React, { useState } from "react";
import { IconType } from "react-icons/lib";

import { IonIcon } from "@ionic/react";
import { checkmarkCircle } from "ionicons/icons";
import MemberModal from "../../modals/About/memberModal";


const Member:React.FC<{name:string, email: string, img: string, msg: string, MemberIcon: IconType}> = ({name, email, img, msg, MemberIcon}) => {
    
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    return (  
        <div className="box">
            <div className="top-bar"></div>
            <div className="top">
                <MemberIcon className="heart"/>
                <IonIcon className="fa-check-circle" icon={checkmarkCircle} /> 
            </div>
            <div className="content">
                <img src={img}
                    alt="" />
                <strong>{name}</strong>
                <p><a href={`mailto:${email}`}>{email}</a></p>
            </div>
            <div className="btn" onClick={() => setIsOpen(!isOpen)}>
                <a>Info</a>
            </div>
            <MemberModal name={name} message={msg} isOpen={isOpen} setIsOpen={setIsOpen}/>
        </div>
    );
}
 
export default Member;