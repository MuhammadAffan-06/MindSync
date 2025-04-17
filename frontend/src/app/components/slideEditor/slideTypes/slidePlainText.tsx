"use client";

import React, { useState, useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import { FontFamily } from "@tiptap/extension-font-family";
import TextAlign from "@tiptap/extension-text-align";
import { Extension, CommandProps } from "@tiptap/core";
import html2canvas from "html2canvas";
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaListUl,
  FaListOl,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
} from "react-icons/fa";
import { SlideBaseProps } from "@/app/types/slideTypes";
import { UniqueIdentifier } from "@dnd-kit/core/dist";
import { useSlide } from "@/app/context/slideContext";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
  }
}

const FontSize = Extension.create({
  name: "fontSize",

  addOptions() {
    return { types: ["textStyle"] };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element: HTMLElement) => element.style.fontSize || null,
            renderHTML: (attributes: { fontSize?: string }) => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (size: string) =>
        ({ chain }: CommandProps) => {
          return chain().setMark("textStyle", { fontSize: size }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }: CommandProps) => {
          return chain().setMark("textStyle", { fontSize: null }).run();
        },
    };
  },
});

export default function SlidePlainText({ id }: SlideBaseProps) {
  console.log("Slide Plain Text Rendering");
  const { getActiveSlide, updateSlideInfoById } = useSlide();
  const slide = getActiveSlide();
  const contentRef = useRef(slide?.content || "<p>Text Here...</p>");

  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFF00");

  const divRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color.configure({ types: ["textStyle"] }),
      Highlight.configure({ multicolor: true }),
      FontFamily,
      FontSize,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: contentRef.current,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      contentRef.current = editor.getHTML();
    },
  });

  useEffect(() => {
    if (!slide || !editor) return;
    if (!slide?.content) slide.content = "<p>Text Here...</p>";
    editor.commands.setContent(slide.content);
    contentRef.current = slide.content;
  }, [id, editor]);

  const updateSlideInfo = (id: UniqueIdentifier) => {
    if (divRef.current && contentRef.current) {
      html2canvas(divRef.current, { scale: 0.5 }).then((canvas) => {
        updateSlideInfoById(
          id,
          contentRef.current,
          canvas.toDataURL("image/webp", 0.2)
        );
      });
    }
  };

  const handleFontSize = (size: string) => {
    if (!size || size === "unset") {
      editor?.chain().focus().unsetFontSize().run();
    } else {
      editor?.chain().focus().setFontSize(size).run();
    }
  };

  if (!slide) return <p>Invalid Slide Id: {id}</p>;
  if (!editor) return null;

  return (
    <div className="w-full h-full flex flex-col p-2 space-y-2 overflow-y-auto ">
      <div className="flex flex-wrap items-center gap-2 border-b pb-2 mb-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1 border rounded ${editor.isActive("bold") ? "bg-gray-300" : ""}`}
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1 border rounded ${editor.isActive("italic") ? "bg-gray-300" : ""}`}
        >
          <FaItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-1 border rounded ${editor.isActive("strike") ? "bg-gray-300" : ""}`}
        >
          <FaStrikethrough />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1 border rounded ${editor.isActive("bulletList") ? "bg-gray-300" : ""}`}
        >
          <FaListUl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1 border rounded ${editor.isActive("orderedList") ? "bg-gray-300" : ""}`}
        >
          <FaListOl />
        </button>

        {["left", "center", "right", "justify"].map((align) => (
          <button
            key={align}
            onClick={() => editor.chain().focus().setTextAlign(align).run()}
            className={`p-1 border rounded ${editor.isActive({ textAlign: align }) ? "bg-gray-300" : ""}`}
          >
            {align === "left" && <FaAlignLeft />}
            {align === "center" && <FaAlignCenter />}
            {align === "right" && <FaAlignRight />}
            {align === "justify" && <FaAlignJustify />}
          </button>
        ))}

        <input
          type="color"
          value={textColor}
          onChange={(e) => {
            setTextColor(e.target.value);
            editor.chain().focus().setColor(e.target.value).run();
          }}
          className="w-6 h-6 border p-0"
          title="Text Color"
        />
        <input
          type="color"
          value={bgColor}
          onChange={(e) => {
            setBgColor(e.target.value);
            editor
              .chain()
              .focus()
              .toggleHighlight({ color: e.target.value })
              .run();
          }}
          className="w-6 h-6 border p-0"
          title="Highlight Color"
        />

        <select
          onChange={(e) =>
            editor.chain().focus().setFontFamily(e.target.value).run()
          }
          className="border rounded p-1"
        >
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Verdana">Verdana</option>
          <option value="Tahoma">Tahoma</option>
          <option value="Trebuchet MS">Trebuchet MS</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Georgia">Georgia</option>
          <option value="Garamond">Garamond</option>
          <option value="Courier New">Courier New</option>
          <option value="Brush Script MT">Brush Script MT</option>
          <option value="Impact">Impact</option>
          <option value="Lucida Console">Lucida Console</option>
          <option value="Lucida Sans Unicode">Lucida Sans Unicode</option>
          <option value="Palatino Linotype">Palatino Linotype</option>
          <option value="Comic Sans MS">Comic Sans MS</option>
          <option value="Candara">Candara</option>
          <option value="Arial Black">Arial Black</option>
          <option value="Segoe UI">Segoe UI</option>
          <option value="Optima">Optima</option>
          <option value="Futura">Futura</option>
        </select>

        <select
          onChange={(e) => handleFontSize(e.target.value)}
          className="border rounded p-1"
        >
          <option value="14px">14</option>
          <option value="18px">18</option>
          <option value="24px">24</option>
          <option value="32px">32</option>
          <option value="48px">48</option>
          <option value="52px">52</option>
          <option value="76px">76</option>
          <option value="98px">98</option>
        </select>
      </div>

      <div className="flex-grow border p-2 rounded overflow-auto prose max-w-[80vw]">
        <EditorContent
          editor={editor}
          ref={divRef}
          onBlur={() => updateSlideInfo(id)}
          className="border-none h-full w-full focus:ring-0 focus:outline-none appearance-none whitespace-pre-wrap break-words overflow-hidden"
        />
      </div>
    </div>
  );
}
