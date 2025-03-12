"use client";
import { useState } from "react";
import Image from "next/image";
import "@/app/auth/auth.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthWrapper from "@/app/auth/auth-wrapper";
import { error } from "console";

// Define form data structure for both login and signup
interface FormData {
  email: string;
  password: string;
  name?: string;
  role?: string;
}

export default function Auth() {
  const [signupData, setSignupData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
    role: "presenter", // Default role
  });

  const [loginData, setLoginData] = useState<FormData>({
    email: "",
    password: "",
  });

  // State to toggle between signup and login forms
  const [isSignup, setIsSignup] = useState(true); // true = signup, false = login

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const validateSignupData = () => {
    console.log("Validating signup data:", signupData);
    const { name, password } = signupData;

    if (!name) {
      toast.error("Name cannot be empty.");
      return false;
    }

    const nameHasInvalidChars = /[^a-zA-Z\s]/.test(name);
    if (nameHasInvalidChars) {
      toast.error("Name should only contain letters and spaces.");
      return false;
    }

    const passwordRequirements =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRequirements.test(password)) {
      toast.error(
        <>
          <ol>
            <li>Password must be at least 8 characters long</li>
            <li>Include at least one uppercase letter</li>
            <li>One lowercase letter</li>
            <li>One number</li>
            <li>One special character</li>
          </ol>
        </>
      );
      return false;
    }

    return true;
  };

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateSignupData()) {
      return;
    }
    try {
      const response = await fetch(
        "https://mindsync-hpauf7bfegd9dudz.westindia-01.azurewebsites.net/auth/signup",
        // "http://localhost:5000/auth/signup",
        // "https://mindsync-cbbee2f6dmf9hma5.eastasia-01.azurewebsites.net/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Your Account has been created!");
        localStorage.setItem("userName", signupData.name || "");
        setSignupData({ email: "", password: "", name: "", role: "presenter" });
      } else {
        toast.error(data.message || "Email already exists");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://mindsync-hpauf7bfegd9dudz.westindia-01.azurewebsites.net/auth/login",
        // "http://localhost:5000/auth/login",
        // "https://mindsync-cbbee2f6dmf9hma5.eastasia-01.azurewebsites.net/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Logged in successfully!");
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userEmail", data.user.email);
        console.log(localStorage);
        // window.location.href ="https://mind-sync-u9h4.vercel.app/"
        window.location.href = "http://localhost:3000/dashboard";
        setLoginData({ email: "", password: "" });
      } else {
        toast.error(data.message || "Invalid email or password.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Function to toggle between signup and login
  const toggleForm = () => {
    setIsSignup((prev) => !prev);
  };

  // const handleGoogleAuth = () => {
  //   // const baseAuthUrl = "http://mindsync-cbbee2f6dmf9hma5.eastasia-01.azurewebsites.net/auth/google";
  //   const baseAuthUrl = "http://localhost:5000/auth/google";
  //   const intentParam = isSignup ? "signup" : "login";
  //   const redirectUrl = `${baseAuthUrl}?intent=${intentParam}`;
  //   // window.location.href = "http://localhost:3000/";

  // };
  const handleGoogleAuth = () => {
    const baseAuthUrl = "http://localhost:5000/auth/google";
    // const baseAuthUrl = "https://mindsync-hpauf7bfegd9dudz.westindia-01.azurewebsites.net/auth/google"
    const intentParam = isSignup ? "signup" : "login";
    const redirectUrl = `${baseAuthUrl}?intent=${intentParam}`;
    window.location.href = redirectUrl;
  };

  return (
    <AuthWrapper>
      <>
        <ToastContainer />
        <div
          className={`main-section ${
            isSignup ? "signup-active" : "login-active"
          }`}
        >
          <div className="main-section-left">
            <div>
              <Image
                className="hero-image"
                src="/header.png"
                alt="Image Not Loaded Yet"
                width={350}
                height={125}
              />
              <h2 className="hero-heading">
                {isSignup ? "Create an Account" : "Nice to see you again"}
              </h2>
            </div>

            <div className="registration">
              {isSignup ? (
                <form onSubmit={handleSignupSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={signupData.name}
                    onChange={handleSignupChange}
                    required
                  />
                  <br />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    required
                  />
                  <br />
                  <label htmlFor="password">Password</label>
                  <br />
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    required
                  />
                  <div className="passwd-checks">
                    <li>Password must be at least 8 characters long</li>
                    <li>Include at least one uppercase letter</li>
                    <li>One lowercase letter</li>
                    <li>One number</li>
                    <li>One special character</li>
                  </div>
                  <br />
                  <button className="form-signup" type="submit">
                    Sign Up
                  </button>
                </form>
              ) : (
                <form onSubmit={handleLoginSubmit}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                  />
                  <br />
                  <label htmlFor="password">Password</label>
                  <br />
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                  />
                  <br />
                  <button className="form-signin" type="submit">
                    Sign In
                  </button>
                </form>
              )}
              <button className="google-signup" onClick={handleGoogleAuth}>
                <Image
                  src="/GoogleIcon.svg"
                  alt="Google Icon"
                  width={20}
                  height={20}
                />
                <span>Or {isSignup ? "Sign Up" : "Sign In"} with Google</span>
              </button>
              {/* Mobile/Tablet View Toggle */}
              <div className="mobile-toggle">
                {isSignup ? (
                  <>
                    <p>Got an Account?</p>
                    <button onClick={toggleForm} className="mobile-toggle-btn">
                      Sign In
                    </button>
                  </>
                ) : (
                  <>
                    <p>No Account Yet? </p>
                    <button onClick={toggleForm} className="mobile-toggle-btn">
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="main-section-right">
            {isSignup ? (
              <>
                <h1>Got an Account?</h1>
                <p>
                  Reconnect and enhance your presentations with real-time
                  engagement tools. Ready to dive back in?
                </p>
                <button onClick={toggleForm}>Sign In</button>
              </>
            ) : (
              <>
                <h1>Need an Account?</h1>
                <p>
                  Create one and explore real-time engagement tools for your
                  presentations.
                </p>
                <button onClick={toggleForm}>Sign Up</button>
              </>
            )}
          </div>
        </div>
      </>
    </AuthWrapper>
  );
}
