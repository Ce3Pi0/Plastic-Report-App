import React from "react";

import {
  IonFab,
  IonFabButton,
  IonIcon,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import { arrowBack, checkmark } from "ionicons/icons";

import { sendConfirmEmail } from "../../utils/hooks/sendConfirmMail";
import { DOMAIN } from "../../config";

const AccountConfirmEmailComponent: React.FC = () => {
  const router = useIonRouter();

  const queryParams = new URLSearchParams(window.location.search);
  const token: string | null = queryParams.get("token");

  const [presentAlert] = useIonAlert();

  return token === null ? (
    <>
      <h2 className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2">
        {"Token not specified"}
      </h2>

      <IonFab
        horizontal="center"
        vertical="center"
        className="center-align-text"
      >
        <IonFabButton
          color={"danger"}
          onClick={() => router.push("/account/login", "back")}
        >
          <IonIcon icon={arrowBack} />
        </IonFabButton>
      </IonFab>
    </>
  ) : (
    <>
      <h2 className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2">
        {"Confirm your email"}
      </h2>
      <IonFab
        horizontal="center"
        vertical="center"
        className="center-align-text"
      >
        <IonFabButton
          color={"success"}
          onClick={() =>
            sendConfirmEmail(
              `${DOMAIN}/auth/confirm_email?token=${token}`,
              presentAlert,
              router,
            )
          }
        >
          <IonIcon icon={checkmark} />
        </IonFabButton>
      </IonFab>
    </>
  );
};

export default AccountConfirmEmailComponent;
