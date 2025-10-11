import React, { useState, useRef } from "react";
import "./loginsignup.css";
import { Card, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function App() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [showerror, setShowerror] = useState("");
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://symmetrical-waddle-r4gr4q6qjwxwfqp9-5000.app.github.dev/forgot-password",
        {
          EMAILADDR: email,
        }
      );

      navigate("/changemail"); //อย่าลืมเปลี่ยน
    } catch (err: any) {
      //   console.log("response:", err.data);
      //   console.error(err);
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
        <div className="fontheader">Forget Password</div>
        <div className="underline2"></div>
      </div>
      <div className="decemail">Enter Your Email Address</div>
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
        <div className="error1"> {showerror}</div>
        <div className="submit-container1">
          <Button
            type="submit"
            variant="contained"
            className="submit"
            disabled={!email}
          >
            Send
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default App;
