"use server";

import { prisma } from "@/lib/prisma";
import { encryptSecret } from "@/lib/crypto";

export async function upsertClientApiKey(data: {
  email: string;
  provider?: string;
  rawKey: string;
}) {
  try {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      return { success: false, error: "User not found" };
    }

    const enc = encryptSecret(data.rawKey);
    const encryptedKey = JSON.stringify(enc);
    const keyLast4 = data.rawKey.slice(-4);

    const key = await prisma.clientApiKey.upsert({
      where: { userId_provider: { userId: user.id, provider: data.provider ?? "openai" } },
      update: {
        encryptedKey,
        keyLast4,
        status: "active",
      },
      create: {
        userId: user.id,
        provider: data.provider ?? "openai",
        encryptedKey,
        keyLast4,
        status: "active",
      },
    });

    return { success: true, data: key };
  } catch (error) {
    console.error("upsertClientApiKey error:", error);
    return { success: false, error: "Failed to save key" };
  }
}

export async function getAllClientApiKeys() {
  try {
    const keys = await prisma.clientApiKey.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: keys };
  } catch (error) {
    return { success: false, error: "Failed to fetch keys", data: [] };
  }
}
