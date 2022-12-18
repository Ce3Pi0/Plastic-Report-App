import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useContext } from 'react';
import SendReport from '../../components/report/SendReport';
import ShowReports from '../../components/report/AdminReports/ShowReports';
import { contextInterface, GlobalContext } from '../../context/Context';
import './Report.css';

const Report: React.FC = () => {

  const {loggedIn, user} = useContext(GlobalContext) as contextInterface;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {user?.type === "client" && <IonTitle>Report</IonTitle>}
          {user?.type === "admin" && <IonTitle>All reports</IonTitle>}
        </IonToolbar>
      </IonHeader>

      {!loggedIn &&
      <IonContent> 
        <div className="not-found">
              <h1>You are not logged in!</h1>
              <IonButton shape="round" href="/account/login" slot="center">Log in</IonButton>
        </div>
      </IonContent>}
      {user?.type === "client" && < SendReport/>}
      {user?.type === "admin" && < ShowReports/>} 
    </IonPage>
  );
};

export default Report;
