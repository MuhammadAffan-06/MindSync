"use client";

import { useSlide } from "@/app/slide-builder/slideContext";
import { Slide, SlideBaseProps } from "@/app/slide-builder/types";
import html2canvas from "html2canvas";
import React, { useEffect, useState, useRef, useCallback } from "react";

interface ContentProps {
  question: string;
  option: string[];
  marks: number;
}

export default function SlideMCQ({ id }: SlideBaseProps) {
  const { activeSlideId, getActiveSlide, updateActiveSlideInfo } = useSlide();
  const slide: Slide | undefined = getActiveSlide();
  if (!slide) return <p>Invalid Slide Id, {id}</p>;
  const parseSlideContent = (slide: Slide): ContentProps => {
    const defaultContentProps:ContentProps = { question: "", option: ["", ""], marks:0 };
    
    try {
      const parsed = JSON.parse(slide.content);
      return parsed === "" ? defaultContentProps : parsed;
    } catch {
      return defaultContentProps;
    }
  };

  const [content, setContent] = useState<ContentProps>(() => parseSlideContent(slide));
  const contentRef = useRef<ContentProps>(content);
  const [optionCount, setOptionCount] = useState(content.option.length);

  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!slide) return;
    const newContent = parseSlideContent(slide);
    setContent(newContent);
    contentRef.current = newContent;
    setOptionCount(newContent.option.length);
  }, [activeSlideId, slide]);
  const updateSlideInfo = useCallback(() => {
    if (divRef.current) {
      html2canvas(divRef.current, { scale:0.5 }).then((canvas) => {
        // canvas.width = 104;
        // canvas.height = 48;
        updateActiveSlideInfo(
          JSON.stringify(contentRef.current),
          canvas.toDataURL("image/webp", 1)
        );
      });
    }
  }, []);
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedContent = { ...contentRef.current, question: e.target.value };
    contentRef.current = updatedContent;
    setContent(updatedContent);
  };
  const handleOptionChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedOptions = [...contentRef.current.option];
    updatedOptions[index] = e.target.value;
    const updatedContent = { ...contentRef.current, option: updatedOptions };
    contentRef.current = updatedContent;
    setContent(updatedContent);
  };
  const handleMarksChange = () => (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedContent = { ...contentRef.current, marks: e.target.valueAsNumber };
    contentRef.current = updatedContent;
    setContent(updatedContent);
  };
  const addOption = () => {
    if (optionCount < 5) {
      const updatedOptions = [...contentRef.current.option, ""];
      const updatedContent = { ...contentRef.current, option: updatedOptions };
      contentRef.current = updatedContent;
      setContent(updatedContent);
      setOptionCount(updatedOptions.length);
      updateSlideInfo();
    }
  };

  return (
    <div className="relative w-full">
      
    <div className="px-8 py-12" ref={divRef}>
      <div className="border-black border border-dashed rounded-xl px-4">
        <input
          placeholder="Add Your MCQ Here"
          maxLength={48}
          value={content.question}
          onChange={handleQuestionChange}
          onBlur={updateSlideInfo}
          className="placeholder-gray-500 w-[45vw] text-3xl py-2 focus:outline-none focus:ring-0"
        />
      </div>
      <ul className="py-8 space-y-5">
        {content.option.map((option, index) => (
          <li key={index}>
            <span className="border-black border border-dashed rounded-xl px-2 inline-block">
              <input
                placeholder={`Type Option ${index + 1}`}
                value={option}
                onChange={handleOptionChange(index)}
                onBlur={updateSlideInfo}
                className="placeholder-gray-500 py-1 w-[20vw] text-lg focus:outline-none focus:ring-0"
              />
            </span>
          </li>
        ))}
        {optionCount < 5 && (
          <li>
            <span className="border-black border border-dashed rounded-xl px-2 inline-block">
              <button
                className="text-gray-500 py-1 w-[20vw] text-lg text-left"
                onClick={addOption}
              >
                + Add another Option
              </button>
            </span>
          </li>
        )}
      </ul>
    </div>
    <div className="absolute right-2 bottom-2">
       <input type="number" value={content.marks}
                onChange={handleMarksChange()}
                onBlur={updateSlideInfo}
                 className="w-24 p-2 px-2 text-center text-xl rounded-full bg-[var(--secondary-color)] placeholder-white text-white focus:ring-0 focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" title="Marks" placeholder="Marks"/></div>
    </div>
  );
}
