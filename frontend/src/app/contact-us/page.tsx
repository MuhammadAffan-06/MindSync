"use client";

import Nav from "@/app/components/nav/nav";
import Sidebar from "@/app/components/sideBar/sideBar";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    acceptedPolicy: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting form", formData);
  };

  return (
    <>
      <Nav />
      <Sidebar />

      <div className="mt-[40px] min-h-screen bg-white p-5 flex items-start justify-start">
        <div className="mx-auto w-full max-w-[600px] bg-white p-6">
          <h1 className="mb-5 text-3xl font-bold text-gray-800">Contact Us</h1>
          <p className="mb-5 text-lg text-gray-600">Our friendly team would love to hear from you.</p>

          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4 md:gap-5">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex flex-1 flex-col">
                <label htmlFor="firstName" className="mb-1 text-sm text-gray-700">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Your First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="rounded-md border border-gray-300 bg-gray-50 p-3 text-sm text-gray-700 outline-none transition duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <label htmlFor="lastName" className="mb-1 text-sm text-gray-700">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Your Last Name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="rounded-md border border-gray-300 bg-gray-50 p-3 text-sm text-gray-700 outline-none transition duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 text-sm text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Your Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-md border border-gray-300 bg-gray-50 p-3 text-sm text-gray-700 outline-none transition duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="message" className="mb-1 text-sm text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                placeholder="Leave us a message..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="h-28 w-full resize-none rounded-md border border-gray-300 bg-gray-50 p-3 text-sm text-gray-700 outline-none transition duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="privacyPolicy"
                checked={formData.acceptedPolicy}
                onChange={(e) => setFormData({ ...formData, acceptedPolicy: e.target.checked })}
                className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="privacyPolicy" className="text-sm text-gray-700 leading-5">
                You agree to our friendly{" "}
                <a href="/privacy-policy" className="text-indigo-600 hover:underline">
                  privacy policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-gradient-to-r from-[#591CBA] to-[#4830E2] p-3 text-base font-semibold text-white shadow-md transition-all duration-200 hover:opacity-90 md:w-auto md:px-10"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
