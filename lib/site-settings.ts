"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface SiteSettings {
    id?: string;
    siteName: string;
    siteTitle: string;
    footerCopyright: string;
    logoUrl?: string | null;
    faviconUrl?: string | null;
    youtubeUrl?: string | null;
    linkedinUrl?: string | null;
    facebookUrl?: string | null;
    twitterUrl?: string | null;
    instagramUrl?: string | null;
    showYouTube: boolean;
    showTwitter: boolean;
    showInstagram: boolean;
    showFacebook: boolean;
    showLinkedin: boolean;
    googleAnalyticsId?: string | null;
    metaDescription?: string | null;
    maintenanceMode: boolean;
    cloudinaryFolder: string;
    resendFromEmail: string;
    updatedAt: Date;
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
    try {
        // Get the first (and should be only) settings record
        const settings = await prisma.siteSettings.findFirst();

        if (!settings) {
            // Create default settings if none exist
            const defaultSettings = await prisma.siteSettings.create({
                data: {
                    siteName: "Driplare",
                    siteTitle: "AI Agent and Automation",
                    footerCopyright: "© 2026 All Rights Reserved",
                    showYouTube: false,
                    showTwitter: false,
                    showInstagram: false,
                    showFacebook: true,
                    showLinkedin: true,
                    maintenanceMode: false,
                    cloudinaryFolder: "portfolio",
                    resendFromEmail: "onboarding@resend.dev",
                },
            });

            return defaultSettings as SiteSettings;
        }

        return settings as SiteSettings;
    } catch (error) {
        console.error("Error fetching site settings:", error);
        return null;
    }
}

export async function updateSiteSettings(
    data: Partial<SiteSettings>
): Promise<{ success: boolean; error?: string }> {
    try {
        // Get existing settings or create new ones
        const existingSettings = await prisma.siteSettings.findFirst();

        // Remove id and updatedAt from data to avoid Prisma validation errors
        const { id, updatedAt, ...updateData } = data;

        if (existingSettings) {
            // Update existing settings
            await prisma.siteSettings.update({
                where: { id: existingSettings.id },
                data: updateData,
            });
        } else {
            // Create new settings
            await prisma.siteSettings.create({
                data: {
                    siteName: updateData.siteName || "Driplare",
                    siteTitle: updateData.siteTitle || "AI Agent and Automation",
                    footerCopyright: updateData.footerCopyright || "© 2026 All Rights Reserved",
                    logoUrl: updateData.logoUrl,
                    faviconUrl: updateData.faviconUrl,
                    youtubeUrl: updateData.youtubeUrl,
                    linkedinUrl: updateData.linkedinUrl,
                    facebookUrl: updateData.facebookUrl,
                    twitterUrl: updateData.twitterUrl,
                    instagramUrl: updateData.instagramUrl,
                    showYouTube: updateData.showYouTube ?? false,
                    showTwitter: updateData.showTwitter ?? false,
                    showInstagram: updateData.showInstagram ?? false,
                    showFacebook: updateData.showFacebook ?? true,
                    showLinkedin: updateData.showLinkedin ?? true,
                    googleAnalyticsId: updateData.googleAnalyticsId,
                    metaDescription: updateData.metaDescription,
                    maintenanceMode: updateData.maintenanceMode ?? false,
                    cloudinaryFolder: updateData.cloudinaryFolder || "portfolio",
                    resendFromEmail: updateData.resendFromEmail || "onboarding@resend.dev",
                },
            });
        }

        revalidatePath("/");
        revalidatePath("/admin/settings");

        return { success: true };
    } catch (error) {
        console.error("Error updating site settings:", error);
        return { success: false, error: "Failed to update settings" };
    }
}

export async function getMaintenanceMode(): Promise<boolean> {
    try {
        const settings = await prisma.siteSettings.findFirst({
            select: { maintenanceMode: true },
        });

        return settings?.maintenanceMode ?? false;
    } catch (error) {
        console.error("Error fetching maintenance mode:", error);
        return false;
    }
}