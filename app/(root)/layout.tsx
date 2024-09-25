import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;
  return (
    <div>
      {environment === "production" && <Navbar />}
      {children}
      {environment === "production" && <Footer />}
    </div>
  );
};

export default HomeLayout;
