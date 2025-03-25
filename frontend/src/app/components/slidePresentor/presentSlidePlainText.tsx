"use client"

import { Slide } from "@/app/slide-builder/[presentationId]/types";
import { useEffect, useRef } from "react";


interface PresentSlideProps{
  content:string
  isPresenter: boolean
}

export default function PresentSlidePlainText({content, isPresenter}:PresentSlideProps){
  console.log("Present Slide Plain Text Rendering")
  const divRef  = useRef<HTMLDivElement|null>(null);

  useEffect(()=>{
    if(divRef.current)divRef.current.innerHTML = content;

  },[divRef.current,content])
    return (<div className="flex flex-1 flex-col p-4 max-w-[90vw] break-words overflow-clip " ref={divRef}>
    </div>);
}