import React from "react";

import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";

import { IReport } from "../../../interfaces/interfaces";

const ReportComponent: React.FC<{ report: IReport }> = ({ report }) => {
  const checkStatus = (status: string): string => {
    if (status === "completed") return "success";
    else if (status === "pending") return "warning";
    return "danger";
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Report</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <IonBadge
          className="min-[800px]:w-[10%] max-[800px]:w-[50%]"
          color={checkStatus(report.status)}
          slot="start"
        >
          {" "}
        </IonBadge>
        <br />
        Status: {report.status}
        <br />
        <img className="max-h-[150px]" src={report.url} alt="Not found" />
      </IonCardContent>
    </IonCard>
  );
};

export default ReportComponent;
