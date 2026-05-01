import React, { useContext, useState } from "react";

import {
  alertOutline,
  appsOutline,
  arrowBackOutline,
  checkmark,
  codeWorkingOutline,
} from "ionicons/icons";
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  useIonRouter,
} from "@ionic/react";

/* Components */
import AdminReport from "./AdminReportComponent";

import { GlobalContext } from "../../../context/Context";

import { IContext, IReport } from "../../../interfaces/interfaces";

import useFetch from "../../../utils/hooks/useFetch";
import { DOMAIN } from "../../../config";
import { handleRefresh } from "../../../utils/utils";

const ShowReportsComponent: React.FC = () => {
  const router = useIonRouter();

  const [status, setStatus] = useState("");
  const [hidden, setHidden] = useState<boolean>(false);

  const { updateTokens } = useContext(GlobalContext) as IContext;

  const {
    data: reports,
    err,
    loading,
  } = useFetch(`${DOMAIN}/report`, updateTokens, router);

  const HideTooltip = () => {
    if (hidden)
      document.getElementById("first_tooltip_text")!.style.visibility =
        "hidden";
    else
      document.getElementById("first_tooltip_text")!.style.visibility =
        "visible";
    setHidden(!hidden);
  };

  return (
    <IonContent>
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        <IonRefresherContent />
      </IonRefresher>
      <IonFab slot="fixed" horizontal="end" vertical="top">
        <div className="group relative inline-block">
          <IonFabButton size="small" onClick={(e) => HideTooltip()}>
            <IonIcon icon={arrowBackOutline} />
          </IonFabButton>
          <span
            id="first_tooltip_text"
            className="invisible group-hover:visible w-[100%] bg-[var(--ion-color-light-contrast)] text-[var(--ion-color-light)] text-center rounded-[6px] pt-[5px] pr-0 absolute text-[9.5px] z-1 top-[100%] left-[0%]"
          >
            Filter
          </span>
        </div>

        <IonFabList className="tooltips" side="start">
          <div className="group relative inline-block">
            <IonFabButton
              size="small"
              color="success"
              onClick={() => {
                setStatus("completed");
                HideTooltip();
              }}
            >
              <IonIcon icon={checkmark} />
            </IonFabButton>
            <span className="invisible group-hover:visible w-[100%] bg-[var(--ion-color-light-contrast)] text-[var(--ion-color-light)] text-center rounded-[6px] pt-[5px] pr-0 absolute text-[9.5px] z-1 top-[100%] left-[0%]">
              Completed
            </span>
          </div>

          <div className="group relative inline-block">
            <IonFabButton
              size="small"
              color="warning"
              onClick={() => {
                setStatus("pending");
                HideTooltip();
              }}
            >
              <IonIcon icon={codeWorkingOutline} />
            </IonFabButton>
            <span className="invisible group-hover:visible w-[100%] bg-[var(--ion-color-light-contrast)] text-[var(--ion-color-light)] text-center rounded-[6px] pt-[5px] pr-0 absolute text-[9.5px] z-1 top-[100%] left-[0%]">
              Pending
            </span>
          </div>

          <div className="group relative inline-block">
            <IonFabButton
              size="small"
              color="danger"
              onClick={() => {
                setStatus("rejected");
                HideTooltip();
              }}
            >
              <IonIcon icon={alertOutline} />
            </IonFabButton>
            <span className="invisible group-hover:visible w-[100%] bg-[var(--ion-color-light-contrast)] text-[var(--ion-color-light)] text-center rounded-[6px] pt-[5px] pr-0 absolute text-[9.5px] z-1 top-[100%] left-[0%]">
              Rejected
            </span>
          </div>

          <div className="group relative inline-block">
            <IonFabButton
              size="small"
              onClick={() => {
                setStatus("");
                HideTooltip();
              }}
            >
              <IonIcon icon={appsOutline} />
            </IonFabButton>
            <span className="invisible group-hover:visible w-[100%] bg-[var(--ion-color-light-contrast)] text-[var(--ion-color-light)] text-center rounded-[6px] pt-[5px] pr-0 absolute text-[9.5px] z-1 top-[100%] left-[0%]">
              All
            </span>
          </div>
        </IonFabList>
      </IonFab>
      <div style={{ marginTop: "100px" }}>
        {reports &&
          JSON.parse(JSON.stringify(reports))
            .reports.filter(
              (report: IReport) => report.status === status || status === "",
            )
            .map((report: IReport) => (
              <AdminReport key={report.id} report={report} />
            ))}
        {loading && <div>...Loading</div>}
        {err && <div>Couldn't fetch data for reports!</div>}
      </div>
    </IonContent>
  );
};

export default ShowReportsComponent;
