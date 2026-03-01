import { NextRequest, NextResponse } from "next/server";
import { uploadImageToCloudinary } from "@/lib/upload-image";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Upload to Cloudinary using your existing function
    const imageUrl = await uploadImageToCloudinary(formData, "reviews");

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: "Failed to upload image" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      imageUrl,
    });
  } catch (error: any) {
    console.error("Image upload error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to upload image",
      },
      { status: 500 },
    );
  }
}
