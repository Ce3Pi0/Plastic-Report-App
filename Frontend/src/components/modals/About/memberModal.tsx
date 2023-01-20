import React from "react"

import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar } from "@ionic/react"


const MemberModal: React.FC<{ name: string, message: string, isOpen: boolean, setIsOpen: any }> = ({ name, message, isOpen, setIsOpen }) => (
    <IonModal isOpen={isOpen} onIonModalDidDismiss={() => setIsOpen(false)}>
        <IonHeader>
            <IonToolbar>
                <IonTitle>{name}</IonTitle>
                <IonButtons slot="end">
                    <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
            <p>
                {message}
            </p>
        </IonContent>
    </IonModal>
)

export default MemberModal;