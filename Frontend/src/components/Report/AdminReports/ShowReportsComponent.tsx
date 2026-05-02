import React, { useContext, useState } from "react";

import { appsOutline, arrowBackOutline } from "ionicons/icons";
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
import { IoCheckmark, IoWarning } from "react-icons/io5";
import { RiProgress1Line } from "react-icons/ri";
import FilterPopover from "../../Misc/FilterPopover";

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

  return (
    <IonContent>
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        <IonRefresherContent />
      </IonRefresher>

      <FilterPopover
        direction="left"
        hidden={hidden}
        setHidden={setHidden}
        setStatus={setStatus}
      />

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
