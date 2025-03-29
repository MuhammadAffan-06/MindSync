import React, { useEffect, useState } from "react";
import { Slide } from "../../../../types/slideTypes";
import { useSlide } from "@/app/context/slideContext";




export default function SlideDeletePopup() {
  const { activeSlideId, getActiveSlide, removeSlide } = useSlide();
  const [visible, setVisibility] = useState<boolean>(false);


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const activeSlide: Slide | undefined = getActiveSlide();
      if (event.key === 'Delete' && event.ctrlKey && activeSlide !== undefined) {
        if (activeSlide.type == "Undefined") removeSlide(activeSlide.clientId);
        else setVisibility(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeSlideId]);
  const onBack = () => setVisibility(false);
  const onDelete = () => {
    removeSlide(activeSlideId);
    setVisibility(false);
  }
  return (
    <div className={`absolute flex left-0 top-0 w-screen h-screen select-none ${visible ? "block" : "hidden"}`}>
      <div className="fixed left-0 top-0 w-screen h-screen z-20 bg-black opacity-20 cursor-pointer" onClick={onBack}></div>
      <div className="m-auto flex flex-col w-[30vw] h-[30vh] bg-white z-50 shadow-lg rounded-lg p-4">
        <div className="text-lg text-center m-auto ">
          Are you sure you want to delete this slide? This action cannot be undone.
        </div>
        <div className="flex justify-center gap-12 text-white">
          <button className="p-4 bg-red-500 rounded-md hover:translate-y-[-1px]" onClick={onDelete}>Delete</button>
          <button className="p-4 bg-[var(--secondary-color)] rounded-md hover:translate-y-[-1px]" onClick={onBack}>Back</button>

        </div>
      </div>


    </div>);
}