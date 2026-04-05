"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function generateInvoiceNumber() {
  const year = new Date().getFullYear();
  const counter = await prisma.invoiceCounter.upsert({
    where: { year },
    create: { year, seq: 1 },
    update: { seq: { increment: 1 } },
  });
  const seq = counter.seq;
  return `INV-${year}-${String(seq).padStart(4, "0")}`;
}

export async function createProjectAndInvoice(data: {
  customerName: string;
  customerEmail: string;
  productType: "agent" | "automation" | "website" | "custom";
  productName: string;
  productId?: string;
  productSlug?: string;
  scopeSummary?: string;
  timelineSummary?: string;
  termsNote?: string;
  refundNote?: string;
  totalAmount: number;
  depositPercent?: number;
  dueDate?: Date | string;
}) {
  try {
    const depositPercent = data.depositPercent ?? 50;
    const depositAmount = Number(((data.totalAmount * depositPercent) / 100).toFixed(2));
    const remainingAmount = Number((data.totalAmount - depositAmount).toFixed(2));
    const invoiceNumber = await generateInvoiceNumber();
    const existingUser = await prisma.user.findUnique({
      where: { email: data.customerEmail },
    });

    const project = await prisma.project.create({
      data: {
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        userId: existingUser?.id,
        productType: data.productType,
        productName: data.productName,
        productId: data.productId,
        productSlug: data.productSlug,
        scopeSummary: data.scopeSummary,
        timeline: data.timelineSummary,
        nextAction: "Awaiting deposit payment",
      },
    });

    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        projectId: project.id,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        userId: existingUser?.id,
        totalAmount: data.totalAmount,
        depositPercent,
        depositAmount,
        remainingAmount,
        scopeSummary: data.scopeSummary,
        timelineSummary: data.timelineSummary,
        termsNote: data.termsNote,
        refundNote: data.refundNote,
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
        status: "sent",
      },
    });

    revalidatePath("/admin/invoices");
    return { success: true, data: { project, invoice } };
  } catch (error) {
    console.error("createProjectAndInvoice error:", error);
    return { success: false, error: "Failed to create invoice" };
  }
}

export async function getAllInvoices() {
  try {
    const items = await prisma.invoice.findMany({
      orderBy: { createdAt: "desc" },
      include: { project: true, payments: true },
    });
    return { success: true, data: items };
  } catch (error) {
    return { success: false, error: "Failed to fetch invoices", data: [] };
  }
}

export async function getInvoiceById(id: string) {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: { project: true, payments: true },
    });
    if (!invoice) return { success: false, error: "Not found" };
    return { success: true, data: invoice };
  } catch (error) {
    return { success: false, error: "Not found" };
  }
}

export async function syncInvoicesToUser(userId: string, email: string) {
  try {
    await prisma.invoice.updateMany({
      where: { userId: null, customerEmail: email },
      data: { userId },
    });
    await prisma.project.updateMany({
      where: { userId: null, customerEmail: email },
      data: { userId },
    });
  } catch (error) {
    console.error("syncInvoicesToUser error:", error);
  }
}

export async function getUserInvoices(userId: string, email: string) {
  try {
    await syncInvoicesToUser(userId, email);
    const invoices = await prisma.invoice.findMany({
      where: { OR: [{ userId }, { customerEmail: email }] },
      orderBy: { createdAt: "desc" },
      include: { project: true, payments: true },
    });
    return { success: true, data: invoices };
  } catch (error) {
    return { success: false, error: "Failed to fetch invoices", data: [] };
  }
}

export async function getUserProjects(userId: string, email: string) {
  try {
    await syncInvoicesToUser(userId, email);
    const projects = await prisma.project.findMany({
      where: { OR: [{ userId }, { customerEmail: email }] },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: projects };
  } catch (error) {
    return { success: false, error: "Failed to fetch projects", data: [] };
  }
}

export async function getPendingInvoiceForProduct(params: {
  userId?: string;
  email?: string;
  productType: "agent" | "automation" | "website";
  productSlug: string;
}) {
  try {
    if (!params.userId && !params.email) {
      return { success: false, error: "No user" };
    }
    const invoice = await prisma.invoice.findFirst({
      where: {
        status: { in: ["sent", "deposit_paid"] },
        OR: [
          ...(params.userId ? [{ userId: params.userId }] : []),
          ...(params.email ? [{ customerEmail: params.email }] : []),
        ],
        project: {
          productType: params.productType,
          productSlug: params.productSlug,
        },
      },
      include: { project: true, payments: true },
      orderBy: { createdAt: "desc" },
    });
    if (!invoice) return { success: false, error: "Not found" };
    return { success: true, data: invoice };
  } catch (error) {
    return { success: false, error: "Not found" };
  }
}

export async function markInvoiceDelivered(id: string) {
  try {
    const invoice = await prisma.invoice.update({
      where: { id },
      data: { deliveredAt: new Date() },
    });
    await prisma.project.update({
      where: { id: invoice.projectId },
      data: { status: "delivered", nextAction: "Awaiting final payment" },
    });
    revalidatePath(`/admin/invoices/${id}`);
    revalidatePath(`/invoice/${id}`);
    return { success: true, data: invoice };
  } catch (error) {
    return { success: false, error: "Failed to mark delivered" };
  }
}

export async function createPaymentRecord(data: {
  invoiceId: string;
  userId?: string;
  amount: number;
  currency?: string;
  method?: string;
  gatewayRef?: string;
}) {
  try {
    const payment = await prisma.payment.create({
      data: {
        invoiceId: data.invoiceId,
        userId: data.userId,
        amount: data.amount,
        currency: data.currency ?? "BDT",
        method: data.method ?? "sslcommerz",
        gatewayRef: data.gatewayRef,
        status: "pending",
      },
    });
    return { success: true, data: payment };
  } catch (error) {
    console.error("createPaymentRecord error:", error);
    return { success: false, error: "Failed to create payment" };
  }
}

export async function updatePaymentStatus(data: {
  paymentId: string;
  status: "paid" | "failed" | "cancelled";
  transactionId?: string;
}) {
  try {
    const payment = await prisma.payment.update({
      where: { id: data.paymentId },
      data: {
        status: data.status,
        transactionId: data.transactionId,
        paidAt: data.status === "paid" ? new Date() : undefined,
      },
    });

    if (data.status === "paid") {
      const payments = await prisma.payment.findMany({
        where: { invoiceId: payment.invoiceId, status: "paid" },
      });
      const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
      const invoice = await prisma.invoice.findUnique({
        where: { id: payment.invoiceId },
      });
      if (invoice) {
        const nextStatus =
          totalPaid >= invoice.totalAmount
            ? "paid"
            : totalPaid >= invoice.depositAmount
              ? "deposit_paid"
              : invoice.status;
        await prisma.invoice.update({
          where: { id: invoice.id },
          data: { status: nextStatus },
        });
        if (nextStatus === "deposit_paid") {
          await prisma.project.update({
            where: { id: invoice.projectId },
            data: { status: "active", nextAction: "Setup in progress" },
          });
        }
        if (nextStatus === "paid") {
          await prisma.project.update({
            where: { id: invoice.projectId },
            data: { status: "closed", nextAction: "Completed" },
          });
        }
      }
    }

    revalidatePath(`/invoice/${payment.invoiceId}`);
    revalidatePath("/dashboard");
    return { success: true, data: payment };
  } catch (error) {
    console.error("updatePaymentStatus error:", error);
    return { success: false, error: "Failed to update payment" };
  }
}
