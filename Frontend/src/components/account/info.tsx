import React, { useContext, useState } from "react";

import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/react";
import { alertOutline, appsOutline, arrowDownOutline, codeWorkingOutline, checkmark } from "ionicons/icons";

/* Components */
import Report from "./report";

import { GlobalContext } from "../../context/Context";

import { ReportInterface, ContextInterface } from "../../interfaces/interfaces";

import useFetch from '../../utils/hooks/useFetch';
import { DOMAIN } from '../../utils/utils';


const Info: React.FC = () => {

    const { setLoggedIn, updateTokens } = useContext(GlobalContext) as ContextInterface;
    const [status, setStatus] = useState("");

    const { data, err, loading } = useFetch(`http://${DOMAIN}/user?id=${window.localStorage.getItem("id")}`, updateTokens);
    const { data: reports, err: reports_error, loading: reports_loading } = useFetch(`http://${DOMAIN}/report?user_id=${window.localStorage.getItem("id")}`, updateTokens);


    const updateUserImage = () => {
        return;
    }

    return (
        <div>
            {data &&
                <>
                    <IonFab slot="fixed" horizontal="end" vertical="top" >
                        <div className="tooltip">
                            <IonFabButton size="small">
                                <IonIcon icon={arrowDownOutline} />
                            </IonFabButton>
                            <span className="tooltiptext">Filter reports</span>
                        </div>

                        <IonFabList className="tooltips" side="bottom">
                            <div className="tooltip">
                                <IonFabButton size="small" color="success" onClick={() => setStatus("completed")}>
                                    <IonIcon icon={checkmark} />
                                </IonFabButton>
                                <span className="tooltiptext">Completed</span>
                            </div>

                            <div className="tooltip">
                                <IonFabButton size="small" color="warning" onClick={() => setStatus("pending")}>
                                    <IonIcon icon={codeWorkingOutline} />
                                </IonFabButton>
                                <span className="tooltiptext">Pending</span>
                            </div>

                            <div className="tooltip">
                                <IonFabButton size="small" color="danger" onClick={() => setStatus("rejected")}>
                                    <IonIcon icon={alertOutline} />
                                </IonFabButton>
                                <span className="tooltiptext">Rejected</span>
                            </div>

                            <div className="tooltip">
                                <IonFabButton size="small" onClick={() => setStatus("")}>
                                    <IonIcon icon={appsOutline} />
                                </IonFabButton>
                                <span className="tooltiptext">All</span>
                            </div>
                        </IonFabList>
                    </IonFab>

                    <IonCard className="account-info">

                        <IonCardHeader>
                            <IonAvatar onClick={() => updateUserImage()}>
                                <div id="avatar">
                                    <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />

                                    <div className="middle">
                                        <p>Change image</p>
                                    </div>
                                </div>
                            </IonAvatar>
                            <IonCardTitle><h1>{JSON.parse(JSON.stringify(data)).user.username}</h1></IonCardTitle>
                            <IonCardSubtitle>{JSON.parse(JSON.stringify(data)).user.email}</IonCardSubtitle>
                        </IonCardHeader>

                        <IonCardContent>
                            Welcome to your account {JSON.parse(JSON.stringify(data)).user.gender === "male" && "mr."} {JSON.parse(JSON.stringify(data)).user.gender === "female" && "mrs."} {JSON.parse(JSON.stringify(data)).user.name}
                        </IonCardContent>

                        <IonButton color={"tertiary"} fill="clear" onClick={() => setLoggedIn(false, null)}>Log out</IonButton>
                        <IonButton color={"tertiary"} fill="clear" onClick={() => window.location.assign('/account/change')}>Change Password</IonButton>
                    </IonCard>

                    <div className="container">
                        <div className="center-text">
                            <h2>Your reports:</h2>
                        </div>
                    </div>

                    {reports && JSON.parse(JSON.stringify(reports)).reports.filter((report: ReportInterface) => report.status === status || status === "").map((report: ReportInterface) => (<Report key={report.id} report={report} />))}
                    {reports_loading && <div>...Loading</div>}
                    {reports_error && <div>Error while fetching data</div>}
                </>
            }
            {loading && <div>...Loading</div>}
            {err && <div>Error while fetching data</div>}
        </div>
    );
}

export default Info;