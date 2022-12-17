import { IonBadge, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/react";
import React from "react";
import { ReportInterface } from "../../interfaces/interfaces";

const Report: React.FC<{report: ReportInterface}> = ({report}) => {
    
    const checkStatus = (status: string): string => {
        if (status === "completed") return "success";
        else if (status === "pending") return "warning";
        return "danger";
    }

    return (  
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Report {report.id}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonBadge className="test" color={checkStatus(report.status)} slot="start"> </IonBadge>
                <br />
                Location: {report.location}
                <br />
                Status: {report.status}
                <br />
                Image: {report.url}
            </IonCardContent>
        </IonCard>
    );
}
 
export default Report;
