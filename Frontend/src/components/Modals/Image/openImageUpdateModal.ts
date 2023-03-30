import { OverlayEventDetail } from "@ionic/core";
import { userImageRequest } from "../../../utils/hooks/userImageRequest";

import { DOMAIN } from "../../../utils/utils";


const openImageUpdateModal = (present: any, updateTokens: Function, presentAlert: any, updatingUserImage: any) => {

  present({
    onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
      if (ev.detail.role === 'confirm') {
        const data = new FormData();
        data.append("image", ev.detail.data.file);

        userImageRequest(`https://${DOMAIN}/user`, "PUT", data, updateTokens, presentAlert, updatingUserImage, "form");
      }
    }
  });
}

export default openImageUpdateModal;