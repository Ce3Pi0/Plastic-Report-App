import { OverlayEventDetail } from "@ionic/core";
import { userImageRequest } from "../../../utils/hooks/userImageRequest";

import { DOMAIN } from "../../../config";
import { UseIonRouterResult } from "@ionic/react";

const openImageUpdateModal = (
  present: any,
  updateTokens: Function,
  presentAlert: any,
  updatingUserImage: any,
  router: UseIonRouterResult,
) => {
  present({
    onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
      if (ev.detail.role === "confirm") {
        const data = new FormData();
        data.append("image", ev.detail.data.file);

        userImageRequest(
          `{DOMAIN}/user`,
          "PUT",
          data,
          updateTokens,
          presentAlert,
          updatingUserImage,
          "form",
          router,
        );
      }
    },
  });
};

export default openImageUpdateModal;
