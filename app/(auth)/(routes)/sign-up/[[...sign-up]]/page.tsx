import Image from "next/image";
import loginImg from "@/assets/login.jpg";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <section className="h-screen lg:container">
      <Link href="/" className="xs:pl-5 pt-5 inline-block">
        <Image
          src={logo}
          className="xs:w-[100px] md:w-[150px]"
          alt="Driplare Logo"
        />
      </Link>
      <div className="flex items-center overflow-hidden">
        <div className="md:w-1/2 xs:w-full xs:hidden md:block">
          <Image
            src={loginImg}
            alt="Driplare Login Image"
            className="h-full w-full"
          />
        </div>
        <div className="md:w-1/2 xs:w-full">
          <SignUp />
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
