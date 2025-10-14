import { Navigate } from "react-router-dom";
import Signup from "./Signup";

export default function EntryRoute() {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/homepage" replace />;
  }
  return <Signup />;
}
