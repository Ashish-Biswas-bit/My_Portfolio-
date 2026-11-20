const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

interface CloudinaryUploadResponse {
  secure_url?: string;
  error?: {
    message?: string;
  };
}

export function isVideoUrl(value: string) {
  return /\/video\/upload\/|\.(mp4|m4v|mov|webm|ogv|m3u8)(?:$|[?#])/i.test(value);
}

export async function uploadToCloudinary(file: File): Promise<string> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error(
      "Cloudinary is not configured. Set the cloud name and unsigned upload preset."
    );
  }

  if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
    throw new Error("Choose an image or video file.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
    { method: "POST", body: formData }
  );
  const data = (await res.json()) as CloudinaryUploadResponse;

  if (!res.ok) {
    throw new Error(data.error?.message || "Cloudinary upload failed.");
  }

  if (!data.secure_url) {
    throw new Error("Cloudinary did not return a secure media URL.");
  }

  return data.secure_url;
}
