import React from "react";

import { IonIcon } from "@ionic/react";
import { locationSharp } from "ionicons/icons";

import { LocationInterface } from "../../../interfaces/interfaces";


const Marker: React.FC<LocationInterface> = ({ lat, lng }) => {
  return (
    <div className="marker">
      <IonIcon color={"danger"} size="large" icon={locationSharp} />
    </div>
  );
}

export default Marker;