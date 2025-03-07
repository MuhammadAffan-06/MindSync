// src/app/slide-builder/page.tsx
'use client';
import Nav from "@/app/components/nav/nav";
import React, { useState, useEffect, useRef } from 'react';
import '@/app/slide-builder/slide-builder.css';
import * as fabric from 'fabric';
import Toolbar from './Toolbar';

interface Slide {
  id: string;
  content: string;
  thumbnailUrl?: string;
}

export default function SlideBuilder() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);
  const mainCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewCanvasElementRef = useRef<HTMLCanvasElement | null>(null);
  const mainFabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const previewFabricCanvasRef = useRef<fabric.StaticCanvas | null>(null);

  // Text tool state and handlers
  const [textOptions, setTextOptions] = useState({
    fontFamily: 'Arial',
    fontSize: 24,
    fillColor: '#000000',
    strokeColor: '#000000',
    strokeWidth: 1,
  });

  const handleAddText = () => {
    const canvas = mainFabricCanvasRef.current!;
    const text = new fabric.Textbox('Click to edit', {
      left: canvas.width / 2,
      top: canvas.height / 2,
      fontFamily: textOptions.fontFamily,
      fontSize: textOptions.fontSize,
      fill: textOptions.fillColor,
      stroke: textOptions.strokeColor,
      strokeWidth: textOptions.strokeWidth,
      textAlign: 'center',
      lockRotation: true,
    });
  
    canvas.add(text);
    canvas.setActiveObject(text);
    (text as any).enterEditing(); // ✅ Correct method call
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTextOptions(prev => ({ ...prev, fontFamily: e.target.value }));
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextOptions(prev => ({
      ...prev,
      fontSize: parseInt(e.target.value, 10),
    }));
  };

  const handleFillColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextOptions(prev => ({ ...prev, fillColor: e.target.value }));
  };

  useEffect(() => {
    if (!mainCanvasRef.current || !previewCanvasElementRef.current) return;
  
    if (mainFabricCanvasRef.current) mainFabricCanvasRef.current.dispose();
    if (previewFabricCanvasRef.current) previewFabricCanvasRef.current.dispose();
  
    const mainCanvas = new fabric.Canvas(mainCanvasRef.current, { width: 1040, height: 450 });
    mainFabricCanvasRef.current = mainCanvas;
  
    const previewCanvas = new fabric.StaticCanvas(previewCanvasElementRef.current, { width: 400, height: 225 });
    previewFabricCanvasRef.current = previewCanvas;
  
    // ✅ Ensure a slide exists before calling loadSlide
    if (slides.length === 0) {
      const newSlide = createNewSlide();
      setSlides([newSlide]);
      setSelectedSlideIndex(0);
    }
  
    return () => {
      mainCanvas.dispose();
      previewCanvas.dispose();
    };
  }, []);
  
  

  const saveCurrentSlide = () => {
    if (selectedSlideIndex < 0 || selectedSlideIndex >= slides.length) return;
  
    const canvas = mainFabricCanvasRef.current;
    if (!canvas) return;
  
    // Convert canvas to JSON
    const content = JSON.stringify(canvas.toJSON());
  
    // Generate a thumbnail image with a lower resolution
    const thumbnailUrl = canvas.toDataURL({
      format: 'png',
      quality: 0.5,
      multiplier: 0.2, // Reduces the image size for a thumbnail
    });
  
    const updatedSlides = [...slides];
    updatedSlides[selectedSlideIndex] = {
      ...slides[selectedSlideIndex],
      content,
      thumbnailUrl, // Save the generated thumbnail
    };
  
    setSlides(updatedSlides);
    updatePreview();
  };
  
  
  
  const loadSlide = (index: number) => {
    if (index < 0 || index >= slides.length) return;
  
    saveCurrentSlide(); // Save current slide before switching
    setSelectedSlideIndex(index);
  
    const slide = slides[index];
    if (!slide || !slide.content) return;
  
    const canvas = mainFabricCanvasRef.current;
    if (!canvas) return;
  
    canvas.clear();
    canvas.loadFromJSON(slide.content, () => {
      setTimeout(() => {
        canvas.getObjects().forEach((obj) => obj.setCoords());
        canvas.renderAll();
      }, 50); // Small delay ensures Fabric.js updates correctly
    });
  };
  
  

  const updatePreview = () => {
    if (selectedSlideIndex < 0 || selectedSlideIndex >= slides.length) return;
  
    const slide = slides[selectedSlideIndex];
    if (!slide || !slide.content) return;
  
    const json = JSON.parse(slide.content);
    const previewCanvas = previewFabricCanvasRef.current!;
    previewCanvas.clear();
  
    previewCanvas.loadFromJSON(json, () => {
      const scaleX = 400 / 1040;
      const scaleY = 225 / 450;
  
      previewCanvas.getObjects().forEach(obj => {
        obj.scaleX *= scaleX; // Apply scale
        obj.scaleY *= scaleY;
        obj.left = (obj.left ?? 0) * scaleX;
        obj.top = (obj.top ?? 0) * scaleY;
      });
  
      previewCanvas.renderAll();
    });
  };
  
  

  const addNewSlide = () => {
    saveCurrentSlide(); // Save before adding a new slide
    const newSlide = createNewSlide();
    setSlides(prev => [...prev, newSlide]);
    setSelectedSlideIndex(prev => prev + 1);
  };
  

  const createNewSlide = (): Slide => {
    const defaultCanvas = new fabric.Canvas(document.createElement('canvas'), { width: 1040, height: 450 });
    return {
      id: crypto.randomUUID(),
      content: JSON.stringify(defaultCanvas.toJSON()), // ✅ Correctly stringifies an empty slide
    };
  };
  

  // Drag and drop handlers (simplified for brevity)
  const handleDragStart = (ev: React.DragEvent, index: number) => {
    ev.dataTransfer?.setData('text/plain', index.toString());
  };

  const handleDragOver = (ev: React.DragEvent) => {
    ev.preventDefault();
  };

  const handleDrop = (ev: React.DragEvent, targetIndex: number) => {
    ev.preventDefault();
    const draggedIndex = parseInt(ev.dataTransfer?.getData('text/plain') || '');
    if (!isNaN(draggedIndex) && draggedIndex !== targetIndex) {
      const newSlides = [...slides];
      const [removed] = newSlides.splice(draggedIndex, 1);
      newSlides.splice(targetIndex, 0, removed);
      setSlides(newSlides);
    }
  };

  return (
    <>
    <Nav/>
    <div className="main-content">
      <div className="slides-panel">
        <h2>Slides</h2>
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`slide-item ${selectedSlideIndex === index ? 'selected' : ''}`}
            onClick={() => loadSlide(index)}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            <div className="thumbnail">
            <img src={slide.thumbnailUrl || '/default-thumbnail.svg'} alt={`Slide ${index + 1}`} />
            </div>
            <p>Slide {index + 1}</p>
          </div>
        ))}
        <div className="add-slide-item" onClick={addNewSlide}>
          <div className="add-slide-plus">+</div>
          <p>Add Slide</p>
        </div>
      </div>

      <div className="editor-container">
        <Toolbar 
          textOptions={textOptions}
          onFontChange={handleFontChange}
          onFontSizeChange={handleFontSizeChange}
          onFillColorChange={handleFillColorChange}
          onAddText={handleAddText}
        />
        <div className="canvas-container">
          <canvas ref={mainCanvasRef} />
        </div>
        <div className="preview-container">
          <canvas ref={previewCanvasElementRef} />
        </div>
      </div>
    </div>
    </>
  );
}