'use client';

import { useSlide } from "@/app/slide-builder/slideContext";

export default function SlideNotSelected() {
  const { addSlide } = useSlide();

  return (
    <div className="flex flex-grow flex-shrink basis-full bg-white lg:ml-4 rounded-lg">
      {/* Container for the “Add” prompt */}
      <div
        className="
          cursor-pointer 
          hover:translate-y-[-1px]
          flex 
          flex-col 
          m-auto 
          w-2/3 
          h-1/4 
          lg:w-1/3 
          lg:h-1/3 
          rounded-xl 
          shadow-md 
          bg-[var(--background)]
          items-center
          justify-center
          space-y-2
        "
        onClick={() => addSlide()}
      >
        {/* Circular gradient containing a plus sign */}
        <div
          className="
            flex
            items-center
            justify-center
            w-[77px]
            h-[77px]
            rounded-full
            bg-gradient-to-b
            from-[#591CBA]
            to-[#4830E2]
          "
        >
          <span className="text-white text-[60px] leading-none">+</span>
        </div>

        {/* Description text */}
        <div className="text-center text-xl">
          Add feature like Poll, Text and Q/A
        </div>
      </div>
    </div>
  );
}
