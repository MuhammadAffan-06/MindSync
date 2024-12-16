'use client';

import Nav from "@/app/components/nav/nav";
import Sidebar from "@/app/components/sideBar/sideBar";
import "@/app/dashboard/dashboard.css";
import Image from "next/image";

export default function Dashboard() {
  return (
    <>
      {/* Navigation Bar */}
      <Nav />
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        <h1 className="main-title">Dashboard</h1>
       
        <div className="create-present">
            <button className="btn-present">Create New Presentation</button>
        </div>
        
       
        <div className="template">
            <h1 className="text">Start from Templates:</h1>
            <div className="tem-scroll">
            <div className="temp"></div>
            <div className="temp"></div>
            <div className="temp"></div>
            <div className="temp"></div>
            <div className="temp"></div>
            <div className="temp"></div>
            <div className="temp"></div>
            <div className="temp"></div>
            </div>  
        </div>

        <div className="save">
            <h1 className="text">Saved Presentations:</h1>
            <div className="tem-scroll">
            <div className="temps"><img src="/presentations.svg" alt="heart icon" /></div>
            <div className="temps"><img src="/presentations.svg" alt="heart icon" /></div>
            <div className="temps"><img src="/presentations.svg" alt="heart icon" /></div>
            <div className="temps"><img src="/presentations.svg" alt="heart icon" /></div>
            <div className="temps"><img src="/presentations.svg" alt="heart icon" /></div>
            <div className="temps"><img src="/presentations.svg" alt="heart icon" /></div>
            <div className="temps"><img src="/presentations.svg" alt="heart icon" /></div>
            <div className="temps"><img src="/presentations.svg" alt="heart icon" /></div>
            </div>  
        </div>
      </div>
    </>
  );
}