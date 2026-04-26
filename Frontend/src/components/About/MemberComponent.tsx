import React, { useState } from "react";
import { IconType } from "react-icons/lib";

import { IonIcon } from "@ionic/react";
import { checkmarkCircle } from "ionicons/icons";

import MemberModal from "../Modals/About/memberModal";

const MemberComponent: React.FC<{
  name: string;
  email: string;
  img: string;
  msg: string;
  MemberIcon: IconType;
}> = ({ name, email, img, msg, MemberIcon }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative min-w-[250px] bg-white shadow-[2px_3px_30px_rgba(0,0,0,0.05)] flex flex-col justify-center items-center p-[20px] m-[20px] rounded-[10px]">
      <div className="w-[50%] h-[4px] bg-[var(--ion-color-secondary)] absolute top-0 left-[50%] translate-x-[-50%] rounded-b[10px]"></div>
      <div className="flex justify-between items-center w-[100%]">
        <MemberIcon className="text-[#000000cc]" />
        <IonIcon className="text-[#17b667]" icon={checkmarkCircle} />
      </div>
      <div className="flex flex-col justify-center items-center">
        <img
          className="w-[90px] h-[90px] rounded-[100px] overflow-hidden object-cover object-top"
          src={img}
          alt=""
        />
        <strong className="font-medium text-[#141414] mt-[10px]">{name}</strong>
        <p className="text-[0.9rem] text-[#7a7a7a] mt-[4px] mb-[10px] cursor-pointer hover:underline">
          <a className="color-[#cdcdcd]" href={`mailto:${email}`}>
            {email}
          </a>
        </p>
      </div>
      <div
        className="mt-[5px] flex justify-center items-center w-[40%] rounded-[20px] text-[#8b8b8b] py-[8px] text-[0.9rem] hover:text-[#fff] hover:bg-[var(--ion-color-secondary)] hover:shadow-[2px_5px_15px_rgba(9,95,48,0.05)] cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        Info
      </div>
      <MemberModal
        name={name}
        message={msg}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

export default MemberComponent;
