"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Nav() {
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
      setUserName(name);
    }
  }, []);

  return (
    <nav className="fixed top-0 z-20 flex h-[64px] w-full items-center border border-gray-200 bg-white px-4 py-2">
      <div>
        <Image className="h-[64px] w-[117px] sm:w-[164px]" src="/logo.svg" alt="Image not Loaded Yet" width={164} height={64} />
      </div>
      <div
        className="
          ml-[3px] mt-0 flex h-[31px] w-[102px] items-center
          rounded-full bg-gray-100 px-2 py-2 shadow-sm
          hover:bg-gray-200 focus-within:shadow-md
          sm:ml-[300px] sm:my-[14px] sm:h-[33px] sm:w-[388px] sm:max-w-[400px]
        "
      >
        <div className="relative left-[1px] mr-2 pointer-events-none text-gray-500">
          <Image
            src="/sreachlogo.svg"
            alt="Image not Loaded Yet"
            width={24}
            height={24}
            className="h-[25px] w-[25px] sm:h-[18px] sm:w-[24px]"
          />
        </div>
        <input
          type="text"
          className=" w-full border-none bg-transparent text-xs text-black outline-none placeholder:text-sm placeholder:text-gray-400 sm:text-base
          "
          placeholder="Search"
          aria-label="Search"
        />
      </div>
      <div className="ml-auto flex w-auto items-center justify-end sm:w-[54vw]">
        <div className="mr-4 sm:mr-9">
          <Image
            className="h-[20px] w-[20px] sm:h-[30px] sm:w-[30px]"
            src="/notification.svg"
            alt="Image not Loaded Yet"
            width={30}
            height={30}
          />
        </div>

        <div className="ml-1 sm:ml-2">
          <h6 className="cursor-pointer text-[10px] font-normal leading-4 sm:text-[12px]" onClick={() => router.replace("/profile")}>
            {" "}
            {userName}
          </h6>
          <p className="text-[9px] font-light text-gray-500 sm:text-[11px]"> student</p>
        </div>
        <div className="ml-1 sm:ml-[7px]">
          <Image src="/dropdown.svg" alt="Image not Loaded Yet" width={18} height={18} />
        </div>
      </div>
    </nav>
  );
}
