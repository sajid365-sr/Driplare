"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export function MaintenanceChecker() {
    const { user } = useUser();
    const router = useRouter();
    const pathname = usePathname();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        // Skip maintenance check for admin routes or if user is admin/system_admin
        if (pathname?.startsWith("/admin") ||
            pathname === "/maintenance" ||
            user?.publicMetadata?.role === "admin" ||
            user?.publicMetadata?.role === "system_admin") {
            setChecked(true);
            return;
        }

        // Check maintenance mode
        const checkMaintenance = async () => {
            try {
                const response = await fetch("/api/maintenance");
                const data = await response.json();

                if (data.maintenanceMode && pathname !== "/maintenance") {
                    router.push("/maintenance");
                }
            } catch (error) {
                console.error("Failed to check maintenance mode:", error);
            } finally {
                setChecked(true);
            }
        };

        checkMaintenance();
    }, [pathname, user, router]);

    // Don't render anything, just handle redirects
    return null;
}