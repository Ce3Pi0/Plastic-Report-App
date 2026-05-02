import React, { useState } from "react";

import {
  IonButton,
  IonTitle,
  IonInput,
  IonFab,
  IonFabButton,
  IonIcon,
  IonRadioGroup,
  useIonAlert,
  IonLoading,
  useIonRouter,
  IonLabel,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";

import { IUserRegister } from "../../interfaces/interfaces";

import { userRegisterRequest } from "../../utils/hooks/userRegisterRequest";
import { DOMAIN, UNSAFE_PASSWORD } from "../../config";
import GenderComponent from "./GenderComponent";
import { gendersType } from "../../types";

const AccountRegisterComponent: React.FC = () => {
  const [presentAlert] = useIonAlert();

  const [loading, setLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [gender, setGender] = useState<gendersType | "">("");

  const [userExists, setUserExists] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const router = useIonRouter();

  const genders: gendersType[] = ["male", "female", "other"];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
      `${DOMAIN}/auth/register`,
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
      className="min-[800px]:pt-[5%] max-[800px]:pt-[20%] m-auto flex justify-center items-center"
    >
      <IonLoading isOpen={loading} message={"Creating account..."} />
      <form
        id="form"
        className="bg-[var(--ion-color-light)] min-[800px]:w-[30%] max-[800px]:w-[70%] rounded-[10px] p-[20px]"
        onSubmit={handleSubmit}
      >
        <IonFab horizontal="start" vertical="top">
          <IonFabButton
            size={"small"}
            onClick={() => router.push("/account/login")}
          >
            <IonIcon icon={arrowBack} />
          </IonFabButton>
        </IonFab>

        <IonTitle id="title" className="p-[10px] text-center">
          Create account
        </IonTitle>

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
        <div className="w-full flex items-center justify-center pb-2 my-4 border-b-2 border-[var(--ion-color-medium)]">
          <IonLabel>Pick a Gender:</IonLabel>
        </div>
        <IonRadioGroup
          value={gender}
          onIonChange={(e) => setGender(e.detail.value)}
          className="!flex !flex-row !items-center pt-1 max-[800px]:!flex-col max-[800px]:!w-[100%]"
        >
          {genders.map((gender, index) => (
            <GenderComponent
              key={index}
              gender={gender}
              setGender={setGender}
            />
          ))}
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
          className="flex justify-center ml-[35%] max-w-[40%]"
        >
          Register
        </IonButton>
      </form>
    </div>
  );
};

export default AccountRegisterComponent;
