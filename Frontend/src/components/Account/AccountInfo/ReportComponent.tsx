import React from "react";

import { IonBadge, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/react";

import { IReport } from "../../../interfaces/interfaces";

import { STATIC_URL } from "../../../utils/utils";


const ReportComponent: React.FC<{ report: IReport }> = ({ report }) => {

    const checkStatus = (status: string): string => {
        if (status === "completed") return "success";
        else if (status === "pending") return "warning";
        return "danger";
    }

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>
                    Report
                </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonBadge className="test" color={checkStatus(report.status)} slot="start"> </IonBadge>


                <br />

                Status: {report.status}

                <br />

                <img className="trash-image-info" src={`https://${STATIC_URL}${report.url}`} alt="Image not found" />
            </IonCardContent>
        </IonCard>
    );
}

export default ReportComponent;