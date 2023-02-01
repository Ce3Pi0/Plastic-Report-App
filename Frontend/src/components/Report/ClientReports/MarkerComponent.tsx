import React from "react";

import { IonIcon } from "@ionic/react";
import { locationSharp } from "ionicons/icons";

import { ILocation } from "../../../interfaces/interfaces";


const MarkerComponent: React.FC<ILocation> = ({ lat, lng }) => {
  return (
    <div className="marker">
      <IonIcon color={"danger"} size="large" icon={locationSharp} />
    </div>
  );
}

export default MarkerComponent;