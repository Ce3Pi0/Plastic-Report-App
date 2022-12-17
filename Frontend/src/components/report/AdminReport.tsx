import { IonBadge, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { checkmarkOutline, closeOutline } from "ionicons/icons";
import React from "react";
import { ReportInterface } from "../../interfaces/interfaces";
import { reportRequest } from "../../utils/hooks/reportRequest";
import { domain } from "../../utils/utils";

const AdminReport: React.FC<{report: ReportInterface}> = ({report}) => {
    
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
                Image: {report.url}
            </IonCardContent>

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