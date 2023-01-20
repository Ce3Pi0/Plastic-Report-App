import { OverlayEventDetail } from "@ionic/core";
import { updateUserImage } from "../../../utils/hooks/updateUserImage";

import { DOMAIN } from "../../../utils/utils";


const openImageUpdateModal = (present: any, updateTokens: Function, presentAlert: any) => {

  present({
    onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
      if (ev.detail.role === 'confirm') {
        const data = new FormData();
        data.append("image", ev.detail.data.file);

        updateUserImage(`http://${DOMAIN}/user?id=${window.localStorage.getItem("id")!}`, "PUT", data, updateTokens, presentAlert, "form");
      }
    }
  });
}

export default openImageUpdateModal;