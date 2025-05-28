"use client";
import { IText, Canvas, Rect , FabricImage} from "fabric";
import React, { useEffect, useRef, useCallback } from "react";

const Page = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasInstance = useRef<Canvas | null>(null);

  const handleText = useCallback(() => {
    if (!canvasInstance.current) return;

    const text = new IText("Hello World", {
      left: 100,
      top: 100,
      fill: "black",
      fontSize: 28,
    });

    canvasInstance.current.add(text);
  }, []);

  const uploadImage = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      console.error("Please upload only image files");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        if (canvasInstance.current) {
          const fabricImg = new FabricImage(img, {
            left: 50,
            top: 50,
            scaleX: Math.min(300 / img.width, 1),
            scaleY: Math.min(300 / img.height, 1),
          });
          canvasInstance.current.add(fabricImg);
          canvasInstance.current.renderAll();
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadImage(file);
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    canvasInstance.current = new Canvas(canvasRef.current);

    const rect = new Rect({
      left: 375,
      top: 275,
      width: 50,
      height: 50,
      fill: "red",
    });

    canvasInstance.current.add(rect);

    return () => {
      canvasInstance.current?.dispose();
      canvasInstance.current = null;
    };
  }, []);

  return (
    <div>
      <button onClick={handleText}>Add Text</button>

      <label htmlFor="file-upload">
        <button className="flex items-center gap-2 transition-all duration-200 hover:scale-105 cursor-pointer">
          <span className="hidden sm:inline">Upload</span>
        </button>
      </label>

      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: "2px solid black" }}
      />
    </div>
  );
};

export default Page;
