import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function NavigationGate() {
  const location = useLocation();
  const ok = (location.state as any)?.viaInternal === true;
  const token = localStorage.getItem("token");

  if (!ok) {
  
    if (token && location.pathname === "/") {
      return <Navigate to="/homepage" replace />;
    }

    
    if (token && location.pathname === "/homepage") {
      return <Outlet />;
    }

    
    if (token) {
      return <Navigate to="/homepage" replace />;
    }

   
    return <Navigate to="/" replace />;
  }

  
  return <Outlet />;
}
