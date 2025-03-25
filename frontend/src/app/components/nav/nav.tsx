"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Nav() {
  const handleJoin = () => {
    window.location.href = "http://localhost:3000/join"
  };
  const [userName, setUserName] = useState("");
  const router = useRouter();
  useEffect(() => {
    const googleToken = Cookies.get("authToken");
    console.log("Google Auth Token from Cookies:", googleToken); // Debugging

    if (googleToken) {
      try {
        // Decode the Google Auth token
        const decodedToken = jwtDecode<CustomJwtPayload>(googleToken);
        console.log("Decoded Google Token:", decodedToken);
        if (decodedToken.name) {
          setUserName(decodedToken.name);
          localStorage.setItem("userName", decodedToken.name);
        } else {
          console.error("Name not found in the decoded token");
        }
      } catch (error) {
        console.error("Error decoding Google token:", error);
      }
    } else {
      // Fallback to localStorage if no Google token is found
      const name = localStorage.getItem("userName");
      console.log("Name from localStorage:", name); // Debugging
      if (name) {
        setUserName(name);
      } else {
        setUserName("Guest"); // Fallback to "Guest" if no name is found
      }
    }
  }, []);

  return (
    <nav className="fixed top-0 z-20 h-[60px] flex w-full items-center border border-gray-200 bg-white px-4 py-2">
      {/* Left side (Logo) */}
      <div>
        <Image
          className="max-[660px]:h-[64px] max-[660px]:w-[117px]"
          src="/logo.svg"
          alt="Image not Loaded Yet"
          width={164}
          height={64}
        />
      </div>

      {/* Search Container */}
      <div className="ml-[300px] my-[14px] flex h-[33px] w-[388px] max-w-[400px] items-center rounded-full bg-gray-100 px-2 py-2 shadow-sm hover:bg-gray-200 focus-within:shadow-md max-[660px]:ml-[3px] max-[660px]:mt-0 max-[660px]:h-[31px] max-[660px]:w-[102px]">
        <div className="pointer-events-none relative left-[1px] mr-2 text-gray-500">
          <Image
            src="/sreachlogo.svg"
            alt="Image not Loaded Yet"
            width={18}
            height={24}
            className="max-[660px]:h-[25px] max-[660px]:w-[25px]"
          />
        </div>
        <input
          type="text"
          className="w-full border-none bg-transparent text-base text-black outline-none placeholder:text-sm placeholder:text-gray-400 max-[660px]:text-xs"
          placeholder="Search"
          aria-label="Search"
        />
      </div>

      {/* Right side */}
      <div className="ml-auto flex w-[54vw] items-center justify-end max-[660px]:w-auto">
        {/* Join Button */}
        <button
          className="mr-9 flex items-center justify-center rounded-md bg-[#5a3ec8] px-4 py-2 text-sm font-medium text-white hover:bg-[#4a2fb8] focus:outline-none focus:ring-2 focus:ring-[#5a3ec8] focus:ring-offset-2 max-[660px]:mr-4 max-[660px]:px-3 max-[660px]:py-1 max-[660px]:text-xs"
          onClick={() => {
            handleJoin();
          }}
        >
          Join
        </button>

        {/* User Profile */}
        <div className="ml-2 max-[660px]:ml-1">
            <h6 className="text-[12px] font-normal leading-4 max-[660px]:text-[10px]" onClick={()=>router.replace("/profile")}>
              {userName}
            </h6>
            <p className="text-[11px] font-light text-gray-500 max-[660px]:text-[9px]">
              student
            </p>
        </div>

        {/* Dropdown Icon */}
        <div className="ml-[7px] max-[660px]:ml-1">
          <Image
            src="/dropdown.svg"
            alt="Image not Loaded Yet"
            width={18}
            height={18}
          />
        </div>
      </div>
    </nav>
  );
}
