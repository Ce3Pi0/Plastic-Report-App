import React, { useContext, useState } from "react";

import { IonContent, IonFab, IonFabButton, IonFabList, IonIcon, IonRefresher, IonRefresherContent } from "@ionic/react";

/* Components */
import AdminReport from "./AdminReport";

import { GlobalContext } from "../../../context/Context";

import { ContextInterface, ReportInterface } from "../../../interfaces/interfaces";

import useFetch from "../../../utils/hooks/useFetch";
import { DOMAIN, handleRefresh } from "../../../utils/utils";
import { alertOutline, appsOutline, arrowBackOutline, checkmark, codeWorkingOutline } from "ionicons/icons";

const ShowReports: React.FC = () => {

    const [status, setStatus] = useState("");
    const [hidden, setHidden] = useState<boolean>(false);

    const { updateTokens } = useContext(GlobalContext) as ContextInterface;

    const { data: reports, err, loading } = useFetch(`https://${DOMAIN}/report`, updateTokens);

    const hideTooltip = () => {
        if (hidden)
            document.getElementById("first_tooltip_text")!.style.visibility = "hidden";
        else
            document.getElementById("first_tooltip_text")!.style.visibility = "visible";
        setHidden(!hidden);
    }

    return (
        <IonContent>
            <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                <IonRefresherContent />
            </IonRefresher>
            <IonFab slot="fixed" horizontal="end" vertical="top">
                <div className="first_tooltip">
                    <IonFabButton size="small" onClick={e => hideTooltip()}>
                        <IonIcon icon={arrowBackOutline} />
                    </IonFabButton>
                    <span id="first_tooltip_text" className="tooltiptext-left">Filter</span>
                </div>

                <IonFabList className="tooltips" side="start" >
                    <div className="tooltip">
                        <IonFabButton size="small" color="success" onClick={() => {
                            setStatus("completed")
                            hideTooltip()
                        }}>
                            <IonIcon icon={checkmark} />
                        </IonFabButton>
                        <span className="tooltiptext-left">Completed</span>
                    </div>

                    <div className="tooltip">
                        <IonFabButton size="small" color="warning" onClick={() => {
                            setStatus("pending")
                            hideTooltip()
                        }}>
                            <IonIcon icon={codeWorkingOutline} />
                        </IonFabButton>
                        <span className="tooltiptext-left">Pending</span>
                    </div>

                    <div className="tooltip">
                        <IonFabButton size="small" color="danger" onClick={() => {
                            setStatus("rejected")
                            hideTooltip()
                        }}>
                            <IonIcon icon={alertOutline} />
                        </IonFabButton>
                        <span className="tooltiptext-left">Rejected</span>
                    </div>

                    <div className="tooltip">
                        <IonFabButton size="small" onClick={() => {
                            setStatus("")
                            hideTooltip()
                        }}>
                            <IonIcon icon={appsOutline} />
                        </IonFabButton>
                        <span className="tooltiptext-left">All</span>
                    </div>
                </IonFabList>
            </IonFab>
            <div style={{ marginTop: "100px" }}>
                {reports && JSON.parse(JSON.stringify(reports)).reports.filter((report: ReportInterface) => report.status === status || status === "").map((report: ReportInterface) => (<AdminReport key={report.id} report={report} />))}
                {loading && <div>...Loading</div>}
                {err && <div>Couldn't fetch data for reports!</div>}
            </div>
        </IonContent>
    );
}

export default ShowReports;