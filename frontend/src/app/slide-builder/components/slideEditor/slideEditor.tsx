"use client";
import React from "react";
import { Slide } from "@/app/types/slideTypes";

// import SlidePlainText from "./slideTypes/slidePlainText"
import SlidePlainText from "@/app/components/slideEditor/slideTypes/slidePlainText";
import SlideWordCloud from "./slideTypes/slideWordCloud";
// import SlideNotSelected from './slideTypes/slideNotSelected';
import SlideNotSelected from "@/app/components/slideEditor/slideTypes/slideNotSelected";
// import SlideMCQ from './slideTypes/slideMCQ';
import SlideMCQ from "@/app/components/slideEditor/slideTypes/slideMCQ";
import SlideDeletePopup from "./slideTypes/slideDeletePopup";
// import SlideTypeSelector from './slideTypes/slideTypeSelector';
import SlideTypeSelector from "@/app/components/slideEditor/slideTypes/slideTypeSelector";
import { useSlide } from "@/app/context/slideContext";
import SlidePoll from "./slideTypes/slidePoll";

export default function SlideEditor() {
  console.log("Silde Editor Rendering..");
  const { activeSlideId, getActiveSlide } = useSlide();

  if (activeSlideId === 0) return <SlideNotSelected />;

  const slide: Slide | undefined = getActiveSlide();

  if (slide === undefined) {
    throw new Error(
      "Invalid Active Slide ID. activeSlideId: " + activeSlideId + " not found!"
    );
  }

  return (
    <div className="flex flex-grow flex-shrink basis-full bg-white rounded-lg">
      {slide.type === "PlainText" && <SlidePlainText id={slide.clientId} />}
      {slide.type === "MCQ" && <SlideMCQ id={slide.clientId} />}
      {slide.type === "WordCloud" && <SlideWordCloud id={slide.clientId} />}
      {slide.type === "Poll" && <SlidePoll id={slide.clientId} />}
      {slide.type === "Undefined" && <SlideTypeSelector id={slide.clientId} />}

      <SlideDeletePopup />
    </div>
  );
}
