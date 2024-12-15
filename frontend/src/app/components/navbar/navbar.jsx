"use client";
import Image from "next/image";
import "@/app/components/navbar/navbar.css";
export default function Navbar() {
  const navRoutes = () => {
    // window.location.href = "https://mind-sync-u9h4.vercel.app/auth";
    window.location.href = "/auth"
  };
  return (
    <>
      <div className="navbar-parent">
        <Image
          className="hero-image"
          src="/header.png"
          alt="Image Not Loaded Yet"
          width={240}
          height={130}
        />
        <div className="navbar-buttons">
          <button onClick={() => navRoutes()}>Login</button>
          <button className="colorButton" onClick={() => navRoutes()}>
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
}
