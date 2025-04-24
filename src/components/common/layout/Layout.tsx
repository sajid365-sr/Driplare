import React from "react";
import AnimatedGridBg from "../AnimatedGridBg";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "../navigation/Navbar";
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer";
import { ScrollToTopButton } from "../ScrollToTopButton";
import ScrollToTop from "../ScrollToTop";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedGridBg />
      <LoadingScreen />
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Layout;
