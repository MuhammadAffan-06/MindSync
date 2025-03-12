import { createContext, useContext, useEffect, useState } from "react";
import { useCanvas } from "../slideCanvas/canvasContext";
import { useSlide } from "@/app/slide-builder/slideContext";
import { Textbox } from "fabric";



type TextAlignType = "left" | "center" | "justify" | "right";
interface IToolbarContext {
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
  fontColor: string;
  setFontColor: React.Dispatch<React.SetStateAction<string>>;
  textAlign: TextAlignType;
  setTextAlign: React.Dispatch<React.SetStateAction<TextAlignType>>;
  bold: boolean;
  setBold: React.Dispatch<React.SetStateAction<boolean>>;
  italic: boolean;
  setItalic: React.Dispatch<React.SetStateAction<boolean>>;
  underline: boolean;
  setUnderline: React.Dispatch<React.SetStateAction<boolean>>;
  strikethrough: boolean;
  setStrikethrough: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ToolbarProviderProps {
  children: React.ReactNode;
}


const ToolbarContext = createContext<IToolbarContext | undefined>(undefined);

export function ToolbarProvider({ children }: ToolbarProviderProps) {
  const [fontSize, setFontSize] = useState<number>(32 * 3);
  const [fontColor, setFontColor] = useState<string>("#000000");
  const [textAlign, setTextAlign] = useState<TextAlignType>("left");
  const [bold, setBold] = useState<boolean>(false);
  const [italic, setItalic] = useState<boolean>(false);
  const [underline, setUnderline] = useState<boolean>(false);
  const [strikethrough, setStrikethrough] = useState<boolean>(false);

  const { canvas } = useCanvas();
  const { activeSlideId, updateActiveSlideInfo } = useSlide();
  useEffect(() => {

    console.log("Slide Canvas listener ")
    if (!canvas) return;

    const handleSelection = () => {
      const activeObject = canvas.getActiveObject();
      if (!activeObject) return;
      if (activeObject instanceof Textbox) {
        setFontSize(activeObject.fontSize || 16);
        setFontColor(activeObject.fill as string || "#000000");
        setTextAlign(activeObject.textAlign as TextAlignType || "left");
        setBold(activeObject.fontWeight === 'bold');
        setItalic(activeObject.fontStyle === 'italic');
        setStrikethrough(activeObject.underline);
        setStrikethrough(activeObject.linethrough);
      }

    };

    const handleSelectionCleared = () => {

      setFontColor("#000000");
      setBold(false);
      setItalic(false);
      setUnderline(false);
      setStrikethrough(false);

      if (canvas) {
        const content = JSON.stringify(canvas.toJSON());

        const thumbnailUrl = canvas.toDataURL({
          format: 'webp',
          quality: 1,
          multiplier: 0.5
        });

        updateActiveSlideInfo(content, thumbnailUrl);
      }
    };

    canvas.on('selection:created', handleSelection);
    canvas.on('selection:updated', handleSelection);
    canvas.on('selection:cleared', handleSelectionCleared);

    return () => {
      canvas.off('selection:created', handleSelection);
      canvas.off('selection:updated', handleSelection);
      canvas.off('selection:cleared', handleSelectionCleared);
    };
  }, [canvas,activeSlideId]);
  return (
    <ToolbarContext.Provider
      value={{
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

      }}
    >
      {children}
    </ToolbarContext.Provider>
  );
}

export function useToolbar() {
  const context = useContext(ToolbarContext);
  if (!context) {
    throw new Error("useToolbar must be used within a ToolbarProvider");
  }
  return context;
}
