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
  useIonRouter,
} from "@ionic/react";
import { arrowUpOutline, camera, locationSharp } from "ionicons/icons";

/* Components */
import Marker from "./MarkerComponent";

import { GlobalContext } from "../../../context/Context";

import { IContext, ILocation } from "../../../interfaces/interfaces";

import { reportRequest } from "../../../utils/hooks/reportRequest";
import { DOMAIN, MACEDONIA_CENTER, DEFAULT_ZOOM } from "../../../config";
import { handleRefresh } from "../../../utils/utils";
import { IoCloseCircleOutline } from "react-icons/io5";

const SendReportComponent: React.FC = () => {
  const router = useIonRouter();

  const { updateTokens } = useContext(GlobalContext) as IContext;

  const [mapInstance, setMapInstance] = useState<any>(null);
  const [mapApi, setMapApi] = useState<any>(null);

  const [presentAlert] = useIonAlert();

  const [location, setLocation] = useState<ILocation>({
    lat: undefined,
    lng: undefined,
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSetFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files === null ? null : e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    await reportRequest(
      `{DOMAIN}/report`,
      "POST",
      data,
      updateTokens,
      presentAlert,
      "form",
      setLoading,
      router,
    );

    setFile(null);
    setLocation({ lat: undefined, lng: undefined });
  };

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const newLat = position.coords.latitude;
        const newLng = position.coords.longitude;

        setLocation({
          lat: newLat.toString(),
          lng: newLng.toString(),
        });

        if (mapInstance && mapApi) {
          const newPos = new mapApi.LatLng(newLat, newLng);
          mapInstance.panTo(newPos);
          mapInstance.setZoom(15);
        }
      });
    }
  };

  return (
    <IonContent>
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        <IonRefresherContent />
      </IonRefresher>

      <div className="h-[100%] w-[100%]">
        <IonLoading isOpen={loading} message={"Sending report..."} />
        <IonFab className="flex flex-col">
          <IonButton
            className="w-[100%]"
            color="danger"
            shape="round"
            disabled={location.lat === undefined || location.lng === undefined}
            onClick={() => setLocation({ lat: undefined, lng: undefined })}
          >
            Reset Location
          </IonButton>
          <IonButton
            className="w-[100%]"
            color="success"
            shape="round"
            onClick={() => useCurrentLocation()}
          >
            My Location{" "}
            <IonIcon className="text-black" size="small" icon={locationSharp} />
          </IonButton>
        </IonFab>
        <form
          className="h-[100%] w-[100%] absolute flex"
          onSubmit={handleSubmit}
        >
          <IonFab horizontal="start" vertical="bottom">
            <div className="flex items-end justify-center">
              <div>
                <label className="inline-block py-[7px] px-[15px] m-[5px] cursor-pointer rounded-[5px] bg-[var(--ion-color-light)] text-[var(--ion-text-color)] active:bg-[var(--ion-color-step-300)]">
                  <RiGalleryFill />
                  <input
                    className="upload hidden"
                    type="file"
                    onChange={(e) => handleSetFile(e)}
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
                    onChange={(e) => handleSetFile(e)}
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

          <IonFab horizontal="end" vertical="top">
            <IonButton type="submit" shape="round">
              <IonIcon icon={arrowUpOutline} />
              <p>Send</p>
            </IonButton>
          </IonFab>
        </form>

        <GoogleMapReact
          bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY }}
          defaultCenter={MACEDONIA_CENTER}
          defaultZoom={DEFAULT_ZOOM}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }: any) => {
            setMapInstance(map);
            setMapApi(maps);
          }}
          onClick={(e: any) => {
            setLocation({ lat: e.lat, lng: e.lng });
          }}
          options={{ fullscreenControl: false, zoomControl: true }}
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
