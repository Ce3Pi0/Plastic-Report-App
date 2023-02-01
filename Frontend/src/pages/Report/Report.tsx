import { useContext } from 'react';

import { IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

/* Components */
import SendReportComponent from '../../components/Report/ClientReports/SendReportComponent';
import ShowReportsComponent from '../../components/Report/AdminReports/ShowReportsComponent';

import { GlobalContext } from '../../context/Context';

import { IContext } from '../../interfaces/interfaces';

import './Report.css';


const Report: React.FC = () => {

  const { user } = useContext(GlobalContext) as IContext;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {user?.type === "client" && <IonTitle>Report</IonTitle>}
          {user?.type === "admin" && <IonTitle>All reports</IonTitle>}
        </IonToolbar>
      </IonHeader>

      {user?.type === "client" && < SendReportComponent />}
      {user?.type === "admin" && < ShowReportsComponent />}
    </IonPage>
  );
};

export default Report;
