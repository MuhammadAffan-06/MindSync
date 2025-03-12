"use client";

import { createContext, useContext, useState } from "react";
import { Canvas } from "fabric";
import { useSlide } from "@/app/slide-builder/slideContext";

interface ICanvasContext {
  canvas: Canvas | null;
  setCanvas: (canvas: Canvas | null) => void;
}

interface CanvasProviderProps {
  children: React.ReactNode;
}

const CanvasContext = createContext<ICanvasContext | undefined>(undefined);

export function CanvasProvider({ children }: CanvasProviderProps) {
  const { getActiveSlide } = useSlide();
  const [canvas, setCanvasValue] = useState<Canvas | null>(null);

  const setCanvas = (canvas: Canvas | null) => {
    setCanvasValue(canvas);
  };

  return <CanvasContext.Provider value={{ canvas, setCanvas }}>{children}</CanvasContext.Provider>;
}

export function useCanvas() {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error("useCanvas must be used within a CanvasProvider");
  }
  return context;
}
