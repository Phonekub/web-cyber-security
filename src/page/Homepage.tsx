// src/page/Homepage.tsx
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "../page/Homepage.css";
export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="Header">
      <h1> Welcome 🚀</h1>

      <div className="FunctionBar">
        <Button onClick={() => navigate("/system-log",{ state: { viaInternal: true } })} className="systemlog">
          System Log
        </Button>
        <Button onClick={() => navigate("/")} className="logout">
          Log out
        </Button>
      </div>

      <p className="description">
        Built by using React + Flask + MongoDB
      </p>
    </div>
  );
}
