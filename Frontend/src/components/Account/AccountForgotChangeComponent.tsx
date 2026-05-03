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

import { DOMAIN, UNSAFE_PASSWORD } from "../../config";
import { sendConfirmPasswordReset } from "../../utils/hooks/sendConfirmPasswordReset";
import { GlobalContext } from "../../context/Context";
import { IContext } from "../../interfaces/interfaces";

const AccountForgotChangeComponent: React.FC = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");

  const router = useIonRouter();

  const { user, isLoaded } = useContext(GlobalContext) as IContext;

  const [presentAlert] = useIonAlert();

  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  const SendResetToken = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password!.length < UNSAFE_PASSWORD) {
      setMessage("Password too weak!");

      return;
    }

    if (password !== passwordConfirm) {
      setMessage("You didn't confirm the password correctly!");

      return;
    }

    sendConfirmPasswordReset(
      `${DOMAIN}/auth/forgot_password?token=${token}&password=${password}`,
      presentAlert,
      router,
    );
  };

  return (
    <div
      id="container"
      className="pt-[2%] min-[800px]:pt-[5%] max-[800px]:pt-[20%] m-auto flex justify-center items-center"
    >
      {token && (
        <form
          id="form"
          className="bg-[var(--ion-color-light)] min-[800px]:w-[30%] max-[800px]:w-[70%] rounded-[10px] p-[20px]"
          onSubmit={SendResetToken}
        >
          <IonFab horizontal="start" vertical="top">
            <IonFabButton
              size={"small"}
              onClick={() =>
                user
                  ? router.push("/account", "back")
                  : router.push("/account/login", "back")
              }
            >
              <IonIcon icon={arrowBack} />
            </IonFabButton>
          </IonFab>
          <IonTitle id="title" className="p-[10px] text-center">
            Reset your password
          </IonTitle>

          <br />

          <IonInput
            type="password"
            onIonChange={(e) => {
              if (e.detail.value === undefined) return;
              setPassword(e.detail.value!);
            }}
            clearInput={true}
            value={password}
            id="username"
            className="text-center min-[800px]:ml-[10px] max-[800px]:ml-[15px]"
            placeholder="Enter new password"
            required={true}
          />

          <br />

          <IonInput
            type="password"
            onIonChange={(e) => {
              if (e.detail.value === undefined) return;
              setPasswordConfirm(e.detail.value!);
            }}
            clearInput={true}
            value={passwordConfirm}
            id="username"
            className="text-center min-[800px]:ml-[10px] max-[800px]:ml-[15px]"
            placeholder="Confirm new password"
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
      )}
      {!token && isLoaded && !user && (
        <>
          <h2 className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2">
            Token not specified!
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
      )}
    </div>
  );
};

export default AccountForgotChangeComponent;
