import { UniqueIdentifier } from "@dnd-kit/core";

export type SlideType =  "PlainText" | "WordCloud" | "Image" | "Poll" | "MCQ" |"QA" |  "Undefined"; 



export interface Slide {
  id: UniqueIdentifier;
  content: string;
  thumbnailUrl?: string;
  type: SlideType;   
}

export interface SlideBaseProps {
  id: UniqueIdentifier
}
