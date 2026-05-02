import React, { useContext, useState } from "react";

import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonLoading,
  IonModal,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import { checkmarkOutline, closeOutline } from "ionicons/icons";

import { GlobalContext } from "../../../context/Context";

import { IContext, IReport } from "../../../interfaces/interfaces";

import { reportRequest } from "../../../utils/hooks/reportRequest";
import { DOMAIN } from "../../../config";
import useAddressFetch from "../../../utils/hooks/requestAddress";
import { checkStatus } from "../../../utils/utils";
import { IoCheckmark, IoWarning } from "react-icons/io5";
import { RiProgress1Line } from "react-icons/ri";

const AdminReportComponent: React.FC<{ report: IReport }> = ({ report }) => {
  const router = useIonRouter();

  const { updateTokens } = useContext(GlobalContext) as IContext;
  const [loading, setLoading] = useState<boolean>(false);

  const [presentAlert] = useIonAlert();

  //geoapify.com
  const {
    data,
    err,
    loading: location_loading,
  } = useAddressFetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${report.lat}&lon=${report.lon}&apiKey=93ef976230904f26bf7ff03fd45f39aa`,
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleAccept = () => {
    reportRequest(
      `${DOMAIN}/report?id=${report.id}&status=completed`,
      "PUT",
      undefined,
      updateTokens,
      presentAlert,
      undefined,
      setLoading,
      router,
    );
  };

  const handleDecline = () => {
    reportRequest(
      `${DOMAIN}/report?id=${report.id}&status=rejected`,
      "PUT",
      undefined,
      updateTokens,
      presentAlert,
      undefined,
      setLoading,
      router,
    );
  };

  const badgeColor = checkStatus(report.status);

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Report {report.id}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <IonLoading isOpen={loading} message={"Applying changes..."} />
        <IonBadge className="mb-1" color={badgeColor} slot="start">
          {badgeColor === "danger" && <IoWarning />}
          {badgeColor === "success" && <IoCheckmark />}
          {badgeColor === "warning" && <RiProgress1Line />}
        </IonBadge>
        <br />
        Location: {location_loading && "...Loading location"}
        {err && `${report.lat} ${report.lon}`}
        {data &&
          JSON.parse(JSON.stringify(data)).features[0].properties.address_line1}
        <br />
        Status: {report.status}
        {}
        {}
        <br />
        User: {report.username}
        {}
        {}
        <br />
        <IonButton
          size="small"
          color={"primary"}
          onClick={() => setIsOpen(true)}
        >
          Show image
        </IonButton>
      </IonCardContent>

      <IonModal isOpen={isOpen} onIonModalDidDismiss={() => setIsOpen(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Image</IonTitle>
            <IonButtons slot="end">
              <IonButton
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Close
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <div className="relative">
            <img className="max-h-[350px]" src={report.url} alt="Not found" />
          </div>
        </IonContent>
      </IonModal>

      {report.status === "pending" && (
        <>
          <IonFab horizontal="end" vertical="top">
            <IonFabButton
              size="small"
              color={"success"}
              onClick={() => {
                handleAccept();
              }}
            >
              <IonIcon icon={checkmarkOutline} />
            </IonFabButton>
          </IonFab>

          <IonFab horizontal="end" vertical="bottom">
            <IonFabButton
              size="small"
              color={"danger"}
              onClick={() => {
                handleDecline();
              }}
            >
              <IonIcon icon={closeOutline} />
            </IonFabButton>
          </IonFab>
        </>
      )}
    </IonCard>
  );
};

export default AdminReportComponent;
