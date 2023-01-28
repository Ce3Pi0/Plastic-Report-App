import React, { useContext, useState } from "react";
import GoogleMapReact from "google-map-react";

import { IonButton, IonContent, IonFab, IonIcon, IonLoading, IonRefresher, IonRefresherContent, IonTitle, useIonAlert } from "@ionic/react";
import { arrowUpOutline, camera } from "ionicons/icons";

/* Components */
import Marker from "./Marker";

import { GlobalContext } from "../../../context/Context";

import { ContextInterface, LocationInterface } from "../../../interfaces/interfaces";

import { reportRequest } from "../../../utils/hooks/reportRequest";
import { UpdateImageDisplay, DOMAIN, MACEDONIA_CENTER, DEFAULT_ZOOM, handleRefresh } from '../../../utils/utils';
import { RiGalleryFill } from "react-icons/ri";


const SendReport: React.FC = () => {

  const { updateTokens } = useContext(GlobalContext) as ContextInterface;

  const [presentAlert] = useIonAlert();

  const [location, setLocation] = useState<LocationInterface>({ lat: undefined, lng: undefined });
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState<boolean>(false);


  const handleSetFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    UpdateImageDisplay(e);
    setFile(e.target.files === null ? null : e.target.files[0]);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (location.lat === undefined || location.lng === undefined) {
      presentAlert({
        subHeader: 'Location not specified!',
        message: 'Please specifiy a location',
        buttons: ['OK'],
      });

      return;
    }

    if (file === null) {
      presentAlert({
        subHeader: 'Image not attached!',
        message: 'Please attach an image',
        buttons: ['OK'],
      });

      return;
    }

    const data = new FormData();
    data.append("image", file);
    data.append("lon", location.lng!);
    data.append("lat", location.lat!);

    let myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${window.localStorage.getItem("access_token")}`);

    reportRequest(`https://${DOMAIN}/report`, "POST", data, updateTokens, presentAlert, "form", setLoading);
  }

  return (
    <IonContent>
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        <IonRefresherContent />
      </IonRefresher>
      <IonTitle className="title">
        <h3>Fill the form bellow and submit it <br />to let us know the location <br /> of the plastic waste!</h3>
      </IonTitle>

      <div className="map">
        <IonLoading isOpen={loading} message={"Sending report..."} />
        <IonFab>
          <IonButton size="small" onClick={() => setLocation({ lat: undefined, lng: undefined })}>Reset</IonButton>
        </IonFab>
        <GoogleMapReact
          onClick={(e) => {
            setLocation({ lat: `${e.lat}`, lng: `${e.lng}` })
          }}
          bootstrapURLKeys={{ key: "AIzaSyBRVyqes2s_hnBHs-kEq26aFRerVRE6Obs" }}
          defaultCenter={MACEDONIA_CENTER}
          defaultZoom={DEFAULT_ZOOM}
          options={{ fullscreenControl: false, zoomControl: false }}
        >

          {location.lat !== undefined && location.lng !== undefined && <Marker lat={location.lat} lng={location.lng} />}
        </GoogleMapReact>
        <br />
      </div>

      <div className="report-form-container">
        <form className="report-form" onSubmit={handleSubmit}>
          <label className="label">
            {!file && "Select an image from gallery:"}
            {file && "Select a different image from gallery:"}
            <br />
            <RiGalleryFill />
            <input className="upload" type="file" onChange={e => handleSetFile(e)} accept="image/*" />
          </label>

          <label className="label">
            {!file && "Select an image from camera:"}
            {file && "Select a different image from camera:"}
            <br />
            <IonIcon icon={camera} />
            <input className="upload camera" type="file" onChange={e => handleSetFile(e)} accept="image/*" capture="environment" />
          </label>

          <br />

          <div className="preview">
            <p>No files currently selected for upload</p>
          </div>

          <IonButton className="submit-report" color={"success"} type="submit">
            <IonIcon icon={arrowUpOutline} />
          </IonButton>
        </form>
      </div>
    </IonContent>
  );
}

export default SendReport;
