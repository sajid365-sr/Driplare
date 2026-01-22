"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

// Extend Window interface for gtag
declare global {
    interface Window {
        gtag: (...args: any[]) => void;
    }
}

export function GoogleAnalytics() {
    const pathname = usePathname();
    const [analyticsId, setAnalyticsId] = useState<string | null>(null);

    useEffect(() => {
        // Check if Google Analytics ID is available
        const checkAnalytics = async () => {
            try {
                const response = await fetch("/api/analytics");
                const data = await response.json();
                setAnalyticsId(data.googleAnalyticsId);
            } catch (error) {
                console.error("Failed to load analytics:", error);
            }
        };

        checkAnalytics();
    }, []);

    useEffect(() => {
        if (analyticsId && typeof window !== "undefined" && window.gtag) {
            window.gtag("config", analyticsId, {
                page_path: pathname,
            });
        }
    }, [analyticsId, pathname]);

    // Only load Google Analytics script if we have an ID
    if (!analyticsId) {
        return null;
    }

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${analyticsId}');
        `}
            </Script>
        </>
    );
}