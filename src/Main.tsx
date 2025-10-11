import React, { useState, useRef } from "react";
import "./loginsignup.css";
import { Card, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import ReCAPTCHA from "react-google-recaptcha";
function App() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const onCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !email || !pwd || !pwd2) {
      alert("กรอกข้อมูลให้ครบก่อนนะ");
      return;
    }
    if (pwd !== pwd2) {
      alert("รหัสผ่านไม่ตรงกัน");
      return;
    }
    if (!captchaToken) {
      alert("กรุณายืนยัน reCAPTCHA");
      return;
    }
    console.log({ user, email, pwd, captchaToken });
    alert("ส่งฟอร์มแล้ว (เดโม)!");
  };
  return (
    <Card className="container">
      <div className="header">
        <div className="fontheader">Sign Up</div>
        <div className="underline"></div>
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
        <div className="input">
          <FontAwesomeIcon icon={faLock} className="icon" />
          <input
            type="password"
            placeholder="Password"
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
        <div className="forget">
          Forget? <span>Click Here!</span>
        </div>
        <div className="cap">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6LdsiOYrAAAAAJ0j5O5_kUkGYnPojF2YBvrLSGzW"
            onChange={onCaptchaChange}
          />
        </div>
        <div className="submit-container">
          <Button
            type="submit"
            variant="contained"
            className="submit"
            disabled={!captchaToken}
          >
            Sign Up
          </Button>
          <Button type="button" variant="outlined" className="submit">
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default App;
