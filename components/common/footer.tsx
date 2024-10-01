import Link from "next/link";
import { Facebook, Linkedin, Twitter, Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { getServicesRoute } from "@/actions/get-services-route";

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://www.facebook.com/driplare/",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/company/driplare",
  },
  { name: "Twitter", icon: Twitter, href: "#" },
];

const importantLinks = [
  { name: "Affiliate", href: "/affiliate" },
  { name: "Client Review", href: "/client-review" },
  { name: "Our Portfolio", href: "/portfolio" },
  { name: "Terms & Conditions", href: "/terms-conditions" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Contact Us", href: "/contact" },
];

const Footer = async () => {
  const serviceRoute = await getServicesRoute();

  return (
    <footer className="bg-gray-100 container bottom-0 dark:bg-gray-900">
      <div className="container mx-auto px-6 py-8">
        <div className="flex space-y-5   lg:space-x-5 items-center flex-col md:flex-row">
          {/* Section 1: About Driplare */}
          <div className="hidden  lg:block lg:flex-1 ">
            <Link href="/">
              <Image
                className="w-[140px] md:w-[150px] lg:w-[160px]"
                src={logo}
                alt="Driplare Logo"
              />
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mt-5">
              Driplare is your go-to technology partner, specializing in web
              development, digital marketing, graphic design, and content
              writing. We focus on innovative solutions that enhance your
              brand&apos;s online visibility and success.
            </p>
          </div>

          {/* Section 2: Services */}
          <div className=" lg:flex-1 text-center lg:text-start ">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Services
            </h2>
            <ul className="space-y-2">
              {serviceRoute?.map((service: { label: string; href: string }) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Important Links*/}
          <div className=" lg:flex-1 text-center lg:text-start">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Important Links
            </h2>
            <ul className="space-y-2 mb-8">
              {importantLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Social & Contact */}
          <div className="lg:flex-1 gap-5  flex flex-col-reverse lg:flex-col text-center lg:text-start">
            {/* Social Links */}
            <div className=" mb-8 flex justify-center  lg:justify-start space-x-5 ">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <link.icon className="h-6 w-6" />
                  <span className="sr-only">{link.name}</span>
                </Link>
              ))}
            </div>

            {/* Contact */}
            <div className="">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Contact
              </h2>
              <ul className="space-y-2 ">
                <li className="flex items-center justify-center lg:justify-start text-gray-600 dark:text-gray-400">
                  <Phone className="h-5 w-5 mr-2" />
                  <span>+880 1608331365</span>
                </li>
                <li className="flex items-center justify-center lg:justify-start text-gray-600 dark:text-gray-400">
                  <Mail className="h-5 w-5 mr-2" />
                  <a href="mailto:info@driplare.com">info@driplare.com</a>
                </li>
                <li className="flex items-center justify-center lg:justify-start text-gray-600 dark:text-gray-400">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>Gazipur, Dhaka, Bangladesh</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Driplare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
