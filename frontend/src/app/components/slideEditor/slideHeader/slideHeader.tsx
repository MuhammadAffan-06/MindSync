import { useSlide } from "@/app/slide-builder/slideContext";
import { ChangeEvent, useState } from "react";

export default function SlideHeader() {
  const { presentationNameRef } = useSlide();

  const onPresentationNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value == "") presentationNameRef.current = e.currentTarget.placeholder;
    else presentationNameRef.current = e.currentTarget.value;
  };
  return (
    <div className="mt-[60px] h-[60px] p-1 flex">
      <span className="flex-[1_1_100%] h-full flex ml-4">
        <input type="text" className="placeholder-[#414141] text-[#414141] focus:ring-0 focus:outline-none text-3xl" placeholder={presentationNameRef.current} onChange={(e) => onPresentationNameChange(e)} />
      </span>
      <span className="flex p-1 space-x-2">
      <button className="text-[var(--secondary-color)] bg-[var(--background)] rounded-full px-8">Share</button>
      <button className="text-[var(--secondary-color)] border-2 border-[var(--secondary-color)] rounded-full px-8">Preview</button>
        <button className="text-white bg-[var(--secondary-color)] rounded-full px-8">Present</button>
      </span>
    </div>
  );
}
