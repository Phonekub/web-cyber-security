import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup";  // หน้า Sign Up ของคุณ
import Login from "./Login";    // หน้า Login

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
