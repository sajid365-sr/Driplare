import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/site-settings";

export async function GET() {
  try {
    const settings = await getSiteSettings();

    if (!settings) {
      return NextResponse.json({ googleAnalyticsId: null });
    }

    return NextResponse.json({
      googleAnalyticsId: settings.googleAnalyticsId
    });
  } catch (error) {
    console.error("Error fetching analytics settings:", error);
    return NextResponse.json({ googleAnalyticsId: null });
  }
}