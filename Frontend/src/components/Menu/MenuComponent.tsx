import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";

import { IonHeader, IonMenu, IonTitle, IonToolbar, IonContent, IonIcon, IonMenuToggle, useIonModal, useIonAlert } from "@ionic/react";
import { arrowBackCircleOutline, bug, home, informationCircle, mail } from "ionicons/icons";

import ReportIssueModal from "../Modals/Issue/client/ReportIssueModal";
import openReportIssueModal from "../Modals/Issue/client/openReportIssueModal";
import ViewIssueModal from "../Modals/Issue/admin/ViewIssueModal";

import { GlobalContext } from "../../context/Context";

import { IContext } from "../../interfaces/interfaces";

import './Menu.css';


const MenuComponent: React.FC = () => {
    
    const [presentAlert] = useIonAlert();
    const menuRef = useRef<any>(undefined);

    const { user, updateTokens } = useContext(GlobalContext) as IContext;

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

                        <h3 onClick={() => openReportIssueModal(present, updateTokens, presentAlert)}>
                            <IonIcon icon={bug} size={"small"} />       {user?.type === "client"? "Report an issue":"View issues"}
                        </h3>
                </div>
            </IonContent>
        </IonMenu>
    );
}

export default MenuComponent;