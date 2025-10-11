import React, { useState, useRef } from "react";
import "./loginsignup.css";
import { Card, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [pwderror, setPwderror] = useState("");
  const [all, setAll] =useState("");

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const onCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !email || !pwd ) {
      setAll("*กรอกข้อมูลไม่ครบ");
      setUser("");
      setEmail("");
      setPwd("");
    }
    if (!captchaToken) {
      alert("Confirm reCAPTCHA");
      return;
    }
    console.log({ user, email, pwd, captchaToken });
  };
  return (
    <Card className="container">
      <div className="header">
        <div className="fontheader">Forget Password</div>
        <div className="underline2"></div>
      </div>
        <div className="decemail">
            Enter Your Email Address
        </div>
      <form className="inputs" onSubmit={handleSubmit}>
        <div className="input">
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          <input
            type="email"
            placeholder="Email"
            className="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
       
        
       
       
        <div className="submit-container1">  
          <Button type="submit" variant="contained" className="submit" disabled={!email}>
            Send
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default App;
