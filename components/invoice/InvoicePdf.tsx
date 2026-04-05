import React from "react";
import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 32, fontSize: 11, fontFamily: "Helvetica", color: "#0f172a" },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  brandRow: { flexDirection: "row", gap: 10 },
  logo: { width: 90, height: 28, objectFit: "contain" },
  label: { fontSize: 9, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 2 },
  title: { fontSize: 18, fontWeight: 700 },
  meta: { textAlign: "right" },
  block: { marginTop: 16 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  small: { color: "#64748b" },
  tableHeader: { flexDirection: "row", borderBottom: "1px solid #e2e8f0", paddingBottom: 6, marginTop: 12 },
  tableRow: { flexDirection: "row", borderBottom: "1px solid #e2e8f0", paddingVertical: 8 },
  colDesc: { flex: 1 },
  colQty: { width: 50, textAlign: "right" },
  colRate: { width: 80, textAlign: "right" },
  colAmount: { width: 90, textAlign: "right" },
  totals: { marginTop: 12, width: 200, alignSelf: "flex-end" },
  totalsRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 4 },
  totalsStrong: { fontSize: 12, fontWeight: 700, borderTop: "1px solid #e2e8f0", paddingTop: 6, marginTop: 6 },
  footer: { marginTop: 16, fontSize: 9, color: "#64748b" },
});

export default function InvoicePdf({
  invoice,
  logoUrl,
  siteName,
  companyAddress,
  companyPhone,
  companyEmail,
  companyWebsite,
  companyVatNumber,
  paymentInstructions,
  invoiceFooterNote,
}: {
  invoice: any;
  logoUrl?: string;
  siteName?: string;
  companyAddress?: string | null;
  companyPhone?: string | null;
  companyEmail?: string | null;
  companyWebsite?: string | null;
  companyVatNumber?: string | null;
  paymentInstructions?: string | null;
  invoiceFooterNote?: string | null;
}) {
  const invoiceNo = invoice.invoiceNumber ?? invoice.id;
  const issued = invoice.issuedAt ? new Date(invoice.issuedAt).toDateString() : "";
  const due = invoice.dueDate ? new Date(invoice.dueDate).toDateString() : "—";
  const companyLines = [companyAddress, companyPhone, companyEmail, companyWebsite, companyVatNumber]
    .filter(Boolean)
    .map((line) => String(line));
  const payments = invoice.payments ?? [];
  const totalPaid = payments.filter((p: any) => p.status === "paid").reduce((sum: number, p: any) => sum + p.amount, 0);
  const amountDue = Math.max(invoice.totalAmount - totalPaid, 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.brandRow}>
            {logoUrl ? <Image src={logoUrl} style={styles.logo} /> : null}
            <View>
              <Text style={styles.label}>Invoice</Text>
              <Text style={styles.title}>{siteName ?? "Driplare"}</Text>
              {companyLines.map((line) => (
                <Text key={line} style={styles.small}>{line}</Text>
              ))}
            </View>
          </View>
          <View style={styles.meta}>
            <Text style={styles.label}>Invoice No</Text>
            <Text>#{invoiceNo}</Text>
            <Text style={styles.small}>Issued: {issued}</Text>
            <Text style={styles.small}>Due: {due}</Text>
          </View>
        </View>

        <View style={[styles.row, { marginBottom: 8 }]}>
          <View style={{ width: "48%" }}>
            <Text style={styles.label}>Bill To</Text>
            <Text>{invoice.customerName}</Text>
            <Text style={styles.small}>{invoice.customerEmail}</Text>
          </View>
          <View style={{ width: "48%" }}>
            <Text style={styles.label}>Service</Text>
            <Text>{invoice.project?.productName ?? "Service"}</Text>
            {invoice.scopeSummary ? <Text style={styles.small}>{invoice.scopeSummary}</Text> : null}
          </View>
        </View>

        <View style={styles.tableHeader}>
          <Text style={styles.colDesc}>Description</Text>
          <Text style={styles.colQty}>Qty</Text>
          <Text style={styles.colRate}>Rate</Text>
          <Text style={styles.colAmount}>Amount</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.colDesc}>{invoice.project?.productName ?? "Service"}</Text>
          <Text style={styles.colQty}>1</Text>
          <Text style={styles.colRate}>৳{invoice.totalAmount}</Text>
          <Text style={styles.colAmount}>৳{invoice.totalAmount}</Text>
        </View>

        <View style={styles.totals}>
          <View style={styles.totalsRow}><Text style={styles.small}>Subtotal</Text><Text>৳{invoice.totalAmount}</Text></View>
          <View style={styles.totalsRow}><Text style={styles.small}>Deposit</Text><Text>৳{invoice.depositAmount}</Text></View>
          <View style={styles.totalsRow}><Text style={styles.small}>Paid</Text><Text>৳{totalPaid}</Text></View>
          <View style={styles.totalsRow}><Text style={styles.small}>Remaining</Text><Text>৳{invoice.remainingAmount}</Text></View>
          <View style={[styles.totalsRow, styles.totalsStrong]}><Text>Amount Due</Text><Text>৳{amountDue}</Text></View>
        </View>

        <View style={styles.block}>
          <Text style={styles.label}>Terms</Text>
          <Text style={styles.small}>{invoice.termsNote || "50% upfront deposit, 50% after delivery."}</Text>
          {invoice.refundNote ? <Text style={styles.small}>Refund: {invoice.refundNote}</Text> : null}
        </View>

        {paymentInstructions ? (
          <View style={styles.block}>
            <Text style={styles.label}>Payment Instructions</Text>
            <Text style={styles.small}>{paymentInstructions}</Text>
          </View>
        ) : null}

        <Text style={styles.footer}>{invoiceFooterNote ?? "Thank you for choosing Driplare. We appreciate your trust."}</Text>
      </Page>
    </Document>
  );
}
