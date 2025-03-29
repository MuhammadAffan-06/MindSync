"use client";
import Nav from "@/app/components/nav/nav";
import "./slide-builder.css";
import SlidePanel from "../components/slidePanel/slidePanel";
import SlideEditor from "../components/slideEditor/slideEditor";
import { toast } from "react-toastify";
import SlideHeader from "../components/slideHeader/slideHeader";
import { useEffect, useRef, useState } from "react";
import SlidePreviewer from "../components/slidePreviewer/slidePreviewer";
import { UserMode } from "../../types/slideTypes";
import { useParams, useRouter } from "next/navigation";
import { RequireAuth } from "@/app/components/utils/requireAuth";
import Loading from "@/app/components/loading/loading";
import { SlideProvider } from "@/app/context/slideContext";
import { apiRequest } from "@/app/components/utils/api";
import { PresentationGetResponse } from "@/app/types/presentationTypes";

function SlideBuilder() {
  console.log("Silde Builder Rendering..");
  const [mode, setMode] = useState<UserMode>("Building");

  const { presentationId } = useParams();
  const [loading, setLoading] = useState(true);
  const presentationDataRef = useRef<PresentationGetResponse|null>(null);
  
  useEffect(() => {
    if (!presentationId) return;
    (async () => {
    
      const response = await apiRequest("/presentation/get",{ presentationId:presentationId as string });
        presentationDataRef.current = response;
        setLoading(false);
    })();
  }, []);

  if (loading) return <Loading message={"Loading..."}/>;
  return (
    <>
      <Nav />
      <div className="mx-4">
        <SlideProvider presentationDataRef={presentationDataRef}>
          <SlideHeader mode={mode} setMode={setMode} />
          <div className="flex flex-col p-4 rounded-xl lg:flex-row bg-[var(--background)] lg:max-h-[calc(100vh-130px)] h-[calc(100vh-130px)] lg:h-[calc(100vh-130px)]">
            <SlidePanel/>
            {mode === "Building" && <SlideEditor />}
            {mode === "Previewing" && <SlidePreviewer />}
          </div>
        </SlideProvider>
      </div>
      
    </>
  );
}
export default RequireAuth(SlideBuilder)