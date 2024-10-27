import Image from "next/image";
import logo from "@/assets/logo.png";
import logoWhite from "@/assets/logo-white.png";
import UserAction from "./userAction";
import MainNav from "./mainNav";
import Link from "next/link";
import { getServicesRoute } from "@/actions/get-services-route";

const Navbar = async () => {
  const serviceRoute = await getServicesRoute();

  return (
    <div className="flex justify-between px-3 items-center lg:container py-3 md:py-6 z-50">
      <Link href="/">
        <Image
          className="w-[140px]  md:w-[150px] lg:w-[160px]"
          src={logo}
          alt="Driplare Logo"
        />
      </Link>

      <MainNav services={serviceRoute} />

      <UserAction />
    </div>
  );
};

export default Navbar;
