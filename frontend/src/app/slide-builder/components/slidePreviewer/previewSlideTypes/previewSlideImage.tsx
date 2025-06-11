"use client";

import React from "react";

interface SlideImageProps {
  question: string;
  imageUrl: string;
}

interface PreviewSlideImageProps {
  content: string;
}

export default function PreviewSlideImage({ content }: PreviewSlideImageProps) {
  const parsed: SlideImageProps = JSON.parse(content);

  return (
    <div className="w-max mx-auto p-4 text-center">
      {parsed.question && <h2 className="text-xl sm:text-2xl font-semibold mb-6">{parsed.question}</h2>}

      {parsed.imageUrl ? (
        <img src={parsed.imageUrl} alt="Slide Visual" className="w-full max-h-[25rem] object-contain rounded shadow-2xl" />
      ) : (
        <p className="text-gray-500 text-lg italic">No image uploaded.</p>
      )}
    </div>
  );
}
