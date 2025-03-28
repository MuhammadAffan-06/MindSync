"use client";

import { useState } from "react";
import { WordCloudContentProps } from "@/app/components/slideEditor/slideTypes/slideWordCloud";

interface PresentSlideWordCloudProps {
  content: string;
  isPresenter: boolean;
  onSubmit: (word: string) => Promise<void>;
}

export default function PresentSlideWordCloud({
  content,
  isPresenter,
  onSubmit,
}: PresentSlideWordCloudProps) {
  console.log("Present Slide Word Cloud Rendering");

  const parsed: WordCloudContentProps = JSON.parse(content);
  const [submittedWords, setSubmittedWords] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!inputValue.trim() || isSubmitting) return;
    setIsSubmitting(true);

    await onSubmit(inputValue); // Send word to presenter
    setSubmittedWords((prevWords) => [...prevWords, inputValue]);
    setInputValue("");

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="relative w-full">
      <div className="px-8 py-12">
        <div className="px-4">
          <div className="text-3xl py-2">{parsed.question}</div>
        </div>

        {/* User Input */}
        {!isPresenter && (
          <div className="p-8 space-y-5">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your word..."
              disabled={isSubmitting}
            />
            <button
              className="mt-4 px-6 py-2 bg-[var(--secondary-color)] text-white rounded disabled:bg-gray-400"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        )}

        {/* Display User's Submitted Words */}
        {submittedWords.length > 0 && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <div className="text-lg font-semibold">Your Submitted Words:</div>
            <div className="flex flex-wrap gap-2 mt-2">
              {submittedWords.map((word: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-200 rounded-full"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
