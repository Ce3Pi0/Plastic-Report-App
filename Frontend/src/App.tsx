import { Redirect, Route, useLocation } from 'react-router-dom';
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
import Home from './pages/Home/Home';
import Report from './pages/Report/Report';
// import Shop from './interfaces/Shop/Report';
import AccountLogin from './pages/Account/AccountLogin';
import NotFound from './pages/NotFound/NotFound';

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
import AccountCreate from './pages/Account/AccountCreate';
import AccountChange from './pages/Account/AccountChange';
import Account from './pages/Account/Account';
import { contextInterface, GlobalContext, GlobalProvider } from './context/Context';
import { useContext } from 'react';

setupIonicReact();

const Tabs = () => {
  const {loggedIn, user, isLoaded} = useContext(GlobalContext) as contextInterface;
  const location = useLocation();

  return !isLoaded ? <IonLoading isOpen={true} message="Loading data... Please wait." /> : (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/report">
          <Report />
        </Route>
        {/* <Route exact path="/shop">
          <Shop />
        </Route> */}
        <Route exact path="/account">
          <Account/>
        </Route>
        <Route exact path="/account/login">
          <AccountLogin/>
        </Route>
        <Route exact path="/account/create">
          <AccountCreate/>
        </Route>
        <Route exact path="/account/change">
          <AccountChange />
        </Route>
        <Redirect exact from="/" to={loggedIn === true ? "/home" : "/account/login"} />
        <Route>
          <NotFound />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="report" href="/report">
          <IonIcon icon={user?.type === "client" || user?.type === undefined? locate:listOutline} />
          <IonLabel>{user?.type === "client" || user?.type === undefined? "Report":"Reports"}</IonLabel>
        </IonTabButton>
        {/* <IonTabButton tab="shop" href="/shop">
          <IonIcon icon={cart} />
          <IonLabel>E-Shop</IonLabel>
        </IonTabButton> */}
        <IonTabButton tab={loggedIn === true ? "/account" : "/account/login"} href={loggedIn === true ? "/account" : "/account/login"} selected={location.pathname.includes("account")}>
          <IonIcon icon={person} />
          <IonLabel>Account</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
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
