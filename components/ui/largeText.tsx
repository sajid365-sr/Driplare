import React from "react";
import AnimatedTextWord from "../motion/AnimatedTextWord";

const LargeText = ({ text }: { text: string }) => {
  return (
    <div className=" container  my-16">
      <AnimatedTextWord text={text} className="justify-center text-7xl" />
    </div>
  );
};

export default LargeText;
