import Image from "next/image";
import logo from "@/assets/logo.png";
import UserAction from "./userAction";
import MainNav from "./mainNav";
import Link from "next/link";

const Navbar = () => {
  return (
    <section className="flex justify-between container py-3">
      <Link href="/" className="w-1/5 flex justify-start">
        <Image src={logo} alt="Driplare Logo" width={150} />
      </Link>
      <MainNav />
      <div className="w-1/5 flex justify-end">
        <UserAction />
      </div>
    </section>
  );
};

export default Navbar;
