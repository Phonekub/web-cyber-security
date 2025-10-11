// src/page/Homepage.tsx
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "../page/Homepage.css";
export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="Header">
      <h1>🚀 Welcome to Your App Dashboard</h1>

      <div className="FunctionBar">
        <Button onClick={() => navigate("/login")} className="login">
          Login
        </Button>
        <Button onClick={() => navigate("/signup")} className="signup">
          Sign Up
        </Button>
        <Button onClick={() => navigate("/forget")} className="forgetpassword">
          Forgot Password
        </Button>
        <Button onClick={() => navigate("/changepassword")} className="changepassword">
          Change Password
        </Button>
        <Button onClick={() => navigate("/system-log")} className="systemlog">
          System Log
        </Button>
      </div>

      <p className="description">
        Built with ❤️ using React + Flask + MongoDB
      </p>
    </div>
  );
}
