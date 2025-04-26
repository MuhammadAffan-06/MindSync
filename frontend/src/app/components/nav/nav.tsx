"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function Nav() {
  interface CustomJwtPayload {
    name: string;
    email?: string;
    picture?: string;
    exp?: number;
    iat?: number;
  }

  const [userName, setUserName] = useState("Guest");
  const [userRole, setUserRole] = useState("student");
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const googleToken = Cookies.get("authToken");
      console.log("Google Auth Token from Cookies:", googleToken);

      if (googleToken) {
        try {
          const decodedToken = jwtDecode<CustomJwtPayload>(googleToken);
          console.log("Decoded Google Token:", decodedToken);

          if (decodedToken.name) {
            setUserName(decodedToken.name);
            localStorage.setItem("userName", decodedToken.name);

            // You can extract role from token if available
            // or set it based on other criteria
            if (decodedToken.email?.endsWith("@admin.com")) {
              setUserRole("admin");
            }
          }
        } catch (error) {
          console.error("Error decoding Google token:", error);
          handleFallbackAuth();
        }
      } else {
        handleFallbackAuth();
      }
    };

    const handleFallbackAuth = () => {
      const name = localStorage.getItem("userName");
      console.log("Name from localStorage:", name);
      setUserName(name || "Guest");
    };

    checkAuth();
  }, []);

  const handleProfileClick = () => {
    router.push("/profile");
  };

  return (
    <nav className="fixed top-0 z-20 flex h-[64px] w-full items-center border border-gray-200 bg-white px-4 py-2">
      <div className="flex flex-1 justify-center sm:justify-start">
        <Image
          className="h-[64px] w-[117px] sm:w-[164px]"
          src="/logo.svg"
          alt="Company Logo"
          width={164}
          height={64}
          priority
        />
      </div>

      <div
        className="ml-auto flex w-auto items-center justify-end sm:w-[54vw] cursor-pointer"
        onClick={handleProfileClick}
      >
        <div className="ml-1 sm:ml-2 text-right">
          <h6 className="text-[10px] font-normal leading-4 sm:text-[12px]">
            {userName}
          </h6>
          <p className="text-[9px] font-light text-gray-500 sm:text-[11px]">
            {userRole}
          </p>
        </div>
        <div className="ml-1 sm:ml-[7px]">
          <Image
            src="/dropdown.svg"
            alt="Profile dropdown"
            width={18}
            height={18}
          />
        </div>
      </div>
    </nav>
  );
}
