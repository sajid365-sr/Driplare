import { Montserrat, Hind_Siliguri } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import I18nProvider from "@/components/i18n-provider";
import SyncUser from "@/components/auth/SyncUser";
import { Toaster } from "sonner";

// Montserrat configuration
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Hind_Siliguri configuration
const hindSiliguri = Hind_Siliguri({
  subsets: ["latin", "bengali"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

export const metadata = {
  title: "Driplare Management",
  description: "Administrative dashboard and client portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body
          className={`${montserrat.variable} ${hindSiliguri.variable} antialiased font-sans`}
        >
          <I18nProvider>
            <SyncUser />

            {children}

            {/* গ্লোবাল নোটিফিকেশন সিস্টেম */}
            <Toaster position="top-center" richColors />
          </I18nProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
