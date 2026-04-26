import React, { useContext, useState } from "react";
import { RiGalleryFill } from "react-icons/ri";
import GoogleMapReact from "google-map-react";

import {
  IonButton,
  IonContent,
  IonFab,
  IonIcon,
  IonLoading,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  useIonAlert,
} from "@ionic/react";
import { arrowUpOutline, camera } from "ionicons/icons";

/* Components */
import Marker from "./MarkerComponent";

import { GlobalContext } from "../../../context/Context";

import { IContext, ILocation } from "../../../interfaces/interfaces";

import { reportRequest } from "../../../utils/hooks/reportRequest";
import {
  UpdateImageDisplay,
  DOMAIN,
  MACEDONIA_CENTER,
  DEFAULT_ZOOM,
  HandleRefresh,
} from "../../../utils/utils";

const SendReportComponent: React.FC = () => {
  const { updateTokens } = useContext(GlobalContext) as IContext;

  const [presentAlert] = useIonAlert();

  const [location, setLocation] = useState<ILocation>({
    lat: undefined,
    lng: undefined,
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const HandleSetFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    UpdateImageDisplay(e);
    setFile(e.target.files === null ? null : e.target.files[0]);
  };

  const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (location.lat === undefined || location.lng === undefined) {
      presentAlert({
        subHeader: "Location not specified!",
        message: "Please specify a location",
        buttons: ["OK"],
      });

      return;
    }

    if (file === null) {
      presentAlert({
        subHeader: "Image not attached!",
        message: "Please attach an image",
        buttons: ["OK"],
      });

      return;
    }

    const data = new FormData();
    data.append("image", file);
    data.append("lon", location.lng!);
    data.append("lat", location.lat!);

    let myHeaders = new Headers();

    myHeaders.append(
      "Authorization",
      `Bearer ${window.localStorage.getItem("access_token")}`,
    );

    reportRequest(
      `http://${DOMAIN}/report`,
      "POST",
      data,
      updateTokens,
      presentAlert,
      "form",
      setLoading,
    );
  };

  return (
    <IonContent>
      <IonRefresher slot="fixed" onIonRefresh={HandleRefresh}>
        <IonRefresherContent />
      </IonRefresher>

      <div className="h-[100%] w-[100%]">
        <IonLoading isOpen={loading} message={"Sending report..."} />
        <IonFab>
          <IonButton
            color="danger"
            shape="round"
            onClick={() => setLocation({ lat: undefined, lng: undefined })}
          >
            Reset
          </IonButton>
        </IonFab>
        <form
          className="h-[100%] w-[100%] absolute flex"
          onSubmit={HandleSubmit}
        >
          <IonFab horizontal="start" vertical="bottom">
            <label className="inline-block py-[7px] px-[15px] m-[5px] cursor-pointer rounded-[5px] bg-[var(--ion-color-light)] text-[var(--ion-text-color)] active:bg-[var(--ion-color-step-300)]">
              <RiGalleryFill />
              <input
                className="hidden"
                type="file"
                onChange={(e) => HandleSetFile(e)}
                accept="image/*"
              />
            </label>

            <br />

            <label className="inline-block py-[7px] px-[15px] m-[5px] cursor-pointer rounded-[5px] bg-[var(--ion-color-light)] text-[var(--ion-text-color)] active:bg-[var(--ion-color-step-300)]">
              <IonIcon icon={camera} />
              <input
                className="hidden camera"
                type="file"
                onChange={(e) => HandleSetFile(e)}
                accept="image/*"
                capture="environment"
              />
            </label>
          </IonFab>

          <IonFab horizontal="end" vertical="bottom">
            <IonButton type="submit" shape="round">
              <IonIcon icon={arrowUpOutline} />
            </IonButton>
          </IonFab>
        </form>
        <GoogleMapReact
          onClick={(e: any) => {
            setLocation({ lat: `${e.lat}`, lng: `${e.lng}` });
          }}
          bootstrapURLKeys={{ key: "AIzaSyBRVyqes2s_hnBHs-kEq26aFRerVRE6Obs" }}
          defaultCenter={MACEDONIA_CENTER}
          defaultZoom={DEFAULT_ZOOM}
          options={{ fullscreenControl: false, zoomControl: false }}
        >
          {location.lat !== undefined && location.lng !== undefined && (
            <Marker lat={location.lat} lng={location.lng} />
          )}
        </GoogleMapReact>
      </div>
    </IonContent>
  );
};

export default SendReportComponent;
