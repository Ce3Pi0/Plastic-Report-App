// TODO: Add an image preview

import React, { useContext, useState } from "react";
import { RiGalleryFill } from "react-icons/ri";
import GoogleMapReact from "google-map-react";

import {
  IonButton,
  IonContent,
  IonFab,
  IonIcon,
  IonImg,
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
  DOMAIN,
  MACEDONIA_CENTER,
  DEFAULT_ZOOM,
  HandleRefresh,
} from "../../../utils/utils";
import { FaXing } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";

const SendReportComponent: React.FC = () => {
  const { updateTokens } = useContext(GlobalContext) as IContext;

  const [presentAlert] = useIonAlert();

  const [location, setLocation] = useState<ILocation>({
    lat: undefined,
    lng: undefined,
  });
  const [fileName, setFileName] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const HandleSetFile = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            disabled={location.lat === undefined || location.lng === undefined}
            onClick={() => setLocation({ lat: undefined, lng: undefined })}
          >
            Reset Location
          </IonButton>
        </IonFab>
        <form
          className="h-[100%] w-[100%] absolute flex"
          onSubmit={HandleSubmit}
        >
          <IonFab horizontal="start" vertical="bottom">
            <div className="flex items-end justify-center">
              <div>
                <label className="inline-block py-[7px] px-[15px] m-[5px] cursor-pointer rounded-[5px] bg-[var(--ion-color-light)] text-[var(--ion-text-color)] active:bg-[var(--ion-color-step-300)]">
                  <RiGalleryFill />
                  <input
                    className="upload hidden"
                    type="file"
                    onChange={(e) => HandleSetFile(e)}
                    accept="image/*"
                    value={""}
                  />
                </label>

                <br />

                <label className="inline-block py-[7px] px-[15px] m-[5px] cursor-pointer rounded-[5px] bg-[var(--ion-color-light)] text-[var(--ion-text-color)] active:bg-[var(--ion-color-step-300)]">
                  <IonIcon icon={camera} />
                  <input
                    className="camera hidden"
                    type="file"
                    onChange={(e) => HandleSetFile(e)}
                    accept="image/*"
                    capture="environment"
                    value={""}
                  />
                </label>
              </div>
              {file && (
                <div className="p-3 max-w-[120px] max-h-[120px] bg-[var(--ion-color-light)] flex flex-col justify-center items-center rounded-md">
                  <div className="absolute top-1 right-1">
                    <IoCloseCircleOutline
                      className="text-[var(--ion-color-danger)] hover:cursor-pointer hover:!text-[var(--ion-color-danger-tint)]"
                      size={24}
                      onClick={() => setFile(null)}
                    />
                  </div>
                  <IonImg
                    src={file === null ? "" : URL.createObjectURL(file)}
                  />
                </div>
              )}
            </div>
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
