import React from "react";
import "./loginsignup.css";
import {Card} from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faUser,faEnvelope,faLock} from "@fortawesome/free-solid-svg-icons";
import ReCAPTCHA from "react-google-recaptcha";
function App() {
  return (
    <Card className="container">
      <div className="header">
        <div className="fontheader">Sign Up</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        <div className="input">
          <FontAwesomeIcon icon={faUser} className="icon"/>
          <input type="text" placeholder="User" className="text"/>
        </div>
        <div className="input">
          <FontAwesomeIcon icon={faEnvelope}className="icon"/>
          <input type="email" placeholder="Email" className="text"/>
        </div>
        <div className="input">
          <FontAwesomeIcon icon={faLock}className="icon"/>
          <input type="password" placeholder="Password" className="text"/>
        </div>
        <div className="input">
          <FontAwesomeIcon icon={faLock}className="icon"/>
          <input type="password" placeholder="Confirm Password" className="text"/>
        </div>
        <div className="forget">Forget? <span>Click Here!</span></div>
        <div>Capcha</div>
        <div className="submit-container">
          <div className="submit">Sign Up</div>
          <div className="submit">Login</div>
        </div>
      </div>
    </Card>
  );
}

export default App;
