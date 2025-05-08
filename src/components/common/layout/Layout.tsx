
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { Navbar } from "../navigation/Navbar";
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer";
import { ScrollToTopButton } from "../ScrollToTopButton";
import ScrollToTop from "../ScrollToTop";
import { Toaster } from "sonner";
import { ChatbotWidget } from "../chatbot/ChatbotWidget";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <LoadingScreen />
      <ScrollToTop />
      <ScrollToTopButton />
      <Toaster position="top-center" richColors />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
};

export default Layout;
