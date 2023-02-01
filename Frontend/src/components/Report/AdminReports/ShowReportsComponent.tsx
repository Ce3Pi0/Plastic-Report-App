import React, { useContext, useState } from "react";

import { alertOutline, appsOutline, arrowBackOutline, checkmark, codeWorkingOutline } from "ionicons/icons";
import { IonContent, IonFab, IonFabButton, IonFabList, IonIcon, IonRefresher, IonRefresherContent } from "@ionic/react";

/* Components */
import AdminReport from "./AdminReportComponent";

import { GlobalContext } from "../../../context/Context";

import { IContext, IReport } from "../../../interfaces/interfaces";

import useFetch from "../../../utils/hooks/useFetch";
import { DOMAIN, HandleRefresh } from "../../../utils/utils";


const ShowReportsComponent: React.FC = () => {

    const [status, setStatus] = useState("");
    const [hidden, setHidden] = useState<boolean>(false);

    const { updateTokens } = useContext(GlobalContext) as IContext;

    const { data: reports, err, loading } = useFetch(`https://${DOMAIN}/report`, updateTokens);

    const HideTooltip = () => {
        if (hidden)
            document.getElementById("first_tooltip_text")!.style.visibility = "hidden";
        else
            document.getElementById("first_tooltip_text")!.style.visibility = "visible";
        setHidden(!hidden);
    }

    return (
        <IonContent>
            <IonRefresher slot="fixed" onIonRefresh={HandleRefresh}>
                <IonRefresherContent />
            </IonRefresher>
            <IonFab slot="fixed" horizontal="end" vertical="top">
                <div className="first_tooltip">
                    <IonFabButton size="small" onClick={e => HideTooltip()}>
                        <IonIcon icon={arrowBackOutline} />
                    </IonFabButton>
                    <span id="first_tooltip_text" className="tooltiptext-left">Filter</span>
                </div>

                <IonFabList className="tooltips" side="start" >
                    <div className="tooltip">
                        <IonFabButton size="small" color="success" onClick={() => {
                            setStatus("completed")
                            HideTooltip()
                        }}>
                            <IonIcon icon={checkmark} />
                        </IonFabButton>
                        <span className="tooltiptext-left">Completed</span>
                    </div>

                    <div className="tooltip">
                        <IonFabButton size="small" color="warning" onClick={() => {
                            setStatus("pending")
                            HideTooltip()
                        }}>
                            <IonIcon icon={codeWorkingOutline} />
                        </IonFabButton>
                        <span className="tooltiptext-left">Pending</span>
                    </div>

                    <div className="tooltip">
                        <IonFabButton size="small" color="danger" onClick={() => {
                            setStatus("rejected")
                            HideTooltip()
                        }}>
                            <IonIcon icon={alertOutline} />
                        </IonFabButton>
                        <span className="tooltiptext-left">Rejected</span>
                    </div>

                    <div className="tooltip">
                        <IonFabButton size="small" onClick={() => {
                            setStatus("")
                            HideTooltip()
                        }}>
                            <IonIcon icon={appsOutline} />
                        </IonFabButton>
                        <span className="tooltiptext-left">All</span>
                    </div>
                </IonFabList>
            </IonFab>
            <div style={{ marginTop: "100px" }}>
                {reports && JSON.parse(JSON.stringify(reports)).reports.filter((report: IReport) => report.status === status || status === "").map((report: IReport) => (<AdminReport key={report.id} report={report} />))}
                {loading && <div>...Loading</div>}
                {err && <div>Couldn't fetch data for reports!</div>}
            </div>
        </IonContent>
    );
}

export default ShowReportsComponent;