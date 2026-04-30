import React, { useContext, useState } from "react";

import {
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
  IonInput,
  IonTitle,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";

import { changePasswordRequest } from "../../utils/hooks/changePasswordRequest";
import { DOMAIN } from "../../config";
import { GlobalContext } from "../../context/Context";
import { IContext } from "../../interfaces/interfaces";

const AccountForgotComponent: React.FC = () => {
  const [presentAlert] = useIonAlert();

  const [email, setEmail] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const { user } = useContext(GlobalContext) as IContext;

  const router = useIonRouter();

  const sendResetToken = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    changePasswordRequest(
      `{DOMAIN}/auth/forgot_password_token?email=${email}`,
      setMessage,
      presentAlert,
    );
  };

  return (
    <div
      id="container"
      className="pt-[2%] min-[800px]:pt-[5%] max-[800px]:pt-[20%] m-auto flex justify-center items-center"
    >
      <form
        id="form"
        className="bg-[var(--ion-color-light)] min-[800px]:w-[30%] max-[800px]:w-[70%] rounded-[10px] p-[20px]"
        onSubmit={sendResetToken}
      >
        <IonFab horizontal="start" vertical="top">
          <IonFabButton
            size={"small"}
            onClick={() =>
              user
                ? router.push("/account/change", "back")
                : router.push("/account/login", "back")
            }
          >
            <IonIcon icon={arrowBack} />
          </IonFabButton>
        </IonFab>
        <IonTitle id="title" className="p-[10px] text-center">
          Forgot password
        </IonTitle>

        <br />

        <IonInput
          type="email"
          onIonChange={(e) => {
            if (e.detail.value === undefined) return;
            setEmail(e.detail.value!);
          }}
          clearInput={true}
          value={email}
          id="username"
          className="text-center min-[800px]:ml-[10px] max-[800px]:ml-[15px]"
          placeholder="Enter your email"
          required={true}
        />

        <p id="warning" className="text-[#e04055] text-center">
          {!message && <br></br>} {message}
        </p>

        <IonButton
          type="submit"
          expand="block"
          id="button"
          className="flex justify-center ml-[35%] max-w-[30%]"
        >
          Reset
        </IonButton>
      </form>
    </div>
  );
};

export default AccountForgotComponent;
