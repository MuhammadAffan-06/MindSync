"use client"

import { useState } from "react";
import { ContentProps } from "../../slideEditor/slideTypes/slideMCQ";


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
              className="w-[45vw] text-3xl py-2"
            >{parsed.question}</div>
          </div>
          <ul className="p-8 space-y-5">
            {parsed.answers.map((answer, index) => (
              <li key={index+answer} className="py-1 w-[20vw] text-lg">
             <label className="flex items-center select-none cursor-pointer">
             <input
                type="checkbox"
                value={answer}
                checked={selectedAnswer === answer}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                className="w-6 h-6"
                   />
                <span className="px-2 inline-block">
                 {answer}
                </span>
             </label>
              </li>
            ))}
           
          </ul>
        </div>
        <div className="absolute right-2 bottom-2">
            <button className="m-4 w-32 p-2 px-2 text-center text-xl rounded-full bg-[var(--secondary-color)] text-white">Submit</button>
            </div>
        </div>);
}