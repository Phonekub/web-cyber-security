import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function NavigationGate() {
  const location = useLocation();
  const ok = location.state && (location.state as any).viaInternal === true;

  
  if (!ok) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
