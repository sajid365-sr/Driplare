import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// অ্যাডমিন রাউট এবং সাধারণ প্রটেক্টেড রাউট আলাদা করা হয়েছে
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isProtectedRoute = createRouteMatcher(["/admin(.*)", "/checkout(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth();

  // ১. যদি ইউজার লগইন না করে এবং প্রটেক্টেড রাউটে যাওয়ার চেষ্টা করে
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }

  // ২. যদি অ্যাডমিন রাউটে যাওয়ার চেষ্টা করে কিন্তু রোল 'admin' না হয়
  if (userId && isAdminRoute(req)) {
    // Clerk-এর sessionClaims থেকে রোল চেক করা হচ্ছে
    const role = sessionClaims?.metadata?.role;

    if (role !== "admin") {
      // রোল অ্যাডমিন না হলে তাকে হোমপেজে পাঠিয়ে দেওয়া হবে
      const url = new URL("/", req.url);
      return NextResponse.redirect(url);
    }
  }

  // সব ঠিক থাকলে রিকোয়েস্ট চলতে থাকবে
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
