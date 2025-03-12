"use client";

import React, { createContext, useContext, useMemo, useRef, useState } from "react";
import { Slide, SlideType } from "./types";
import { UniqueIdentifier } from "@dnd-kit/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { arrayMove } from "@dnd-kit/sortable";

interface ISlideContext {
  slides: Slide[];
  addSlide: () => void;
  removeSlide: (id: UniqueIdentifier) => void;
  updateSlideIndex: (originalSlideId: UniqueIdentifier, newSlideId: UniqueIdentifier) => void;
  getActiveSlide: () => Slide | undefined;
  activeSlideId: UniqueIdentifier;
  setActiveSlideId: (id: UniqueIdentifier) => void;
  setSlideType: (id: UniqueIdentifier, type: SlideType) => void;
  getSlideById: (id: UniqueIdentifier) => Slide | undefined;
  updateActiveSlideInfo: ( content: string, thumbnailUrl: string) => void;
  presentationNameRef: React.MutableRefObject<string>;
  presentationId: string
}

const SlideContext = createContext<ISlideContext | undefined>(undefined);

interface SlideProviderProps {
  children: React.ReactNode;
}

export function SlideProvider({ children }: SlideProviderProps) {
  const [slides, setSlides] = useState<Slide[]>([]);
  /* if  activeSlideId === 0 then => no slide is active. Show slideNotSelected instead*/
  /* else if its string then it must be id of particular slide, so show that slide*/
  const [activeSlideId, setActiveSlideId] = useState<UniqueIdentifier>(0);
  const presentationId = useMemo(() => crypto.randomUUID(), []); 
  const presentationNameRef:React.MutableRefObject<string> = useRef("Untitled Presentation");
  const addSlide = () => {
    if (getActiveSlide()?.type === "Undefined") return;
    const newSlide: Slide = {
      id: crypto.randomUUID(),
      content: JSON.stringify(''),
      type: "Undefined",
    };
    setActiveSlideId(newSlide.id);
    setSlides((prev) => [...prev, newSlide]);
  };

  const removeSlide = (id: UniqueIdentifier) => {
    toast.success("Slide Deleted!", { autoClose: 1000 });
    setSlides((prev) => {
      const newSlides = prev.filter((slide) => slide.id !== id);
      if (activeSlideId === id) {
        setActiveSlideId(newSlides.length > 0 ? newSlides[0].id : 0);
      }
      return newSlides;
    });
  };

  const getSlideById = (id: UniqueIdentifier) =>
    slides.find((slide) => slide.id === id);

  const updateSlideIndex = (originalSlideId: UniqueIdentifier, newSlideId: UniqueIdentifier) => {
    setSlides((prev) => {
      const originalSlideIndex = prev.findIndex((slide) => slide.id === originalSlideId);
      const newSlideIndex = prev.findIndex((slide) => slide.id === newSlideId);
      if (originalSlideIndex === -1 || newSlideIndex === -1) return prev;
      return arrayMove(prev, originalSlideIndex, newSlideIndex);
    });
  };

  const setSlideType = (id: UniqueIdentifier, type: SlideType) => {
    setSlides((prev) => {
      const index = prev.findIndex((slide) => slide.id === id);
      if (index === -1) {
        console.error("Invalid Slide Id for setSlideType. Got " + id);
        return prev;
      }
      const updatedSlide = { ...prev[index], type };
      const newSlides = [...prev];
      newSlides[index] = updatedSlide;
      return newSlides;
    });
  };

  const getActiveSlide = (): Slide | undefined => {
    if (activeSlideId === 0) return undefined;
    return slides.find((slide) => slide.id === activeSlideId);
  };

  const updateActiveSlideInfo = (content: string, thumbnailUrl: string) => {
    setSlides((prev) => {
      const index = prev.findIndex((slide) => slide.id === activeSlideId);
      if (index === -1) return prev;
      const updatedSlide = { ...prev[index], content, thumbnailUrl };
      const newSlides = [...prev];
      newSlides[index] = updatedSlide;
      return newSlides;
    });
  };

  return (
    <SlideContext.Provider
      value={{
        slides,
        addSlide,
        removeSlide,
        updateSlideIndex,
        getActiveSlide,
        activeSlideId,
        setActiveSlideId,
        setSlideType,
        getSlideById,
        updateActiveSlideInfo,
        presentationNameRef,
        presentationId
      }}
    >
      {children}
    </SlideContext.Provider>
  );
}

export function useSlide() {
  const context = useContext(SlideContext);
  if (!context) {
    throw new Error("useSlide must be used within a SlideProvider");
  }
  return context;
}
