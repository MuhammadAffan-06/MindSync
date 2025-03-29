"use client";

import { useSlide } from "@/app/context/slideContext";
import { Slide, SlideBaseProps } from "@/app/types/slideTypes";
import html2canvas from "html2canvas";
import React, { useEffect, useState, useRef, useCallback } from "react";

export interface ContentProps {
  question: string;
  answers: string[];
  marks: number;
}

export default function SlidePoll({ id }: SlideBaseProps) {
    console.log("Slide Poll Rendering")
  
  const { activeSlideId, getActiveSlide, updateSlideInfoById } = useSlide();
  const slide: Slide | undefined = getActiveSlide();
  if (!slide) return <p>Invalid Slide Id, {id}</p>;
  const parseSlideContent = (slide: Slide): ContentProps => {
    const defaultContentProps: ContentProps = { question: "", answers: ["", ""], marks: 0 };

    try {
      if (slide.content) {
        const parsed = JSON.parse(slide.content);
        return parsed === "" ? defaultContentProps : parsed;
      } else return defaultContentProps;
    } catch {
      return defaultContentProps;
    }
  };

  const [content, setContent] = useState<ContentProps>(() => parseSlideContent(slide));
  const [correctAnswer, setCorrectAnswer] = useState<string>(slide.correctAnswer || "Not Selected");
  const contentRef = useRef<ContentProps>(content);
  const [answersCount, setAnswersCount] = useState(content.answers.length);

  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!slide) return;
    const newContent = parseSlideContent(slide);
    setContent(newContent);
    setCorrectAnswer(slide.correctAnswer || "Not Selected");
    contentRef.current = newContent;
    setAnswersCount(newContent.answers.length);
  }, [id]);

  useEffect(() => {
    updateSlideInfo();
  }, [correctAnswer]);

  const updateSlideInfo = () => {
    if (divRef.current) {
      html2canvas(divRef.current, { scale: 0.5 }).then((canvas) => {
        updateSlideInfoById(id, JSON.stringify(contentRef.current), canvas.toDataURL("image/webp", 0.2), correctAnswer);
      });
    }
  };
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedContent = { ...contentRef.current, question: e.target.value };
    contentRef.current = updatedContent;
    setContent(updatedContent);
  };
  const handleAnswersChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedAnswerss = [...contentRef.current.answers];
    updatedAnswerss[index] = e.target.value;
    const updatedContent = { ...contentRef.current, answers: updatedAnswerss };
    contentRef.current = updatedContent;
    setContent(updatedContent);
  };
  const handleMarksChange = () => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number.isNaN(e.target.valueAsNumber)) return;
    const updatedContent = { ...contentRef.current, marks: e.target.valueAsNumber };
    contentRef.current = updatedContent;
    setContent(updatedContent);
  };
  const addAnswers = () => {
    if (answersCount < 5) {
      const updatedAnswerss = [...contentRef.current.answers, ""];
      const updatedContent = { ...contentRef.current, answers: updatedAnswerss };
      contentRef.current = updatedContent;
      setContent(updatedContent);
      setAnswersCount(updatedAnswerss.length);
      updateSlideInfo();
    }
  };

  const onAnswerInputRightClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    setCorrectAnswer(e.currentTarget.value);
  };
  return (
    <div className="relative w-full">
      <div className="px-8 py-12" ref={divRef}>
        <div className="border-black border border-dashed rounded-xl px-4 w-min">
          <input
            placeholder="Add Your Question Here"
            maxLength={48}
            value={content.question}
            onChange={handleQuestionChange}
            onBlur={updateSlideInfo}
            className="placeholder-gray-500 w-[45vw] text-3xl py-2 focus:outline-none focus:ring-0"
          />
        </div>
        <ul className="p-8 space-y-5">
          {content.answers.map((answers, index) => (
            <li key={index}>
              <span
                className={`border rounded-xl px-2 inline-block ${correctAnswer === answers ? "border-lime-500 border-solid" : "border-black border-dashed"}`}
              >
                <input
                  placeholder={`Type Answers ${index + 1}`}
                  value={answers}
                  onChange={handleAnswersChange(index)}
                  onContextMenu={(e) => onAnswerInputRightClick(e)}
                  onBlur={updateSlideInfo}
                  className="placeholder-gray-500 py-1 w-[20vw] text-lg focus:outline-none focus:ring-0"
                />
              </span>
            </li>
          ))}
          {answersCount < 5 && (
            <li>
              <span className="border-black border border-dashed rounded-xl px-2 inline-block">
                <button className="text-gray-500 py-1 w-[20vw] text-lg text-left" onClick={addAnswers}>
                  + Add another Answers
                </button>
              </span>
            </li>
          )}
        </ul>
      </div>
      <div className="absolute right-2 bottom-2">
        <input
          type="number"
          value={content.marks}
          onChange={handleMarksChange()}
          onInput={updateSlideInfo}
          min={0}
          className="m-4 w-24 p-2 px-2 text-center text-xl rounded-full bg-[var(--secondary-color)] placeholder-white text-white focus:ring-0 focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          title="Marks"
          placeholder="Marks"
        />
      </div>
    </div>
  );
}
