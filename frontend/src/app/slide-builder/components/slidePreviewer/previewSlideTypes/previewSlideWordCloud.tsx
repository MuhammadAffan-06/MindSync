"use client";

import { useState } from "react";
import ReactWordcloud, { OptionsProp, Word } from "react-wordcloud";

interface PreviewSlideProps {
  content: string;
}

export interface ContentProps {
  question: string;
}

const CLOUD_OPTIONS: OptionsProp = {
  fontFamily: "Poppins",
  fontWeight: "500",
  fontSizes: [10, 100],
  rotations: 0,
  enableTooltip: false,
  enableOptimizations: true,
  spiral: "archimedean",
};
function capitalizeFirstLetter(str:string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
export default function PreviewSlideWordCloud({ content }: PreviewSlideProps) {
  console.log("Preview Slide Poll Rendering");
  const [isPresenter, setIsPresenter] = useState<boolean>(false);
  const parsed: ContentProps = JSON.parse(content);
  const [userWord, setUserWord] = useState<string>("");
  const [userWords, setUserWords] = useState<Word[]>([]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value[value.length - 1] !== " " && value.length <= 20 && !value.includes(" ")) {
      setUserWord(capitalizeFirstLetter(value));
    }
  };
  const onWordSubmit = () => { 
    const formattedWord = capitalizeFirstLetter(userWord);
    const wordIndex = userWords.findIndex((word) => word.text === formattedWord);
    const newWords = [...userWords];
    if (wordIndex !== -1) newWords[wordIndex].value += 1;
    else newWords.push({ text: formattedWord, value: 1 });

    setUserWord("");
    setUserWords(newWords);
  };
  return (
    <div className="relative w-full h-full ">
      <div className="px-8 py-12 flex flex-col">
        <div className="px-4">
          <div className="w-[45vw] text-3xl py-2">{parsed.question}</div>
        </div>
        <div className="flex-1_1_100% h-full ">
          {isPresenter && <ReactWordcloud maxWords={20} words={userWords} options={CLOUD_OPTIONS} />}
          {!isPresenter && (
            <div>
              {/* customize the your answer more  add more classes make it fancyy*/}

              <input
                placeholder="Type your answer here..."
                maxLength={20}
                value={userWord}
                max={20}
                onChange={onChange}
                className="placeholder-gray-500 text-3xl m-6 py-2 focus:outline-none focus:ring-0 w-full bg-none"
              />
            </div>
          )}
        </div>
      </div>
      <div className="absolute right-2 bottom-2">
        <button
          className="m-4 p-2 px-8 text-center text-xl rounded-full border-[var(--secondary-color)] border text-[var(--secondary-color)]"
          onClick={() => setIsPresenter((p) => !p)}
        >
          {isPresenter ? "Presenter Preview" : "User Preview"}
        </button>
        {!isPresenter && (
          <button
            onClick ={() => onWordSubmit()}
            className="m-4 p-2 px-8 text-center text-xl rounded-full bg-[var(--secondary-color)] text-white"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
