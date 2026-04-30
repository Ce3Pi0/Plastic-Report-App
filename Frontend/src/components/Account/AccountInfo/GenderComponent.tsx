import { IonItem, IonLabel, IonRadio } from "@ionic/react";
import React from "react";
import { gendersType } from "../../../types";

interface Props {
  gender: gendersType;
  setGender: (value: React.SetStateAction<gendersType | "">) => void;
}

const GenderComponent = ({ gender, setGender }: Props) => {
  return (
    <IonItem
      color={"light"}
      className="w-[50%] px-2"
      onClick={() => setGender(gender)}
    >
      <IonLabel>{gender.charAt(0).toUpperCase() + gender.slice(1)}</IonLabel>
      <IonRadio slot="end" value={gender} />
    </IonItem>
  );
};

export default GenderComponent;
