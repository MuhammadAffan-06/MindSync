"use client"

import { useEffect, useRef } from "react";


interface PreviewSlideProps{
    content:string
}

export default function PreviewSlidePlainText({content}:PreviewSlideProps){
  console.log("Preview Slide Plain Text Rendering")
  
  const divRef  = useRef<HTMLDivElement|null>(null);

  useEffect(()=>{
    if(divRef.current)divRef.current.innerHTML = content;

  },[divRef.current,content])
    return (<div className="flex flex-1 flex-col p-4 max-w-[80vw] break-words overflow-clip " ref={divRef}>
    </div>);
}