'use client';
import React from 'react';
import {
  FaFont,
  FaListUl,
  FaListOl,
  FaAlignLeft,
  FaAlignRight,
  FaAlignCenter,
  FaAlignJustify,
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaPaperclip
} from 'react-icons/fa';
import { MdLineWeight } from 'react-icons/md';
import { useToolbar } from './toolbarContext';
import { useCanvas } from '../slideCanvas/canvasContext';
import { Textbox } from 'fabric';

export default function SlideToolbar() {
  const { canvas } = useCanvas();
  const {
    fontSize,
    setFontSize,
    fontColor,
    setFontColor,
    textAlign,
    setTextAlign,
    bold,
    setBold,
    italic,
    setItalic,
    underline,
    setUnderline,
    strikethrough,
    setStrikethrough
  } = useToolbar();

  // Helper to update the active Fabric object if available.
  const updateActiveTextProperty = (prop: string, value: any) => {
    if (!canvas) return;
    const obj = canvas.getActiveObject();
    if (!obj) return;
    obj.set(prop, value);
    canvas.renderAll();
  };

  const fontSizeMapping: Record<string, number> = {
    heading1: 96,
    heading2: 84,
    heading3: 72,
    subheading: 60,
    body: 48,
    caption: 36,
    small: 30
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!canvas) return;
    
    const selected = e.target.value;
    const newFontSize = fontSizeMapping[selected] || 48;
    setFontSize(newFontSize);
  
    const obj = canvas.getActiveObject();
    if (!obj || !(obj instanceof Textbox)) return;
  
  obj.set("fontSize", newFontSize);
   obj.setCoords();
    canvas.renderAll();
  };
  
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontColor(e.target.value);
    if (!canvas) return;
    const obj = canvas.getActiveObject();
    if (!obj) return;
    obj.set('fill', e.target.value);
    canvas.renderAll();
  };

  const handleTextAlign = (align: "left" | "center" | "right" | "justify") => {
    setTextAlign(align);
    updateActiveTextProperty("textAlign", align);
  };

  const toggleBold = () => {
    const newBold = !bold;
    setBold(newBold);
    updateActiveTextProperty("fontWeight", newBold ? "bold" : "normal");
  };

  const toggleItalic = () => {
    const newItalic = !italic;
    setItalic(newItalic);
    updateActiveTextProperty("fontStyle", newItalic ? "italic" : "normal");
  };

  const toggleUnderline = () => {
    const newUnderline = !underline;
    setUnderline(newUnderline);
    updateActiveTextProperty("underline", newUnderline);
  };

  const toggleStrikethrough = () => {
    const newStrikethrough = !strikethrough;
    setStrikethrough(newStrikethrough);
    // Assuming Fabric text objects support "linethrough" property
    updateActiveTextProperty("linethrough", newStrikethrough);
  };

  // Optionally, you could implement handlers for list, line spacing, attach icon, etc.

  const onAddText = () => {
    if (!canvas) return;
    // Create a new Textbox object at canvas center
    const text = new Textbox('Text', {
      left: canvas.width / 2,
      top: canvas.height / 2,
      width: canvas.width/3,
      originX: 'center',
      originY: 'center',
      fontSize,
      fill: fontColor,
      textAlign: textAlign
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    text.enterEditing();
  };

 

  return (
    <div className="relative">

      <div className="absolute z-20 bg-opacity-90 bg-white p-2 flex m-auto items-center divide-x divide-gray-300">
        <div className="px-2">
          <button type="button" onClick={onAddText} className="p-1 rounded hover:bg-gray-200">
            <FaFont size={20} />
          </button>
        </div>
        <div className="px-2">
          <select
            name="font-size"
            onChange={handleFontSizeChange}
            className="select-none p-1 text-gray-700 focus:outline-none focus:ring-0 border border-gray-300 rounded"
          >
            <option value="heading1">Heading 1</option>
            <option value="heading2">Heading 2</option>
            <option value="heading3">Heading 3</option>
            <option value="subheading">Subheading</option>
            <option value="body" selected>Body Text</option>
            <option value="caption">Caption</option>
            <option value="small">Small Text</option>
          </select>
        </div>
        <div className="px-2">
          <input
            type="color"
            value={fontColor}
            onChange={handleColorChange}
            className="w-8 h-8 p-0 rounded-lg"
          />
          <style jsx>{`
          input[type="color"]::-webkit-color-swatch-wrapper {
            border-radius: 0.5rem;
          }
          input[type="color"]::-webkit-color-swatch {
            border-radius: 0.5rem;
          }
        `}</style>
        </div>
        <div className="px-2">
          <button type="button" className="p-1 rounded hover:bg-gray-200">
            <FaListUl size={20} />
          </button>
        </div>
        <div className="px-2">
          <button type="button" className="p-1 rounded hover:bg-gray-200">
            <FaListOl size={20} />
          </button>
        </div>
        <div className="px-2 flex items-center gap-1">
          <button
            type="button"
            className={`p-1 rounded hover:bg-gray-200 ${textAlign === 'left' ? 'bg-gray-300' : ''}`}
            onClick={() => handleTextAlign("left")}
          >
            <FaAlignLeft size={20} />
          </button>
          <button
            type="button"
            className={`p-1 rounded hover:bg-gray-200 ${textAlign === 'center' ? 'bg-gray-300' : ''}`}
            onClick={() => handleTextAlign("center")}
          >
            <FaAlignCenter size={20} />
          </button>
          <button
            type="button"
            className={`p-1 rounded hover:bg-gray-200 ${textAlign === 'right' ? 'bg-gray-300' : ''}`}
            onClick={() => handleTextAlign("right")}
          >
            <FaAlignRight size={20} />
          </button>
          <button
            type="button"
            className={`p-1 rounded hover:bg-gray-200 ${textAlign === 'justify' ? 'bg-gray-300' : ''}`}
            onClick={() => handleTextAlign("justify")}
          >
            <FaAlignJustify size={20} />
          </button>
        </div>
        <div className="px-2">
          <button type="button" className="p-1 rounded hover:bg-gray-200">
            <MdLineWeight size={20} />
          </button>
        </div>
        <div className="px-2 flex items-center gap-1">
          <button
            type="button"
            className={`p-1 rounded hover:bg-gray-200 ${bold ? 'bg-gray-300' : ''}`}
            onClick={toggleBold}
          >
            <FaBold size={20} />
          </button>
          <button
            type="button"
            className={`p-1 rounded hover:bg-gray-200 ${italic ? 'bg-gray-300' : ''}`}
            onClick={toggleItalic}
          >
            <FaItalic size={20} />
          </button>
          <button
            type="button"
            className={`p-1 rounded hover:bg-gray-200 ${underline ? 'bg-gray-300' : ''}`}
            onClick={toggleUnderline}
          >
            <FaUnderline size={20} />
          </button>
          <button
            type="button"
            className={`p-1 rounded hover:bg-gray-200 ${strikethrough ? 'bg-gray-300' : ''}`}
            onClick={toggleStrikethrough}
          >
            <FaStrikethrough size={20} />
          </button>
        </div>
        <div className="px-2">
          <button type="button" className="p-1 rounded hover:bg-gray-200">
            <FaPaperclip size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
