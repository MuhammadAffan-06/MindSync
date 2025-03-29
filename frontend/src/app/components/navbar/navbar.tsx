"use client";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between mt-5 max-w-full overflow-x-hidden px-4">
      <Image 
        className="w-36 h-auto md:w-[240px]" 
        src="/header.png" 
        alt="Image Not Loaded Yet" 
        width={240} 
        height={130} 
      />

      <div className="flex gap-2 md:gap-5 mr-2 md:mr-5 items-center">
        <Link href="/auth" target="_blank">
          <button className="px-6 py-4 text-md rounded-md whitespace-nowrap ">
            Login
          </button>
        </Link>
        <Link href="/auth" target="_blank">
          <button className="px-6 py-4 text-md text-white bg-gradient-to-b from-[var(--secondary-color)] to-[#4830e2] rounded-xl whitespace-nowrap">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}
