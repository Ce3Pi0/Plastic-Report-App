import React, { useRef } from "react";

import {
  IonButton,
  IonInput,
  IonLabel,
  IonTitle,
  useIonAlert,
} from "@ionic/react";
import { sendEmail } from "../../utils/hooks/sendMail";

const ContactComponent: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);

  const [presentAlert] = useIonAlert();

  const handleSendMail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendEmail(presentAlert, form);
    form.current!.reset();
  };

  return (
    <div
      id="container"
      className="m-auto flex justify-center items-center my-11"
    >
      <form
        id="form"
        className="bg-[var(--ion-color-light)] min-h-[60vh] min-[800px]:w-[30%] max-[800px]:w-[70%] rounded-[10px] p-[20px] flex flex-col justify-between"
        ref={form}
        onSubmit={handleSendMail}
      >
        <div className="h-[10%]">
          <IonTitle className="text-[22px] p-[10px] text-center " id="title">
            Send us an email!
          </IonTitle>
        </div>

        <IonLabel className="text-[17px] my-2">Name</IonLabel>
        <IonInput
          className="mb-2"
          required={true}
          placeholder="Enter your name"
          type="text"
          name="user_name"
        />

        <IonLabel className="my-2">Email</IonLabel>
        <IonInput
          className="mb-2"
          required={true}
          placeholder="Enter your email"
          type="email"
          name="user_email"
        />

        <IonLabel class="my-2">Message</IonLabel>
        <textarea
          className="resize-none h-[170px] w-[100%] rounded-[6px] p-[10px] my-2"
          placeholder="Enter a message you want to send"
          required
          name="message"
        />

        <IonButton
          type="submit"
          id="button"
          className="flex justify-center ml-[35%] max-w-[30%]"
        >
          Send
        </IonButton>
      </form>
    </div>
  );
};

export default ContactComponent;
