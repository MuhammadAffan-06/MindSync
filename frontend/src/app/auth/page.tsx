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
  name?: string; // Make name optional for login
  role?: string; // Added role for signup
}

export default function Auth() {
  const [signupData, setSignupData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
    role: "presenter", // Default role
  });

  const [loginData, setLoginData] = useState<Omit<FormData, "name" | "role">>({
    email: "",
    password: "",
  });

  const [isLoginMode, setIsLoginMode] = useState<boolean>(false);

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
    console.log("Validating signup data:", signupData); // Log the data being validated
    const { name, password } = signupData;

    if (!name) {
      toast.error("Name cannot be empty.");
      console.log("Name validation failed: Empty name");
      return false;
    }

    const nameHasInvalidChars = /[^a-zA-Z\s]/.test(name);
    if (nameHasInvalidChars) {
      toast.error("Name should only contain letters and spaces.");
      console.log("Name validation failed: Invalid characters in name");
      return false;
    }

    const passwordRequirements =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRequirements.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      console.log("Password validation failed: Does not meet requirements");
      return false;
    }

    console.log("Validation passed.");
    return true;
  };

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Submitting signup form"); // Debugging line
    if (!validateSignupData()) {
      console.log("Validation failed, stopping submission."); // Debugging line
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Your Account has been created!");
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
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Logged in successfully");
      } else {
        toast.error(data.message || "Credentials are wrong");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const toggleMode = () => {
    setIsLoginMode((prev) => !prev);
    if (isLoginMode) {
      setLoginData({ email: "", password: "" });
    } else {
      setSignupData({ email: "", password: "", name: "", role: "presenter" });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className={`main-section ${isLoginMode ? "switch-mode" : ""}`}>
        <div className="main-section-left">
          <h1>{isLoginMode ? "Start Your Journey" : "Welcome to MindSync"}</h1>
          <p>
            {isLoginMode
              ? "Unlock the tools to collaborate with real-time insights and interaction experiences."
              : "Create an account to start engaging with your audience in real-time."}
          </p>
          <button onClick={toggleMode}>
            {isLoginMode ? "SIGN UP" : "SIGN IN"}
          </button>
        </div>

        <div className="main-section-right">
          <div>
            <Image
              className="hero-image"
              src="/header.png"
              alt="Image Not Loaded Yet"
              width={350}
              height={125}
            />
            <h2 className="hero-heading">
              {isLoginMode ? "Sign In to Your Account" : "Create an Account"}
            </h2>
          </div>

          <div className="registration">
            {!isLoginMode && (
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
                <button className="form-signup" type="submit">
                  Sign Up
                </button>
              </form>
            )}

            {isLoginMode && (
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
                <button className="form-login" type="submit">
                  Sign In
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
