"use server";

import { prisma } from "@/lib/prisma";

export async function getApiUsageForUser(userId: string) {
  try {
    const rows = await prisma.apiUsage.findMany({
      where: { userId },
      orderBy: { period: "desc" },
    });
    return { success: true, data: rows };
  } catch (error) {
    return { success: false, error: "Failed to fetch usage", data: [] };
  }
}

export async function upsertApiUsage(data: {
  userId: string;
  period: string;
  messageCount: number;
  tokenCount: number;
  cost: number;
  currency?: string;
}) {
  try {
    const row = await prisma.apiUsage.upsert({
      where: { userId_period: { userId: data.userId, period: data.period } },
      update: {
        messageCount: data.messageCount,
        tokenCount: data.tokenCount,
        cost: data.cost,
        currency: data.currency ?? "BDT",
      },
      create: {
        userId: data.userId,
        period: data.period,
        messageCount: data.messageCount,
        tokenCount: data.tokenCount,
        cost: data.cost,
        currency: data.currency ?? "BDT",
      },
    });
    return { success: true, data: row };
  } catch (error) {
    return { success: false, error: "Failed to save usage" };
  }
}
