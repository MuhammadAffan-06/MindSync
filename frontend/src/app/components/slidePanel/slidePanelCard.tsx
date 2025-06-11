"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Slide } from "@/app/types/slideTypes";
import { useSlide } from "@/app/context/slideContext";
import { BsXCircleFill } from "react-icons/bs";
import SlideDeletePopup from "./slideDeletePopup";
import { useState } from "react";

interface SlidePanelCardProps {
  index: number;
  slide: Slide;
}

export default function SlidePanelCard({ slide, index }: SlidePanelCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: slide.clientId });
  const { activeSlideId } = useSlide();
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const activeClasses = `border border-[var(--secondary-color)] border-2`;

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={`p-1 mb-[10px] h-27 rounded-lg bg-white ${
          slide.clientId === activeSlideId ? activeClasses : ""
        }`}
      >
        <div className="w-full h-full relative">
          <button
            className="absolute right-0 z-10"
            onClick={(e) => {
              e.stopPropagation();
              setShowDeletePopup(true);
            }}
          >
            <BsXCircleFill size={16} color="var(--secondary-color)" />
          </button>

          <img
            className="w-full h-[96px] cursor-pointer"
            src={slide.thumbnailUrl || "/default-thumbnail.svg"}
            alt={`Slide ${index + 1}`}
            {...attributes}
            {...listeners} 
          />
        </div>
      </div>

      {showDeletePopup && (
        <SlideDeletePopup
          id={slide.clientId}
          setShowDeletePopup={setShowDeletePopup}
        />
      )}
    </>
  );
}
