"use client";

import React, { useState } from "react";
import { UploadCloud, Image as ImageIcon, X } from "lucide-react";

export interface ImageUploadDropzoneProps {
  label: string;
  required?: boolean;
  value?: string;
  onChange?: (url: string) => void;
  acceptText?: string;
  className?: string;
}

export function ImageUploadDropzone({
  label,
  required = false,
  value,
  onChange,
  acceptText = "Upload Image (JPG, PNG)",
  className = "",
}: ImageUploadDropzoneProps) {
  const [preview, setPreview] = useState<string | undefined>(value);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onChange?.(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setPreview(undefined);
    onChange?.("");
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="flex items-center gap-1 text-xs font-bold text-foreground">
        <ImageIcon className="h-3.5 w-3.5 text-muted-foreground" />
        <span>{label}</span>
        {required && <span className="text-destructive">*</span>}
      </label>

      {preview ? (
        <div className="relative rounded-xl border border-border bg-background p-2 group overflow-hidden">
          <img
            src={preview}
            alt="Upload preview"
            className="h-36 w-full rounded-lg object-contain bg-muted/40"
          />
          <button
            type="button"
            onClick={clearImage}
            className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-destructive text-white shadow-md opacity-90 hover:opacity-100 transition-opacity"
            title="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="flex h-36 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/20 px-4 py-6 text-center hover:border-primary hover:bg-primary/5 transition-all">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-2">
            <UploadCloud className="h-5 w-5" />
          </div>
          <span className="text-xs font-semibold text-muted-foreground hover:text-foreground">
            {acceptText}
          </span>
          <span className="text-[10px] text-muted-foreground/70 mt-0.5">
            Click to browse or drag and drop file
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}
