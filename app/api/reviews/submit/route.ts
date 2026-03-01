import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { headers } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting helper
async function checkRateLimit(ip: string, email: string) {
  // Check IP rate limit (1 submission per IP per 24 hours)
  const ipSubmissions = await prisma.review.findMany({
    where: {
      ip,
      createdAt: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    },
  });

  if (ipSubmissions.length > 0) {
    return {
      allowed: false,
      error:
        "You can only submit one review per day. Please try again tomorrow.",
    };
  }

  // Check email duplicate
  const emailSubmissions = await prisma.review.findFirst({
    where: { clientEmail: email },
  });

  if (emailSubmissions) {
    return {
      allowed: false,
      error: "You've already submitted a review. Thank you!",
    };
  }

  return { allowed: true };
}

// Validate video URL
function validateVideoUrl(url: string): boolean {
  if (!url) return true;

  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
  const vimeoRegex = /^(https?:\/\/)?(www\.)?vimeo\.com\/.+/;

  return youtubeRegex.test(url) || vimeoRegex.test(url);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      clientEmail,
      designation,
      company,
      complement,
      rating,
      projectType,
      videoUrl,
      imageUrl, // Cloudinary URL (already uploaded from frontend)
    } = body;

    // Validate required fields
    if (!name || !clientEmail || !complement || !rating || !projectType) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientEmail)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 },
      );
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: "Rating must be between 1 and 5" },
        { status: 400 },
      );
    }

    // Validate review text length
    if (complement.length < 20 || complement.length > 500) {
      return NextResponse.json(
        {
          success: false,
          error: "Review must be between 20 and 500 characters",
        },
        { status: 400 },
      );
    }

    // Validate video URL if provided
    if (videoUrl && !validateVideoUrl(videoUrl)) {
      return NextResponse.json(
        { success: false, error: "Video URL must be from YouTube or Vimeo" },
        { status: 400 },
      );
    }

    // Get client IP
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0] : "unknown";

    // Check rate limit
    const rateLimitCheck = await checkRateLimit(ip, clientEmail);
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        { success: false, error: rateLimitCheck.error },
        { status: 429 },
      );
    }

    // Create review with status="pending"
    const review = await prisma.review.create({
      data: {
        name,
        clientEmail,
        designation: designation || "",
        company: company || "",
        testimonialTitle: `Review from ${name}`, // Auto-generate title
        complement,
        rating,
        projectType,
        imageUrl: imageUrl || null,
        videoUrl: videoUrl || null,
        status: "pending",
        submissionSource: "client_form",
        featured: false,
        ip,
      },
    });

    // Send confirmation email to client
    await resend.emails.send({
      from: "Driplare <hello@driplare.com>",
      to: clientEmail,
      subject: "Thank you for your review!",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%); color: white; padding: 30px 20px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 800;">Thank You! 🙏</h1>
          </div>
          
          <div style="background: #ffffff; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px; padding: 30px 20px;">
            <p>Hi <strong>${name}</strong>,</p>
            
            <p>Thank you for taking the time to share your experience with Driplare! We truly appreciate your feedback.</p>
            
            <div style="background: #f0f9ff; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #3b82f6; margin-top: 0;">📝 What's Next?</h3>
              <p style="margin: 0;">Your review is currently under review by our team. We'll approve and publish it within <strong>24 hours</strong>.</p>
            </div>
            
            <div style="background: #f9fafb; border-radius: 8px; padding: 15px; margin: 20px 0;">
              <p style="margin: 8px 0;"><strong>Your Review:</strong></p>
              <p style="margin: 8px 0; color: #4b5563;">"${complement.substring(0, 150)}${complement.length > 150 ? "..." : ""}"</p>
              <p style="margin: 8px 0;"><strong>Rating:</strong> ${"⭐".repeat(rating)}</p>
            </div>
            
            <p style="margin-top: 30px;">Thanks again for your support!</p>
            <p style="margin: 5px 0;"><strong>— The Driplare Team</strong></p>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 14px;">
            <p>Driplare — AI Automation for Bangladesh & Beyond</p>
            <p><a href="https://driplare.com" style="color: #7c3aed; text-decoration: none;">Visit our website</a></p>
          </div>
        </div>
      `,
    });

    // Send notification email to admin
    await resend.emails.send({
      from: "Driplare Notifications <no-reply@driplare.com>",
      to: "info@driplare.com", // Replace with your admin email
      subject: `🌟 New Review Pending: ${name} — ${rating}⭐`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #f59e0b; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">🌟 New Review Awaiting Approval</h2>
          </div>
          <div style="border: 2px solid #f59e0b; border-top: none; padding: 20px; border-radius: 0 0 8px 8px;">
            <div style="margin: 15px 0; padding: 10px; background: #f9fafb; border-radius: 6px;">
              <strong style="color: #1f2937; display: block; margin-bottom: 5px;">Client Name:</strong>
              <span>${name}</span>
            </div>
            
            <div style="margin: 15px 0; padding: 10px; background: #f9fafb; border-radius: 6px;">
              <strong style="color: #1f2937; display: block; margin-bottom: 5px;">Email:</strong>
              <a href="mailto:${clientEmail}" style="color: #7c3aed;">${clientEmail}</a>
            </div>
            
            ${
              designation
                ? `
            <div style="margin: 15px 0; padding: 10px; background: #f9fafb; border-radius: 6px;">
              <strong style="color: #1f2937; display: block; margin-bottom: 5px;">Role:</strong>
              <span>${designation}${company ? ` at ${company}` : ""}</span>
            </div>
            `
                : ""
            }
            
            <div style="margin: 15px 0; padding: 10px; background: #f9fafb; border-radius: 6px;">
              <strong style="color: #1f2937; display: block; margin-bottom: 5px;">Rating:</strong>
              <span style="font-size: 20px;">${"⭐".repeat(rating)}</span>
            </div>
            
            <div style="margin: 15px 0; padding: 10px; background: #f9fafb; border-radius: 6px;">
              <strong style="color: #1f2937; display: block; margin-bottom: 5px;">Project Type:</strong>
              <span style="background: #ddd6fe; color: #5b21b6; padding: 4px 12px; border-radius: 999px; font-weight: 600; display: inline-block;">${projectType}</span>
            </div>
            
            <div style="background: #fff7ed; border-left: 4px solid #f59e0b; padding: 15px; margin-top: 15px;">
              <strong style="display: block; margin-bottom: 10px;">Review:</strong>
              <p style="margin: 0; white-space: pre-wrap;">${complement}</p>
            </div>
            
            ${
              imageUrl
                ? `
            <div style="margin: 15px 0;">
              <strong style="display: block; margin-bottom: 5px;">Photo:</strong>
              <img src="${imageUrl}" alt="Client photo" style="max-width: 150px; border-radius: 8px;"/>
            </div>
            `
                : ""
            }
            
            ${
              videoUrl
                ? `
            <div style="margin: 15px 0; padding: 10px; background: #f9fafb; border-radius: 6px;">
              <strong style="color: #1f2937; display: block; margin-bottom: 5px;">Video URL:</strong>
              <a href="${videoUrl}" style="color: #7c3aed;">${videoUrl}</a>
            </div>
            `
                : ""
            }
            
            <p style="margin-top: 20px;"><strong>Received:</strong> ${new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })} (Dhaka time)</p>
            
            <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://driplare.com"}/admin/reviews" style="background: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; margin-top: 15px;">Review & Approve</a>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      reviewId: review.id,
      message: "Thank you! Your review will be published within 24 hours.",
    });
  } catch (error: any) {
    console.error("Review submission error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to submit review. Please try again.",
      },
      { status: 500 },
    );
  }
}
