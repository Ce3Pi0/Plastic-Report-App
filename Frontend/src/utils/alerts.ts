const alert = (
  message: string,
  subHeader: string,
  handlerFunction: (e?: string) => void = () => {},
  placeholder: string | null = null,
) => {
  return {
    subHeader,
    message,
    buttons: [
      {
        text: "OK",
        role: "confirm",
        handler: (e?: string) => handlerFunction(e),
      },
    ],
    ...(placeholder && {
      inputs: [
        {
          placeholder,
        },
      ],
    }),
  };
};

export const handleExpiredTokenError = (
  presentAlert: any,
  message: string = "The token has expired",
) => {
  presentAlert(alert(message, "Fail"));
};

export const handleTooManyRequestsError = (
  presentAlert: any,
  handlerFunction: () => void = () => {},
) => {
  presentAlert(
    alert("Error", "To many requests sent... Slow down!", handlerFunction),
  );
};

export const handleNotAllowedError = (presentAlert: any) => {
  presentAlert(alert("Error", "Not allowed!"));
};

export const handleNotAuthorizedError = (presentAlert: any) => {
  presentAlert(alert("Error", "Account privilege too low!"));
};

export const handleGenericError = (
  presentAlert: any,
  message: string = "Something went wrong",
) => {
  presentAlert(alert("Fail", message));
};

export const handleSuccessAlert = (
  presentAlert: any,
  message: string,
  subHeader: string = "Success!",
  handlerFunction: () => void = () => {},
) => {
  presentAlert(alert(message, subHeader, handlerFunction));
};

export const handleNotFoundAlert = (presentAlert: any, message: string) => {
  presentAlert(alert(message, "Fail"));
};

export const handleTokenExpiredError = (
  presentAlert: any,
  message: string,
  subHeader: string = "Error",
  handlerFunction: () => void | Promise<void> = () => {},
) => {
  presentAlert(alert(message, subHeader, handlerFunction, "Email"));
};

export const handleConflictError = (presentAlert: any, message: string) => {
  presentAlert(alert(message, "Conflict"));
};

export const handleNotAcceptableError = (
  presentAlert: any,
  message: string,
  subHeader: string = "Error",
  handlerFunction: () => void | Promise<void> = () => {},
) => {
  presentAlert(alert(message, subHeader, handlerFunction, "Email"));
};
