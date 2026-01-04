// lib/upload-image.ts
import { v2 as cloudinary } from "cloudinary";

export async function uploadImageToCloudinary(
  formData: FormData,
  folder: string
) {
  try {
    const file = formData.get("file") as File; // FormData থেকে ফাইলটি বের করা
    if (!file) throw new Error("No file provided");

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = (await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: folder }, // এখানে 'folder' প্যারামিটার ব্যবহার করুন
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    })) as any;

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary Error:", error);
    return null;
  }
}
