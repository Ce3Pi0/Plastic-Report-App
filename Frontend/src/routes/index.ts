import { FunctionComponent } from "react";
import AccountLoginPage from "../pages/Account/AccountLoginPage";
import AccountRegisterPage from "../pages/Account/AccountRegisterPage";
import AccountForgotPage from "../pages/Account/AccountForgotPage";
import AccountForgotChangePage from "../pages/Account/AccountForgotChangePage";
import AccountConfirmEmailPage from "../pages/Account/AccountConfirmEmailPage";
import HomePage from "../pages/Home/HomePage";
import AboutPage from "../pages/About/AboutPage";
import ContactPage from "../pages/Contact/ContactPage";
import ReportPage from "../pages/Report/Report";
import AccountInfoPage from "../pages/Account/AccountInfoPage";
import AccountChangePage from "../pages/Account/AccountChangePage";

export interface IRoutes {
  path: string;
  exact: boolean;
  component: FunctionComponent;
}

export const sharedRoutes: IRoutes[] = [
  { path: "/account/forgot", exact: true, component: AccountForgotPage },
  {
    path: "/account/forgot_change",
    exact: true,
    component: AccountForgotChangePage,
  },
  {
    path: "/account/confirm_email",
    exact: true,
    component: AccountConfirmEmailPage,
  },
];

export const authRoutes: IRoutes[] = [
  { path: "/account/login", exact: true, component: AccountLoginPage },
  { path: "/account/create", exact: true, component: AccountRegisterPage },
];

export const protectedRoutes: IRoutes[] = [
  { path: "/home", exact: true, component: HomePage },
  { path: "/home/about", exact: true, component: AboutPage },
  { path: "/home/contact", exact: true, component: ContactPage },
  { path: "/report", exact: true, component: ReportPage },
  { path: "/account", exact: true, component: AccountInfoPage },
  { path: "/account/change", exact: true, component: AccountChangePage },
];
