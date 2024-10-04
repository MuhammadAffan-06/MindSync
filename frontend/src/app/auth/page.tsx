"use client";
import { useState } from "react";
import Image from "next/image";
import "@/app/auth/auth.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define form data structure
interface FormData {
  email: string;
  password: string;
  name: string;
  role: string;
}

export default function Auth() {
  // State to store user input
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
    role: "presenter",
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.status === 200) {
        // Show success toast
        toast.success("Your Account has been created!");
      } else {
        // Show error toast
        toast.error("Email already exists");
      }
    } catch (error) {
      // Show generic error toast
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {/* Toastify Container */}
      <ToastContainer />

      <div className="main-section">
        <div className="main-section-left">
          <h1>Welcome Back</h1>
          <p>
            Reconnect and enhance your presentations with real-time engagement
            tools. Ready to dive back in?
          </p>
          <button>SIGN IN</button>
        </div>
        <div className="main-section-right">
          <div>
            <Image
              className="hero-image"
              src="/header.png"
              alt="Image Not Loaded Yet"
              width={400}
              height={125}
            />
            <h2 className="hero-heading">Create an Account</h2>
          </div>

          <div className="registration">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <br />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <br />
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <p>remember me</p>

              <button className="form-signup" type="submit">
                Sign Up
              </button>
              <br />
              <button className="google-signup">
                <Image
                  src="/GoogleIcon.svg"
                  alt="Google Icon"
                  width={20}
                  height={20}
                />
                <span>Or Sign Up with Google</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
