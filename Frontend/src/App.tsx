import { useContext } from 'react';
import { Redirect, Route, useHistory, useLocation } from 'react-router-dom';

import {
  IonApp,
  IonIcon,
  IonLabel,
  IonLoading,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, cart, person, locate, listOutline } from 'ionicons/icons';

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
import Home from './pages/Home/Home';
import About from './pages/Home/About';
import Contact from './pages/Home/Contact';
import Report from './pages/Report/Report';
import AccountLogin from './pages/Account/AccountLogin';
import AccountCreate from './pages/Account/AccountCreate';
import AccountChange from './pages/Account/AccountChange';
import Account from './pages/Account/Account';
import NotFound from './pages/NotFound/NotFound';


import { GlobalContext, GlobalProvider } from './context/Context';
import { ContextInterface } from './interfaces/interfaces';
import AccountForgot from './pages/Account/AccountForgot';
import ConfiemEmail from './pages/Account/confirmEmail';
import AccountForgotChange from './pages/Account/AccountForgotChange';
import ConfirmEmailComp from './components/account/confirmEmailComponent';

setupIonicReact();


const Tabs = () => {
  const { loggedIn, user, isLoaded } = useContext(GlobalContext) as ContextInterface;
  const location = useLocation();

  const history = useHistory();

  document.addEventListener('ionBackButton', (ev: any) => {
    ev.detail.register(10, () => {
      history.goBack();
    });
  });

  return !isLoaded ? <IonLoading isOpen={true} message="Loading data... Please wait." /> : loggedIn ? (
    <IonTabs>
      <IonRouterOutlet>

        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/home/about">
          <About />
        </Route>
        <Route exact path="/home/contact">
          <Contact />
        </Route>

        <Route exact path="/report">
          <Report />
        </Route>
        {/* <Route exact path="/shop">
          <Shop />
        </Route> */}
        <Route exact path="/account">
          <Account />
        </Route>
        <Route exact path="/account/change">
          <AccountChange />
        </Route>
        <Route exact path="/account/forgot">
          <AccountForgot />
        </Route>
        <Route exact path="/account/forgot_change">
          <AccountForgotChange />
        </Route>
        <Route exact path="/account/confirm_email">
          <ConfirmEmailComp />
        </Route>

        <Redirect exact from="/account/create" to="/account" />
        <Redirect exact from="/account/login" to="/account" />
        <Redirect exact from="/" to={"/home"} />

        <Route>
          <NotFound />
        </Route>

      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home" selected={location.pathname.includes("home")}>
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>

        <IonTabButton tab="report" href="/report" selected={location.pathname.includes("report")}>
          <IonIcon icon={user?.type === "client" || user?.type === undefined ? locate : listOutline} />
          <IonLabel>{user?.type === "client" || user?.type === undefined ? "Report" : "Reports"}</IonLabel>
        </IonTabButton>

        {/* <IonTabButton tab="shop" href="/shop">
          <IonIcon icon={cart} />
          <IonLabel>E-Shop</IonLabel>
        </IonTabButton> */}

        <IonTabButton tab={"/account"} href={"/account"} selected={location.pathname.includes("account")}>
          <IonIcon icon={person} />
          <IonLabel>Account</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  ) : (
    <IonRouterOutlet>
      <Route exact path="/account/login">
        <AccountLogin />
      </Route>
      <Route exact path="/account/forgot">
        <AccountForgot />
      </Route>
      <Route exact path="/account/forgot_change">
        <AccountForgotChange />
      </Route>
      <Route exact path="/account/create">
        <AccountCreate />
      </Route>
      <Route exact path="/account/confirm_email">
        <ConfiemEmail />
      </Route>

      <Redirect exact from="/" to="/account/login" />
      <Redirect exact from="/home" to="/account/login" />
      <Redirect exact from="/home/about" to="/account/login" />
      <Redirect exact from="/home/contact" to="/account/login" />
      <Redirect exact from="/report" to="/account/login" />
      <Redirect exact from="/account" to="/account/login" />
      <Redirect exact from="/account/change" to="/account/login" />
      <Redirect exact from="/shop" to="/account/login" />

      <Route>
        <NotFound />
      </Route>
    </IonRouterOutlet>
  )
}

const App: React.FC = () => (

  <GlobalProvider>
    <IonApp>
      <IonReactRouter>
        <Tabs />
      </IonReactRouter>
    </IonApp>
  </GlobalProvider>
);

export default App;
