import Image from "next/image";
import logo from "@/assets/logo.png";
import UserAction from "./userAction";
import MainNav from "./mainNav";

const Navbar = () => {
  return (
    <section className="flex justify-between container py-5">
      <div className="w-1/5 flex justify-start">
        <Image src={logo} alt="Driplare Logo" width={180} height={100} />
      </div>
      <MainNav />
      <div className="w-1/5 flex justify-end">
        <UserAction />
      </div>
    </section>
  );
};

export default Navbar;
