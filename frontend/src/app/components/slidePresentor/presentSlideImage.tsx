"use client";

import React from "react";

interface PresentSlideImageProps {
  content: string;
  isPresenter: boolean;
}

interface SlideImageContent {
  question: string;
  imageUrl: string;
}

export default function PresentSlideImage({ content, isPresenter }: PresentSlideImageProps) {
  console.log("Present Slide Image Rendering");

  const parsed: SlideImageContent = JSON.parse(content);

  return (
    <div className="relative w-full flex flex-col items-center justify-center px-4 lg:px-8 py-6 lg:py-12">
      {parsed.question && <h2 className="text-center w-full text-xl lg:text-3xl font-semibold mb-6">{parsed.question}</h2>}

      {parsed.imageUrl ? (
        <img src={parsed.imageUrl} alt="Presentation Visual" className="w-full max-w-4xl max-h-[32rem] object-contain rounded-xl" />
      ) : (
        <p className="text-gray-400 italic text-lg">No image available for this slide.</p>
      )}
    </div>
  );
}
