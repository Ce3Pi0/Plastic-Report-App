import { IonButton, IonContent, IonFab, IonFabButton, IonIcon, IonInput, IonTitle, useIonAlert } from "@ionic/react";
import { camera, checkmarkOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { CrateReportInterface } from "../../interfaces/interfaces";
import usePhotoGallery from "../../utils/hooks/usePhotoGallery";
const STATIC_URL = "localhost:88/"

const SendReport:React.FC = () => {
    const [presentAlert] = useIonAlert();

    const [location, setLocation] = useState<{
        lat: string
        lon: string
    }>({ lat: "0", lon: "0"});
    const [url, setUrl] = useState<string>("");
    const [file, setFile] = useState<File | null>(null)
    console.log(file)

    const { takePhoto } = usePhotoGallery();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude.toFixed(2)
            let long = position.coords.longitude.toFixed(2)
            setLocation({
                lat: lat,
                lon: long
            })
          });
    }, [])

    console.log(location)

    const handleSubmit = () => {
        if (file === null) return
        
        const data = new FormData()
        data.append("image", file)
        data.append("coordinate_lon", location.lon)
        data.append("coordinate_lat", location.lat)


    }

    // const createReport = () => {

    //     if (location === ""){
    //         presentAlert({
    //             subHeader: 'Location not specified!',
    //             message: 'Please specifiy a location',
    //             buttons: ['OK'],
    //           })
    //         return;
    //     }

    //     if (url === ""){
    //         presentAlert({
    //             subHeader: 'Image not attached!',
    //             message: 'Please attach an image',
    //             buttons: ['OK'],
    //           })
    //         return;
    //     }


    //     const Report: CrateReportInterface = {
    //         location,
    //         url,
    //         user_id: parseInt(localStorage.getItem("id")!)
    //     }

        // console.log(Report);
    // }

    return (
        <IonContent>  
            <IonTitle className="title">
                <h1>Report plastic!</h1>
            </IonTitle>


            <IonFab vertical="bottom" horizontal="center" slot="fixed">
                {/* <IonInput className="location" type="text" value={location} placeholder="Enter location:" onIonChange={(e) => setLocation(e.detail.value!)} required={true}></IonInput> */}

                {/* <IonButton type="submit" onClick={() => createReport()}>
                    <IonIcon icon={checkmarkOutline} />
                </IonButton> */}
            </IonFab>
            <input type="file" onChange={e => setFile(e.target.files === null ? null : e.target.files[0]) } />
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton onClick={() => takePhoto()}>
                    <IonIcon icon={camera} />
                </IonFabButton>
            </IonFab>
        </IonContent>
    );
}
 
export default SendReport;