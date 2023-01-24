import React, { useContext, useState } from "react";

import { IonContent, IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/react";

/* Components */
import AdminReport from "./AdminReport";

import { GlobalContext } from "../../../context/Context";

import { ContextInterface, ReportInterface } from "../../../interfaces/interfaces";

import useFetch from "../../../utils/hooks/useFetch";
import { DOMAIN } from "../../../utils/utils";
import { alertOutline, appsOutline, arrowDownOutline, checkmark, codeWorkingOutline } from "ionicons/icons";

const ShowReports: React.FC = () => {

    const [status, setStatus] = useState("");
    const [hidden, setHidden] = useState<boolean>(false);

    const { updateTokens } = useContext(GlobalContext) as ContextInterface;

    const { data: reports, err, loading } = useFetch(`http://${DOMAIN}/report`, updateTokens);

    const hideTooltip = () => {
        if (hidden)
            document.getElementById("first_tooltip_text")!.style.visibility = "hidden";
        else
            document.getElementById("first_tooltip_text")!.style.visibility = "visible";
        setHidden(!hidden);
    }

    return (
        <IonContent>
            <IonFab slot="fixed" horizontal="end" vertical="top">
                <div className="first_tooltip">
                    <IonFabButton size="small" onClick={e => hideTooltip()}>
                        <IonIcon icon={arrowDownOutline} />
                    </IonFabButton>
                    <span id="first_tooltip_text" className="tooltiptext">Filter reports</span>
                </div>

                <IonFabList className="tooltips" side="bottom" >
                    <div className="tooltip">
                        <IonFabButton size="small" color="success" onClick={() => {
                            setStatus("completed")
                            hideTooltip()
                        }}>
                            <IonIcon icon={checkmark} />
                        </IonFabButton>
                        <span className="tooltiptext">Completed</span>
                    </div>

                    <div className="tooltip">
                        <IonFabButton size="small" color="warning" onClick={() => {
                            setStatus("pending")
                            hideTooltip()
                        }}>
                            <IonIcon icon={codeWorkingOutline} />
                        </IonFabButton>
                        <span className="tooltiptext">Pending</span>
                    </div>

                    <div className="tooltip">
                        <IonFabButton size="small" color="danger" onClick={() => {
                            setStatus("rejected")
                            hideTooltip()
                        }}>
                            <IonIcon icon={alertOutline} />
                        </IonFabButton>
                        <span className="tooltiptext">Rejected</span>
                    </div>

                    <div className="tooltip">
                        <IonFabButton size="small" onClick={() => {
                            setStatus("")
                            hideTooltip()
                        }}>
                            <IonIcon icon={appsOutline} />
                        </IonFabButton>
                        <span className="tooltiptext">All</span>
                    </div>
                </IonFabList>
            </IonFab>
            {reports && JSON.parse(JSON.stringify(reports)).reports.filter((report: ReportInterface) => report.status === status || status === "").map((report: ReportInterface) => (<AdminReport key={report.id} report={report} />))}
            {loading && <div>...Loading</div>}
            {err && <div>Couldn't fetch data for reports!</div>}
        </IonContent>
    );
}

export default ShowReports;