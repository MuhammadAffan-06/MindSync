'use client';

import { useSlide } from "@/app/slide-builder/slideContext";
import { Slide, SlideBaseProps } from "@/app/slide-builder/types"

export default function SlideWordCloud({id}:SlideBaseProps){

    const { getSlideById } = useSlide();
    const { content }: Slide = getSlideById(id) as Slide;
    console.log("Slide Word Cloud Rendering..")
    return(
        <div>Word Cloud Component Rendered.|| id:{id} ||  Content: {content}</div>
    )
}