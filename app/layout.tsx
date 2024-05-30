import type { Metadata } from "next";
import "./globals.css";
import { Montserrat, Forum } from "next/font/google";

export const metadata: Metadata = {
  title: "Driplare",
  description: "Your digital evolution starts here",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});
const forum = Forum({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-forum",
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={` ${montserrat.variable} ${forum.variable}`}>
      <body>{children}</body>
    </html>
  );
}
