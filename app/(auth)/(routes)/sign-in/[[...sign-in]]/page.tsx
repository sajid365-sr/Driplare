import React from "react";
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import loginImg from "@/assets/login.jpg";

const SignInPage = () => {
  return (
    <div className="h-screen container flex items-center">
      <div className="w-1/2">
        <Image
          src={loginImg}
          alt="Driplare Login Image"
          className="h-full w-full"
        />
      </div>
      <div className="w-1/2">
        <SignIn />
      </div>
    </div>
  );
};

export default SignInPage;
