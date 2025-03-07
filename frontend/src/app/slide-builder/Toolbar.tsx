// src/app/slide-builder/Toolbar.jsx
'use client';
import React from 'react';

interface TextOptions {
  fontFamily: string;
  fontSize: number;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
}

interface ToolbarProps {
  textOptions: TextOptions;
  onFontChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onFontSizeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFillColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddText: () => void;
}

const Toolbar = ({
  textOptions,
  onFontChange,
  onFontSizeChange,
  onFillColorChange,
  onAddText,
}: ToolbarProps) => {
  return (
    <div className="editor-toolbar">
      <button 
        className="add-text-button" 
        onClick={onAddText}
      >
        Text
      </button>
      <select 
        className="font-select" 
        value={textOptions.fontFamily}
        onChange={onFontChange}
      >
        <option value="Arial">Arial</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
      </select>
      <input 
        className="font-size-input"
        type="number" 
        value={textOptions.fontSize}
        onChange={onFontSizeChange}
        min="8" max="72"
      />
      <input 
        className="color-picker"
        type="color" 
        value={textOptions.fillColor}
        onChange={onFillColorChange}
      />
    </div>
  );
};

export default Toolbar;