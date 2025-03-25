"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";
interface LeaderboardEntry {
    marksAchieved: number;
  name: string;
}

export type LeaderboardType = LeaderboardEntry[];


interface LeaderboardProps {
  leaderboard: LeaderboardType|null;
  setShowLeaderboard:React.Dispatch<React.SetStateAction<boolean>>;
}

function Leaderboard({ leaderboard,setShowLeaderboard }: LeaderboardProps) {
    console.log("Leaderboard Rendering")
   
    

    if(!leaderboard) return null;
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl sm:w-[50vw] w-[90vw]  text-center relative">
        <button
          className="absolute top-2 right-2 p-2"
          onClick={() => setShowLeaderboard(false)}
        ><IoMdClose size={24}/>
        </button>
        <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
        <div className="overflow-y-auto max-h-60">
        <table className="w-full border-collapse ">
            <thead>
              <tr className="bg-[var(--secondary-color)] text-white">
                <th className=" px-4 py-2">Rank</th>
                <th className=" px-4 py-2">Name</th>
                <th className=" px-4 py-2">Marks</th>
              </tr>
            </thead>
            <tbody>
                
              {leaderboard
                .map((entry, index) => (
                  <tr key={index} className="odd:bg-gray-50">
                    
                    <td className=" px-4 py-2">{index + 1}</td>
                    <td className=" px-4 py-2">{entry.name}</td>
                    <td className=" px-4 py-2">{entry.marksAchieved}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Leaderboard;
