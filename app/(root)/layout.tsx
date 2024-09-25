import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[200vh]">
      <Navbar />
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default HomeLayout;
