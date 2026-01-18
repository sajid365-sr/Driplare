"use server";

// lib/upload-image.ts
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImageToCloudinary(
  formData: FormData,
  folder: string
) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      throw new Error("No file provided");
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      throw new Error("File must be an image");
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new Error("File size must be less than 10MB");
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: folder,
              resource_type: "image",
            },
            (error, result) => {
              if (error) {
                console.error("Cloudinary upload error:", error);
                reject(error);
              } else if (!result) {
                reject(new Error("Upload failed: No result returned"));
              } else {
                resolve(result as { secure_url: string });
              }
            }
          )
          .end(buffer);
      }
    );

    if (!result?.secure_url) {
      throw new Error("Upload failed: No URL returned");
    }

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary Error:", error);
    return null;
  }
}
