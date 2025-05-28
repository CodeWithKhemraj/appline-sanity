import React, { createContext, useContext, useCallback, useState } from 'react';
import { Canvas as FabricCanvas, FabricImage } from 'fabric';

interface ImageUploadContextType {
  isDragging: boolean;
  uploadImage: (file: File, canvas?: FabricCanvas) => Promise<void>;
  handleDragEnter: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent, canvas?: FabricCanvas) => void;
}

const ImageUploadContext = createContext<ImageUploadContextType | null>(null);

export const useImageUpload = () => {
  const context = useContext(ImageUploadContext);
  if (!context) {
    throw new Error('useImageUpload must be used within ImageUploadProvider');
  }
  return context;
};

interface ImageUploadProviderProps {
  children: React.ReactNode;
}

export const ImageUploadProvider: React.FC<ImageUploadProviderProps> = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);

  const uploadImage = useCallback(async (file: File, canvas?: FabricCanvas) => {
    if (!file.type.startsWith('image/')) {
      console.log('Please upload only image files');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          if (canvas) {
            // Create fabric image and add to canvas
            const fabricImg = new FabricImage(img, {
              left: 50,
              top: 50,
              scaleX: Math.min(300 / img.width, 1),
              scaleY: Math.min(300 / img.height, 1),
            });
            canvas.add(fabricImg);
            canvas.renderAll();
            console.log('Image added to canvas!');
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      console.log('Failed to upload image');
    }
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => prev + 1);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => {
      const newCounter = prev - 1;
      if (newCounter === 0) {
        setIsDragging(false);
      }
      return newCounter;
    });
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, canvas?: FabricCanvas) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setDragCounter(0);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      uploadImage(file, canvas);
    }
  }, [uploadImage]);

  const value = {
    isDragging,
    uploadImage,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  };

  return (
    <ImageUploadContext.Provider value={value}>
      {children}
    </ImageUploadContext.Provider>
  );
};
