import { IonIcon } from "@ionic/react";
import { locationSharp } from "ionicons/icons";
import React from "react";
import { Location } from "../../interfaces/interfaces";

const Marker:React.FC<Location> = ({lat, lng}) => {
    return (  
        <div className="marker">
          <IonIcon color={"danger"} size="large" icon={locationSharp} />
        </div>
    );
}
 
export default Marker;