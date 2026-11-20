"use client";

import { useState, useRef } from "react";
import { isVideoUrl, uploadToCloudinary } from "@/lib/cloudinary";
import { FiUpload, FiX } from "react-icons/fi";

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  allowVideo?: boolean;
}

export default function ImageUploader({
  value,
  onChange,
  label = "Image",
  allowVideo = false,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      onChange(url);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Cloudinary upload failed."
      );
    } finally {
      setUploading(false);
      input.value = "";
    }
  };

  return (
    <div>
      <label className="block text-deep-teal/75 text-sm mb-1">{label}</label>

      {value ? (
        <div className="relative inline-block">
          {isVideoUrl(value) ? (
            <video
              src={value}
              controls
              playsInline
              preload="metadata"
              aria-label="Uploaded video preview"
              className="w-32 h-32 object-cover rounded-lg border border-deep-teal/10"
            />
          ) : (
            <img
              src={value}
              alt="Uploaded"
              className="w-32 h-32 object-cover rounded-lg border border-deep-teal/10"
            />
          )}
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Remove uploaded media"
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-deep-teal"
          >
            <FiX size={12} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-32 h-32 border-2 border-dashed border-deep-teal/10 rounded-lg flex flex-col items-center justify-center text-deep-teal/70 hover:border-soft-peach/40 hover:text-soft-peach transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <div className="w-6 h-6 border-2 border-soft-peach border-t-transparent rounded-full animate-spin" />
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
        accept={allowVideo ? "image/*,video/*" : "image/*"}
        onChange={handleFile}
        className="hidden"
      />
      {error && (
        <p role="alert" className="mt-2 max-w-xs text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
