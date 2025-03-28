'use client';

import { useSlide } from "@/app/slide-builder/[presentationId]/slideContext";
import { Slide, SlideBaseProps } from "@/app/slide-builder/[presentationId]/types";
import React, { useEffect, useState, useRef, useCallback } from "react";
import ReactWordcloud from "react-wordcloud";
import io from "socket.io-client";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

export interface WordCloudContentProps {
  question: string;
  words: { text: string; value: number }[];
}

const socket = io("http://localhost:5000"); // Replace with actual backend URL

export default function SlideWordCloud({ id }: SlideBaseProps) {
  console.log("Slide WordCloud Rendering");

  const { getActiveSlide, updateSlideInfoById } = useSlide();
  const slide: Slide | undefined = getActiveSlide();
  if (!slide) return <p>Invalid Slide Id, {id}</p>;

  const parseSlideContent = (slide: Slide): WordCloudContentProps => {
    const defaultContentProps: WordCloudContentProps = { question: "", words: [] };
    try {
      return slide.content ? JSON.parse(slide.content) : defaultContentProps;
    } catch {
      return defaultContentProps;
    }
  };

  const [content, setContent] = useState<WordCloudContentProps>(() => parseSlideContent(slide));
  const contentRef = useRef<WordCloudContentProps>(content);

  useEffect(() => {
    if (!slide) return;
    const newContent = parseSlideContent(slide);
    setContent(newContent);
    contentRef.current = newContent;
  }, [id, slide]);

  useEffect(() => {
    socket.on("newWord", (word: string) => {
      setContent((prevContent) => {
        const updatedWords = [...prevContent.words];
        const existingWord = updatedWords.find((w) => w.text === word);

        if (existingWord) {
          existingWord.value += 1;
        } else {
          updatedWords.push({ text: word, value: 1 });
        }

        const newContent = { ...prevContent, words: updatedWords };
        contentRef.current = newContent;
        updateSlideInfo(); // Persist changes in slide context
        return newContent;
      });
    });

    return () => {
      socket.off("newWord");
    };
  }, []);

  const updateSlideInfo = useCallback(() => {
    updateSlideInfoById(id, JSON.stringify(contentRef.current), "", "");
  }, [id, updateSlideInfoById]);

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedContent = { ...contentRef.current, question: e.target.value };
    contentRef.current = updatedContent;
    setContent(updatedContent);
  };

  return (
    <div className="relative w-full">
      <div className="px-8 py-12">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Word Cloud</h2>
          <input
            type="text"
            value={content.question}
            onChange={handleQuestionChange}
            onBlur={updateSlideInfo}
            className="border rounded px-3 py-2 w-full text-center mb-4"
            placeholder="Enter question here..."
          />
          <div className="h-96 w-full">
            <ReactWordcloud
              words={content.words}
              options={{
                rotations: 2,
                rotationAngles: [-45, 45] as [number, number],
                fontSizes: [20, 60],
                fontFamily: "sans-serif",
                padding: 5,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
