"use client";

import React, { createContext, useContext, useRef, useState } from "react";
import { UniqueIdentifier } from "@dnd-kit/core";
import { toast } from "react-toastify";
import { arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import { Slide, SlideType } from "../types/slideTypes";
import { PresentationGetResponse } from "../types/presentationTypes";
import { apiRequest } from "../components/utils/api";

interface ISlideContext {
  slides: Slide[];
  addSlide: () => void;
  removeSlide: (id: UniqueIdentifier) => void;
  updateSlideIndex: (
    originalSlideId: UniqueIdentifier,
    newSlideId: UniqueIdentifier
  ) => void;
  getActiveSlide: () => Slide | undefined;
  activeSlideId: UniqueIdentifier;
  setActiveSlideId: (id: UniqueIdentifier) => void;
  setSlideType: (id: UniqueIdentifier, type: SlideType) => void;
  getSlideById: (id: UniqueIdentifier) => Slide | undefined;
  updateSlideInfoById: (
    id: UniqueIdentifier,
    content: string,
    thumbnailUrl: string,
    correctAnswer?: string
  ) => void;
  presentationNameRef: React.MutableRefObject<string>;
  presentationId: string;
  saveSlidesToDB: () => Promise<boolean>;
  joinCode: string;
  slidesUpdated: boolean;
}

const SlideContext = createContext<ISlideContext | undefined>(undefined);

interface SlideProviderProps {
  children: React.ReactNode;
  presentationDataRef: React.MutableRefObject<PresentationGetResponse | null>;
}

export function SlideProvider({
  children,
  presentationDataRef,
}: SlideProviderProps) {
  if (!presentationDataRef.current) return;
  const [slides, setSlides] = useState<Slide[]>(
    presentationDataRef.current.slideIds
  );
  /* if  activeSlideId === 0 then => no slide is active. Show slideNotSelected instead*/
  /* else if its string then it must be id of particular slide, so show that slide*/
  const [activeSlideId, setActiveSlideId] = useState<UniqueIdentifier>(
    slides.length === 0 ? 0 : slides[0].clientId
  );
  const presentationId = presentationDataRef.current._id;
  const presentationNameRef: React.MutableRefObject<string> = useRef(
    presentationDataRef.current.title
  );
  const joinCode: string = presentationDataRef.current.joinCode;
  const [slidesUpdated,setSlidesUpdated] = useState<boolean>(false)
  const addSlide = () => {
    if (getActiveSlide()?.type === "Undefined") return;

    const newSlide: Slide = {
      clientId: uuidv4(),
      content: null,
      type: "Undefined",
      correctAnswer: null,
    };
    setSlides((prev) => [...prev, newSlide]);
    if(!slidesUpdated) setSlidesUpdated(true)
    setActiveSlideId(newSlide.clientId);
  };

  const removeSlide = (id: UniqueIdentifier) => {
    toast.success("Slide Deleted!", { autoClose: 1000 });
    setSlides((prev) => {
      const newSlides = prev.filter((slide) => slide.clientId !== id);
      if (activeSlideId === id) {
        setActiveSlideId(newSlides.length > 0 ? newSlides[0].clientId : 0);
      }
      return newSlides;
    });
    if(!slidesUpdated) setSlidesUpdated(true)
  };

  const getSlideById = (id: UniqueIdentifier) =>
    slides.find((slide) => slide.clientId === id);

  const updateSlideIndex = (
    originalSlideId: UniqueIdentifier,
    newSlideId: UniqueIdentifier
  ) => {
    setSlides((prev) => {
      const originalSlideIndex = prev.findIndex(
        (slide) => slide.clientId === originalSlideId
      );
      const newSlideIndex = prev.findIndex(
        (slide) => slide.clientId === newSlideId
      );
      if (originalSlideIndex === -1 || newSlideIndex === -1) return prev;
      return arrayMove(prev, originalSlideIndex, newSlideIndex);
    });
    if(!slidesUpdated) setSlidesUpdated(true)
  };

  const setSlideType = (id: UniqueIdentifier, type: SlideType) => {
    setSlides((prev) => {
      const index = prev.findIndex((slide) => slide.clientId === id);
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
    return slides.find((slide) => slide.clientId === activeSlideId);
  };

  const updateSlideInfoById = (
    id: UniqueIdentifier,
    content: string,
    thumbnailUrl: string = "",
    correctAnswer?: string | null
  ) => {
    setSlides((prev) => {
      const index = prev.findIndex((slide) => slide.clientId === id);
      if (index === -1) return prev;
      const updatedSlide = { ...prev[index], content };
      if (correctAnswer) updatedSlide.correctAnswer = correctAnswer;
      if (thumbnailUrl != "") updatedSlide.thumbnailUrl = thumbnailUrl;
      const newSlides = [...prev];
      newSlides[index] = updatedSlide;
      return newSlides;
    });
    if(!slidesUpdated) setSlidesUpdated(true)
  };

  const saveSlidesToDB = async () => {
    
    if(!slidesUpdated) {
      toast.warn("Slides are already saved!")
      return false
    }
      setSlidesUpdated(false)
    const { success } = await apiRequest("/presentation/save", {
      presentationId,
      presentationTitle: presentationNameRef.current,
      slides: slides.filter((slide) => slide.content),
    });
    if (success) {
      toast.success("Slides Saved!");
    }

    return success;
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
        updateSlideInfoById,
        presentationNameRef,
        presentationId,
        saveSlidesToDB,
        joinCode,
        slidesUpdated
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
