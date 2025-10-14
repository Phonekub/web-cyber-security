// src/page/Homepage.tsx
import { useNavigate} from "react-router-dom";
import { Button } from "@mui/material";
import "../page/Homepage.css";
import UserProfile from "../UserProfile";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function Homepage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    // ✅ ดึง token จาก localStorage
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // ✅ decode JWT เพื่อดูข้อมูล role
        const decoded = jwtDecode<any>(token);
        setRole(decoded.ROLE);
      } catch (err) {
        console.error("Invalid token", err);
        setRole("");
      }
    }
  }, []);

  return (
    <>
      <UserProfile/>
      <div className="Header">
        <h1> Welcome 🚀</h1>

        <div className="FunctionBar">
          {role === "admin" && (
            <Button
              onClick={() =>
                navigate("/system-log", { state: { viaInternal: true } })
              }
              className="systemlog"
            >
              System Log
            </Button>
          )}
          <Button onClick={() => {localStorage.removeItem("token"); navigate("/");}} className="logout">
            Log out
          </Button>
        </div>

        <p className="description">
          Built by using React + Flask + MongoDB
        </p>
      </div>
    </>
  );
}
