import { OverlayEventDetail } from "@ionic/core";


const openReportIssueModal = (present: any) => {

  present({
    onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => { }
  });
}

export default openReportIssueModal;