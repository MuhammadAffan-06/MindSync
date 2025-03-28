"use client";

import { ContentProps } from "@/app/slide-builder/components/slideEditor/slideTypes/slideMCQ";
import { useState } from "react";

interface PresentSlideProps {
  content: string;
  isPresenter: boolean;
  onSubmit: (answer: string) => Promise<string>;
}

export default function PresentSlideMCQ({
  content,
  isPresenter,
  onSubmit,
}: PresentSlideProps) {
  console.log("Present Slide MCQ Rendering");

  const parsed: ContentProps = JSON.parse(content);
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
    <div className="relative w-full">
      <div className="px-8 py-12">
        <div className="px-4">
          <div className="text-3xl py-2">{parsed.question}</div>
        </div>
        <ul className="p-8 space-y-5">
          {parsed.answers.map((answer: string, index) => (
            <li key={index + answer} className="py-1 text-lg">
              <label className="flex items-center select-none cursor-pointer">
                {!isPresenter && (
                  <input
                    type="checkbox"
                    value={answer}
                    checked={selectedAnswer === answer}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    className="w-6 h-6"
                  />
                )}
                <span className="px-2 inline-block">{answer}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      {!isPresenter && selectedAnswer !== "" && (
        <div className="absolute right-2 bottom-2">
          <button
            className="m-4 p-2 px-4 text-center text-xl rounded-full bg-[var(--secondary-color)] text-white disabled:bg-gray-400"
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
