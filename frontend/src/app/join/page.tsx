"use client";
import Nav from "../components/nav/nav";
import { IoChevronBack } from "react-icons/io5";
import "@/app/join/join.css";
import JoinMobile from "@/app/components/joinMobile/joinMobile";
export default function Join() {
  const handleBack = () => {
    window.location.href = "http://localhost:3000/";
  };
  return (
    <>
      <div className="desktopNav">
        <Nav />
      </div>

      <div className="mobileJoinWrapper">
        <JoinMobile />
      </div>
      <div className="desktopJoinWrapper">
        <button className="back-home" onClick={() => handleBack()}>
          <IoChevronBack />
          <h1 className="home-route">Back to Home</h1>
        </button>
        <div className="join-container">
          <div className="page-wrapper">
            <div className="overlay"></div>
            <div className="join-box">
              <h2>Enter Presentation Code</h2>
              <input type="text" placeholder="eg: XD3D5" />
              <button>Join Presentation</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
