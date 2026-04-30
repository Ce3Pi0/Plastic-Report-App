// TODO: Fix who sends the email on EMAILJS

import emailjs from "@emailjs/browser";
import { handleSuccessAlert } from "../alerts";
import { ErrorCodes } from "../../config";

export const sendEmail = async (
  presentAlert: any,
  form: React.RefObject<HTMLFormElement>,
) => {
  try {
    const data = await emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.current!,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    );

    if (data.status === ErrorCodes.OK)
      handleSuccessAlert(presentAlert, "Email has been sent successfully!");
  } catch (err: any) {
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
  }
};
