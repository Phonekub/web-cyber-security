import React, { useState } from "react";
import "./loginsignup.css";
import { Card, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope,faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [showerror, setShowerror] = useState("");
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowerror("");
    setServerError("");
    setSuccessMsg("");
    try {
      setLoading(true);
      await axios.post(
        "http://127.0.0.1:5000/forgot-password",
        {
          EMAILADDR: email,
        }
      );

      setSuccessMsg(
        "เราได้ส่งลิงก์ยืนยันไปที่อีเมลแล้ว กรุณาตรวจสอบกล่องจดหมายของคุณ"
      );
    } catch (err: any) {
      //   console.log("response:", err.data);
      //   console.error(err);
      //   console.log(err.response.data.error);
      //   setShowerror(err.response.data.error);
      //   setServerError(err.response?.data?.message || "Server Disconnect");
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Server Disconnect";
      setShowerror(msg);
      setServerError(msg);
    } finally {
      setLoading(false);
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
        {serverError && <div className="error1">{serverError}</div>}
        {successMsg && <div className="success1">{successMsg}</div>}
        <div className="submit-container1">
          <Button
            type="submit"
            variant="contained"
            className="submit"
            disabled={!email || loading}
          >
            {loading ? "Sending..." : "Send"}
          </Button>
        </div>
        <div className="back" onClick={() => navigate("/login",{ state: { viaInternal: true } })}  >
          <FontAwesomeIcon icon={faChevronLeft} className="icon1"/>
          <div>Back to Login</div>
        </div>
      </form>
    </Card>
  );
}

export default App;
