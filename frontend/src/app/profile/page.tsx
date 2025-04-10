"use client";

import Nav from "@/app/components/nav/nav";
import Sidebar from "@/app/components/sideBar/sideBar";
import { useEffect, useState } from "react";
import { RequireAuth } from "../components/utils/requireAuth";
import Image from "next/image";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface CustomJwtPayload {
  name: string;
  email: string;
  picture: string;
}

function Profile() {
  const [userName, setUserName] = useState("N/A");
  const [userEmail, setUserEmail] = useState("N/A");
  const [userPicture, setUserPicture] = useState("/profile-avatar.svg");

  useEffect(() => {
    const googleToken = Cookies.get("authToken");

    if (googleToken) {
      try {
        const decodedToken = jwtDecode<CustomJwtPayload>(googleToken);

        if (decodedToken.name && decodedToken.email && decodedToken.picture) {
          setUserName(decodedToken.name);
          setUserEmail(decodedToken.email);
          setUserPicture(decodedToken.picture);

          // Store in localStorage as fallback
          localStorage.setItem("userName", decodedToken.name);
          localStorage.setItem("userEmail", decodedToken.email);
          localStorage.setItem("userPicture", decodedToken.picture);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      // Fallback to localStorage
      const name = localStorage.getItem("userName");
      const email = localStorage.getItem("userEmail");
      const picture = localStorage.getItem("userPicture");

      if (name) setUserName(name);
      if (email) setUserEmail(email);
      if (picture) setUserPicture(picture);
    }
  }, []);

  return (
    <>
      <Nav />
      <Sidebar />

      <div className="mt-[64px] xs:ml-0 md:ml-[250px] w-full p-6">
        <h1 className="mb-5 text-2xl font-bold text-black">
          Profile Management
        </h1>

        {/* Profile Header */}
        <div className="flex w-full items-center gap-5">
          <div>
            <Image
              src={userPicture}
              alt="Profile Avatar"
              className="rounded-full object-cover"
              width={91}
              height={91}
            />
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">{userName}</h2>
            <p className="text-gray-600 text-xs">{userEmail}</p>
          </div>

          <div>
            <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700">
              Edit
            </button>
          </div>
        </div>

        {/* Profile Form */}
        <div className="mt-8 flex w-4/5 flex-col gap-5 rounded-md bg-white p-6">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex w-full flex-col">
              <label
                htmlFor="full-name"
                className="mb-2 text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="full-name"
                placeholder="Your First Name"
                className="rounded-md border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex w-full flex-col">
              <label
                htmlFor="nick-name"
                className="mb-2 text-sm font-medium text-gray-700"
              >
                Nick Name
              </label>
              <input
                type="text"
                id="nick-name"
                placeholder="Your Nick Name"
                className="rounded-md border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex w-full flex-col">
              <label
                htmlFor="gender"
                className="mb-2 text-sm font-medium text-gray-700"
              >
                Gender
              </label>
              <select
                id="gender"
                className="cursor-pointer appearance-none rounded-md border border-gray-300 bg-gray-50 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Select Gender</option>
              </select>
            </div>
            <div className="flex w-full flex-col">
              <label
                htmlFor="country"
                className="mb-2 text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <select
                id="country"
                className="cursor-pointer appearance-none rounded-md border border-gray-300 bg-gray-50 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Select Country</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex w-full flex-col">
              <label
                htmlFor="language"
                className="mb-2 text-sm font-medium text-gray-700"
              >
                Language
              </label>
              <select
                id="language"
                className="cursor-pointer appearance-none rounded-md border border-gray-300 bg-gray-50 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Select Language</option>
              </select>
            </div>
            <div className="flex w-full flex-col">
              <label
                htmlFor="time-zone"
                className="mb-2 text-sm font-medium text-gray-700"
              >
                Time Zone
              </label>
              <select
                id="time-zone"
                className="cursor-pointer appearance-none rounded-md border border-gray-300 bg-gray-50 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Select Timezone</option>
              </select>
            </div>
          </div>
        </div>

        {/* Email Display */}
        <div className="mt-8">
          <h3 className="mb-3 ml-6 text-lg font-semibold text-gray-800">
            My Email Address
          </h3>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-50">
                <Image
                  src="/emailp.svg"
                  alt="Email Icon"
                  width={24}
                  height={24}
                />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-800">{userEmail}</p>
                <small className="mt-1 text-xs text-gray-500">
                  1 month ago
                </small>
              </div>
            </div>
          </div>
          <button className="ml-6 mt-3 rounded-md bg-purple-50 px-4 py-2 text-sm text-purple-700 transition hover:bg-purple-100">
            + Add Email Address
          </button>
        </div>
      </div>
    </>
  );
}

export default RequireAuth(Profile);
