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

    const [message, setMessage] = useState<string | null>('');
    const [file, setFile] = useState<File | null>(null)

    const handleSetFile = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                            if (file === null) {
                                setMessage("Fill in all the required fields!")
                            }
                            else {
                                onDismiss({ file }, 'confirm')
                            }
                        }
                        }>Confirm</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem>
                    <form>
                        {/* <IonLabel position="stacked">Select an image</IonLabel> */}
                        <input type="file" onChange={e => handleSetFile(e)} accept="image/x-png,image/gif,image/jpeg" />
                    </form>
                </IonItem>
            </IonContent>
        </IonPage>
    );
};

export default UpdateUserImageModal;