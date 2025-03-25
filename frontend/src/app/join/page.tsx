"use client";
import {  useEffect, useState } from "react";
import Nav from "../components/nav/nav";
import { IoChevronBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { RequireAuth } from "../components/utils/requireAuth";
import { fetchData } from "../components/utils/api";
import Leaderboard, { LeaderboardType } from "../components/leaderboard/leaderboard";
import SlidePresentor from "../components/slidePresentor/slidePresentor";

function Join() {
  console.log("Join Page Rendering")
  
  const router = useRouter();
  const [joinCode, setJoinCode] = useState<string>("");
  const [buttonText, setButtonText] = useState<string>("Join Presentation");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [showPresenter, setShowPresenter] = useState<boolean>(false);
  
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

  const joinPresentation = async () => {
    setButtonDisabled(true);
    try {
      await fetchData("presentation/isLive/" + joinCode, "GET");
      setShowPresenter(true);
      setButtonDisabled(false);
    } catch (error) {
      setButtonText("Invalid Join Code");
      setTimeout(() => {
        setButtonText("Join Presentation");
        setButtonDisabled(false);
      }, 1000);
    }
  };

  return (
    <>
      <Nav />
      <div className="mt-[70px]">
        <button onClick={() => router.replace("/dashboard")} className="flex ml-4 text-gray-600">
          <IoChevronBack size={20} className="m-auto" />
          <h1 className="text-lg font-semibold ml-2 my-auto">Back To Dashboard</h1>
        </button>

        <div className="h-[calc(100vh-70px)] flex">
          <div className="p-4 m-auto bg-[var(--background)] sm:w-[27.46rem] h-64 w-[90vw] rounded-xl shadow-gray-400 shadow-md flex flex-col justify-center text-center items-center gap-4">
            <div className="sm:text-2xl text-xl font-semibold">Enter Presentation Code</div>
            <input
              className="p-3 w-[80%] rounded-md shadow-md"
              type="text"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              placeholder="ex: XD3D5"
            />
            <button
              className="p-3 bg-[var(--secondary-color)] text-white rounded-lg disabled:bg-gray-400"
              onClick={() => joinPresentation()}
              disabled={buttonDisabled}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
      {showPresenter && <SlidePresentor joinCode={joinCode} isPresenter={false} setShowPresenter={setShowPresenter} setLeaderboard={setLeaderboard} setShowLeaderboard={setShowLeaderboard} />}
      {showLeaderboard && <Leaderboard leaderboard={leaderboard} setShowLeaderboard={setShowLeaderboard} />}
    </>
  );
}

export default RequireAuth(Join);
