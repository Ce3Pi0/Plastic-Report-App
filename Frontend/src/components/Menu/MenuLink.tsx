import { IonIcon } from "@ionic/react";
import { home } from "ionicons/icons";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  menuRef: React.MutableRefObject<any>;
  icon: string;
  text: string;
}

const MenuLink = ({ to, menuRef, icon, text }: Props) => {
  return (
    <Link
      className="text-[#cdcdcd] no-underline hover:cursor-pointer hover:text-[var(--ion-color-light-contrast)]"
      to={to}
      onClick={() =>
        menuRef.current?.isOpen().then((res: any) => {
          if (res === true) menuRef.current?.close();
        })
      }
    >
      <h3>
        <IonIcon icon={icon} size={"small"} /> {text}
      </h3>
    </Link>
  );
};

export default MenuLink;
