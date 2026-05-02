import React from "react";

import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";

import { IReport } from "../../../interfaces/interfaces";
import { IoCheckmark, IoWarning } from "react-icons/io5";
import { RiProgress1Line } from "react-icons/ri";
import { checkStatus } from "../../../utils/utils";

const ReportComponent: React.FC<{ report: IReport }> = ({ report }) => {
  const badgeColor = checkStatus(report.status);

  return (
    <IonCard className="border-2 border-solid border-[--ion-color-primary]">
      <IonCardHeader>
        <IonCardTitle>Report</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <div className="flex items-center justify-around pb-2 w-fit">
          <IonBadge color={badgeColor} slot="start" className="mr-2">
            {badgeColor === "danger" && <IoWarning />}
            {badgeColor === "success" && <IoCheckmark />}
            {badgeColor === "warning" && <RiProgress1Line />}
          </IonBadge>
          <p>Status: {report.status}</p>
        </div>
        <img className="max-h-[100px]" src={report.url} alt="Not found" />
      </IonCardContent>
    </IonCard>
  );
};

export default ReportComponent;
