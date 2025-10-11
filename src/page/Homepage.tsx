// src/page/Homepage.tsx
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 space-y-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">🚀 Welcome to Your App Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <Button onClick={() => navigate("/login")} className="p-4 w-48">
          Login
        </Button>
        <Button onClick={() => navigate("/signup")} className="p-4 w-48">
          Sign Up
        </Button>
        <Button onClick={() => navigate("/forget")} className="p-4 w-48">
          Forgot Password
        </Button>
        <Button onClick={() => navigate("/changepassword")} className="p-4 w-48">
          Change Password
        </Button>
        <Button onClick={() => navigate("/system-log")} className="p-4 w-48">
          System Log
        </Button>
      </div>

      <footer className="text-sm text-gray-500 mt-8">
        Built with ❤️ using React + Flask + MongoDB
      </footer>
    </div>
  );
}
