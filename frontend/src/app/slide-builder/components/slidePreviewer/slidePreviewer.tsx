"use client";
import { useSlide } from "@/app/context/slideContext";
import { Slide } from "../../../types/slideTypes";
// import SlideTypeSelector from "../slideEditor/slideTypes/slideTypeSelector";
import SlideTypeSelector from "@/app/components/slideEditor/slideTypes/slideTypeSelector";
import PreviewSlideMCQ from "./previewSlideTypes/previewSlideMCQ";
import PreviewSlidePlainText from "./previewSlideTypes/previewSlidePlainText";
import PreviewSlidePoll from "./previewSlideTypes/previewSlidePoll";
import PreviewSlideWordCloud from "./previewSlideTypes/previewSlideWordCloud";
import PreviewSlideImage from "./previewSlideTypes/previewSlideImage";
// interface PreviewSlideProps {
//   content: string;
// }

// const SlideTypeInvalid = (props: PreviewSlideProps) => <div>Invalid Slide Type</div>;

export default function SlidePreviewer() {
  console.log("Slide Previewer Rendering");

  const { getActiveSlide } = useSlide();
  const slide: Slide | undefined = getActiveSlide();

  if (slide === undefined) {
    throw new Error("Invalid Active Slide. Slide is undefined. ");
  }
  if (slide.type === "Undefined" || !slide.content)
    return (
      <div className="flex flex-grow flex-shrink basis-full bg-white rounded-lg">
        <SlideTypeSelector id={slide.clientId} />
      </div>
    );

  return (
    <div className="flex flex-grow flex-shrink basis-full bg-white rounded-lg">
      {slide.type == "PlainText" && <PreviewSlidePlainText content={slide.content} />}
      {slide.type == "MCQ" && <PreviewSlideMCQ content={slide.content} />}
      {slide.type == "Poll" && <PreviewSlidePoll content={slide.content} />}
      {slide.type == "WordCloud" && <PreviewSlideWordCloud content={slide.content} />}
      {slide.type == "Image" && <PreviewSlideImage content={slide.content}/>}
    </div>
  );
}

//-----------------------
