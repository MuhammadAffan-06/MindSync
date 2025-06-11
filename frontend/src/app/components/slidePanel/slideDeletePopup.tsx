import React, { useEffect, useState } from "react";
// import { useSlide } from "../../../[presentationId]/slideContext";
// import { useSlide } from "@/app/slide-builder/[presentationId]/slideContext";
import { useSlide } from "@/app/context/slideContext";
import { UniqueIdentifier } from "@dnd-kit/core";
// import { Slide } from "../../../[presentationId]/types";
// import { Slide } from "@/app/slide-builder/[presentationId]/slideContext";

interface SlideDeletePopupProps {
  id: UniqueIdentifier;
  setShowDeletePopup: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SlideDeletePopup({ id, setShowDeletePopup }: SlideDeletePopupProps) {
  console.log("Showing SlideDeletePopup for "+id)
  const { removeSlide } = useSlide();

  const close = () => {
    setShowDeletePopup(false)
  };

  const onDelete = () => {
    removeSlide(id);
    close();
  };

  return (
    <div
      className="absolute flex left-0 top-0 w-screen h-screen select-none"
    >
      <div
        className="fixed left-0 top-0 w-screen h-screen z-20 bg-black opacity-20 cursor-pointer"
        onClick={close}
      ></div>
      <div className="m-auto flex flex-col w-[30vw] h-[30vh] bg-white z-50 shadow-lg rounded-lg p-4">
        <div className="text-lg text-center m-auto">
          Are you sure you want to delete the slide? This action cannot be undone.
        </div>
        <div className="flex justify-center gap-12 text-white mt-6">
          <button
            className="p-4 bg-red-500 rounded-md hover:translate-y-[-1px]"
            onClick={onDelete}
          >
            Delete
          </button>
          <button
            className="p-4 bg-[var(--secondary-color)] rounded-md hover:translate-y-[-1px]"
            onClick={close}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
