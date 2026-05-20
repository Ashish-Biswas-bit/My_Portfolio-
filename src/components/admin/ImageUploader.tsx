"use client";

import { useState, useRef } from "react";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { FiUpload, FiX } from "react-icons/fi";

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUploader({ value, onChange, label = "Image" }: Props) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      onChange(url);
    } catch {
      alert("Upload failed. Check your Cloudinary config.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-gray-400 text-sm mb-1">{label}</label>

      {value ? (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Uploaded"
            className="w-32 h-32 object-cover rounded-lg border border-white/10"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white"
          >
            <FiX size={12} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-32 h-32 border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-cyan-500/40 hover:text-cyan-400 transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <FiUpload size={20} />
              <span className="text-xs mt-1">Upload</span>
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  );
}
