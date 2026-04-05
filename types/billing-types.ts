export type ProjectStatus = "active" | "paused" | "delivered" | "closed";
export type InvoiceStatus =
  | "draft"
  | "sent"
  | "deposit_paid"
  | "paid"
  | "overdue"
  | "cancelled";
export type PaymentStatus = "pending" | "paid" | "failed" | "cancelled";

export interface Project {
  id: string;
  userId?: string | null;
  customerName: string;
  customerEmail: string;
  productId?: string | null;
  productSlug?: string | null;
  productType: "agent" | "automation" | "website" | "custom";
  productName: string;
  status: ProjectStatus;
  scopeSummary?: string | null;
  timeline?: string | null;
  nextAction?: string | null;
  leadId?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  projectId: string;
  userId?: string | null;
  customerName: string;
  customerEmail: string;
  currency: string;
  totalAmount: number;
  depositPercent: number;
  depositAmount: number;
  remainingAmount: number;
  scopeSummary?: string | null;
  timelineSummary?: string | null;
  termsNote?: string | null;
  refundNote?: string | null;
  status: InvoiceStatus;
  issuedAt: Date | string;
  dueDate?: Date | string | null;
  deliveredAt?: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  userId?: string | null;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: string;
  gatewayRef?: string | null;
  transactionId?: string | null;
  paidAt?: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ApiUsage {
  id: string;
  userId: string;
  period: string;
  messageCount: number;
  tokenCount: number;
  cost: number;
  currency: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
