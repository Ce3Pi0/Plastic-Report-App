import { IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { checkmarkOutline, closeOutline } from "ionicons/icons";
import React, { useState } from "react";
import { ReportInterface } from "../../../interfaces/interfaces";
import { reportRequest } from "../../../utils/hooks/reportRequest";
import { domain, STATIC_URL } from "../../../utils/utils";

const AdminReport: React.FC<{report: ReportInterface}> = ({report}) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleAccept = () => {
        reportRequest(`http://${domain}/report?id=${report.id}&user_id=${window.localStorage.getItem("id")}&status=completed`, "PUT")
    }

    const handleDecline = () => {
        reportRequest(`http://${domain}/report?id=${report.id}&user_id=${window.localStorage.getItem("id")}&status=rejected`, "PUT")
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
                        <img className = "trash-image" src={`http://${STATIC_URL}${report.url}.jpg`} alt="Image not found"/>
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


// i need to change the .jpg on img src after i fix image saving to the backend
//why does modal not close when X not pressed