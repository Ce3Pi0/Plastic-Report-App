import { useContext } from "react";

import {
  IonButton,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

/* Components */
import SendReportComponent from "../../components/Report/ClientReports/SendReportComponent";
import ShowReportsComponent from "../../components/Report/AdminReports/ShowReportsComponent";

import { GlobalContext } from "../../context/Context";

import { IContext } from "../../interfaces/interfaces";
import { RiAdminLine, RiUser3Line } from "react-icons/ri";

const Report: React.FC = () => {
  const { user, setView } = useContext(GlobalContext) as IContext;

  console.log(user);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {user?.view === "client" && <IonTitle>Report</IonTitle>}
          {user?.view === "admin" && <IonTitle>All reports</IonTitle>}

          {user?.type === "admin" && (
            <IonButton
              slot="end"
              onClick={() => {
                setView(user?.view === "admin" ? "client" : "admin");
              }}
              color={"primary"}
            >
              {user?.view === "admin" ? <RiUser3Line /> : <RiAdminLine />}
              {user?.view === "admin" ? "Client" : "Admin"} view
            </IonButton>
          )}
        </IonToolbar>
      </IonHeader>

      {user?.view === "client" && <SendReportComponent />}
      {user?.view === "admin" && <ShowReportsComponent />}
    </IonPage>
  );
};

export default Report;
