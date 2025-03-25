"use client";

import Nav from "@/app/components/nav/nav";
import Sidebar from "@/app/components/sideBar/sideBar";
import "@/app/profile/profile.css";
import { useEffect, useState } from "react";
import { RequireAuth } from "../components/utils/requireAuth";

function Profile() {
  const [userName, setUserName] = useState("");
  const [userEmail, setuserEmail] = useState("");

  // Retrieve the user's name from local storage on component mount
  useEffect(() => {
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");
    if (name) {
      setUserName(name);
    }
    if (email) {
      setuserEmail(email);
    }
  }, []);

  return (
    <>
      <Nav />
      <Sidebar />
      <div className="main-content">
        <h1 className="about-title">Profile Management</h1>

        <div className="avatar-details">
          <img
            src="/profile-avatar.svg"
            alt="Profile Avatar"
            width={91}
            height={91}
          />
          <div className="text">
            <h1 className="profile-name">{userName || "Salman Shah"}</h1>{" "}
            {/* Display the user's name */}
            <p>{userEmail}</p>
          </div>
          <div className="btn">
            <button className="edit-btn">edit </button>
          </div>
        </div>

        <div className="form-container">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="full-name">Full Name</label>
              <input type="text" id="full-name" placeholder="Your First Name" />
            </div>
            <div className="form-group">
              <label htmlFor="nick-name">Nick Name</label>
              <input type="text" id="nick-name" placeholder="Your First Name" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select id="gender">
                <option>Your First Name</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <select id="country">
                <option>Your First Name</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="language">Language</label>
              <select id="language">
                <option>Your First Name</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="time-zone">Time Zone</label>
              <select id="time-zone">
                <option>Your First Name</option>
              </select>
            </div>
          </div>
        </div>

        <div className="email-section">
          <h3 className="email-title">My Email Address</h3>
          <div className="email-details">
            <div className="email-info">
              <div className="email-icon">
                <img
                  src="/emailp.svg"
                  alt="email icon"
                  width={24}
                  height={24}
                />
              </div>
              <div className="text">
                <p className="email-address">{userEmail}</p>
                <small className="email-date">1 month ago</small>
              </div>
            </div>
          </div>
        </div>
        <button className="email-btn">+ Add Email Address</button>
      </div>
    </>
  );
}

export default RequireAuth(Profile)