import { useEffect, useRef } from "react";
import { Canvas, Textbox } from "fabric";
import { useCanvas } from "./canvasContext";
import { Slide } from "@/app/slide-builder/types";
import { useSlide } from "@/app/slide-builder/slideContext";

interface SlideCanvasProps {
  slide: Slide;
}

export default function SlideCanvas({ slide }: SlideCanvasProps) {
  console.log("Slide Canvas Rendering...");
  const { canvas, setCanvas } = useCanvas();
  const canvasElementRef = useRef<HTMLCanvasElement | null>(null);
  const { updateActiveSlideInfo } = useSlide();

  useEffect(() => {
    console.log("Initializing Fabric.js canvas");

    if (!canvasElementRef.current) {
      throw new Error("Canvas element was not found!");
    }

    // Create Fabric.js canvas
    const fabricCanvas = new Canvas(canvasElementRef.current, {
      width: 1080,
      height: 510,
      preserveObjectStacking: true, // Keep object stacking order
    });

    fabricCanvas.backgroundColor = "#ffffff";
    fabricCanvas.renderAll();
    setCanvas(fabricCanvas);

    // Function to resize both the wrapper & canvas
    const resizeCanvas = () => {
      console.log("Resize event triggered");
      const outerCanvasContainer = canvasElementRef.current?.parentElement?.parentElement?.parentElement?.parentElement;
      console.log("OUTER CONTAINER IS ")
      console.log(outerCanvasContainer);
      if(!outerCanvasContainer) return;
     
      const ratio = fabricCanvas.getWidth() / fabricCanvas.getHeight();
      const containerWidth   = outerCanvasContainer.clientWidth;
      const containerHeight  = outerCanvasContainer.clientHeight;
      console.log("Container W: "+ containerWidth)
      console.log("Window W: "+window.innerWidth)
  
      const scale = containerWidth / fabricCanvas.getWidth();
      const zoom  = fabricCanvas.getZoom() * scale;
      fabricCanvas.setDimensions({width: containerWidth, height: containerWidth / ratio});
      fabricCanvas.setViewportTransform([zoom, 0, 0, zoom, 0, 0]);

      fabricCanvas.renderAll();
      
      
    };

    // Handle delete key press
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeObject = fabricCanvas.getActiveObject();
      if (e.key === "Delete" && activeObject) {
        if (activeObject instanceof Textbox && activeObject.isEditing) return;
        fabricCanvas.remove(activeObject);
      }
    };

    // Attach event listeners
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("keydown", handleKeyDown);

    // Initial resize
    resizeCanvas();

    // Cleanup function
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("keydown", handleKeyDown);
      fabricCanvas.dispose();
      setCanvas(null);
    };
  }, []); // Empty dependency array to ensure effect runs only once

  // Load content when canvas is available
  useEffect(() => {
    if (canvas) {
      console.log("Loading canvas from JSON...");
      canvas.loadFromJSON(slide.content, () => canvas.requestRenderAll());
    }
  }, [canvas, slide.content]); // Re-run if `canvas` or `slide.content` changes

  return (
    <div className="relative w-full h-full flex justify-center items-center overflow-hidden">
      <canvas ref={canvasElementRef} className="block w-full h-full"></canvas>
    </div>
  );
}
