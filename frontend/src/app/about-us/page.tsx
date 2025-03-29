'use client';

import Nav from "@/app/components/nav/nav";
import Sidebar from "@/app/components/sideBar/sideBar";
import "@/app/about-us/about-us.css";
import Link from "next/link";

export default function About() {
  return (
    <>
      <Nav />
      <Sidebar />
      <div className="main-content">
        <div className="content-container">
          <h1 className="about-title">About Us</h1>
          <p className="about-paragraph">
            At MindSync, we are passionate about transforming presentations into meaningful interactions. 
            Our platform empowers educators, trainers, and professionals to create dynamic and engaging 
            sessions that foster real-time collaboration, smart assessments, and impactful learning experiences. 
            Whether it’s in classrooms, boardrooms, or online events, MindSync bridges the gap between presenters 
            and participants, making every session memorable and effective.
          </p>
          <Link href="/dashboard">
          <button className="back-button">Back to Dashboard</button>
          </Link>
        </div>
      </div>
    </>
  );
}
