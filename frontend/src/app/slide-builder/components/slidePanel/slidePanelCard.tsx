"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useSlide } from "@/app/slide-builder/[presentationId]/slideContext";
import { Slide } from "@/app/slide-builder/[presentationId]/types";

interface SlidePanelCardProps {
  index: number;
  slide: Slide;
}

export default function SlidePanelCard({ slide, index }: SlidePanelCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: slide.clientId });
  const { activeSlideId } = useSlide();
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const activeClasses = `border border-[var(--secondary-color)] border-2`;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`p-1 mb-[10px] h-27 rounded-lg bg-white cursor-pointer ${
        slide.clientId === activeSlideId ? activeClasses : ""
      }`}
    >
      <div className="w-full h-full">
        <img
          className="w-full h-[96px]"
          src={slide.thumbnailUrl || "/default-thumbnail.svg"}
          alt={`Slide ${index + 1}`}
        />
      </div>
    </div>
  );
}
