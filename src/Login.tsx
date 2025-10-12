import React, { useState, useRef } from "react";
import "./loginsignup.css";
import { Card, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const [pwderror, setPwderror] = useState("");
  const [all, setAll] = useState("");

  const [showerror, setShowerror] = useState("");
  const [serverError, setServerError] = useState("");

  const [showPwd, setShowPwd] = useState(false);
  const toggleShowPwd = () => setShowPwd((prev) => !prev);

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const onCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAll("");
    if (!user || !pwd) {
      setAll("*กรอกข้อมูลไม่ครบ");
      setUser("");
      setPwd("");
    }
    if (!captchaToken) {
      alert("Confirm reCAPTCHA");
      return;
    }
    // console.log({ user, email, pwd, captchaToken });

    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/login",
        {
          USERNAME: user,
          PASSWORD: pwd,
        }
      );

      navigate("/homepage");
    } catch (err: any) {
      // console.log("response:", err.data);
      // console.error(err);
      console.log(err.response.data.error);
      setShowerror(err.response.data.error);
      setServerError(err.response?.data?.message || "Server Disconnect");
      // recaptchaRef.current?.reset();
      // setCaptchaToken(null);
    }
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
        <div className="error"> {showerror}</div>
        <div className="forget">
          Forget? <span onClick={() => navigate("/forget")}>Click Here!</span>
           <div className="underline3"></div>
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
            Login
          </Button>
        </div>
        <div className="sign" >
           <div className="forget1">Don't have an account? <span onClick={() => navigate("/") }>Sign Up</span></div>
            <div className="underline4"></div>
        </div>
      </form>
    </Card>
  );
}

export default App;
