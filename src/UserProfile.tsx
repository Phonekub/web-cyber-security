import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./UserProfile.css";

const UserProfile: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // const decoded = jwtDecode(token);
        const decoded = jwtDecode<any>(token);
        setUsername(decoded.USERNAME);
        setRole(decoded.ROLE);
      } catch (err) {
        console.error("Invalid token", err)
        setRole("");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="user-profile-header">
      <div 
        className="user-profile-container"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div className="user-avatar">
          {getInitials(username)}
        </div>
        <span className="user-name">{username}</span>
        <svg 
          className={`dropdown-arrow ${showDropdown ? 'open' : ''}`}
          width="12" 
          height="12" 
          viewBox="0 0 12 12"
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      </div>

      {showDropdown && (
        <div className="dropdown-menu">
          <div className="dropdown-item user-info">
            <div className="user-info-icon">👤</div>
            <div>
              <div className="user-info-name">{username}</div>
            </div>
          </div>
          <div className="dropdown-divider"></div>
          <button className="dropdown-item" onClick={() => navigate("/homepage", { state: { viaInternal: true } })}>
            🏠 Home
          </button>
          {role === "admin" && (
            <button className="dropdown-item" onClick={() => navigate("/system-log", { state: { viaInternal: true } })}>
              🧾 System Log
            </button>
          )}
          <div className="dropdown-divider"></div>
          <button className="dropdown-item logout" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;