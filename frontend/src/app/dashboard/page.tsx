"use client";

import Nav from "@/app/components/nav/nav";
import Sidebar from "@/app/components/sideBar/sideBar";
import { useRouter } from "next/navigation";
import { fetchDataJSON } from "../components/utils/api";
import { RequireAuth } from "../components/utils/requireAuth";
import { useEffect, useState } from "react";

interface Presentation {
  thumbnailURL: string;
  title: string;
  presentationId: string;
}

function Dashboard() {
  const router = useRouter();
  const [createPresentationBtnDisable, setCreatePresentationBtnDisable] = useState(false);
  const [presentations, setPresentations] = useState<Presentation[]>([]);

  const fetchPresentations = async () => {
    try {
      const data = await fetchDataJSON("presentation/all", "GET");
      if (data && Array.isArray(data)) {
        setPresentations(data);
      }
    } catch (error) {
      console.error("Error fetching presentations:", error);
    }
  };

  useEffect(() => {
    fetchPresentations();
  }, []);

  const onCreatePresentation = async () => {
    setCreatePresentationBtnDisable(true);
    try {
      const response = await fetchDataJSON("presentation/create", "POST", {
        title: "Untitled Presentation",
      });
      if (response) {
        router.push(`/slide-builder/${response.newPresentation._id}`);
      } else {
        setCreatePresentationBtnDisable(false);
      }
    } catch (e) {
      console.error(e);
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

      <div className="ml-[240px] mt-[60px] min-h-[calc(100vh-60px)] bg-white p-5">
        <h1 className="text-2xl font-bold text-gray-800 mb-5">Dashboard</h1>

        <div
          className="flex flex-col gap-6 items-center justify-center w-full h-[210px] rounded-xl bg-cover bg-top-left bg-no-repeat"
          style={{
            backgroundImage: "linear-gradient(rgba(89,28,186,0.712),rgba(72,48,226,0.712)), url('/present.png')",
          }}
        >
          <button
            className="bg-white text-indigo-700 font-bold text-xl px-4 py-2 rounded-xl disabled:bg-gray-300"
            onClick={onCreatePresentation}
            disabled={createPresentationBtnDisable}
          >
            Create New Presentation
          </button>
          <button
            className="bg-white text-indigo-700 font-bold text-xl px-4 py-2 rounded-xl disabled:bg-gray-300"
            onClick={() => router.replace("/join")}
          >
            Join Presentation
          </button>
        </div>

        <div className="mt-12">
          <h1 className="text-2xl font-bold text-gray-600 mb-5">Start from Templates:</h1>
          <div className="flex overflow-x-auto snap-x snap-mandatory ">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="flex-none w-80 h-40 mx-2 snap-start bg-cover bg-no-repeat bg-[url('/temp.png')] bg-[position:-24px_-9px]"
              />
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h1 className="text-2xl font-bold text-gray-600 mb-5">Saved Presentations:</h1>
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
            {presentations.length > 0 ? (
              presentations.map(({ thumbnailURL, title, presentationId }) => (
                <div
                  key={presentationId}
                  className="flex-none w-80 h-48 mx-2 bg-white snap-start flex flex-col justify-center items-center cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                  onClick={() => handlePresentationClick(presentationId)}
                >
                  {thumbnailURL ? (
                    <img src={thumbnailURL} alt={title} className="w-full h-full object-cover" />
                  ) : (
                    <img src="/presentations.svg" alt="default icon" className="w-12 h-12 object-contain" />
                  )}
                  <span className="text-sm font-semibold text-gray-800 mt-2 text-center truncate px-2">{title}</span>
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
