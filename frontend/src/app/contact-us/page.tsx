'use client';

import Nav from "@/app/components/nav/nav";
import Sidebar from "@/app/components/sideBar/sideBar";
import "@/app/contact-us/contact-us.css";

export default function Contact() {
  return (
    <>
      {/* Navigation Bar */}
      <Nav />
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        <div className="contact-wrapper">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-subtitle">
            Our friendly team would love to hear from you.
          </p>
          <form className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" type="text" placeholder="Your First Name" />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" type="text" placeholder="Your Last Name" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="Your Email Address" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                placeholder="Leave us a message..."
              ></textarea>
            </div>
            <div className="form-checkbox">
              <input type="checkbox" id="privacyPolicy" />
              <label htmlFor="privacyPolicy">
                You agree to our friendly <a href="/privacy-policy">privacy policy</a>
              </label>
            </div>
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
      </div>
    </>
  );
}
