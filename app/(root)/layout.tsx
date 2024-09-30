import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;
  return (
    <div className="min-h-screen flex flex-col">
      {environment === "production" && <Navbar />}
      <div className="flex-1">{children}</div>
      {environment === "production" && <Footer />}
    </div>
  );
};

export default HomeLayout;
