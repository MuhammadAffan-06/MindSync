"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../components/loading/loading";
import {toast} from "react-toastify"
import AuthWrapper from "./auth-wrapper";
import Image from "next/image";
import "./auth.css";

interface FormData {
  email: string;
  password: string;
  name?: string;
  role?: string;
}

export default function Auth() {

  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isSignup, setIsSignup] = useState(true);
  const [signupData, setSignupData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
    role: "presenter",
  });
  const [loginData, setLoginData] = useState<FormData>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/dashboard");
    } else {
      setCheckingAuth(false);
    }
  }, [router]);
  if (checkingAuth) {
    return <Loading message={"Checking Authorization.."}/>;
  }

  // --- 2) Form State & Handlers ---
  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateSignupData = () => {
    const { name, password } = signupData;
    if (!name) {
      toast.error("Name cannot be empty.");
      return false;
    }
    if (/[^a-zA-Z\s]/.test(name)) {
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
    if (!validateSignupData()) return;
    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Your Account has been created!");
        setSignupData({ email: "", password: "", name: "", role: "presenter" });
        setIsSignup(false);
      } else {
        toast.error(data.message || "Email already exists");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("token", data.token);
        setLoginData({ email: "", password: "" });
        router.push("/dashboard");
      } else {
        toast.error(data.message || "Invalid email or password.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const toggleForm = () => {
    setIsSignup((prev) => !prev);
  };

  const handleGoogleAuth = () => {
    const baseAuthUrl = "http://localhost:5000/auth/google";
    const intentParam = isSignup ? "signup" : "login";
    window.location.href = `${baseAuthUrl}?intent=${intentParam}`;
  };

  return (
    <AuthWrapper>
      <>
        <div className={`main-section ${isSignup ? "signup-active" : "login-active"}`}>
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
                    <p>No Account Yet?</p>
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
                  engagement tools.
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
