import React from "react";
import "./loginsignup.css";
import {Card} from "@mui/material"
function App() {
  return (
    <Card className="container">
      <div className="header">
        <div>Sign Up</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        <div className="input">
          <input type="text"/>
        </div>
        <div className="input">
          <input type="email"/>
        </div>
        <div className="input">
          <input type="password"/>
        </div>
        <div className="submit-container">
          <div>Sign Up</div>
          <div>Login</div>
        </div>
      </div>
    </Card>
  );
}

export default App;
