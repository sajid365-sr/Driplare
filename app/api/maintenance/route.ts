import { NextResponse } from "next/server";
import { getMaintenanceMode } from "@/lib/site-settings";

export async function GET() {
  try {
    const maintenanceMode = await getMaintenanceMode();
    return NextResponse.json({ maintenanceMode });
  } catch (error) {
    console.error("Error fetching maintenance mode:", error);
    return NextResponse.json({ maintenanceMode: false });
  }
}