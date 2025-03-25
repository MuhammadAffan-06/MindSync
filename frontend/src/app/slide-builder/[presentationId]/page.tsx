"use client";
import Nav from "@/app/components/nav/nav";
import "./slide-builder.css";
// import SlidePanel from "../components/slidePanel/slidePanel";
import SlidePanel from "@/app/components/slidePanel/slidePanel"
import SlideEditor from "@/app/components/slideEditor/slideEditor";
import { SlideProvider } from "./slideContext";
import { toast } from "react-toastify";
import SlideHeader from "../components/slideHeader/slideHeader";
import { useEffect, useRef, useState } from "react";
import SlidePreviewer from "../components/slidePreviewer/slidePreviewer";
import { PresentationResponse, Slide, UserMode } from "./types";
import { useParams, useRouter } from "next/navigation";
import { fetchDataJSON } from "@/app/components/utils/api";
import { RequireAuth } from "@/app/components/utils/requireAuth";
import Loading from "@/app/components/loading/loading";

function SlideBuilder() {
  console.log("Silde Builder Rendering..");
  const [mode, setMode] = useState<UserMode>("Building");

  const { presentationId } = useParams();
  const [loading, setLoading] = useState(true);
  const presentationDataRef = useRef<PresentationResponse|null>(null);
  const router = useRouter();
  
  useEffect(() => {
    if (!presentationId) return;
    (async () => {
     try{
       const responseJson:PresentationResponse = await fetchDataJSON("presentation/" + presentationId, "GET");
   
      if(responseJson){
        if(responseJson.isLive){
          toast.error("Presentation is currently Live.");
          router.replace("/dashboard");
          return;
        }
        presentationDataRef.current = responseJson;
        setLoading(false);

      }else{
        router.replace("/dashboard");
        
      }
     }catch(e){
      router.replace("/dashboard");
      
     }
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