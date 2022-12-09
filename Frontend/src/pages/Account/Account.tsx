import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Change from '../../components/account/change';
import Info from '../../components/account/info';
import './Account.css';

const Account: React.FC<{setPath: React.Dispatch<React.SetStateAction<string>>}> = ({setPath}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Account Info:</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Info setPath={setPath}/>
      </IonContent>
    </IonPage>
  );
};

export default Account;
