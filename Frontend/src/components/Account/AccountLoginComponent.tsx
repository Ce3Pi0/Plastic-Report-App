import React, { useContext, useState } from "react";

import {
  IonButton,
  IonInput,
  IonLoading,
  IonTitle,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";

import { GlobalContext } from "../../context/Context";

import { IUserLogin, IContext } from "../../interfaces/interfaces";

import { userLoginRequest } from "../../utils/hooks/userLoginRequest";
import { DOMAIN } from "../../config";

const AccountLoginComponent: React.FC = () => {
  const router = useIonRouter();

  const [presentAlert] = useIonAlert();

  const { setLoggedIn } = useContext(GlobalContext) as IContext;

  const [loading, setLoading] = useState<boolean>(false);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [message, setMessage] = useState<string | null>(null);
  const [mistake, setMistake] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user: IUserLogin = {
      username,
      password,
    };

    userLoginRequest(
      `${DOMAIN}/auth/login`,
      "POST",
      user,
      setMessage,
      setMistake,
      setLoggedIn,
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
      <IonLoading isOpen={loading} message={"Logging in..."} />

      <form
        id="form"
        className="bg-[var(--ion-color-light)] min-[800px]:w-[30%] max-[800px]:w-[70%] rounded-[10px] p-[20px]"
        onSubmit={handleSubmit}
      >
        <IonTitle id="title" className="p-[10px] text-center">
          Login
        </IonTitle>

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

        <p id="warning" className="text-[#e04055] text-center">
          {!message && !mistake && <br></br>} {message}{" "}
          {mistake && "Incorrect password or username"}
        </p>

        <IonButton
          type="submit"
          expand="block"
          id="button"
          className="flex justify-center ml-[35%] max-w-[30%]"
        >
          Login
        </IonButton>

        <div className="flex w-[100%] items-center justify-between max-[10000px]:flex-col min-[1000px]:flex-row">
          <a
            id="create"
            className="float-left no-underline"
            href="/account/create"
          >
            <p>create an account</p>
          </a>
          <a
            id="forgot"
            className="float-right text-center no-underline"
            href="/account/forgot"
          >
            <p>forgot password</p>
          </a>
        </div>
      </form>
    </div>
  );
};

export default AccountLoginComponent;
