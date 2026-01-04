import { Montserrat, Hind_Siliguri } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import I18nProvider from "@/components/i18n-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/Footer";

// Montserrat configuration
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"], // নির্দিষ্ট ওয়েট দিলে বিল্ড স্টেবল হয়
  display: "swap",
});

// Hind_Siliguri configuration
const hindSiliguri = Hind_Siliguri({
  subsets: ["latin", "bengali"], // শুধু বেঙ্গলি না দিয়ে ল্যাটিনসহ দিন
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${montserrat.variable} ${hindSiliguri.variable} antialiased`}
        >
          <I18nProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </I18nProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
