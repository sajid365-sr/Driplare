// app/(home)/layout.tsx
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/Footer";
import ChatWidget from "@/components/chatbot/ChatWidget";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <ChatWidget />
      <Footer />
    </>
  );
}
