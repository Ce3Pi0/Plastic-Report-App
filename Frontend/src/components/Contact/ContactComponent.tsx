import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

import {
  IonButton,
  IonInput,
  IonLabel,
  IonTitle,
  useIonAlert,
} from "@ionic/react";

const ContactComponent: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);

  const [presentAlert] = useIonAlert();

  const SendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_x9vj4ns",
        "template_xw8sfpc",
        form.current!,
        "XT-HJGrCMokknkVE6",
      )
      .then(
        (res) => {
          if (res.status === 200) {
            presentAlert({
              subHeader: "Success",
              message: "Email has been sent successfully!",
              buttons: [
                {
                  text: "OK",
                  role: "confirm",
                },
              ],
            });
          }
        },
        (err) => {
          presentAlert({
            subHeader: "Fail",
            message: err,
            buttons: [
              {
                text: "OK",
                role: "confirm",
              },
            ],
          });
        },
      );
  };

  return (
    <div id="container" className="m-auto flex justify-center items-center">
      <form
        id="form"
        className="bg-[var(--ion-color-light)] min-[800px]:w-[30%] max-[800px]:w-[70%] rounded-[10px] p-[20px]"
        ref={form}
        onSubmit={SendEmail}
      >
        <IonTitle className="text-[22px] p-[10px] text-center" id="title">
          Send us an email
        </IonTitle>

        <IonLabel className="text-[17px]">Name</IonLabel>
        <br />
        <IonInput
          required={true}
          placeholder="Enter your name"
          type="text"
          name="user_name"
        />
        <br />

        <IonLabel>Email</IonLabel>
        <br />
        <IonInput
          required={true}
          placeholder="Enter your email"
          type="email"
          name="user_email"
        />
        <br />

        <IonLabel>Message</IonLabel>
        <br />
        <br />
        <textarea
          className="resize-none h-[170px] w-[100%] rounded-[6px] p-[10px]"
          placeholder="Enter a message you want to send"
          required
          name="message"
        />
        <br />

        <IonButton
          type="submit"
          id="button"
          className="flex justify-center ml-[35%] max-w-[30%]"
        >
          {" "}
          Submit
        </IonButton>
      </form>
    </div>
  );
};

export default ContactComponent;
