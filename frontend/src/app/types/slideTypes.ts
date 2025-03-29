import { UniqueIdentifier } from "@dnd-kit/core"
export type SlideType =  "PlainText" | "WordCloud" | "Image" | "Poll" | "MCQ" |"QA" |  "Undefined"; 


export type UserMode = "Building"|"Previewing";

export interface Slide {
  clientId: UniqueIdentifier;
  content: string | null;
  thumbnailUrl?: string;
  correctAnswer: string|null;
  type: SlideType;   
}

export interface SlideBaseProps {
  id: UniqueIdentifier
}

export type TextAlignType = "left" | "center" | "justify" | "right";

export interface InputBox {
  id: string;
  text: string;
  styleProps: {
    fontSize: number;
    fontColor: string;
    bold: boolean;
    italic: boolean;
    underline: boolean;
    fontFamily: string;
    textAlign: TextAlignType;
  };
}