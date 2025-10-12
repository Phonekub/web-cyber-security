import React, { useState, useRef } from "react";
import "./loginsignup.css";
import { Card, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import axios from "axios";

function App() {
  const navigate = useNavigate();

  const [params] = useSearchParams();
  const { token: tokenFromPath } = useParams();
  const token = (params.get("token") || tokenFromPath || "").trim();

  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);

  const [showerror, setShowerror] = useState("");
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleShowPwd = () => setShowPwd((prev) => !prev);
  const toggleShowPwd2 = () => setShowPwd2((prev) => !prev);

  const url = `http://127.0.0.1:5000/reset-password/${encodeURIComponent(
    token
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setShowerror("");
    setServerError("");
    setSuccessMsg("");

    if (!token) {
      setShowerror("ลิงก์ไม่ถูกต้องหรือหมดอายุ");
      return;
    }
    if (!pwd || !pwd2) {
      setShowerror("กรุณากรอกรหัสผ่านให้ครบ");
      return;
    }
    if (pwd !== pwd2) {
      setShowerror("รหัสผ่านไม่ตรงกัน");
      return;
    }

    try {
      setLoading(true);
      await axios.post(url, {
        PASSWORD: pwd,
      });

      setSuccessMsg("เปลี่ยนรหัสผ่านเรียบร้อย");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err: any) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Server Disconnect";

      setServerError(msg);
    } finally {
      setLoading(false);
    }
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
        {showerror && <div className="error1">{showerror}</div>}
        {serverError && <div className="error1">{serverError}</div>}
        {successMsg && <div className="success1">{successMsg}</div>}
        <div className="submit-container1">
          <Button
            type="submit"
            variant="contained"
            className="submit"
            disabled={!token || loading}
          >
            {loading ? "Updating..." : "Confirm"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default App;
