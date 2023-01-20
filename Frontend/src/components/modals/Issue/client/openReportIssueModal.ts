import { OverlayEventDetail } from "@ionic/core";

import { IssueElementTemplate } from "../../../../interfaces/interfaces";
import { reportIssueRequest } from "../../../../utils/hooks/reportIssueRequest";

import { DOMAIN } from "../../../../utils/utils";


const openReportIssueModal = (present: any, updateTokens: Function, presentAlert: any) => {

  present({
    onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
      if (ev.detail.role === 'confirm') {
        const newIssueReport: IssueElementTemplate = {
          name: ev.detail.data.name,
          description: ev.detail.data.description
        };
        let myHeaders = new Headers();

        myHeaders.append("Authorization", `Bearer ${window.localStorage.getItem("access_token")}`);
        myHeaders.append("Content-Type", "application/json");

        reportIssueRequest(`http://${DOMAIN}/issue`, "POST", JSON.stringify(newIssueReport), updateTokens, presentAlert);
      }
    }
  });
}

export default openReportIssueModal;