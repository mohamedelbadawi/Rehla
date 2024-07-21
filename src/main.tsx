import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App.tsx";
import Header from "./components/custom/header.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Toaster } from "./components/ui/toaster.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}
      >
        <Header />
        <App />
        <Toaster />
      </GoogleOAuthProvider>
    </Router>
  </React.StrictMode>
);
