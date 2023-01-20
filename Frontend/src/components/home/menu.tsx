import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { IonHeader, IonMenu, IonTitle, IonToolbar, IonContent, IonIcon, IonMenuToggle, useIonModal, useIonAlert, IonButton } from "@ionic/react";
import { arrowBackCircleOutline, bug, home, informationCircle, mail } from "ionicons/icons";

import ReportIssueModal from "../modals/Issue/client/ReportIssueModal";
import openReportIssueModal from "../modals/Issue/client/openReportIssueModal";
import ViewIssueModal from "../modals/Issue/admin/ViewIssueModal";
import openViewIssueModal from "../modals/Issue/admin/openViewIssueModal";

import { GlobalContext } from "../../context/Context";

import { ContextInterface } from "../../interfaces/interfaces";


const Menu: React.FC = () => {
    const [presentAlert] = useIonAlert();

    const { user, updateTokens } = useContext(GlobalContext) as ContextInterface;

    const [present, dismiss] = useIonModal(user?.type === "client" ? ReportIssueModal : ViewIssueModal, {
        onDismiss: (data: string, role: string) => dismiss(data, role)
    });


    return (
        <IonMenu contentId="main-content">
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
                    <IonMenuToggle autoHide={false}>
                        <Link to="/home">
                            <h3>
                                <IonIcon icon={home} size={"small"} />       Home
                            </h3>
                        </Link>
                    </IonMenuToggle>

                    <IonMenuToggle>
                        <Link to="/home/about">
                            <h3>
                                <IonIcon icon={informationCircle} size={"small"} />       About
                            </h3>
                        </Link>
                    </IonMenuToggle>

                    <IonMenuToggle>
                        <Link to="/home/contact">
                            <h3>
                                <IonIcon icon={mail} size={"small"} />       Contact
                            </h3>
                        </Link>
                    </IonMenuToggle>

                    <IonMenuToggle onClick={() => user?.type === "client" ? openReportIssueModal(present, updateTokens, presentAlert) : openViewIssueModal(present)}>
                        <h3>
                            <IonIcon icon={bug} size={"small"} />       Report a problem
                        </h3>
                    </IonMenuToggle>
                </div>
            </IonContent>
        </IonMenu>
    );
}

export default Menu;