"use client";

import { useSlide } from "@/app/context/slideContext";
import { Slide, SlideBaseProps } from "@/app/types/slideTypes";
import html2canvas from "html2canvas";
import React, { useEffect, useState, useRef } from "react";

export interface ContentProps {
  question: string;
  answers: string[];
  marks: number | ""; // allow empty string temporarily
}

export default function SlidePoll({ id }: SlideBaseProps) {
  console.log("Slide Poll Rendering");

  const { getActiveSlide, updateSlideInfoById } = useSlide();
  const slide: Slide | undefined = getActiveSlide();
  if (!slide) return <p>Invalid Slide Id, {id}</p>;

  const parseSlideContent = (slide: Slide): ContentProps => {
    const defaultContentProps: ContentProps = { question: "", answers: ["", ""], marks: "" };

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
  const [focusedAnswerIndex, setFocusedAnswerIndex] = useState<number | null>(null);

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
    setTimeout(updateSlideInfo, 0);
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
    const updatedAnswers = [...contentRef.current.answers];
    updatedAnswers[index] = e.target.value;
    const updatedContent = { ...contentRef.current, answers: updatedAnswers };
    contentRef.current = updatedContent;
    setContent(updatedContent);
  };

  const handleMarksChange = () => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = Number(value);

    const updatedContent = {
      ...contentRef.current,
      marks: value === "" ? "" : !Number.isNaN(numValue) ? numValue : contentRef.current.marks,
    };
    contentRef.current = updatedContent;
    setContent(updatedContent);
  };
  const deleteAnswer = (index: number) => {
    const updatedAnswers = contentRef.current.answers.filter((_, i) => i !== index);

    if (contentRef.current.answers[index] === correctAnswer) {
      setCorrectAnswer("Not Selected");
    }
    const updatedContent = {
      ...contentRef.current,
      answers: updatedAnswers,
    };
    contentRef.current = updatedContent;
    setContent(updatedContent);
    setAnswersCount(updatedAnswers.length);
    setFocusedAnswerIndex(null);

    setTimeout(updateSlideInfo, 0);
  };

  const addAnswers = () => {
    if (answersCount < 5) {
      const updatedAnswers = [...contentRef.current.answers, ""];
      const updatedContent = { ...contentRef.current, answers: updatedAnswers };
      contentRef.current = updatedContent;
      setContent(updatedContent);
      setAnswersCount(updatedAnswers.length);
      setFocusedAnswerIndex(null);
      setTimeout(updateSlideInfo, 0);
    }
  };

  return (
    <div className="relative w-full">
      <div className="px-8 py-12" ref={divRef}>
        <div className="border-black border border-dashed rounded-xl px-4 w-max">
          <input
            placeholder="Add Your Question Here"
            maxLength={80}
            size={content.question.length}
            value={content.question}
            onChange={handleQuestionChange}
            onBlur={updateSlideInfo}
            className="placeholder-gray-500 w-full text-md lg:w[60vw] lg:text-2xl py-2 focus:outline-none focus:ring-0"
          />
        </div>
        <ul className="p-8 space-y-5">
          {content.answers.map((answer, index) => (
            <li key={index}>
              <span
                className={`border rounded-xl px-2 inline-block ${
                  correctAnswer === answer ? "border-[var(--secondary-color)]" : "border-black border-dashed"
                }`}
              >
                <input
                  placeholder={`Type Answer ${index + 1}`}
                  value={answer}
                  maxLength={80}
                  size={answer.length}
                  onChange={handleAnswersChange(index)}
                  onBlur={(e) => {
                    setFocusedAnswerIndex(null);
                    setTimeout(updateSlideInfo, 0);
                  }}
                  onFocus={() => setFocusedAnswerIndex(index)}
                  className="placeholder-gray-500 py-1 w-full text-sm lg:w[60vw] lg:text-lg focus:outline-none focus:ring-0"
                />
              </span>

              {focusedAnswerIndex === index && (
                <span>
                  <button
                    hidden={answer == correctAnswer}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setCorrectAnswer(answer)}
                    className="ml-2 py-1 px-2 rounded bg-[var(--secondary-color)] text-white disabled:bg-gray-400"
                    title="Mark option as correct"
                  >
                    Mark
                  </button>

                  <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => deleteAnswer(index)}
                    className="ml-2 py-1 px-2 rounded bg-red-500 text-white"
                    title="Delete this answer"
                  >
                    X
                  </button>
                </span>
              )}
            </li>
          ))}
          {answersCount < 5 && (
            <li>
              <span className="border-black border border-dashed rounded-xl px-2 inline-block w-max">
                <button className="text-gray-500 py-1 w-full text-sm lg:w[60vw] lg:text-lg text-left" onClick={addAnswers}>
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
          value={content.marks === "" ? "" : content.marks}
          onChange={handleMarksChange()}
          onBlur={updateSlideInfo}
          min={0}
          placeholder="Marks"
          className="m-4 w-24 p-2 px-2 text-center text-xl rounded-full bg-[var(--secondary-color)] placeholder-white text-white focus:ring-0 focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          title="Marks"
        />
      </div>
    </div>
  );
}
