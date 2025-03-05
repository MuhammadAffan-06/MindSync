"use client";
import { IoChevronBack } from "react-icons/io5";
import "@/app/components/joinMobile/joinMobile.css";

export default function JoinMobile() {
  const handleBack = () => {
    window.location.href = "http://localhost:3000/";
  };

  return (
    <div className="joinMobile-container">
      <div className="mobile-header">
        <img src="/logo.svg" alt="MindSync Logo" className="logo" />
      </div>

      <button className="mobile-back-home" onClick={handleBack}>
        <IoChevronBack />
        <span>Back to Dashboard</span>
      </button>

      <div className="mobile-join-box">
        <h2>Enter Presentation Code</h2>
        <input type="text" placeholder="eg: XD3D5" />
        <button>Join Presentation</button>
      </div>
    </div>
  );
}
