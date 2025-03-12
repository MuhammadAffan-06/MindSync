"use client";

import React, { useId } from "react";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SlidePanelCard from "./slidePanelCard";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { useSlide } from "../../slide-builder/slideContext";

export default function SlidePanel() {
  console.log("Slide Panel Rendering..");

  const { slides, activeSlideId, setActiveSlideId, updateSlideIndex, addSlide } = useSlide();
  const dndContextId = useId();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onSlideDragStart = (event: DragStartEvent) => {
    if (event.active.id !== activeSlideId) {
      setActiveSlideId(event.active.id);
    }
  };

  const onSlideDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    updateSlideIndex(active.id, over.id);
  };

  return (
    <div className="flex flex-col flex-[1_1_20%] px-[10px] overflow-y-scroll overflow-x-hidden select-none scrollbar-thin mb-5  ">
      <h2 className="ml-2 pb-8 text-xl">Slides</h2>
      <DndContext
        id={dndContextId}
        sensors={sensors}
        modifiers={[restrictToParentElement]}
        onDragStart={onSlideDragStart}
        onDragEnd={onSlideDragEnd}
        autoScroll={true}
        collisionDetection={closestCorners}
      >
        <SortableContext items={slides.map((slide) => slide.id)} strategy={verticalListSortingStrategy}>
          {slides.map((slide, index) => (
            <SlidePanelCard slide={slide} index={index} key={slide.id} />
          ))}
        </SortableContext>
      </DndContext>
      <div
        className="flex flex-col items-center p-[10px] mb-[10px] bg-white rounded-lg h-27 cursor-pointer"
        onClick={() => addSlide()}
      >
        <div className="mr-2 text-6xl text-[var(--primary-color)]">+</div>
        <p className="text-sm font-medium text-[var(--primary-color)]">Add Slide</p>
      </div>
    </div>
  );
}
