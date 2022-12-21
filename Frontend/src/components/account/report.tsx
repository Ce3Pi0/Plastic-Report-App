import { IonBadge, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/react";
import React from "react";
import { ReportInterface } from "../../interfaces/interfaces";
import { STATIC_URL } from "../../utils/utils";

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
                
                <img className = "trash-image-info" src={`http://${STATIC_URL}${report.url}.jpg`} alt="Image not found"/> 
            </IonCardContent>
        </IonCard>
    );
}
 
export default Report;


// i need to change the .jpg on img src after i fix image saving to the backend