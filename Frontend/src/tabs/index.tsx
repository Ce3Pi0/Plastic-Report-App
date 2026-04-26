import { IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import { home, listOutline, locate, person } from "ionicons/icons";
import { useContext } from "react";
import { GlobalContext } from "../context/Context";
import { IContext } from "../interfaces/interfaces";

const TabBar = () => {
  const { user } = useContext(GlobalContext) as IContext;

  const isSelected = (path: string) => {
    return window.location.pathname.includes(path);
  };

  return (
    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href="/home" selected={isSelected("home")}>
        <IonIcon icon={home} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>

      <IonTabButton tab="report" href="/report" selected={isSelected("report")}>
        <IonIcon
          icon={
            user?.type === "client" || user?.type === undefined
              ? locate
              : listOutline
          }
        />
        <IonLabel>
          {user?.type === "client" || user?.type === undefined
            ? "Report"
            : "Reports"}
        </IonLabel>
      </IonTabButton>

      <IonTabButton
        tab={"/account"}
        href={"/account"}
        selected={isSelected("account")}
      >
        <IonIcon icon={person} />
        <IonLabel>Account</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

export default TabBar;
