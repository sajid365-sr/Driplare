"use client";

import { useEffect } from "react";
import { syncUserWithDb } from "@/lib/auth-action";
import { useUser } from "@clerk/nextjs";

export default function SyncUser() {
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    async function sync() {
      // যদি ইউজার লগইন থাকে, তবেই সিঙ্ক হবে
      if (isLoaded && isSignedIn && user) {
        try {
          await syncUserWithDb();
          console.log("User synced with MongoDB successfully.");
        } catch (error) {
          console.error("Sync failed:", error);
        }
      }
    }

    sync();
  }, [isLoaded, isSignedIn, user]);

  return null; // এটি স্ক্রিনে কিছু দেখাবে না
}
