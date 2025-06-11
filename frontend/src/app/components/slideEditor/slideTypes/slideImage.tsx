"use client";

import { upload } from "@vercel/blob/client";
import { toast } from "react-toastify";
import { useSlide } from "@/app/context/slideContext";
import { Slide, SlideBaseProps } from "@/app/types/slideTypes";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { serverBaseUrl } from "../../utils/api";
import { connect } from "http2";

const MAX_SIZE_BYTES = 100 * 1024 * 1024; // 100 MB
const BLOB_BASE_URL = process.env.NEXT_PUBLIC_BLOB_BASE_URL;

const seen = new Set<string>();

async function fileToSha256Hex(file: File) {
  const buffer = await file.arrayBuffer();
  const hash = await crypto.subtle.digest("SHA-256", buffer);
  const hex = Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hex;
}

export default function SlideImage({ id }: SlideBaseProps) {
  const { getActiveSlide, updateSlideInfoById } = useSlide();
  const slide = getActiveSlide();
  if (!slide) return <p>Invalid Slide Id, {id}</p>;

  const parse = (s: Slide) => (s.content ? JSON.parse(s.content) : { question: "", imageUrl: "" });
  const [content, setContent] = useState<{ question: string; imageUrl: string }>(() => parse(slide));
  const contentRef = useRef(content);
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const c = parse(slide);
    setContent(c);
    contentRef.current = c;
  }, [id, slide]);

  const updateBackend = useCallback(() => {
    updateSlideInfoById(id, JSON.stringify(contentRef.current),contentRef.current.imageUrl);
  }, [id, updateSlideInfoById]);

  const processFile = async (file: File) => {
    if (file.size > MAX_SIZE_BYTES) {
      toast.error("Image too large (max 100 MB)");
      return;
    }

    try {
      const hash = await fileToSha256Hex(file);
      const extMatch = file.name.match(/\.[a-zA-Z0-9]+$/);
      const fileName = extMatch ? `${hash}${extMatch[0]}` : hash;

      // We'll check if the link exists in our memory if so then return the url immediately
      const publicUrl = `${BLOB_BASE_URL}/${fileName}`;
      if (seen.has(hash)) {
        console.log("Same image was previously uploaded");
        const updated = { ...contentRef.current, imageUrl: publicUrl };
        contentRef.current = updated;
        setContent(updated);
        updateBackend();
        return;
      }

      //we will send HEAD request to check if same image already exists in our blob storage
      const head = await fetch(publicUrl, { method: "HEAD" });
      
      if ( head.ok) {
        console.log("a image with same hash already exists, you can use it directly without reuploading a duplicate");
        seen.add(hash);
        const updated = { ...contentRef.current, imageUrl: publicUrl };
        contentRef.current = updated;
        setContent(updated);
        updateBackend();
        return;
      }
      console.log("uploading a image to blob storage");
      const { url } = await upload(fileName, file, {
        access: "public",
        handleUploadUrl: serverBaseUrl + "/blob/upload",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      seen.add(hash);
      const updated = { ...contentRef.current, imageUrl: url };
      contentRef.current = updated;
      setContent(updated);
      updateBackend();
    } catch (e) {
      console.error(e);
      toast.error("Upload failed");
    }
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    file && processFile(file);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    file && processFile(file);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <input
        type="text"
        value={content.question}
        onChange={(e) => {
          const updated = { ...contentRef.current, question: e.target.value };
          contentRef.current = updated;
          setContent(updated);
        }}
        onBlur={updateBackend}
        placeholder="Question or caption..."
        className="w-full text-center px-4 py-2 mb-8 rounded text-xl"
      />

      <div
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`relative flex justify-center items-center border-2 border-dashed rounded-lg h-80 w-full cursor-pointer transition ${
          dragging ? "border-secondary bg-gray-100" : "border-gray-300 hover:border-secondary"
        }`}
      >
        <input ref={fileRef} type="file" accept="image/*" onChange={onFile} className="hidden" />

        {content.imageUrl ? (
          <img src={content.imageUrl} className="max-h-full max-w-full object-contain rounded" />
        ) : (
          <div className="text-center text-gray-500">
            <p className="text-lg font-medium">Drag & drop an image</p>
            <p className="text-sm mt-1">or click to upload</p>
          </div>
        )}
      </div>
    </div>
  );
}
