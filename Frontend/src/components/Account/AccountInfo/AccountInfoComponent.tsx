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
  useIonRouter,
} from "@ionic/react";
import { appsOutline, arrowDownOutline } from "ionicons/icons";

import { Avatar } from "@mui/material";

/* Components */
import ReportComponent from "./ReportComponent";

import { GlobalContext } from "../../../context/Context";

import { IReport, IContext } from "../../../interfaces/interfaces";

import useFetch from "../../../utils/hooks/useFetch";
import { DOMAIN } from "../../../config";
import UpdateUserImageModal from "../../Modals/Image/imageUpdateModal";
import openImageUpdateModal from "../../Modals/Image/openImageUpdateModal";
import { RiProgress1Line } from "react-icons/ri";
import { IoCheckmark, IoWarning } from "react-icons/io5";
import FilterPopover from "../../Misc/filterPopover";

const AccountInfoComponent: React.FC = () => {
  const { setLoggedIn, updateTokens } = useContext(GlobalContext) as IContext;

  const router = useIonRouter();

  const [status, setStatus] = useState("");
  const [hidden, setHidden] = useState<boolean>(false);
  const [updatingUserImage, setUpdatingUserImage] = useState<boolean>(false);

  const { data, err, loading } = useFetch(
    `${DOMAIN}/user`,
    updateTokens,
    router,
  );

  const {
    data: reports,
    err: reports_error,
    loading: reports_loading,
  } = useFetch(`${DOMAIN}/report`, updateTokens, router);

  const [presentAlert] = useIonAlert();
  const [present, dismiss] = useIonModal(UpdateUserImageModal, {
    onDismiss: (data: string, role: string) => dismiss(data, role),
  });

  const logOut = () => {
    window.localStorage.clear();
    setLoggedIn(false, null);
    window.location.replace("/account/login");
  };

  return (
    <div>
      {data && (
        <>
          <FilterPopover
            direction="down"
            hidden={hidden}
            setHidden={setHidden}
            setStatus={setStatus}
          />

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
                    router,
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
              {JSON.parse(JSON.stringify(data)).user.name}!
            </IonCardContent>

            <IonButton color={"tertiary"} fill="clear" onClick={() => logOut()}>
              Log out
            </IonButton>
            <IonButton
              color={"tertiary"}
              fill="clear"
              onClick={() => router.push("/account/change", "back")}
            >
              Change Password
            </IonButton>
          </IonCard>

          <div className="flex flex-col justify-center items-center">
            <div className="text-center p-[5px] bg-[var(--ion-color-background)] border-b-2 border-solid border-[var(--ion-color-step-150)] w-[98%] mb-4">
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
