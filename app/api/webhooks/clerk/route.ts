import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

// Clerk webhook secret - this should be in your environment variables
const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  // if (!CLERK_WEBHOOK_SECRET) {
  //   console.error("CLERK_WEBHOOK_SECRET is not configured");
  //   return NextResponse.json(
  //     { error: "Server configuration error" },
  //     { status: 500 }
  //   );
  // }
  // try {
  //   // Get the headers
  //   const headersList = headers();
  //   const svix_id = headersList.get("svix-id");
  //   const svix_timestamp = headersList.get("svix-timestamp");
  //   const svix_signature = headersList.get("svix-signature");
  //   if (!svix_id || !svix_timestamp || !svix_signature) {
  //     return NextResponse.json(
  //       { error: "Missing webhook headers" },
  //       { status: 400 }
  //     );
  //   }
  //   // Get the body
  //   const body = await request.text();
  //   // Verify the webhook signature
  //   const wh = new Webhook(CLERK_WEBHOOK_SECRET);
  //   let evt: any;
  //   try {
  //     evt = wh.verify(body, {
  //       "svix-id": svix_id,
  //       "svix-timestamp": svix_timestamp,
  //       "svix-signature": svix_signature,
  //     }) as any;
  //   } catch (err) {
  //     console.error("Webhook signature verification failed:", err);
  //     return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  //   }
  //   const { id } = evt.data;
  //   const eventType = evt.type;
  //   console.log(`Webhook received: ${eventType} for user ${id}`);
  //   // Handle user creation
  //   if (eventType === "user.created") {
  //     const { id: clerkId, email_addresses, first_name, last_name } = evt.data;
  //     // Get the primary email
  //     const primaryEmail = email_addresses?.[0]?.email_address;
  //     if (!primaryEmail) {
  //       console.error("No email found for user:", clerkId);
  //       return NextResponse.json(
  //         { error: "No email provided" },
  //         { status: 400 }
  //       );
  //     }
  //     // Construct full name
  //     const name = [first_name, last_name].filter(Boolean).join(" ") || null;
  //     try {
  //       // Create or update user in database
  //       const user = await prisma.user.upsert({
  //         where: { clerkId },
  //         update: {
  //           email: primaryEmail,
  //           name,
  //         },
  //         create: {
  //           clerkId,
  //           email: primaryEmail,
  //           name,
  //         },
  //       });
  //       console.log("User synced to database:", user.id);
  //       return NextResponse.json({ success: true, userId: user.id });
  //     } catch (error) {
  //       console.error("Error syncing user to database:", error);
  //       // If it's a unique constraint error, the user might already exist
  //       if (error.code === "P2002") {
  //         console.log("User already exists, skipping creation");
  //         return NextResponse.json({
  //           success: true,
  //           message: "User already exists",
  //         });
  //       }
  //       return NextResponse.json({ error: "Database error" }, { status: 500 });
  //     }
  //   }
  //   // Handle user update
  //   if (eventType === "user.updated") {
  //     const { id: clerkId, email_addresses, first_name, last_name } = evt.data;
  //     const primaryEmail = email_addresses?.[0]?.email_address;
  //     const name = [first_name, last_name].filter(Boolean).join(" ") || null;
  //     try {
  //       const user = await prisma.user.update({
  //         where: { clerkId },
  //         data: {
  //           email: primaryEmail,
  //           name,
  //         },
  //       });
  //       console.log("User updated in database:", user.id);
  //       return NextResponse.json({ success: true, userId: user.id });
  //     } catch (error) {
  //       console.error("Error updating user in database:", error);
  //       return NextResponse.json({ error: "Database error" }, { status: 500 });
  //     }
  //   }
  //   // Handle user deletion
  //   if (eventType === "user.deleted") {
  //     const { id: clerkId } = evt.data;
  //     try {
  //       // Note: This will cascade delete chat messages due to the relation
  //       await prisma.user.delete({
  //         where: { clerkId },
  //       });
  //       console.log("User deleted from database:", clerkId);
  //       return NextResponse.json({ success: true });
  //     } catch (error) {
  //       console.error("Error deleting user from database:", error);
  //       return NextResponse.json({ error: "Database error" }, { status: 500 });
  //     }
  //   }
  //   // For other events, just acknowledge
  //   return NextResponse.json({
  //     success: true,
  //     message: `Event ${eventType} received`,
  //   });
  // } catch (error) {
  //   console.error("Webhook error:", error);
  //   return NextResponse.json(
  //     { error: "Internal server error" },
  //     { status: 500 }
  //   );
  // }
}
