import { useContext } from 'react';

import { IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

/* Components */
import SendReport from '../../components/report/ClientReport/SendReport';
import ShowReports from '../../components/report/AdminReports/ShowReports';

import { GlobalContext } from '../../context/Context';
import { ContextInterface } from '../../interfaces/interfaces';

import './Report.css';


const Report: React.FC = () => {

  const {user} = useContext(GlobalContext) as ContextInterface;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {user?.type === "client" && <IonTitle>Report</IonTitle>}
          {user?.type === "admin" && <IonTitle>All reports</IonTitle>}
        </IonToolbar>
      </IonHeader>

      {user?.type === "client" && < SendReport/>}
      {user?.type === "admin" && < ShowReports/>} 
    </IonPage>
  );
};

export default Report;
