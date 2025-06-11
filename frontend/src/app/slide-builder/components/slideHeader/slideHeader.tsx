"use client";

import Leaderboard, { LeaderboardType } from "@/app/components/leaderboard/leaderboard";
import SlidePresentor from "@/app/components/slidePresentor/slidePresentor";
import { apiRequest } from "@/app/components/utils/api";
import { useSlide } from "@/app/context/slideContext";
import { UserMode } from "@/app/types/slideTypes";
import React, { ChangeEvent, useEffect, useState } from "react";

interface SlideHeaderProps {
  mode: UserMode;
  setMode: React.Dispatch<React.SetStateAction<UserMode>>;
}

export default function SlideHeader({ mode, setMode }: SlideHeaderProps) {
  console.log("Slide Header Rendering");
  const { presentationNameRef, joinCode, presentationId,slidesUpdated, getActiveSlide, saveSlidesToDB } = useSlide();
  const [presentDisabled, setPresentDisabled] = useState<boolean>(false);
  const [showPresenter, setShowPresenter] = useState<boolean>(false);
  const [savingSlides, setSavingSlides] = useState<boolean>(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardType | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowPresenter(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const onPresentationNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === "") presentationNameRef.current = e.currentTarget.placeholder;
    else presentationNameRef.current = e.currentTarget.value;
  };

  const onPreviewClick = () => {
    if (mode === "Previewing") {
      setMode("Building");
    } else {
      const activeSlide = getActiveSlide();
      if (activeSlide && activeSlide.type !== "Undefined" && activeSlide.content) setMode("Previewing");
    }
  };

  const saveSlides = async()=>{
    setSavingSlides(true)
    await saveSlidesToDB();
    setSavingSlides(false)
  }
  const presentSlides = async () => {
    setPresentDisabled(true);
    await saveSlidesToDB();
   const {success} =  await apiRequest("/presentation/live", { presentationId });
if(success) setShowPresenter(true);
  setPresentDisabled(false);
}


  return (
    <>
      <div className="mt-[60px] h-[60px] p-1 flex">
        <span className="flex-[1_1_100%] h-full flex ml-4">
          {mode === "Building" ? (
            <input
              type="text"
              className="placeholder-[#414141] text-[#414141] focus:ring-0 focus:outline-none text-3xl"
              placeholder={presentationNameRef.current}
              onChange={(e) => onPresentationNameChange(e)}
            />
          ) : (
            <div className="text-[#414141] text-3xl my-auto">{presentationNameRef.current}</div>
          )}
        </span>
        <span className="flex p-1 space-x-2">
          <button className="text-white bg-[var(--accent-color)] rounded-full px-8 disabled:bg-gray-400" disabled={savingSlides || !slidesUpdated} onClick={()=>saveSlides()}>
            Save
          </button>
          <button className="text-[var(--secondary-color)] bg-[var(--background)] rounded-full px-8">Share</button>
          <button
            className="text-[var(--secondary-color)] border-2 border-[var(--secondary-color)] rounded-full px-8"
            onClick={onPreviewClick}
          >
            {mode === "Previewing" ? "Builder" : "Preview"}
          </button>
          <button
            className="text-white bg-[var(--secondary-color)] rounded-full px-8 disabled:bg-gray-500"
            disabled={presentDisabled}
            onClick={presentSlides}
          >
            Present
          </button>
        </span>
      </div>

      {showPresenter && (
        <SlidePresentor
          joinCode={joinCode}
          isPresenter={true}
          setShowPresenter={setShowPresenter}
          setLeaderboard={setLeaderboard}
          setShowLeaderboard={setShowLeaderboard}
        />
      )}
      {showLeaderboard && <Leaderboard leaderboard={leaderboard} setShowLeaderboard={setShowLeaderboard} />}
    </>
  );
}
