import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/index";
import { ToastProvider } from "react-toast-notifications";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider>
      <Provider store={store}>
        <GoogleOAuthProvider clientId="287561778466-ar0blpg31c7jem2s58bvr3tq7b19npdq.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </Provider>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

//extra api key sudhanshu AIzaSyD53f8EOZksI3yzYqusT85aaAFX5Gleec0
