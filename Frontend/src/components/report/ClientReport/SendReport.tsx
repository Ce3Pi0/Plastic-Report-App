import React, { useContext, useState } from "react";
import GoogleMapReact from "google-map-react";

import { IonButton, IonContent, IonIcon, IonTitle, useIonAlert } from "@ionic/react";
import { arrowUpOutline } from "ionicons/icons";

/* Components */
import Marker from "./Marker";

import { GlobalContext } from "../../../context/Context";

import { ContextInterface, LocationInterface } from "../../../interfaces/interfaces";

import { reportRequest } from "../../../utils/hooks/reportRequest";
import { UpdateImageDisplay, DOMAIN, MACEDONIA_CENTER, DEFAULT_ZOOM } from '../../../utils/utils';


const SendReport: React.FC = () => {

  const { updateTokens } = useContext(GlobalContext) as ContextInterface;

  const [presentAlert] = useIonAlert();

  const [location, setLocation] = useState<LocationInterface>({ lat: undefined, lng: undefined });
  const [file, setFile] = useState<File | null>(null)


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

    reportRequest(`http://${DOMAIN}/report`, "POST", data, updateTokens, presentAlert, "form");
  }

  return (
    <IonContent>
      <IonTitle className="title">
        <h3>Fill the form bellow and submit it <br />to let us know the location <br /> of the plastic waste!</h3>
      </IonTitle>

      <div className="map">

        <GoogleMapReact
          onClick={(e) => setLocation({ lat: `${e.lat}`, lng: `${e.lng}` })}
          bootstrapURLKeys={{ key: "AIzaSyBRVyqes2s_hnBHs-kEq26aFRerVRE6Obs" }}
          defaultCenter={MACEDONIA_CENTER}
          defaultZoom={DEFAULT_ZOOM}
        >
          {location.lat !== undefined && location.lng !== undefined && <Marker lat={location.lat} lng={location.lng} />}
        </GoogleMapReact>

        <br />
      </div>

      <div className="report-form-container">
        <form className="report-form" onSubmit={handleSubmit}>
          <label className="label">
            {!file && "Select an image:"}
            {file && "Select a different image:"}
            <input className="upload" type="file" onChange={e => handleSetFile(e)} accept="image/x-png,image/gif,image/jpeg" />
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
