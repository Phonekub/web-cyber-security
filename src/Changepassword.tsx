import React, { useState, useRef } from "react";
import "./loginsignup.css";
import { Card, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
   
  };
  return (
    <Card className="container">
      <div className="header">
        <div className="fontheader">Change Password</div>
        <div className="underline2"></div>
      </div>
      <form className="inputs" onSubmit={handleSubmit}>
        <div className="input">
          <FontAwesomeIcon icon={faLock} className="icon" />
          <input
            type="password"
            placeholder="New Password"
            className="text"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>
        <div className="input">
          <FontAwesomeIcon icon={faLock} className="icon" />
          <input
            type="password"
            placeholder="Confirm Password"
            className="text"
            value={pwd2}
            onChange={(e) => setPwd2(e.target.value)}
          />
        </div>

        <div className="submit-container1">
          <Button
            type="submit"
            variant="contained"
            className="submit"
            disabled={!email}
          >
            Confirm
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default App;
