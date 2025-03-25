"use client";
export default function Loading({message}:{message?:String}) {
  return (
    <div
      className="
        flex 
        flex-col
        items-center 
        justify-center 
        w-full 
        h-screen 
      "
    >
      <div
        className="
          w-16 
          h-16 
          rounded-full 
          border-4 
          border-solid 
          border-[var(--secondary-color)] 
          border-t-transparent 
          animate-spin
        "
      />
      
    {message && (<div className="text-[var(--secondary-color)] animate-pulse">{message}</div>)}
    </div>
  );
}
