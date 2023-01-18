import { useContext } from "react";

import { 
    IonContent,
    IonHeader,
    IonToolbar,
    IonItem,
    IonLabel,
    IonPage,
    IonButton,
    IonButtons,
    IonBadge,
    IonIcon,
    IonTitle,
} from '@ionic/react';
import { checkmark } from "ionicons/icons";

import { GlobalContext } from "../../../../context/Context";

import { ContextInterface } from "../../../../interfaces/interfaces";

import useFetch from "../../../../utils/hooks/useFetch";
import { DOMAIN } from "../../../../utils/utils";

import { reportIssueRequest } from "../../../../utils/hooks/reportIssueRequest";


const ViewIssueModal = ({onDismiss,}:{onDismiss: (data?: null, role?: string) => void;}) => {

    const { updateTokens } = useContext(GlobalContext) as ContextInterface;

    const {data, err, loading} = useFetch(`http://${DOMAIN}/issue`, updateTokens);

    const updateIssue = (e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>, id: number) => {
      e.preventDefault();

      reportIssueRequest(`http://${DOMAIN}/issue?id=${id}&fixed=True`, "PUT", undefined, updateTokens, undefined);

      return;
    }

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle slot="start">
                Issues
            </IonTitle>
            <IonButtons slot="end">
              <IonButton color="medium" onClick={() => onDismiss(null, 'cancel')}>
                Close
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {data && JSON.parse(JSON.stringify(data)).issues.map((issue: any) => (
            <IonItem key={issue.id}>
                <IonLabel>
                    <IonBadge className="test" color={issue.fixed === true? "success":"danger"} slot="start"> </IonBadge>
                    <h1>Name: {issue.name}</h1>
                    <p>Description: {issue.description}</p>
                </IonLabel>
                {issue.fixed !== true && <IonButton shape={"round"} color={"success"} size="large" onClick={(e) => updateIssue(e, issue.id)}>
                    <IonIcon icon={checkmark}/>
                </IonButton>}
            </IonItem>
          ))} 
          {err && <div>{err}</div>}
          {loading && <div>...Loading</div>}
        </IonContent>
      </IonPage>
    );
};

export default ViewIssueModal;