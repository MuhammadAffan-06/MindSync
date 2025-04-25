"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";

export default function Nav() {
  interface CustomJwtPayload {
    name: string;
    email?: string;
    picture?: string;
    exp?: number;
    iat?: number;
  }

  // const handleJoin = () => {
  //   window.location.href = "http://localhost:3000/join";
  // };
  const [userName, setUserName] = useState("");
  const router = useRouter();

  // useEffect(() => {
  //   const googleToken = Cookies.get("authToken");
  //   console.log("Google Auth Token from Cookies:", googleToken); // Debugging

  //   if (googleToken) {
  //     try {
  //       // Decode the Google Auth token
  //       const decodedToken = jwtDecode<CustomJwtPayload>(googleToken);
  //       console.log("Decoded Google Token:", decodedToken);
  //       if (decodedToken.name) {
  //         setUserName(decodedToken.name);
  //         localStorage.setItem("userName", decodedToken.name);
  //       } else {
  //         console.error("Name not found in the decoded token");
  //       }
  //     } catch (error) {
  //       console.error("Error decoding Google token:", error);
  //     }
  //   } else {
  //     // Fallback to localStorage if no Google token is found
  //     const name = localStorage.getItem("userName");
  //     console.log("Name from localStorage:", name); // Debugging
  //     if (name) {
  //       setUserName(name);
  //     } else {
  //       setUserName("Guest"); // Fallback to "Guest" if no name is found
  //     }
  //   }
  // }, []);

  return (
    <nav className="fixed top-0 z-20 flex h-[64px] w-full items-center border border-gray-200 bg-white px-4 py-2">
    <div className="flex flex-1 justify-center sm:justify-start">
      <Image
        className="h-[64px] w-[117px] sm:w-[164px]"
        src="/logo.svg"
        alt="Image not Loaded Yet"
        width={164}
        height={64}
      />
    </div>
  
    <div className="ml-auto flex w-auto items-center justify-end sm:w-[54vw]">
      <div className="ml-1 sm:ml-2 text-right">
        <h6
          className="cursor-pointer text-[10px] font-normal leading-4 sm:text-[12px]"
          onClick={() => router.replace("/profile")}
        >
          {userName}
        </h6>
        <p className="text-[9px] font-light text-gray-500 sm:text-[11px]">
          student
        </p>
      </div>
      <div className="ml-1 sm:ml-[7px]">
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
