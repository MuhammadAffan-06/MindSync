"use client";
import { IoChevronBack } from "react-icons/io5";
import "@/app/components/joinMobile/joinMobile.css";
import { useRouter } from "next/navigation";

export default function JoinMobile() {
  const router = useRouter();
  const handleBack = () => {
    router.push("https://mind-sync-u9h4.vercel.app/");
  };

  return (
    <div className="joinMobile-container">
      <div className="mobile-header">
        <img src="/logo.svg" alt="MindSync Logo" className="logo" />
      </div>

      <button className="mobile-back-home" onClick={handleBack}>
        <IoChevronBack />
        <span>Back to Home</span>
      </button>

      <div className="mobile-join-box">
        <h2>Enter Presentation Code</h2>
        <input type="text" placeholder="eg: XD3D5" />
        <button>Join Presentation</button>
      </div>
    </div>
  );
}
