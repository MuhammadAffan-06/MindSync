"use client"

import { useState } from "react";
// import { ContentProps } from "../../slideEditor/slideTypes/slideMCQ";
import {ContentProps} from "@/app/components/slideEditor/slideTypes/slideMCQ";


interface PreviewSlideProps{
    content:string
}

export default function PreviewSlideMCQ({content}:PreviewSlideProps){
  console.log("Preview Slide MCQ Rendering")
  
    const parsed:ContentProps = JSON.parse(content);
     const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    
    return (<div className="relative w-full ">
        <div className="px-8 py-12">
          <div className="px-4">
            <div
              className="w-full text-md lg:w-[60vw] lg:text-2xl lg:py-2"
            >{parsed.question}</div>
          </div>
          <ul className="p-2 lg:p-8 space-y-5">
            {parsed.answers.map((answer, index) => (
              <li key={index+answer} className="py-1 w-full text-sm lg:w-[60vw] lg:text-lg">
             <label className="flex items-center select-none cursor-pointer">
             <input
                type="checkbox"
                value={answer}
                checked={selectedAnswer === answer}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                className="w-3 lg:w-6 h-3 lg:h-6"
                   />
                <div className="px-2 inline-block w-max">
                 {answer}
                </div>
             </label>
              </li>
            ))}
           
          </ul>
        </div>
        <div className="absolute right-1 bottom-1 sm:right-2 sm:bottom-2">
            <button className="m-2 p-2 px-4 text-center text-sm sm:text-xl rounded-full bg-[var(--secondary-color)] text-white">Submit</button>
            </div>
        </div>);
}