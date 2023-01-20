import React, { useContext } from "react";

import { IonContent } from "@ionic/react";

/* Components */
import AdminReport from "./AdminReport";

import { GlobalContext } from "../../../context/Context";

import { ContextInterface, ReportInterface } from "../../../interfaces/interfaces";

import useFetch from "../../../utils/hooks/useFetch";
import { DOMAIN } from "../../../utils/utils";

const ShowReports: React.FC = () => {

    const { updateTokens } = useContext(GlobalContext) as ContextInterface;

    const { data: reports, err, loading } = useFetch(`http://${DOMAIN}/report?status=pending`, updateTokens);

    return (
        <IonContent>
            {reports && JSON.parse(JSON.stringify(reports)).pending.map((report: ReportInterface) => (<AdminReport key={report.id} report={report} />))}
            {loading && <div>...Loading</div>}
            {err && <div>Couldn't fetch data for reports!</div>}
        </IonContent>
    );
}

export default ShowReports;