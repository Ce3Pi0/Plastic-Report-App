import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { IonButton, IonInput, IonLabel, IonTitle, useIonAlert } from '@ionic/react';

const ContactComponent: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);

  const [presentAlert] = useIonAlert();

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs.sendForm('service_x9vj4ns', 'template_xw8sfpc', form.current!, 'XT-HJGrCMokknkVE6')
      .then((res) => {
        if (res.status === 200) {
          presentAlert({
            subHeader: 'Success',
            message: 'Email has been sent successfully!',
            buttons: [{
              text: 'OK',
              role: 'confirm',
            },],
          });
        }
      }, (err) => {
        presentAlert({
          subHeader: 'Fail',
          message: err,
          buttons: [{
            text: 'OK',
            role: 'confirm',
          },],
        });
      });
  };

  return (
    <div id="container">
      <form id="form" ref={form} onSubmit={sendEmail}>
        <IonTitle id="title">Send us an email</IonTitle>

        <IonLabel>Name</IonLabel><br />
        <IonInput required={true} placeholder="Enter your name" type="text" name="user_name" /><br />

        <IonLabel>Email</IonLabel><br />
        <IonInput required={true} placeholder="Enter your email" type="email" name="user_email" /><br />

        <IonLabel>Message</IonLabel><br /><br />
        <textarea placeholder="Enter a message you want to send" required name="message" /><br />

        <IonButton type="submit" id="button"> Submit</IonButton>
      </form>
    </div>
  );
}

export default ContactComponent;