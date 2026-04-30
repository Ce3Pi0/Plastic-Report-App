import React, { useContext, useRef } from "react";

import {
  IonHeader,
  IonMenu,
  IonTitle,
  IonToolbar,
  IonContent,
  IonIcon,
  IonMenuToggle,
  useIonModal,
  useIonAlert,
} from "@ionic/react";
import {
  arrowBackCircleOutline,
  bug,
  home,
  informationCircle,
  mail,
} from "ionicons/icons";

import ReportIssueModal from "../Modals/Issue/client/ReportIssueModal";
import openReportIssueModal from "../Modals/Issue/client/openReportIssueModal";
import ViewIssueModal from "../Modals/Issue/admin/ViewIssueModal";

import { GlobalContext } from "../../context/Context";

import { IContext } from "../../interfaces/interfaces";
import MenuLink from "./MenuLink";

const MenuComponent: React.FC = () => {
  const [presentAlert] = useIonAlert();
  const menuRef = useRef<any>(undefined);

  const { user, updateTokens } = useContext(GlobalContext) as IContext;

  const [present, dismiss] = useIonModal(
    user?.type === "client" ? ReportIssueModal : ViewIssueModal,
    {
      onDismiss: (data: string, role: string) => dismiss(data, role),
    },
  );

  return (
    <IonMenu contentId="main-content" menuId="test" ref={menuRef}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
          <IonMenuToggle
            slot="end"
            className="text-[#cdcdcd] p-[6px] hover:cursor-pointer hover:text-white"
          >
            <IonIcon icon={arrowBackCircleOutline} size={"large"} />
          </IonMenuToggle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div>
          <MenuLink to="/home" menuRef={menuRef} icon={home} text="Home" />
          <MenuLink
            to="/home/about"
            menuRef={menuRef}
            icon={informationCircle}
            text="About"
          />
          <MenuLink
            to="/home/contact"
            menuRef={menuRef}
            icon={mail}
            text="Contact"
          />

          <h3
            className="text-[#cdcdcd] no-underline hover:cursor-pointer hover:text-[var(--ion-color-light-contrast)]"
            onClick={() =>
              openReportIssueModal(present, updateTokens, presentAlert)
            }
          >
            <IonIcon icon={bug} size={"small"} />{" "}
            {user?.type === "client" ? "Report an issue" : "View issues"}
          </h3>
        </div>
      </IonContent>
    </IonMenu>
  );
};

export default MenuComponent;
