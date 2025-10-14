import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import Homepage from "./page/Homepage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Forget from "./Forget";
import Changepassword from "./Changepassword";
import NavigationGate from "./ProtectedRoute";
import "./index.css";
import SystemLog from "./page/SystemLog";
import EntryRoute from "./EntryRoute";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password/:token" element={<Changepassword />} />
        <Route path="/" element={<EntryRoute />} />

        <Route element={<NavigationGate />}>
          <Route
            path="*"
            element={
              localStorage.getItem("token") ? (
                <Navigate to="/homepage" replace />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="/system-log" element={<SystemLog />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/forget" element={<Forget />} />
        </Route>

       
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
