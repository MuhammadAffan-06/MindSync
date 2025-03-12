
'use client';
import Nav from "@/app/components/nav/nav";
import "./slide-builder.css"

import SlidePanel from './components/slidePanel/slidePanel'
import SlideEditor from './components/slideEditor/slideEditor'
import { SlideProvider } from "./slideContext";

import { ToastContainer } from "react-toastify";
import SlideHeader from "./components/slideEditor/slideHeader/slideHeader";

export default function SlideBuilder() {
  'use client';
  console.log("Silde Builder Rendering..")



  return (
    <>
      <Nav />
      <ToastContainer />
      <div className="mx-4">


        <SlideProvider>
          <SlideHeader />
          <div className="flex flex-col p-4 rounded-xl lg:flex-row bg-[var(--background)] lg:max-h-[calc(100vh-130px)] h-[calc(100vh-130px)] lg:h-[calc(100vh-130px)]">
          <SlidePanel />
          <SlideEditor />
          </div>
        </SlideProvider>
      </div>

    </>
  );
}