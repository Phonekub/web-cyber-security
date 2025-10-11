import React, { useState, useRef } from "react";
import "./loginsignup.css";
import { Card, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock,faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [showPwd, setShowPwd] = useState(false);
const [showPwd2, setShowPwd2] = useState(false);
const toggleShowPwd = () => setShowPwd((prev) => !prev);
const toggleShowPwd2 = () => setShowPwd2((prev) => !prev);
  

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
        <div className="input password-input">
          <FontAwesomeIcon icon={faLock} className="icon" />
          <input
            type={showPwd ? "text" : "password"}
            placeholder="New Password"
            className="text"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
           <FontAwesomeIcon
                icon={showPwd ? faEyeSlash : faEye}
                className="eye-icon"
                onClick={toggleShowPwd}
            />
        </div>
        <div className="input password-input">
          <FontAwesomeIcon icon={faLock} className="icon" />
          <input
            type={showPwd2 ? "text" : "password"}
            placeholder="Confirm Password"
            className="text"
            value={pwd2}
            onChange={(e) => setPwd2(e.target.value)}
          />
           <FontAwesomeIcon
                icon={showPwd2 ? faEyeSlash : faEye}
                className="eye-icon"
                onClick={toggleShowPwd2}
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
