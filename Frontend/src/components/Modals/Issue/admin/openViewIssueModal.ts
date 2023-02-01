import { OverlayEventDetail } from "@ionic/core";


const openViewIssueModal = (present: any) => {

  present({
    onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => { }
  });
}

export default openViewIssueModal;