"use client";

import { NodeViewWrapper } from "@tiptap/react";
import { useState, useRef, useEffect } from "react";

/**
 * Resizable Image Component for Tiptap
 * Allows users to resize images by dragging handles
 */
export function ResizableImageView({ node, updateAttributes }: any) {
  const [isResizing, setIsResizing] = useState(false);
  const [size, setSize] = useState({
    width: node.attrs.width || "auto",
    height: node.attrs.height || "auto",
  });
  const imgRef = useRef<HTMLImageElement>(null);
  const [aspectRatio, setAspectRatio] = useState(1);

  useEffect(() => {
    if (imgRef.current) {
      const img = imgRef.current;
      img.onload = () => {
        setAspectRatio(img.naturalWidth / img.naturalHeight);
        if (!node.attrs.width) {
          setSize({ width: img.naturalWidth, height: img.naturalHeight });
        }
      };
    }
  }, [node.attrs.src]);

  const handleMouseDown = (e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    setIsResizing(true);

    const startX = e.clientX;
    const startWidth = typeof size.width === "number" ? size.width : imgRef.current?.width || 0;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const newWidth = Math.max(100, startWidth + deltaX);
      const newHeight = newWidth / aspectRatio;

      setSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      updateAttributes({
        width: size.width,
        height: size.height,
      });
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <NodeViewWrapper className="relative inline-block group">
      <img
        ref={imgRef}
        src={node.attrs.src}
        alt={node.attrs.alt || ""}
        style={{
          width: typeof size.width === "number" ? `${size.width}px` : size.width,
          height: typeof size.height === "number" ? `${size.height}px` : size.height,
          maxWidth: "100%",
          display: "block",
        }}
        className={isResizing ? "cursor-ew-resize" : ""}
      />
      
      {/* Resize Handles */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary transition-colors pointer-events-none" />
      
      {/* Right Handle */}
      <div
        className="absolute top-1/2 -right-1 w-3 h-12 bg-primary rounded cursor-ew-resize opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ transform: "translateY(-50%)" }}
        onMouseDown={(e) => handleMouseDown(e, "right")}
      />
      
      {/* Left Handle */}
      <div
        className="absolute top-1/2 -left-1 w-3 h-12 bg-primary rounded cursor-ew-resize opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ transform: "translateY(-50%)" }}
        onMouseDown={(e) => handleMouseDown(e, "left")}
      />

      {/* Size indicator */}
      {isResizing && (
        <div className="absolute bottom-2 right-2 bg-black/75 text-white text-xs px-2 py-1 rounded">
          {Math.round(typeof size.width === "number" ? size.width : 0)} ×{" "}
          {Math.round(typeof size.height === "number" ? size.height : 0)}
        </div>
      )}
    </NodeViewWrapper>
  );
}
