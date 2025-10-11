import React, { useState, useRef } from "react";
import "./loginsignup.css";
import { Card, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock,faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [pwderror, setPwderror] = useState("");
  const [all, setAll] =useState("");

  const [showPwd, setShowPwd] = useState(false);
  const toggleShowPwd = () => setShowPwd((prev) => !prev);


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
        <div className="fontheader">Login</div>
        <div className="underline1"></div>
      </div>

      <form className="inputs" onSubmit={handleSubmit}>
        <div className="input">
          <FontAwesomeIcon icon={faUser} className="icon" />
          <input
            type="text"
            placeholder="User"
            className="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
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
        <div className="input password-input">
          <FontAwesomeIcon icon={faLock} className="icon" />
          <input
            type={showPwd ? "text" : "password"}
            placeholder="Password"
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
        <div className="error">{all}</div>
        <div className="forget">
          Forget? <span onClick={() => navigate("/forget")}>Click Here!</span>
        </div>
        <div className="cap">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6LdsiOYrAAAAAJ0j5O5_kUkGYnPojF2YBvrLSGzW"
            onChange={onCaptchaChange}
          />
        </div>
        <div className="submit-container">
          
          <Button type="submit" variant="contained" className="submit" disabled={!captchaToken}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default App;
