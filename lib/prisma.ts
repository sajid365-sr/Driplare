import { PrismaClient } from "../prisma/generated/prisma/client";

const prismaClientSingleton = () => {
  // Prisma 7 Docs অনুযায়ী datasourceUrl সরাসরি অবজেক্টের ভেতর থাকবে
  return new PrismaClient({
    // @ts-ignore
    datasourceUrl: process.env.DATABASE_URL as string,
  });
};

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
