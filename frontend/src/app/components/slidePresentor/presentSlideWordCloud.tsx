"use client";

import { useState, useEffect } from "react";
import type { WordCloudContentProps } from "@/app/components/slideEditor/slideTypes/slideWordCloud";

interface PresentSlideWordCloudProps {
  content: string;
  isPresenter: boolean;
  onSubmit: (word: string) => Promise<void>;
  userSubmission?: string;
}

export default function PresentSlideWordCloud({
  content,
  isPresenter,
  onSubmit,
  userSubmission,
}: PresentSlideWordCloudProps) {
  console.log("Present Slide Word Cloud Rendering");

  const parsed: WordCloudContentProps = JSON.parse(content);
  const [inputValue, setInputValue] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  // Initialize submission status
  useEffect(() => {
    if (userSubmission) {
      setHasSubmitted(true);
      setInputValue(userSubmission);
    }
  }, [userSubmission]);

  const handleSubmit = async () => {
    if (!inputValue.trim() || isSubmitting || hasSubmitted) return;

    setIsSubmitting(true);
    try {
      await onSubmit(inputValue);
      setHasSubmitted(true);
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full h-full">
      <div className="px-8 py-12">
        {/* Question Display */}
        <div className="px-4 mb-8 text-center">
          <h2 className="text-3xl font-bold">{parsed.question}</h2>
          <p className="text-lg text-gray-600 mt-2">
            Submit a single word response below
          </p>
        </div>

        {/* User Submission Area */}
        {!isPresenter && (
          <div className="max-w-md mx-auto p-6 bg-gray-50 rounded-lg">
            {hasSubmitted ? (
              <div className="text-center">
                <p className="text-lg font-medium text-green-600 mb-2">
                  You submitted: "{inputValue}"
                </p>
                <p className="text-gray-500">
                  Thank you for your contribution!
                </p>
              </div>
            ) : (
              <>
                <label
                  htmlFor="word-input"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Enter your word:
                </label>
                <div className="flex gap-2">
                  <input
                    id="word-input"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Type your response..."
                    disabled={isSubmitting}
                    maxLength={20}
                  />
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                    onClick={handleSubmit}
                    disabled={!inputValue.trim() || isSubmitting}
                  >
                    {isSubmitting ? "..." : "Submit"}
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Note: You can only submit once
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
