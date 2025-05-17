"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../components/loading/loading";
import { toast } from "react-toastify";
import AuthWrapper from "./auth-wrapper";
import Image from "next/image";
import { apiRequest, serverBaseUrl } from "../components/utils/api";
import { LoginRequest, SignupRequest } from "../types/authTypes";

export default function Auth() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isSignup, setIsSignup] = useState(true);
  const [loading, setLoading] = useState(false);

  const [signupData, setSignupData] = useState<SignupRequest>({
    email: "",
    password: "",
    name: "",
    role: "presenter",
  });

  const [loginData, setLoginData] = useState<LoginRequest>({
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
    return <Loading message={"Checking Authorization.."} />;
  }

  // --- Form State & Handlers ---
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
    setLoading(true);
    const { success, message } = await apiRequest("/auth/signup", signupData);
    if (success) {
      setSignupData({ email: "", password: "", name: "", role: "presenter" });
      setIsSignup(false);
      toast.success(message);
    }
    setLoading(false);
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { success, message, user, token } = await apiRequest(
      "/auth/login",
      loginData
    );
    if (success) {
      toast.success(message);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("token", token);
      setLoginData({ email: "", password: "" });
      router.push("/dashboard");
    }
    setLoading(false);
  };

  const toggleForm = () => {
    setIsSignup((prev) => !prev);
  };

  const handleGoogleAuth = () => {
    const baseAuthUrl = `${serverBaseUrl}/auth/google`;
    const intentParam = isSignup ? "signup" : "login";
    window.location.href = `${baseAuthUrl}?intent=${intentParam}`;
  };

  return (
    <AuthWrapper>
      {/* 
        Main container: 
          - Two columns on md+ screens
          - One column (left side only) on small screens
      */}
      <div
        className={`w-screen h-screen overflow-hidden grid grid-cols-1 md:grid-cols-2 relative
          ${isSignup ? "signup-active" : "login-active"}
        `}
      >
        {/* LEFT SECTION */}
        <div className="flex flex-col justify-center items-center p-5 mx-auto">
          <div className="mb-8">
            <Image
              className="
                /* Adjust image size for different breakpoints */
                w-[220px] 
                md:w-[270px] 
                lg:w-[350px]
                mb-4
              "
              src="/header.png"
              alt="Image Not Loaded Yet"
              width={350}
              height={125}
            />
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
              {isSignup ? "Create an Account" : "Nice to see you again"}
            </h2>
          </div>

          <div className="w-full flex flex-col items-center">
            {/* SIGNUP FORM */}
            {isSignup ? (
              <form
                onSubmit={handleSignupSubmit}
                className="flex flex-col items-center"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={signupData.name}
                  onChange={handleSignupChange}
                  required
                  className="w-[350px] p-3 rounded-md my-2 border-0 bg-[#ded6d6]"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  required
                  className="w-[350px] p-3 rounded-md my-2 border-0 bg-[#ded6d6]"
                />
                <label htmlFor="password" className="self-start mt-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                  required
                  className="w-[350px] p-3 rounded-md my-2 border-0 bg-[#ded6d6]"
                />
                <ul className="text-[10px] text-[#5e5d5d] list-disc pl-4 mt-1">
                  <li>Password must be at least 8 characters long</li>
                  <li>Include at least one uppercase letter</li>
                  <li>One lowercase letter</li>
                  <li>One number</li>
                  <li>One special character</li>
                </ul>
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-[350px]
                    mt-4
                    p-3
                    rounded-md
                    bg-gradient-to-b
                    from-[var(--secondary-color)]
                    to-[#4830e2]
                    text-white
                  disabled:from-[var(--disabled)]
                    disabled:to-[var(--disabled)]
                  "
                >
                  {loading ? "Signing Up.." : "Sign Up"}
                </button>
              </form>
            ) : (
              /* LOGIN FORM */
              <form
                onSubmit={handleLoginSubmit}
                className="flex flex-col items-center"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                  className="w-[350px] p-3 rounded-md my-2 border-0 bg-[#ded6d6]"
                />
                <label htmlFor="password" className="self-start mt-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                  className="w-[350px] p-3 rounded-md my-2 border-0 bg-[#ded6d6]"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-[350px]
                    mt-4
                    p-3
                    rounded-md
                    bg-gradient-to-b
                    from-[var(--secondary-color)]
                    to-[#4830e2]
                    text-white
                  disabled:from-[var(--disabled)]
                    disabled:to-[var(--disabled)]
                  "
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </form>
            )}

            {/* GOOGLE SIGNUP/LOGIN BUTTON */}
            <button
              onClick={handleGoogleAuth}
              className="
                flex
                items-center
                justify-center
                p-3
                rounded-md
                my-3
                bg-[#363636]
                text-white
                w-full
                max-w-[350px]
                border-0
              "
            >
              <Image
                src="/GoogleIcon.svg"
                alt="Google Icon"
                width={20}
                height={20}
              />
              <span className="ml-3">
                Or {isSignup ? "Sign Up" : "Sign In"} with Google
              </span>
            </button>

            {/* Mobile toggle: only visible on small screens */}
            <div className="block md:hidden grid grid-cols-2 items-center gap-0 ml-2 w-full max-w-[350px]">
              {isSignup ? (
                <>
                  <p className="whitespace-nowrap">Got an Account?</p>
                  <button
                    onClick={toggleForm}
                    className="justify-self-end underline text-[#4830e2]"
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  <p className="whitespace-nowrap">No Account Yet?</p>
                  <button
                    onClick={toggleForm}
                    className="justify-self-end underline text-[#4830e2]"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SECTION (hidden on small screens) */}
        <div
          className={`
            hidden md:flex flex-col justify-center items-center 
            text-center text-white p-20 
            transition-opacity duration-500 ease-in-out
          `}
          style={{
            // Custom background with gradient + image
            backgroundImage: `linear-gradient(rgba(107, 5, 202, 0.76), rgba(25, 5, 202, 0.76)), url("/login.png")`,
            backgroundPosition: "50% 35%",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          {isSignup ? (
            <>
              <h1 className="text-4xl mb-4">Got an Account?</h1>
              <p className="mb-4">
                Reconnect and enhance your presentations with real-time
                engagement tools.
              </p>
              <button
                onClick={toggleForm}
                className="
                  py-2 px-6
                  border border-white
                  rounded-full
                  bg-transparent
                  w-fit
                  transition-all
                  duration-500
                  ease-in-out
                "
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              <h1 className="text-4xl mb-4">Need an Account?</h1>
              <p className="mb-4">
                Create one and explore real-time engagement tools for your
                presentations.
              </p>
              <button
                onClick={toggleForm}
                className="
                  py-2 px-6
                  border border-white
                  rounded-full
                  bg-transparent
                  w-fit
                  transition-all
                  duration-500
                  ease-in-out
                "
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </AuthWrapper>
  );
}
