import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { IonHeader, IonMenu, IonTitle, IonToolbar, IonContent, IonIcon, IonMenuToggle, useIonModal, useIonAlert, IonButton, IonFab } from "@ionic/react";
import { arrowBackCircleOutline, bug, home, informationCircle, mail } from "ionicons/icons";

import ReportIssueModal from "../modals/Issue/client/ReportIssueModal";
import openReportIssueModal from "../modals/Issue/client/openReportIssueModal";
import ViewIssueModal from "../modals/Issue/admin/ViewIssueModal";
import openViewIssueModal from "../modals/Issue/admin/openViewIssueModal";

import { GlobalContext } from "../../context/Context";

import { ContextInterface } from "../../interfaces/interfaces";


const Menu: React.FC = () => {
    const [presentAlert] = useIonAlert();
    const menuRef = useRef<any>(undefined);

    const { user, updateTokens } = useContext(GlobalContext) as ContextInterface;

    const [present, dismiss] = useIonModal(user?.type === "client" ? ReportIssueModal : ViewIssueModal, {
        onDismiss: (data: string, role: string) => dismiss(data, role)
    });

    return (
        <IonMenu contentId="main-content" menuId="test" ref={menuRef}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Menu</IonTitle>
                    <IonMenuToggle slot="end" className="hide-menu">
                        <IonIcon icon={arrowBackCircleOutline} size={"large"} />
                    </IonMenuToggle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <div className="links">
                        <Link to="/home" onClick={() => menuRef.current?.isOpen().then((res: any) => {if(res === true) menuRef.current?.close()})}>
                            <h3>
                                <IonIcon icon={home} size={"small"} />       Home
                            </h3>
                        </Link>

                        <Link to="/home/about" onClick={() => menuRef.current?.isOpen().then((res: any) => {if(res === true) menuRef.current?.close()})}>
                            <h3>
                                <IonIcon icon={informationCircle} size={"small"} />       About
                            </h3>
                        </Link>

                        <Link to="/home/contact" onClick={() => menuRef.current?.isOpen().then((res: any) => {if(res === true) menuRef.current?.close()})}>
                            <h3>
                                <IonIcon icon={mail} size={"small"} />       Contact
                            </h3>
                        </Link>

                        <h3 onClick={() => user?.type === "client" ? openReportIssueModal(present, updateTokens, presentAlert) : openViewIssueModal(present)}>
                            <IonIcon icon={bug} size={"small"} />       Report a problem
                        </h3>
                </div>
            </IonContent>
        </IonMenu>
    );
}

export default Menu;