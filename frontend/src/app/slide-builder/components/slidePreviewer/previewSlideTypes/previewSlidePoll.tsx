"use client";

import { useState } from "react";
// import { ContentProps } from "../../slideEditor/slideTypes/slideMCQ";
import { ContentProps } from "@/app/components/slideEditor/slideTypes/slideMCQ";

interface PreviewSlideProps {
  content: string;
}

export default function PreviewSlidePoll({ content }: PreviewSlideProps) {
  console.log("Preview Slide Poll Rendering");
  const [isPresenter, setIsPresenter] = useState<boolean>(false);
  const pollColors: string[] = [
    "#587AFF",
    "#c058dd",
    "#dd5858",
    "#75dd58",
    "#58C8dd",
  ];
  const parsed: ContentProps = JSON.parse(content);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  return (
    <div className="relative w-full ">
      <div className="px-2 sm:px-8 py-3 sm:py-12">
        <div className="px-4">
          <div className="w-full text-md lg:w-[60vw] lg:text-2xl py-2">{parsed.question}</div>
        </div>
        <ul className="p-2 lg:p-8 space-y-5">
          {parsed.answers.map((answer, index) => {
            if (isPresenter) {
              let value = ~~(Math.random() * 100);
              let perc = ~~value;
              return (
                <li key={index + answer} className="py-1 text-lg">
                  <label className="flex items-center select-none cursor-pointer">
                    <span className="inline-block min-w-32 max-w-32 whitespace-break-spaces text-right">
                      {answer}
                    </span>
                    <div className="flex w-full items-center">
                      {" "}
                      <div
                        className="h-4 mx-4 rounded-md"
                        style={{
                          width: `${perc}%`,
                          backgroundColor: pollColors[index],
                        }}
                      ></div>{" "}
                      <div className="w-full text-sm lg:w-[60vw] lg:text-lg text-gray-500">{value}</div>{" "}
                    </div>
                  </label>
                </li>
              );
            } else
              return (
                <li key={index + answer} className="py-1 w-full text-sm lg:w-[60vw] lg:text-lg">
                  <label className="flex items-center select-none cursor-pointer">
                    <input
                      type="checkbox"
                      value={answer}
                      checked={selectedAnswer === answer}
                      onChange={(e) => setSelectedAnswer(e.target.value)}
                      className="w-3 lg:w-6 h-3 lg:h-6"
                    />
                    <span className="px-2 inline-block">{answer}</span>
                  </label>
                </li>
              );
          })}
        </ul>
      </div>
      <div className="absolute right-2 bottom-2">
        <button
          className="m-2 p-2 px-4 text-center text-sm lg:text-xl rounded-full border-[var(--secondary-color)] border text-[var(--secondary-color)]"
          onClick={() => setIsPresenter((p) => !p)}
        >
          {isPresenter ? "Presenter Preview" : "User Preview"}
        </button>
        {!isPresenter && (
          <button className="m-2 p-2 px-4 text-center text-sm sm:text-xl rounded-full bg-[var(--secondary-color)] text-white">
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
