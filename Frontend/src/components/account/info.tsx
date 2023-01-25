import React, { useContext, useState } from "react";

import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonModal, IonTitle, IonToolbar, useIonAlert, useIonModal } from "@ionic/react";
import { alertOutline, appsOutline, arrowDownOutline, codeWorkingOutline, checkmark } from "ionicons/icons";

/* Components */
import Report from "./report";

import { GlobalContext } from "../../context/Context";

import { ReportInterface, ContextInterface } from "../../interfaces/interfaces";

import useFetch from '../../utils/hooks/useFetch';
import { DOMAIN, STATIC_URL } from '../../utils/utils';
import UpdateUserImageModal from "../modals/Image/imageUpdateModal";
import openImageUpdateModal from "../modals/Image/openImageUpdateModal";


const Info: React.FC = () => {

    const { setLoggedIn, updateTokens } = useContext(GlobalContext) as ContextInterface;

    const [status, setStatus] = useState("");
    const [hidden, setHidden] = useState<boolean>(false);

    const { user } = useContext(GlobalContext) as ContextInterface;

    const { data, err, loading } = useFetch(`https://${DOMAIN}/user?id=${window.localStorage.getItem("id")}`, updateTokens);
    const { data: reports, err: reports_error, loading: reports_loading } = useFetch(`https://${DOMAIN}/report`, updateTokens);

    const [presentAlert] = useIonAlert();
    const [present, dismiss] = useIonModal(UpdateUserImageModal, {
        onDismiss: (data: string, role: string) => dismiss(data, role)
    });

    const logOut = () => {
        window.localStorage.clear();
        setLoggedIn(false, null)
    }

    const hideTooltip = () => {
        if (hidden)
            document.getElementById("first_tooltip_text")!.style.visibility = "hidden";
        else
            document.getElementById("first_tooltip_text")!.style.visibility = "visible";
        setHidden(!hidden);
    }

    return (
        <div>
            {data &&
                <>
                    <IonFab slot="fixed" horizontal="end" vertical="top">
                        <div className="first_tooltip">
                            <IonFabButton size="small" onClick={e => hideTooltip()}>
                                <IonIcon icon={arrowDownOutline} />
                            </IonFabButton>
                            <span id="first_tooltip_text" className="tooltiptext">Filter</span>
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

                    <IonCard className="account-info">

                        <IonCardHeader>
                            <IonAvatar >
                                <div id="avatar" onClick={() => openImageUpdateModal(present, updateTokens, presentAlert)}>
                                    {data && <img alt="Silhouette of a person's head" src={JSON.parse(JSON.stringify(data)).user.img_url === null ? "https://ionicframework.com/docs/img/demos/avatar.svg" : `http://${STATIC_URL}${JSON.parse(JSON.stringify(data)).user.img_url}`} />}

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

                        <IonButton color={"tertiary"} fill="clear" onClick={() => logOut()}>Log out</IonButton>
                        <IonButton color={"tertiary"} fill="clear" onClick={() => window.location.assign('/account/change')}>Change Password</IonButton>
                    </IonCard>

                    <div className="container">
                        <div className="center-text">
                            <h2>Your reports:</h2>
                        </div>
                    </div>

                    {reports && JSON.parse(JSON.stringify(reports)).reports.filter((report: ReportInterface) => report.user_id === user!.id && (report.status === status || status === "")).map((report: ReportInterface) => (<Report key={report.id} report={report} />))}
                    {reports_loading && <div>...Loading</div>}
                    {reports_error && <div>Error while fetching data</div>}
                </>
            }
            {loading && <div>...Loading</div>}
            {err &&
                <div>
                    <p style={{ textAlign: "center" }}>Error while fetching user data</p>
                    <IonFab horizontal="center">
                        <IonButton onClick={() => logOut()}>Logout</IonButton>
                    </IonFab>
                </div>}
        </div>
    );
}

export default Info;