"use client";

import { useSlide } from "@/app/context/slideContext";
import { Slide, SlideBaseProps } from "@/app/types/slideTypes";
import html2canvas from "html2canvas";
import React, { useEffect, useState, useRef } from "react";
import ReactWordcloud, { Optional, OptionsProp } from "react-wordcloud";

export interface ContentProps {
  question: string;
}

export default function SlideWordCloud({ id }: SlideBaseProps) {
  console.log("Slide Word Cloud Rendering");

  const { activeSlideId, getActiveSlide, updateSlideInfoById } = useSlide();
  const slide: Slide | undefined = getActiveSlide();
  if (!slide) return <p>Invalid Slide Id, {id}</p>;
  const parseSlideContent = (slide: Slide): ContentProps => {
    const defaultContentProps: ContentProps = { question: "" };

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
  const contentRef = useRef<ContentProps>(content);

  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!slide) return;
    const newContent = parseSlideContent(slide);
    setContent(newContent);
    contentRef.current = newContent;
  }, [id]);

  const updateSlideInfo = () => {
    if (divRef.current) {
      html2canvas(divRef.current, { scale: 0.5 }).then((canvas) => {
        updateSlideInfoById(id, JSON.stringify(contentRef.current), canvas.toDataURL("image/webp", 0.2));
      });
    }
  };
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedContent = { question: e.target.value };
    contentRef.current = updatedContent;
    setContent(updatedContent);
  };

  return (
    <div className="relative w-full">
      <div className="px-8 py-12 flex flex-col flex-1_1_100% h-full" ref={divRef}>
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
        <div className="flex-1_1_100% h-full ">
          {/*Pre-built svg is used here instead of react word cloud component to avoid unessary computation and re rendering on every keystroke (due to content.question state update)*/}
          <svg height="367" width="1018.1875" style={{ width: "100%", height: "100%", display:"block",opacity:0.5 }} viewBox="0 0 1018.1875 367">
            <g transform="translate(509.09375, 183.5)">
              <text
                cursor="default"
                fill="rgb(227, 119, 194)"
                fontFamily="Poppins"
                fontStyle="normal"
                fontWeight="500"
                textAnchor="middle"
                transform="translate(-21, 10)"
                fontSize="73px"
              >
                Option 19
              </text>
              <text
                cursor="default"
                fill="rgb(188, 189, 34)"
                fontFamily="Poppins"
                fontStyle="normal"
                fontWeight="500"
                textAnchor="middle"
                transform="translate(-86, 72)"
                fontSize="71px"
              >
                Option 18
              </text>
              <text
                cursor="default"
                fill="rgb(23, 190, 207)"
                fontFamily="Poppins"
                fontStyle="normal"
                fontWeight="500"
                textAnchor="middle"
                transform="translate(-253, -49)"
                fontSize="69px"
              >
                Option 17
              </text>
              <text
                cursor="default"
                fill="rgb(23, 190, 207)"
                fontFamily="Poppins"
                fontStyle="normal"
                fontWeight="500"
                textAnchor="middle"
                transform="translate(9, -104)"
                fontSize="68px"
              >
                Option 16
              </text>
              <text
                cursor="default"
                fill="rgb(227, 119, 194)"
                fontFamily="Poppins"
                fontStyle="normal"
                fontWeight="500"
                textAnchor="middle"
                transform="translate(243, -53)"
                fontSize="66px"
              >
                Option 15
              </text>
              <text
                cursor="default"
                fill="rgb(188, 189, 34)"
                fontFamily="Poppins"
                fontStyle="normal"
                fontWeight="500"
                textAnchor="middle"
                transform="translate(-301, -123)"
                fontSize="64px"
              >
                Option 14
              </text>
              <text
                cursor="default"
                fill="rgb(44, 160, 44)"
                fontFamily="Poppins"
                fontStyle="normal"
                fontWeight="500"
                textAnchor="middle"
                transform="translate(286, 28)"
                fontSize="62px"
              >
                Option 13
              </text>
              <text
                cursor="default"
                fill="rgb(227, 119, 194)"
                fontFamily="Poppins"
                fontStyle="normal"
                fontWeight="500"
                textAnchor="middle"
                transform="translate(-254, 121)"
                fontSize="59px"
              >
                Option 12
              </text>
              <text
                cursor="default"
                fill="rgb(214, 39, 40)"
                fontFamily="Poppins"
                fontStyle="normal"
                fontWeight="500"
                textAnchor="middle"
                transform="translate(313, -112)"
                fontSize="57px"
              >
                Option 11
              </text>
              <text
                cursor="default"
                fill="rgb(127, 127, 127)"
                fontFamily="Poppins"
                fontStyle="normal"
                fontWeight="500"
                textAnchor="middle"
                transform="translate(249, 85)"
                fontSize="55px"
              >
                Option 10
              </text>
              <text
                cursor="default"
                fill="rgb(23, 190, 207)"
                fontFamily="Poppins"
                fontStyle="normal"
                fontWeight="500"
                textAnchor="middle"
                transform="translate(302, 126)"
                fontSize="52px"
              >
                Option 9
              </text>
              <text
                cursor="default"
                fill="rgb(127, 127, 127)"
                fontFamily="Poppins"
                fontStyle="normal"
                fontWeight="500"
                textAnchor="middle"
                transform="translate(-308, 5)"
                fontSize="50px"
              >
                Option 8
              </text>
              <text
                cursor="default"
                fill="rgb(227, 119, 194)"
                fontFamily="Poppins"
                fontStyle="normal"
                fontWeight="500"
                textAnchor="middle"
                transform="translate(-366, 71)"
                fontSize="47px"
              >
                Option 7
              </text>
              <text
                cursor="default"
                fill="rgb(140, 86, 75)"
                fontFamily="Poppins"
                fontStyle="normal"
                fontWeight="500"
                textAnchor="middle"
                transform="translate(-14, 110)"
                fontSize="44px"
              >
                Option 6
              </text>
              <text
                cursor="default"
                fill="rgb(31, 119, 180)"
                fontFamily="Poppins"
                fontStyle="normal"
                fontWeight="500"
                textAnchor="middle"
                transform="translate(-8, -51)"
                fontSize="41px"
              >
                Option 5
              </text>
              <text
                cursor="default"
                fill="rgb(23, 190, 207)"
                fontFamily="Poppins"
                fontStyle="normal"
                fontWeight="500"
                textAnchor="middle"
                transform="translate(33, 140)"
                fontSize="37px"
              >
                Option 4
              </text>
              <text
                cursor="default"
                fill="rgb(255, 127, 14)"
                fontFamily="Poppins"
                fontStyle="normal"
                fontWeight="500"
                textAnchor="middle"
                transform="translate(-199, 148)"
                fontSize="33px"
              >
                Option 3
              </text>
              <text
                cursor="default"
                fill="rgb(140, 86, 75)"
                fontFamily="Poppins"
                fontStyle="normal"
                fontWeight="500"
                textAnchor="middle"
                transform="translate(219, -29)"
                fontSize="28px"
              >
                Option 2
              </text>
              <text
                cursor="default"
                fill="rgb(23, 190, 207)"
                fontFamily="Poppins"
                fontStyle="normal"
                fontWeight="500"
                textAnchor="middle"
                transform="translate(173, 147)"
                fontSize="22px"
              >
                Option 1
              </text>
              <text
                cursor="default"
                fill="rgb(31, 119, 180)"
                fontFamily="Poppins"
                fontStyle="normal"
                fontWeight="500"
                textAnchor="middle"
                transform="translate(126, 23)"
                fontSize="7px"
              >
                Option 0
              </text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
