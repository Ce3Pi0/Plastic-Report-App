// import { IonButton, IonContent, IonFab, IonIcon, IonInput, IonLabel, IonTitle, useIonAlert } from "@ionic/react";
// import { arrowUpOutline } from "ionicons/icons";
// import React, { useState } from "react";
// import { domain } from "../../utils/utils";
// import { updateImageDisplay, getLocation } from '../../utils/utils';
// import { Location } from "../../interfaces/interfaces";

// const SendReport:React.FC = () => {
//     const [presentAlert] = useIonAlert();

//     const [location, setLocation] = useState<Location>({ lat: undefined, lon: undefined});
//     const [file, setFile] = useState<File | null>(null)
    

//     const handleSetFile = (e: React.ChangeEvent<HTMLInputElement>) => {
//         updateImageDisplay(e);
//         setFile(e.target.files === null ? null : e.target.files[0]);
//     }

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         if (location.lat === undefined || location.lon === undefined ){
//             presentAlert({
//                 subHeader: 'Location not specified!',
//                 message: 'Please specifiy a location',
//                 buttons: ['OK'],
//             });

//             return;
//         }

//         if (file === null) {
//             presentAlert({
//                 subHeader: 'Image not attached!',
//                 message: 'Please attach an image',
//                 buttons: ['OK'],
//             });

//             return;
//         }        
        
//         const data = new FormData()
//         data.append("image", file)
//         data.append("lon", location.lon!)
//         data.append("lat", location.lat!)

//         let myHeaders = new Headers();
        
//         myHeaders.append("Authorization", `Bearer ${window.localStorage.getItem("access_token")}`);


//         fetch(`http://${domain}/report`, {
//             method: "POST",
//             headers: myHeaders,
//             body: data
//         }).then(res =>  {
//             if (res.ok !== true){
//                 return Error("Something went wrong");
//             }
//             return res.json();
//         }).then(json =>{
//             if (json.msg !== "success")
//                 return Error("Something went wrong!");
//         }).catch(err => Error(err.message))
//     }

//     return (
//         <IonContent>  
//             <IonTitle className="title">
//                 <h3>Fill the form bellow and submit it <br />to let us know the location <br/> of the plastic waste!</h3>
//             </IonTitle>


//             <div className="send-report-container">
//                 <form className="report-form" onSubmit={handleSubmit}>
//                     <IonButton onClick={() => getLocation(setLocation)}>Get location</IonButton>
//                     <br/>
//                     <IonLabel>Selected location:</IonLabel>
//                     <IonInput value={location.lat !== undefined || location.lon !== undefined? `Lat:${location.lat} Long:${location.lon}`: "No location selected!"} disabled={true}/>


//                     <label className="label">
//                         {!file && "Select an image:"}
//                         {file && "Select a different image:"}
//                         <input className="upload" type="file" onChange={e => handleSetFile(e)} accept="image/x-png,image/gif,image/jpeg"/>
//                     </label>

//                     <br />

//                     <div className="preview">
//                         <p>No files currently selected for upload</p>
//                     </div>

//                     <IonButton className="submit-report" color={"success"} type="submit">
//                         <IonIcon icon={arrowUpOutline}/>
//                     </IonButton>
//                 </form>
//             </div>

//         </IonContent>
//     );
// }
 
// export default SendReport;

import React from "react";
import GoogleMapReact from "google-map-react";

const Place:React.FC<{ data: string, lat: number, lng:number }> = ({ data }) => <div>{data}</div>

const SendReport: React.FC = () => {
    const center = {
      lat: 10.99835602,
      lng: 77.01502627
    };
    const zoom = 11;

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBRVyqes2s_hnBHs-kEq26aFRerVRE6Obs" }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <Place
            data={"Test"}
            lat={10.12}
            lng={12.12}
        />
      </GoogleMapReact>
    </div>
  );
}

export default SendReport;
