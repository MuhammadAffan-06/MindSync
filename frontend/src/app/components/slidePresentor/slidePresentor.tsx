"use client";

import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import Image from "next/image";
import PresentSlidePlainText from "./presentSlidePlainText";
import PresentSlideMCQ from "./presentSlideMCQ";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import  { LeaderboardType } from "../leaderboard/leaderboard";
import { SlideType } from "@/app/types/slideTypes";
import {serverBaseUrl} from "../utils/api"

interface SlidePresentorProps {
  joinCode: string;
  isPresenter: boolean;
  setShowPresenter: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLeaderboard: React.Dispatch<React.SetStateAction<boolean>>;
  setLeaderboard:  React.Dispatch<React.SetStateAction<LeaderboardType|null>>
}

interface SlideResponse {
  type: SlideType;
  content: string;
}



export default function SlidePresentor({ joinCode, isPresenter, setShowPresenter,setShowLeaderboard,setLeaderboard }: SlidePresentorProps) {
  console.log("Slide Presentor Rendering");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [activeSlideType, setActiveSlideType] = useState<SlideType | null>(null);
  const [activeSlideContent, setActiveSlideContent] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");

  const [nextBtnText,setNextBtnText] = useState<string>("Next Slide");


  const [previousBtnDisabled,setPreviousBtnDisabled] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const newSocket = io(serverBaseUrl, {
      auth: { token },
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to socket server:", newSocket.id);
      console.log("Joining presentation...");
      newSocket.emit("join-presentation", joinCode, (success: boolean, text: string, slide: SlideResponse) => {
        if (success) {
          console.log("Successfully joined presentation", slide);
          setTitle(text);
          setActiveSlideType(slide.type);
          setActiveSlideContent(slide.content);
        } else {
          console.log("Failed to join Presentation");
          setShowPresenter(false);
          toast.error(text);
        }
      });
    });

    newSocket.on("presentation-data", ({ type, content }) => {
      setActiveSlideType(type);
      setActiveSlideContent(content);
    });

    newSocket.on("presentation-ended", (data) => {
      setShowPresenter(false);
      toast.warn(data.message);
      console.log("Leaderboard Data:", data.leaderboard);
      setLeaderboard(data.leaderboard); 
      setShowLeaderboard(true);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    return () => {
      setSocket(null);
      newSocket.disconnect();
    };
  }, [joinCode]);

  const nextSlide = () => {
    if (isPresenter && socket) {
      socket.emit("presentation-next-slide",(completed:number)=>{
        setPreviousBtnDisabled(completed===0)
        setNextBtnText(completed===1?"End Presentation":"Next Slide");
      });
    }
  };

  const previousSlide = () => {
    if (isPresenter && socket) {
      socket.emit("presentation-previous-slide",(completed:number)=>{
        setPreviousBtnDisabled(completed===0)
        setNextBtnText(completed===1?"End Presentation":"Next Slide");
      });
    }
  };

  const onSubmitAnswer = async (answer: string): Promise<string> => {
    return new Promise((res, rej) => {
      if (socket) {
        socket.emit("presentation-answer-submit", answer, (success: boolean, message: string) => {
          res(message);
        });
      } else rej("Socket doesn't exist");
    });
  };

  if (!activeSlideContent || !activeSlideType) return null;

  return createPortal(
    <>
      <div className="fixed flex flex-col top-0 left-0 h-screen w-screen z-50 bg-white">
        <div className="flex justify-between mt-6 px-8 items-center">
          <span className="text-3xl font-semibold text-gray-500">{title}</span>
          {isPresenter && <span className="text-2xl font-semibold text-gray-500">Join Code: {joinCode}</span>}
          <Image className="max-[660px]:h-[64px] max-[660px]:w-[117px]" src="/logo.svg" alt="Logo" width={200} height={80} />
        </div>
        <div className="bg-[var(--background)] m-8 flex flex-grow flex-shrink basis-full rounded-lg">
          {activeSlideType === "PlainText" && <PresentSlidePlainText content={activeSlideContent} isPresenter={isPresenter} />}
          {activeSlideType === "MCQ" && <PresentSlideMCQ content={activeSlideContent} isPresenter={isPresenter} onSubmit={onSubmitAnswer} />}
          {activeSlideType === "WordCloud" && <PresentSlideWordCloud content={activeSlideContent} isPresenter={isPresenter} onSubmit={onSubmitAnswer}/>}
        </div>
        {isPresenter && (
          <>
            <div className="absolute right-0 bottom-0 p-16">
              <button onClick={nextSlide} className="p-3 bg-[var(--secondary-color)] text-white rounded-lg">
                {nextBtnText}
              </button>
            </div>
            <div className="absolute left-0 bottom-0 p-16">
              <button onClick={previousSlide} disabled={previousBtnDisabled} className="p-3 bg-[var(--secondary-color)] text-white rounded-lg disabled:bg-gray-400">
                Previous Slide
              </button>
            </div>
          </>
        )}
      </div>
    </>,
    document.body
  );
}
