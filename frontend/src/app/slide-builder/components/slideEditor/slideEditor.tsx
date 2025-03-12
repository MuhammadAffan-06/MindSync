
'use client';
import React from 'react';
import { Slide, SlideBaseProps, SlideType } from '@/app/slide-builder/types';

import SlidePlainText from "./slideTypes/slidePlainText"
import SlideWordCloud from "./slideTypes/slideWordCloud"
import SlideNotSelected from './slideTypes/slideNotSelected';
import SlideMCQ from './slideTypes/slideMCQ';
import { useSlide } from '../../slideContext';
import SlideTypeSelector from './slideTypes/slideTypeSelector';
import { CanvasProvider } from './slideCanvas/canvasContext';
import SlideDeletePopup from './slideTypes/slideDeletePopup';

const slideComponents: Record<SlideType, React.FC<SlideBaseProps>> = {
  PlainText: SlidePlainText,
  WordCloud: SlideWordCloud,
  Poll: SlidePlainText,
  QA: SlidePlainText,
  Image: SlidePlainText,
  MCQ: SlideMCQ,
  Undefined: SlideTypeSelector
};

const SlideTypeInvalid = (props: SlideBaseProps) => <div>Invalid Slide Type</div>


export default function SlideEditor() {

  console.log("Silde Editor Rendering..")
  const { activeSlideId, getActiveSlide } = useSlide();


  if (activeSlideId === 0) return (<SlideNotSelected />);

  const currentSlide: Slide | undefined = getActiveSlide();

  if (currentSlide === undefined) {
    throw new Error("Invalid Active Slide ID. activeSlideId: " + activeSlideId + " not found!");
  };
  let ActiveSlideComponent = slideComponents[currentSlide?.type] || SlideTypeInvalid;


  return (
    <div className="flex flex-grow flex-shrink basis-full bg-white rounded-lg">

      <ActiveSlideComponent id={currentSlide.id}  />
      <SlideDeletePopup/>
      {/* <div className="preview-container">
        <canvas ref={previewCanvasElementRef} />
      </div> */}
    </div>
    );
}