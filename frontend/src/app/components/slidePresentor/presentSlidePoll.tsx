"use client";

// import { ContentProps } from "@/app/slide-builder/components/slideEditor/slideTypes/slideMCQ";
import { ContentProps } from "@/app/components/slideEditor/slideTypes/slideMCQ";
import { useState } from "react";

interface PreviewSlideProps {
  content: string;
  polls: number[];
  isPresenter: boolean;
  onSubmit: (answer: string) => Promise<string>;
}

export default function PresentSlidePoll({
  content,
  polls,
  isPresenter,
  onSubmit,
}: PreviewSlideProps) {
  console.log("Preview Slide Poll Rendering");
  const pollColors: string[] = [
    "#587AFF",
    "#c058dd",
    "#dd5858",
    "#75dd58",
    "#58C8dd",
  ];
  const parsed: ContentProps = JSON.parse(content);
  const maxValue = Math.max(...polls);
  const perc = polls.map((v) =>
    v == 0 || maxValue == 0 ? 0 : (v / maxValue) * 100
  );
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  const [submitBtnDisabled, setSubmitBtnDisabled] = useState<boolean>(false);
  const [submitBtnText, setSubmitBtnText] = useState<string>("Submit");
  const handleSubmit = async () => {
    setSubmitBtnDisabled(true);
    if (selectedAnswer) {
      const message = await onSubmit(selectedAnswer);
      setSubmitBtnText(message);

      setTimeout(() => {
        setSubmitBtnText("Submit");
        setSubmitBtnDisabled(false);
      }, 1000);
    }
  };

  return (
    <div className="relative w-full ">
      <div className="p-2 lg:p-8 py-4 lg:py-12">
          <div className="w-full text-md lg:w-[60vw] lg:text-2xl py-2">{parsed.question}</div>
        <ul className="p-2 lg:p-8  space-y-5">
          {parsed.answers.map((answer, index) => {
            if (isPresenter) {
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
                          width: `${perc[index]}%`,
                          backgroundColor: pollColors[index],
                        }}
                      ></div>{" "}
                      <div className="w-full text-sm lg:w-[60vw] lg:text-lg text-gray-500">
                        {polls[index]}
                      </div>{" "}
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
                      className="w-3 lg:w-6 w-3 lg:h-6"
                    />
                    <span className="px-2 inline-block">{answer}</span>
                  </label>
                </li>
              );
          })}
        </ul>
      </div>
       {!isPresenter && selectedAnswer !== "" && (
          <div className="fixed right-2 bottom-2">
            <button
              className="m-2 p-2 px-4 text-center text-sm sm:text-xl rounded-full bg-[var(--secondary-color)] text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={submitBtnDisabled}
            >
              {submitBtnText}
            </button>
          </div>
        )}
    </div>
  );
}
