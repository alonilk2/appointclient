import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import App from "./App";
import Appointment from "./components/Appointment";
import AppointDashboard from "./components/Appointment/AppointDashboard/AppointDashboard";
import Schedule from "./components/Appointment/AppointDashboard/Schedule/Schedule";
import CustomerRegistration from "./components/Appointment/Authentication/CustomerRegistration";
import PhoneRegistration from "./components/Appointment/Authentication/PhoneRegistration";
import Dashboard from "./components/Dashboard";
import Firebase, { FirebaseContext } from "./components/Firebase";
import OAuth2RedirectHandler from "./components/Oauth2/OAuth2RedirectHandler";
import useAuth from "./hooks/useAuth";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store";
import Email from "./views/EmailConfirm";
import Signin from "./views/Signin";
import Signup from "./views/Signup";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function RTL(props) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));

const CustomRoutes = () => {
  const loggedIn = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<App />} />
          <Route path="appoint">
            <Route path=":businessId">
              <Route index element={<Appointment />} />
              <Route path="authorization" element={<PhoneRegistration />} />
              <Route path="registration" element={<CustomerRegistration />} />
              <Route path="dashboard">
                <Route index element={<AppointDashboard />} />
                <Route path="schedule" element={<Schedule />} />
              </Route>
            </Route>
          </Route>
          <Route path="authorization">
            <Route path="oauth2">
              <Route
                path="redirect"
                element={<OAuth2RedirectHandler />}
              ></Route>
            </Route>
            <Route path="confirm-account" element={<Email />} />
            <Route path="login" element={<Signin />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <FirebaseContext.Provider value={new Firebase()}>
        <RTL>
          <CustomRoutes />
        </RTL>
      </FirebaseContext.Provider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
