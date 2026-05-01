import React, { useContext, useState } from "react";

import {
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
  IonInput,
  IonLoading,
  IonTitle,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";

import { GlobalContext } from "../../context/Context";

import { IUserChange, IContext } from "../../interfaces/interfaces";

import { userChangeRequest } from "../../utils/hooks/userChangeRequest";
import { DOMAIN, UNSAFE_PASSWORD } from "../../config";

const AccountChangeComponent: React.FC = () => {
  const [presentAlert] = useIonAlert();

  const { user, updateTokens } = useContext(GlobalContext) as IContext;

  const [loading, setLoading] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  const [mistake, setMistake] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const router = useIonRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (newPassword !== confirmNewPassword) {
      setMistake(false);
      setMessage("You didn't confirm the new password correctly");
      return;
    }
    if (newPassword.length < UNSAFE_PASSWORD) {
      setMessage("Password too weak!");
      return;
    }
    if (newPassword === password) {
      setMistake(false);
      setMessage("You can't change to the same password!");

      return;
    }

    const newUser: IUserChange = {
      username: user?.username!,
      password,
      new_password: newPassword,
    };

    setMessage("");
    setMistake(false);

    userChangeRequest(
      `${DOMAIN}/user?id=${user?.id}`,
      "PUT",
      newUser,
      setMessage,
      setMistake,
      updateTokens,
      presentAlert,
      setLoading,
      router,
    );
  };

  return (
    <div
      id="container"
      className="pt-[2%] min-[800px]:pt-[5%] max-[800px]:pt-[20%] m-auto flex justify-center items-center"
    >
      <IonLoading isOpen={loading} message={"Updating password..."} />
      <form
        id="form"
        className="bg-[var(--ion-color-light)] min-[800px]:w-[30%] max-[800px]:w-[70%] rounded-[10px] p-[20px]"
        onSubmit={handleSubmit}
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
            <IonIcon icon={arrowBack}></IonIcon>
          </IonFabButton>
        </IonFab>
        <IonTitle id="title" className="p-[10px] text-center">
          Change password
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
          id="password"
          className="min-[800px]:ml-[10px]  text-center max-[800px]:ml-[15px]"
          placeholder="Enter old password"
          required={true}
        />
        <br />
        <IonInput
          type="password"
          onIonChange={(e) => {
            if (e.detail.value === undefined) return;
            setNewPassword(e.detail.value!);
          }}
          clearInput={true}
          value={newPassword}
          id="password"
          className="min-[800px]:ml-[10px]  text-center max-[800px]:ml-[15px]"
          placeholder="Enter new password"
          required={true}
        />
        <br />
        <IonInput
          type="password"
          onIonChange={(e) => {
            if (e.detail.value === undefined) return;
            setConfirmNewPassword(e.detail.value!);
          }}
          clearInput={true}
          value={confirmNewPassword}
          id="password"
          className="min-[800px]:ml-[10px]  text-center max-[800px]:ml-[15px]"
          placeholder="Confirm new password"
          required={true}
        />
        <p id="warning" className="text-[#e04055] text-center">
          {!message && !mistake && <br></br>} {message}{" "}
          {mistake && "Incorrect password"}
        </p>
        <IonButton
          type="submit"
          expand="block"
          id="button"
          className="flex justify-center ml-[35%] max-w-[35%]"
        >
          Change
        </IonButton>
        <a
          id="forgot"
          className="text-center no-underline"
          href="/account/forgot"
        >
          <p>forgot password</p>
        </a>
      </form>
    </div>
  );
};

export default AccountChangeComponent;
