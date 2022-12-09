import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Create from '../../components/account/create';
import './Account.css';

const AccountCreate: React.FC<{setPath: React.Dispatch<React.SetStateAction<string>>}> = ({setPath})=> {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Create setPath={setPath}/>
      </IonContent>
    </IonPage>
  );
};

export default AccountCreate;
