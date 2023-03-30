import React, { useContext, useState } from "react";

import { IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonLoading, IonModal, IonTitle, IonToolbar, useIonAlert } from "@ionic/react";
import { checkmarkOutline, closeOutline } from "ionicons/icons";

import { GlobalContext } from "../../../context/Context";

import { IContext, IReport } from "../../../interfaces/interfaces";

import { reportRequest } from "../../../utils/hooks/reportRequest";
import { DOMAIN, STATIC_URL } from "../../../utils/utils";
import useAddressFetch from "../../../utils/hooks/requestAddress";


const AdminReportComponent: React.FC<{ report: IReport }> = ({ report }) => {

    const { updateTokens } = useContext(GlobalContext) as IContext;
    const [loading, setLoading] = useState<boolean>(false);

    const [ presentAlert ] = useIonAlert();

    //geoapify.com
    const { data, err, loading:location_loading } = useAddressFetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${report.lat}&lon=${report.lon}&apiKey=93ef976230904f26bf7ff03fd45f39aa`);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const HandleAccept = () => {
        reportRequest(`https://${DOMAIN}/report?id=${report.id}&status=completed`, "PUT", undefined, updateTokens, presentAlert, undefined, setLoading)
    }

    const HandleDecline = () => {
        reportRequest(`https://${DOMAIN}/report?id=${report.id}&status=rejected`, "PUT", undefined, updateTokens, presentAlert, undefined, setLoading)
    }

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Report {report.id}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonLoading isOpen={loading} message={"Applying changes..."} />
                <IonBadge className="test" color={report.status === "pending"? "warning": report.status ==="completed"? "success":"danger"} slot="start"> </IonBadge>
                <br />
                Location: {location_loading && "...Loading location"}{err && `${report.lat} ${report.lon}`}{data && JSON.parse(JSON.stringify(data)).features[0].properties.address_line1}
                <br />
                Status: {report.status}{ }{ }
                <br />
                User: {report.username}{ }{ }
                <br />


                <IonButton size="small" color={"primary"} onClick={() => setIsOpen(true)}>
                    Show image
                </IonButton>
            </IonCardContent>

            <IonModal isOpen={isOpen} onIonModalDidDismiss={() => setIsOpen(false)}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Image</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => {
                                setIsOpen(false);
                            }}>Close</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent className="ion-padding">
                    <div className="container">
                        <img className="trash-image" src={`https://${STATIC_URL}${report.url}`} alt="Not found" />
                    </div>
                </IonContent>
            </IonModal>

            {report.status === "pending" &&
                <>
                    <IonFab horizontal="end" vertical="top">
                        <IonFabButton size="small" color={"success"} onClick={() => { HandleAccept() }}>
                            <IonIcon icon={checkmarkOutline} />
                        </IonFabButton>
                    </IonFab>

                    <IonFab horizontal="end" vertical="bottom">
                        <IonFabButton size="small" color={"danger"} onClick={() => { HandleDecline() }}>
                            <IonIcon icon={closeOutline} />
                        </IonFabButton>
                    </IonFab>
                </>}
        </IonCard>)
}

export default AdminReportComponent;