"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
      setUserName(name);
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
        <div className="mr-9 max-[660px]:mr-4">
          <Image
            className="max-[660px]:h-[20px] max-[660px]:w-[20px]"
            src="/notification.svg"
            alt="Image not Loaded Yet"
            width={30}
            height={30}
          />
        </div>

        {/* Avatar could go here if needed
        <div>
          <Image
            className="avatar max-[660px]:h-[25px] max-[660px]:w-[25px]"
            src="/user-profile-avatar.svg"
            alt="Avatar"
            width={40}
            height={40}
          />
        </div> 
        */}

        <div className="ml-2 max-[660px]:ml-1">
          <Link href="http://localhost:3000/profile">
            <h6 className="text-[12px] font-normal leading-4 max-[660px]:text-[10px]">
              {userName}
            </h6>
            <p className="text-[11px] font-light text-gray-500 max-[660px]:text-[9px]">
              student
            </p>
          </Link>
        </div>

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
