import { IonContent } from "@ionic/react";
import React from "react";
import { ReportInterface } from "../../interfaces/interfaces";
import useFetch from "../../utils/hooks/useFetch";
import { domain } from "../../utils/utils";
import AdminReport from "./AdminReport";

const ShowReports:React.FC = () => {
    const {data: reports, err, loading} = useFetch(`http://${domain}/report?status=pending`);

    if (reports)
        console.log(JSON.parse(JSON.stringify(reports)).pending);


    return (  
        <IonContent>
            {reports && JSON.parse(JSON.stringify(reports)).pending.map((report: ReportInterface) => (<AdminReport key={report.id} report={report}/>))}
            {loading && <div>...Loading</div>}
            {err && <div>Couldn't fetch data for reports!</div>}
        </IonContent>
    );
}
 
export default ShowReports;