import React, { useContext, useState } from "react";

import { IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { checkmarkOutline, closeOutline } from "ionicons/icons";

import { GlobalContext } from "../../../context/Context";

import { ContextInterface, ReportInterface } from "../../../interfaces/interfaces";

import { reportRequest } from "../../../utils/hooks/reportRequest";
import { DOMAIN, STATIC_URL } from "../../../utils/utils";


const AdminReport: React.FC<{report: ReportInterface}> = ({report}) => {

    const { updateTokens } = useContext(GlobalContext) as ContextInterface;

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleAccept = () => {
        reportRequest(`http://${DOMAIN}/report?id=${report.id}&user_id=${window.localStorage.getItem("id")}&status=completed`, "PUT", undefined, updateTokens, undefined, undefined)
    }

    const handleDecline = () => {
        reportRequest(`http://${DOMAIN}/report?id=${report.id}&user_id=${window.localStorage.getItem("id")}&status=rejected`, "PUT", undefined, updateTokens, undefined, undefined)
    }

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Report {report.id}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonBadge className="test" color={"warning"} slot="start"> </IonBadge>
                <br />
                Location: {report.location}
                <br />
                Status: {report.status}
                <br />

                <IonButton size="small" color={"primary"} onClick={() => {
                    if (isOpen){
                        setIsOpen(false)
                        return;
                    }
                    setIsOpen(true);
                }}>{isOpen? "Close Image":"Show image"}</IonButton>
            </IonCardContent>

            <IonModal isOpen={isOpen}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Image</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => {
                                setIsOpen(false);
                                }}>Close</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent className="ion-padding">
                    <div className="container">
                        <img className = "trash-image" src={`http://${STATIC_URL}${report.url}`} alt="Image not found"/>
                    </div>
                </IonContent>
            </IonModal>

            <IonFab horizontal="end" vertical="top">
                <IonFabButton size="small" color={"success"} onClick={() => {handleAccept()}}>
                    <IonIcon icon={checkmarkOutline} />
                </IonFabButton>
            </IonFab>

            <IonFab horizontal="end" vertical="bottom">
                <IonFabButton size="small" color={"danger"} onClick={() => {handleDecline()}}>
                    <IonIcon icon={closeOutline} />
                </IonFabButton>
            </IonFab>
        </IonCard>)
}
 
export default AdminReport;