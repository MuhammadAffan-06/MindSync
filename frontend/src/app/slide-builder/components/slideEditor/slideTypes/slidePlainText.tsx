"use client";

import { useSlide } from "@/app/slide-builder/slideContext";
import { Slide, SlideBaseProps } from "@/app/slide-builder/types";
import SlideCanvas from "../slideCanvas/slideCanvas";
import SlideToolbar from "../slideToolbar/slideToolbar";
import { ToolbarProvider } from "../slideToolbar/toolbarContext";
import { CanvasProvider } from "../slideCanvas/canvasContext";
import html2canvas from "html2canvas";
import { useEffect, useRef } from "react";
import { Canvas } from "fabric";

export default function SlidePlainText({ id }: SlideBaseProps) {
  console.log("Slide Plain Text Rendering..");
  const { getSlideById } = useSlide();
  const slide: Slide | undefined = getSlideById(id);
  if (!slide) return <p>Invalid Slide Id, {id}</p>;
  
  return (
    <div className="m-auto">
      <CanvasProvider>
        <ToolbarProvider>
          <SlideToolbar />
          <SlideCanvas slide={slide} />
        </ToolbarProvider>
      </CanvasProvider>
    </div>
  );
}
