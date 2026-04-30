import { useContext, useState } from "react";

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonItem,
  IonPage,
  IonButton,
  IonButtons,
} from "@ionic/react";
import { Avatar } from "@mui/material";
import { GlobalContext } from "../../../context/Context";
import { IContext } from "../../../interfaces/interfaces";

const UpdateUserImageModal = ({
  onDismiss,
}: {
  onDismiss: (data?: { file: File } | null, role?: string) => void;
}) => {
  const { user } = useContext(GlobalContext) as IContext;
  const [file, setFile] = useState<File | null>(null);

  const handleSetFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files === null ? null : e.target.files[0]);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="medium" onClick={() => onDismiss(null, "cancel")}>
              Cancel
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                if (file !== null) onDismiss({ file }, "confirm");
              }}
            >
              Confirm
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <form>
            <input
              type="file"
              required
              onChange={(e) => handleSetFile(e)}
              accept="image/x-png,image/gif,image/jpeg"
            />
          </form>
        </IonItem>
        <div className="flex justify-center items-center pt-2">
          <Avatar
            sx={{ width: 224, height: 224 }}
            src={
              file !== null
                ? URL.createObjectURL(file)
                : user?.url === null || user?.url === undefined
                  ? "https://ionicframework.com/docs/img/demos/avatar.svg"
                  : user?.url
            }
            className="group-hover:opacity-60 rounded-[100%] opacity-100"
            alt="Silhouette of a person's head"
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UpdateUserImageModal;
