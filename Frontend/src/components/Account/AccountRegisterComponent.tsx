// FIXME: Radio buttons on click fix

import React, { useContext, useState } from "react";
import { useHistory } from "react-router";

import {
  IonButton,
  IonTitle,
  IonInput,
  IonFab,
  IonFabButton,
  IonIcon,
  IonRadioGroup,
  IonItem,
  IonLabel,
  IonRadio,
  useIonAlert,
  IonLoading,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";

import { IUserRegister } from "../../interfaces/interfaces";

import { userRegisterRequest } from "../../utils/hooks/userRegisterRequest";
import { DOMAIN, UNSAFE_PASSWORD } from "../../config";

const AccountRegisterComponent: React.FC = () => {
  const [presentAlert] = useIonAlert();

  const [loading, setLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const [userExists, setUserExists] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const history = useHistory();

  const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (gender === "") {
      setMessage("Please select a gender!");

      return;
    }
    if (password.length < UNSAFE_PASSWORD) {
      setMessage("Password too weak!");

      return;
    }

    const newUser: IUserRegister = {
      name,
      username,
      email,
      password,
      gender,
    };

    userRegisterRequest(
      `http://${DOMAIN}/auth/register`,
      "POST",
      newUser,
      setMessage,
      setUserExists,
      presentAlert,
      setLoading,
    );
  };

  return (
    <div
      id="container"
      className="pt-[2%] min-[800px]:pt-[5%] max-[800px]:pt-[20%] m-auto flex justify-center items-center"
    >
      <IonLoading isOpen={loading} message={"Creating account..."} />
      <form
        id="form"
        className="bg-[var(--ion-color-light)] min-[800px]:w-[30%] max-[800px]:w-[70%] rounded-[10px] p-[20px]"
        onSubmit={HandleSubmit}
      >
        <IonFab horizontal="start" vertical="top">
          <IonFabButton
            size={"small"}
            onClick={() => history.push("/account/login")}
          >
            <IonIcon icon={arrowBack}></IonIcon>
          </IonFabButton>
        </IonFab>

        <IonTitle id="title" className="p-[10px] text-center">
          Create account
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

        <br />

        <IonInput
          onIonChange={(e) => {
            if (e.detail.value === undefined) return;
            setName(e.detail.value!);
          }}
          clearInput={true}
          value={name}
          id="username"
          className="text-center min-[800px]:ml-[10px] max-[800px]:ml-[15px]"
          placeholder="Enter your name"
          required={true}
        />

        <br />

        <IonInput
          onIonChange={(e) => {
            if (e.detail.value === undefined) return;
            setUsername(e.detail.value!);
          }}
          clearInput={true}
          value={username}
          id="username"
          className="text-center min-[800px]:ml-[10px] max-[800px]:ml-[15px]"
          placeholder="Enter username"
          required={true}
        />

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
          placeholder="Enter password"
          required={true}
        />

        <IonRadioGroup
          value={gender}
          onIonChange={(e) => setGender(e.detail.value)}
        >
          <IonItem className="gender" color={"light"}>
            <IonLabel>Male</IonLabel>
            <IonRadio slot="end" value="male"></IonRadio>
          </IonItem>

          <IonItem className="gender" color={"light"}>
            <IonLabel>Female</IonLabel>
            <IonRadio slot="end" value="female"></IonRadio>
          </IonItem>

          <IonItem className="gender" color={"light"}>
            <IonLabel>Other</IonLabel>
            <IonRadio slot="end" value="other"></IonRadio>
          </IonItem>
        </IonRadioGroup>

        {userExists && !message && (
          <p id="warning" className="text-[#e04055] text-center">
            User already exists!
          </p>
        )}
        {!userExists && message && (
          <p id="warning" className="text-[#e04055] text-center">
            {message}
          </p>
        )}
        {!userExists && !message && <br />}

        <IonButton
          type="submit"
          expand="block"
          id="button"
          className="flex justify-center ml-[35%] max-w-[30%]"
        >
          Create
        </IonButton>
      </form>
    </div>
  );
};

export default AccountRegisterComponent;
