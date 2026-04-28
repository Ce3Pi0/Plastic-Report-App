// TODO: Preview image

import React, { useContext, useState } from "react";

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonLoading,
  useIonAlert,
  useIonModal,
} from "@ionic/react";
import {
  alertOutline,
  appsOutline,
  arrowDownOutline,
  codeWorkingOutline,
  checkmark,
} from "ionicons/icons";

import { Avatar } from "@mui/material";

/* Components */
import ReportComponent from "./ReportComponent";

import { GlobalContext } from "../../../context/Context";

import { IReport, IContext } from "../../../interfaces/interfaces";

import useFetch from "../../../utils/hooks/useFetch";
import { DOMAIN } from "../../../utils/utils";
import UpdateUserImageModal from "../../Modals/Image/imageUpdateModal";
import openImageUpdateModal from "../../Modals/Image/openImageUpdateModal";

const AccountInfoComponent: React.FC = () => {
  const { user, setLoggedIn, updateTokens } = useContext(
    GlobalContext,
  ) as IContext;

  const [status, setStatus] = useState("");
  const [hidden, setHidden] = useState<boolean>(false);
  const [updatingUserImage, setUpdatingUserImage] = useState<boolean>(false);

  const { data, err, loading } = useFetch(
    `http://${DOMAIN}/user`,
    updateTokens,
  );

  const {
    data: reports,
    err: reports_error,
    loading: reports_loading,
  } = useFetch(`http://${DOMAIN}/report`, updateTokens);

  const [presentAlert] = useIonAlert();
  const [present, dismiss] = useIonModal(UpdateUserImageModal, {
    onDismiss: (data: string, role: string) => dismiss(data, role),
  });

  const logOut = () => {
    window.localStorage.clear();
    setLoggedIn(false, null);
  };

  const hideTooltip = () => {
    if (hidden)
      document.getElementById("first_tooltip_text")!.style.visibility =
        "hidden";
    else
      document.getElementById("first_tooltip_text")!.style.visibility =
        "visible";
    setHidden(!hidden);
  };

  return (
    <div>
      {data && (
        <>
          <IonFab slot="fixed" horizontal="end" vertical="top">
            <div className="group relative inline-block">
              <IonFabButton size="small" onClick={(e) => hideTooltip()}>
                <IonIcon icon={arrowDownOutline} />
              </IonFabButton>
              <span
                id="first_tooltip_text"
                className="invisible group-hover:visible w-[120%] bg-[var(--ion-color-light-contrast)] text-[var(--ion-color-light)] text-center rounded-[6px] pt-[5px] pr-0 absolute text-[11px] z-1 top-[30%] left-[-110%]"
              >
                Filter
              </span>
            </div>

            <IonFabList className="tooltips" side="bottom">
              <div className="group relative inline-block">
                <IonFabButton
                  size="small"
                  color="success"
                  onClick={() => {
                    setStatus("completed");
                    hideTooltip();
                  }}
                >
                  <IonIcon icon={checkmark} />
                </IonFabButton>
                <span className="invisible group-hover:visible w-[120%] bg-[var(--ion-color-light-contrast)] text-[var(--ion-color-light)] text-center rounded-[6px] pt-[5px] pr-0 absolute text-[11px] z-1 top-[30%] left-[-110%]">
                  Completed
                </span>
              </div>

              <div className="group relative inline-block">
                <IonFabButton
                  size="small"
                  color="warning"
                  onClick={() => {
                    setStatus("pending");
                    hideTooltip();
                  }}
                >
                  <IonIcon icon={codeWorkingOutline} />
                </IonFabButton>
                <span className="invisible group-hover:visible w-[120%] bg-[var(--ion-color-light-contrast)] text-[var(--ion-color-light)] text-center rounded-[6px] pt-[5px] pr-0 absolute text-[11px] z-1 top-[30%] left-[-110%]">
                  Pending
                </span>
              </div>

              <div className="group relative inline-block">
                <IonFabButton
                  size="small"
                  color="danger"
                  onClick={() => {
                    setStatus("rejected");
                    hideTooltip();
                  }}
                >
                  <IonIcon icon={alertOutline} />
                </IonFabButton>
                <span className="invisible group-hover:visible w-[120%] bg-[var(--ion-color-light-contrast)] text-[var(--ion-color-light)] text-center rounded-[6px] pt-[5px] pr-0 absolute text-[11px] z-1 top-[30%] left-[-110%]">
                  Rejected
                </span>
              </div>

              <div className="group relative inline-block">
                <IonFabButton
                  size="small"
                  onClick={() => {
                    setStatus("");
                    hideTooltip();
                  }}
                >
                  <IonIcon icon={appsOutline} />
                </IonFabButton>
                <span className="invisible group-hover:visible w-[120%] bg-[var(--ion-color-light-contrast)] text-[var(--ion-color-light)] text-center rounded-[6px] pt-[5px] pr-0 absolute text-[11px] z-1 top-[30%] left-[-110%]">
                  All
                </span>
              </div>
            </IonFabList>
          </IonFab>

          <IonCard className="bg-[var(--ion-color-step-150)] rounded-[15px] pb-[15px] border-[3px] border-solid border-[var(--ion-color-success)]">
            <IonLoading
              isOpen={updatingUserImage}
              message="Updating image ... Please wait."
            />
            <IonCardHeader>
              <div
                id="group avatar"
                className="relative w-[56px]"
                onClick={() =>
                  openImageUpdateModal(
                    present,
                    updateTokens,
                    presentAlert,
                    setUpdatingUserImage,
                  )
                }
              >
                <Avatar
                  sx={{ width: 56, height: 56 }}
                  src={
                    JSON.parse(JSON.stringify(data)).user.img_url === null ||
                    undefined
                      ? "https://ionicframework.com/docs/img/demos/avatar.svg"
                      : JSON.parse(JSON.stringify(data)).user.img_url
                  }
                  className="group-hover:opacity-60 rounded-[100%] opacity-100"
                  alt="Silhouette of a person's head"
                ></Avatar>
                <div className="group-hover:opacity-100 text-[var(--ion-color-light-contrast)] absolute top-[50%] left-[50%] text-center cursor-pointer transition-all duration-500 ease-in-out opacity-0 -translate-x-1/2 -translate-y-1/2">
                  Change image
                </div>
              </div>
              <IonCardTitle>
                <h1>{JSON.parse(JSON.stringify(data)).user.username}</h1>
              </IonCardTitle>
              <IonCardSubtitle>
                {JSON.parse(JSON.stringify(data)).user.email}
              </IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              Welcome to your account{" "}
              {JSON.parse(JSON.stringify(data)).user.gender === "male" && "mr."}
              {JSON.parse(JSON.stringify(data)).user.gender === "female" &&
                "mrs."}
              {JSON.parse(JSON.stringify(data)).user.name}!
            </IonCardContent>

            <IonButton color={"tertiary"} fill="clear" onClick={() => logOut()}>
              Log out
            </IonButton>
            <IonButton
              color={"tertiary"}
              fill="clear"
              onClick={() => window.location.assign("/account/change")}
            >
              Change Password
            </IonButton>
          </IonCard>

          <div className="relative">
            <div className="text-center p-[5px] w-[98%] bg-[var(--ion-color-background)] border-t-2 border-l-2 border-r-2 border-solid border-[--ion-color-primary] rounded-t-[10px]">
              <h2>Your reports:</h2>
            </div>
          </div>

          {reports &&
            JSON.parse(JSON.stringify(reports))
              .reports.filter(
                (report: IReport) => report.status === status || status === "",
              )
              .map((report: IReport) => (
                <ReportComponent key={report.id} report={report} />
              ))}
          {reports_error && <div>Error while fetching data</div>}
        </>
      )}
      {loading && (
        <IonLoading
          isOpen={reports_loading || loading}
          message={"Loading data... Please wait."}
        />
      )}
      {err && (
        <div>
          <p style={{ textAlign: "center" }}>Error while fetching user data</p>
          <IonFab horizontal="center">
            <IonButton onClick={() => logOut()}>Logout</IonButton>
          </IonFab>
        </div>
      )}
    </div>
  );
};

export default AccountInfoComponent;
