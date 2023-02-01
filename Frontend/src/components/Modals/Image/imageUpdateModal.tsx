import { useState } from "react";

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


const UpdateUserImageModal = ({ onDismiss, }: { onDismiss: (data?: { file: File } | null, role?: string) => void; }) => {

    const [file, setFile] = useState<File | null>(null)

    const HandleSetFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files === null ? null : e.target.files[0]);
    }

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
                            if (file !== null)
                                onDismiss({ file }, 'confirm')
                        }
                        }>Confirm</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem>
                    <form>
                        <input type="file" required onChange={e => HandleSetFile(e)} accept="image/x-png,image/gif,image/jpeg" />
                    </form>
                </IonItem>
            </IonContent>
        </IonPage>
    );
};

export default UpdateUserImageModal;