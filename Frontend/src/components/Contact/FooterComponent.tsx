import React from "react";
import { FaPhone } from "react-icons/fa";
import { IoLocationSharp, IoMail } from "react-icons/io5";

import { IonIcon } from "@ionic/react";
import { logoFacebook, logoInstagram, logoYoutube } from "ionicons/icons";

import { Link } from "react-router-dom";

import logo from "../../images/logo.png";

const FooterComponent: React.FC = () => {
  const openGoogleMapsLocation = () => {
    window.open(
      "https://www.google.com/maps/place/Bitola,+North+Macedonia/@41.0257957,21.2873858,13z/data=!3m1!4b1!4m6!3m5!1s0x13572451365fb6fd:0xfa67bbbf65bec948!8m2!3d41.0296773!4d21.3292164!16zL20vMDE4MTQ?entry=ttu&g_ep=EgoyMDI2MDQyMi4wIKXMDSoASAFQAw%3D%3D",
      "_blank",
    );
  };

  return (
    //
    <footer className="bg-[#4a4a4a] shadow-[0_1px_1px_0_rgba(0,0,0,0.12)] box-border w-[100%] text-left py-[55px] px-[50px] font-sans text-[16px] max-[880px]:text-[14px]">
      <div className="inline-block align-top w-[40%] max-[880px]:block max-[880px]:w-[100%] max-[880px]:mb-[40px] max-[880px]:text-center">
        <h3 className="text-3xl m-0">
          3D<span className="text-[var(--ion-color-tertiary)]">Factory</span>
        </h3>
        <p className="text-sm font-normal m-0 text-[#b9b9b9]">
          Be part of the solution, not pollution © 2023
        </p>

        <Link to="/home" className="flex flex-col items-center align-middle">
          <img
            id="company-logo"
            className="w-[30%] mb-[-10%]"
            src={logo}
            alt="3D factory logo"
          />
        </Link>
      </div>

      <div className="inline-block align-top w-[35%] max-[880px]:block max-[880px]:w-[100%] max-[880px]:mb-[40px] max-[880px]:text-center">
        <div className="flex flex-row justify-start items-center hover:cursor-pointer">
          <i
            className="bg-[#33383b] text-white text-2xl w-[38px] h-[38px] rounded-[50%] mt-[10px] mr-[15px] align-middle text-center  flex justify-center items-center p-0 max-[880px]:ml-0"
            onClick={() => openGoogleMapsLocation()}
          >
            <p>
              <IoLocationSharp />
            </p>
          </i>
          <p className="text-white font-normal align-middle m-0 inline-block">
            7000 Bitola, North Macedonia
          </p>
        </div>

        <div className="flex flex-row justify-start items-center">
          <i className="bg-[#33383b] text-white text-2xl w-[38px] h-[38px] rounded-[50%] mt-[10px] mr-[15px] align-middle text-center  flex justify-center items-center p-0">
            <p>
              <IoMail />
            </p>
          </i>
          <p className="text-white font-normal align-middle m-0 inline-block">
            <a
              className="text-[var(--ion-color-tertiary)] no-underline"
              href="mailto:hristijannikolovski16@gmail.com"
            >
              hristijannikolovski16@gmail.com
            </a>
          </p>
        </div>
      </div>

      <div className="inline-block align-top w-[20%] mr-[-10%] max-[880px]:block max-[880px]:w-[100%] max-[880px]:mb-[40px] max-[880px]:text-center">
        <div className="mt-[25px]">
          <a
            className="inline-block w-[35px] h-[35px] cursor-pointer rounded-[2px] text-xl text-white text-center mr-[7px] mb-[5px]"
            href="https://www.facebook.com/profile.php?id=100085664212659"
            target="_blank"
            rel="noreferrer"
          >
            <IonIcon size="large" icon={logoFacebook} />
          </a>
          <a
            className="inline-block w-[35px] h-[35px] cursor-pointer rounded-[2px] text-xl text-white text-center mr-[7px] mb-[5px]"
            href="https://instagram.com/3dprints_art?igshid=YmMyMTA2M2Y="
            target="_blank"
            rel="noreferrer"
          >
            <IonIcon size="large" icon={logoInstagram} />
          </a>
          <a
            className="inline-block w-[35px] h-[35px] cursor-pointer rounded-[2px] text-xl text-white text-center mr-[7px] mb-[5px]"
            href="https://www.youtube.com/channel/UCO95fXFiVyZ3ifiX2ixsiUw"
            target="_blank"
            rel="noreferrer"
          >
            <IonIcon size="large" icon={logoYoutube} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
