"use client";
import { useSlide } from "../../[presentationId]/slideContext";
import { Slide, SlideBaseProps, SlideType } from "../../[presentationId]/types";
import SlideTypeSelector from "../slideEditor/slideTypes/slideTypeSelector";
import PreviewSlideMCQ from "./previewSlideTypes/previewSlideMCQ";
import PreviewSlidePlainText from "./previewSlideTypes/previewSlidePlainText";

interface PreviewSlideProps {
  content: string;
}

const SlideTypeInvalid = (props: PreviewSlideProps) => <div>Invalid Slide Type</div>;


export default function SlidePreviewer() {
    console.log("Slide Previewer Rendering")
  
  const { getActiveSlide } = useSlide();
  const slide: Slide | undefined = getActiveSlide();

  if (slide === undefined) {
    throw new Error("Invalid Active Slide. Slide is undefined. ");
  }
  if(slide.type === "Undefined") return(  <div className="flex flex-grow flex-shrink basis-full bg-white rounded-lg">
     <SlideTypeSelector id={slide.clientId}/>
  </div>);
  if(!slide.content )return (<>No Content</>);

  return (
    <div className="flex flex-grow flex-shrink basis-full bg-white rounded-lg">

      {slide.type == "PlainText" && <PreviewSlidePlainText content={slide.content}/> }
      {slide.type == "MCQ" && <PreviewSlideMCQ content={slide.content}/> }
    </div>
  );
}

//-----------------------