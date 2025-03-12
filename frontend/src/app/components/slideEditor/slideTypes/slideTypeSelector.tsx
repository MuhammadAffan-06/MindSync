'use client';
import { useSlide } from "@/app/slide-builder/slideContext";
import { SlideBaseProps, SlideType } from "@/app/slide-builder/types";
import Image from "next/image";

interface ButtonInfo {
  icon: string,
  label: string,
  type: SlideType
}
export default function SlideTypeSelector({ id }: SlideBaseProps) {
  const buttonArray: ButtonInfo[] = [
    { icon: "/icons/poll-icon.svg", label: "Poll", type: "Poll" },
    { icon: "/icons/wordcloud-icon.svg", label: "Word Cloud", type: "WordCloud" },
    { icon: "/icons/qa-icon.svg", label: "Q&A", type: "QA" },
    { icon: "/icons/text-icon.svg", label: "Plain Text", type: "PlainText" },
    { icon: "/icons/image-icon.svg", label: "Add Image", type: "Image" },
    { icon: "/icons/mcq-icon.svg", label: "MCQ", type: "MCQ" }
  ];
  const { setSlideType } = useSlide();
  return (<>

    <div className='grid grid-cols-3 grid-rows-2 m-auto h-2/3 rounded-3xl w-1/2 text-center items-center bg-[var(--background)] align-middle justify-center '>
      {buttonArray.map((item, index) => (
        <div key={index}
          onClick={() => setSlideType(id, item.type)}
          className="flex
            flex-col
            items-center
            cursor-pointer
            hover:translate-y-[-1px]
            justify-center">
          <Image src={item.icon} width={40} height={40} title={item.label} alt={item.label} className="w-24 h-24 p-6 rounded-xl bg-gradient-to-b from-[var(--secondary-color)] to-[#4830E2]" />
          <div className="pt-2">{item.label}</div>
        </div>
      ))}
    </div>
  </>);
}