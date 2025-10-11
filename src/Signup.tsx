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
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const toggleShowPwd = () => setShowPwd((prev) => !prev);
  const toggleShowPwd2 = () => setShowPwd2((prev) => !prev);

  const [pwderror, setPwderror] = useState("");
  const [all, setAll] = useState("");
  const [role, setRole] = useState("user");

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [serverError, setServerError] = useState("");
  const [showerror, setShowerror] = useState("");

  const onCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAll("");
    setPwderror("");
    setShowerror("");
    if (!user || !email || !pwd || !pwd2) {
      setAll("*กรอกข้อมูลไม่ครบ");
      return;
    }
    if (pwd !== pwd2) {
      setPwderror("*password not correct");
      setPwd2("");
      return;
    }
    if (!captchaToken) {
      alert("Confirm reCAPTCHA");
      return;
    }
    // console.log({ user, email, pwd, captchaToken });

    try {
      const res = await axios.post(
        "https://symmetrical-waddle-r4gr4q6qjwxwfqp9-5000.app.github.dev/users",
        {
          USERNAME: user,
          EMAILADDR: email,
          ROLE: role,
          PASSWORD: pwd,
        }
      );

      navigate("/login");
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
        <div className="error">{all}</div>
        <div className="error">{pwderror}</div>
        <div className="error"> {showerror}</div>
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
          <Button
            type="submit"
            variant="contained"
            className="submit"
            disabled={!captchaToken}
          >
            Sign Up
          </Button>
          <Button
            type="button"
            variant="outlined"
            className="submit"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default App;
