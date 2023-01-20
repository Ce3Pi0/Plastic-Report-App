import { useState, useContext } from "react";

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonItem,
  IonLabel,
  IonPage,
  IonButton,
  IonInput,
  IonButtons,
  IonTextarea,
} from '@ionic/react';

import { IssueElementTemplate } from "../../../../interfaces/interfaces";


const ReportIssueModal = ({ onDismiss, }: { onDismiss: (data?: IssueElementTemplate | null, role?: string) => void; }) => {

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string | null>('');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="medium" onClick={() => onDismiss(null, 'cancel')}>
              Cancel
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => {
              if (name === '') {
                setMessage("Fill in all the required fields!")
              }
              else {
                onDismiss({ name, description }, 'confirm')
              }
            }
            }>Confirm</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Enter report name</IonLabel>
          <IonInput required value={name} placeholder="Name" onIonChange={e => {
            if (e.detail.value === undefined) return;
            setName(e.detail.value!)
          }} clearInput={true} />

          <IonLabel position="stacked">Enter report description</IonLabel>
          <IonTextarea value={description} placeholder="Description" onIonChange={e => {
            if (e.detail.value === undefined) return;
            setDescription(e.detail.value!)
          }} autoGrow={true} />
        </IonItem>
        <p>{message}</p>
      </IonContent>
    </IonPage>
  );
};

export default ReportIssueModal;