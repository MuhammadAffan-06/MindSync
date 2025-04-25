"use client";

import { useState } from "react";
import ReactWordcloud, { OptionsProp, Word } from "react-wordcloud";

interface PresentSlideProps {
  content: string;
  words: Word[];
  isPresenter: boolean;
  onSubmit: (answer: string) => Promise<string>;
}

export interface ContentProps {
  question: string;
}

const CLOUD_OPTIONS: OptionsProp = {
  fontFamily: "Poppins",
  fontWeight: "500",
  fontSizes: [20, 100],
  rotations: 0,
  enableTooltip: false,
  enableOptimizations: true,
  spiral: "archimedean",
};
function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
export default function PresentSlideWordCloud({ content, words, isPresenter, onSubmit }: PresentSlideProps) {
  console.log("Present Slide Word Cloud Rendering");
   const parsed: ContentProps = JSON.parse(content);
  const [userWord, setUserWord] = useState<string>("");
  
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState<boolean>(false);
    const [submitBtnText, setSubmitBtnText] = useState<string>("Submit");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value[value.length - 1] !== " " && value.length <= 20 && !value.includes(" ")) {
      setUserWord(capitalizeFirstLetter(value));
    }
  };
  const handleSubmit = async () => {
    if(!userWord) return;
    setSubmitBtnDisabled(true);
    const formattedWord = capitalizeFirstLetter(userWord);
      const message = await onSubmit(formattedWord);
      setSubmitBtnText(message);

      setTimeout(() => {
        setSubmitBtnText("Submit");
        setSubmitBtnDisabled(false);
      }, 1000);
    
  };
  return (
    <div className="relative w-full h-full ">
      <div className="px-2 lg:px-8 py-4 lg:py-12 flex flex-col">
          <div className="w-[45vw] text-3xl py-2">{parsed.question}</div>
        <div className="flex-1_1_100% h-full">
          {isPresenter && <ReactWordcloud maxWords={20} words={words} options={CLOUD_OPTIONS} />}
          {!isPresenter && (
            <div>
              <input
                placeholder="Type your answer here..."
                maxLength={20}
                value={userWord}
                max={20}
                onChange={onChange}
                className="placeholder-gray-500 text-3xl m-6 py-2 focus:outline-none focus:ring-0 w-full bg-transparent"
              />
            </div>
          )}
        </div>
      </div>
      {!isPresenter && (
        <div className="fixed right-2 bottom-2">
          <button
            onClick={() => handleSubmit()}
            disabled={submitBtnDisabled}
            className="m-2 p-2 px-4 text-center text-sm sm:text-xl rounded-full bg-[var(--secondary-color)] text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {submitBtnText}
          </button>
        </div>
      )}
    </div>
  );
}
