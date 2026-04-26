import { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";

import {
  IonApp,
  IonLoading,
  IonRouterOutlet,
  IonTabs,
  setupIonicReact,
  useIonRouter,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { App as ExitApp } from "@capacitor/app";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import NotFoundPage from "./pages/NotFound/NotFoundPage";

import { GlobalContext, GlobalProvider } from "./context/Context";

import { IContext } from "./interfaces/interfaces";
import AppUrlListener from "./AppUrlListener";
import { authRoutes, protectedRoutes, sharedRoutes } from "./routes";
import TabBar from "./tabs";

setupIonicReact();

const Tabs = () => {
  const { loggedIn, isLoaded } = useContext(GlobalContext) as IContext;

  const ionRouter = useIonRouter();
  useEffect(() => {
    const handler = (ev: any) => {
      ev.detail.register(10, () => {
        if (ionRouter.canGoBack()) {
          window.history.back();
        } else {
          ExitApp.exitApp();
        }
      });
    };

    document.addEventListener("ionBackButton", handler);

    return () => {
      document.removeEventListener("ionBackButton", handler);
    };
  }, [ionRouter]);

  if (!isLoaded) {
    return <IonLoading isOpen={!true} message="Loading data... Please wait." />;
  }

  return (
    <IonTabs>
      <IonRouterOutlet>
        {sharedRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
        {protectedRoutes.map((route, index) => (
          <Route key={index} path={route.path} exact={route.exact}>
            {loggedIn ? <route.component /> : <Redirect to="/account/login" />}
          </Route>
        ))}
        {authRoutes.map((route, index) => (
          <Route key={index} path={route.path} exact={route.exact}>
            {!loggedIn ? <route.component /> : <Redirect to="/home" />}
          </Route>
        ))}

        <Route exact path="/">
          {loggedIn ? (
            <Redirect to="/home" />
          ) : (
            <Redirect to="/account/login" />
          )}
        </Route>

        <Route>
          <NotFoundPage />
        </Route>
      </IonRouterOutlet>

      {loggedIn && <TabBar />}
    </IonTabs>
  );
};

const App: React.FC = () => (
  <GlobalProvider>
    <IonApp>
      <IonReactRouter>
        <AppUrlListener />
        <Tabs />
      </IonReactRouter>
    </IonApp>
  </GlobalProvider>
);

export default App;
