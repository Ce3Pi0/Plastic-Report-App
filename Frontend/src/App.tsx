import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import {
  IonApp,
  IonIcon,
  IonLabel,
  IonLoading,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  useIonRouter
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, person, locate, listOutline } from 'ionicons/icons';
import { App as ExitApp } from '@capacitor/app';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Pages */
import HomePage from './pages/Home/HomePage';
import AboutPage from './pages/About/AboutPage';
import ContactPage from './pages/Contact/ContactPage';
import ReportPage from './pages/Report/Report';
import AccountLoginPage from './pages/Account/AccountLoginPage';
import AccountRegisterPage from './pages/Account/AccounRegisterPage';
import AccountChangePage from './pages/Account/AccountChangePage';
import AccountPage from './pages/Account/AccountInfoPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import AccountForgotPage from './pages/Account/AccountForgotPage';
import AccountForgotChangePage from './pages/Account/AccountForgotChangePage';
import AccountConfirmEmailPage from './pages/Account/AccountConfirmEmailPage';

import { GlobalContext, GlobalProvider } from './context/Context';

import { IContext } from './interfaces/interfaces';
import AppUrlListener from './AppUrlListener';

import { assetLinks } from './json/json';


setupIonicReact();


const Tabs = () => {

  const { loggedIn, user, isLoaded } = useContext(GlobalContext) as IContext;

  const ionRouter = useIonRouter();
  document.addEventListener('ionBackButton', (ev: any) => {
    ev.detail.register(10, () => {
      if (ionRouter.canGoBack()) {
        window.history.back();
      } else {
        ExitApp.exitApp();
      }
    });
  });

  return !isLoaded ? <IonLoading isOpen={true} message="Loading data... Please wait." /> : loggedIn ? (
    <IonTabs>
      <IonRouterOutlet>

        <Route exact path="/home">
          <HomePage />
        </Route>
        <Route exact path="/home/about">
          <AboutPage />
        </Route>
        <Route exact path="/home/contact">
          <ContactPage />
        </Route>

        <Route exact path="/report">
          <ReportPage />
        </Route>
        {/* <Route exact path="/shop">
          <Shop />
        </Route> */}
        <Route exact path="/account">
          <AccountPage />
        </Route>
        <Route exact path="/account/change">
          <AccountChangePage />
        </Route>
        <Route exact path="/account/forgot">
          <AccountForgotPage />
        </Route>
        <Route exact path="/account/forgot_change">
          <AccountForgotChangePage />
        </Route>
        <Route exact path="/account/confirm_email">
          <AccountConfirmEmailPage />
        </Route>

        <Redirect exact from="/account/create" to="/account" />
        <Redirect exact from="/account/login" to="/account" />
        <Redirect exact from="/" to={"/home"} />


        <Route exact path="/.well-known/assetlinks.json">
          <>{JSON.stringify(assetLinks)}</>
        </Route>
        <Route>
          <NotFoundPage />
        </Route>

      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home" selected={window.location.pathname.includes("home")}>
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>

        <IonTabButton tab="report" href="/report" selected={window.location.pathname.includes("report")}>
          <IonIcon icon={user?.type === "client" || user?.type === undefined ? locate : listOutline} />
          <IonLabel>{user?.type === "client" || user?.type === undefined ? "Report" : "Reports"}</IonLabel>
        </IonTabButton>

        {/* <IonTabButton tab="shop" href="/shop">
          <IonIcon icon={cart} />
          <IonLabel>E-Shop</IonLabel>
        </IonTabButton> */}

        <IonTabButton tab={"/account"} href={"/account"} selected={window.location.pathname.includes("account")}>
          <IonIcon icon={person} />
          <IonLabel>Account</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  ) : (
    <IonRouterOutlet>
      <Route exact path="/account/login">
        <AccountLoginPage />
      </Route>
      <Route exact path="/account/forgot">
        <AccountForgotPage />
      </Route>
      <Route exact path="/account/forgot_change">
        <AccountForgotChangePage />
      </Route>
      <Route exact path="/account/create">
        <AccountRegisterPage />
      </Route>
      <Route exact path="/account/confirm_email">
        <AccountConfirmEmailPage />
      </Route>

      <Redirect exact from="/" to="/account/login" />
      <Redirect exact from="/home" to="/account/login" />
      <Redirect exact from="/home/about" to="/account/login" />
      <Redirect exact from="/home/contact" to="/account/login" />
      <Redirect exact from="/report" to="/account/login" />
      <Redirect exact from="/account" to="/account/login" />
      <Redirect exact from="/account/change" to="/account/login" />
      <Redirect exact from="/shop" to="/account/login" />

      <Route exact path="/.well-known/assetlinks.json">
        <>{JSON.stringify(assetLinks)}</>
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </IonRouterOutlet>
  )
}

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
