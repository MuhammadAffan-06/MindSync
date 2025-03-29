"use client";

import Nav from "@/app/components/nav/nav";
import { useRouter } from "next/navigation";
import { RequireAuth } from "../components/utils/requireAuth";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PresentationMetaData } from "../types/presentationTypes";
import { apiRequest } from "../components/utils/api";
import Sidebar from "../components/sideBar/sideBar";

function Dashboard() {
  const router = useRouter();
  const [createPresentationBtnDisable, setCreatePresentationBtnDisable] = useState(false);
  const [presentations, setPresentations] = useState<PresentationMetaData[]>([]);

  const fetchPresentations = async () => {
    const { success, presentations: presentationsData } = await apiRequest("/presentation/all", null);
    if (success) {
      setPresentations(presentationsData);
    }
  };

  useEffect(() => {
    fetchPresentations();
  }, []);

  const onCreatePresentation = async () => {
    setCreatePresentationBtnDisable(true);

    const { success, newPresentation } = await apiRequest("/presentation/create", null);
    if (success) {
      router.push(`/slide-builder/${newPresentation._id}`);
    } else {
      setCreatePresentationBtnDisable(false);
    }
  };

  const handlePresentationClick = (presentationId: string) => {
    router.push(`/slide-builder/${presentationId}`);
  };

  return (
    <>
      <Nav />
      <Sidebar />
      <div className="md:ml-[240px] mt-[60px] min-h-[calc(100vh-60px)] bg-white p-4 md:p-6">
        
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5">Dashboard</h1>
        <div
          className="flex flex-col gap-6 items-center justify-center w-full h-[210px] rounded-xl bg-cover bg-top-left bg-no-repeat"
          style={{ backgroundImage: "linear-gradient(rgba(89,28,186,0.712),rgba(72,48,226,0.712)), url('/present.png')" }}
        >
          
          <button
            className="bg-white text-indigo-700 font-bold text-lg sm:text-xl px-4 py-2 rounded-xl disabled:bg-gray-300"
            onClick={onCreatePresentation}
            disabled={createPresentationBtnDisable}
          >
            
            Create New Presentation
          </button>
          <Link href="/join">
            
            <button className="bg-white text-indigo-700 font-bold text-lg sm:text-xl px-4 py-2 rounded-xl disabled:bg-gray-300">
              
              Join Presentation
            </button>
          </Link>
        </div>
        <div className="mt-12">
          
          <h1 className="text-xl sm:text-2xl font-bold text-gray-600 mb-5">Start from Templates:</h1>
          <div className="flex overflow-x-auto snap-x snap-mandatory space-x-3 scrollbar-hide">
            
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="flex-none w-64 h-36 sm:w-80 sm:h-40 bg-[url('/temp.png')] bg-cover bg-no-repeat bg-[position:-24px_-9px] snap-start rounded-xl shadow-sm"
              />
            ))}
          </div>
        </div>
        <div className="mt-12">
          
          <h1 className="text-xl sm:text-2xl font-bold text-gray-600 mb-5">Saved Presentations:</h1>
          <div className="flex overflow-x-auto snap-x snap-mandatory space-x-3 scrollbar-hide">
            
            {presentations.length > 0 ? (
              presentations.map(({ thumbnailURL, title, presentationId }) => (
                <div
                  key={presentationId}
                  className="flex-none w-64 h-36 sm:w-80 sm:h-48 bg-white snap-start flex flex-col justify-center items-center cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden rounded-xl"
                  onClick={() => handlePresentationClick(presentationId)}
                >
                  
                  {thumbnailURL ? (
                    <img src={thumbnailURL} alt={title} className="w-full h-full object-cover" />
                  ) : (
                    <img src="/presentations.svg" alt="default icon" className="w-12 h-12 object-contain" />
                  )}
                  <span className="text-sm font-semibold text-gray-800 mt-2 text-center truncate px-2"> {title} </span>
                </div>
              ))
            ) : (
              <div className="text-gray-400 px-4 py-2">No saved presentations found.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default RequireAuth(Dashboard);
