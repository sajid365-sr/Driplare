"use client";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";

function DesktopDropdown({
  item,
  services,
}: {
  item: { label: string; href: string };
  services: { label: string; href: string }[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium  hover:text-gray-700  ">
        {item.label}
        <ChevronDown className="ml-1 h-4 w-4" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
          >
            <div className="py-1">
              {services.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="block px-4 py-2 text-sm  hover:bg-gray-100"
                >
                  {service.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileDropdown({
  item,
  services,
}: {
  item: { label: string; href: string };
  services: { label: string; href: string }[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="w-full flex justify-between items-center pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {item.label}
        <ChevronDown
          className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-gray-50"
          >
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="block pl-8 pr-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                {service.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ServicesProps {
  services: { label: string; href: string }[];
}

const MainNav: React.FC<ServicesProps> = ({ services }) => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItem = [
    {
      href: "/",
      label: "Home",
      active: pathName === "/",
    },
    {
      href: `/services`,
      label: "Services",
      active: pathName === `/services`,
      dropdown: true,
    },
    {
      href: `/portfolio`,
      label: "Portfolio",
      active: pathName === `/portfolio`,
    },
    {
      href: `/teams`,
      label: "Teams",
      active: pathName === `/teams`,
    },
    {
      href: `/contact-us`,
      label: "Contact Us",
      active: pathName === `/contact-us`,
    },
  ];

  return (
    <nav className="">
      <div className=" w-full px-4 sm:px-6 ">
        <div className="flex justify-between h-16">
          <div className="hidden items-center justify-center sm:ml-6 sm:flex sm:space-x-8">
            {menuItem.map((item) =>
              item.dropdown ? (
                <DesktopDropdown
                  key={item.label}
                  item={item}
                  services={services}
                />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "hover:border-gray-700 hover:border-b",
                    pathName === item.href &&
                      "text-primary hover:border-b hover:border-primary"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu */}

          <div className="-mr-2 flex items-center sm:hidden ">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  {isOpen ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu
                      className="block h-6 w-6 fixed right-16"
                      aria-hidden="true"
                    />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="sm:hidden bg-white">
                <div className="pt-2 pb-3 space-y-1">
                  {menuItem.map((item) =>
                    item.dropdown ? (
                      <MobileDropdown
                        key={item.label}
                        item={item}
                        services={services}
                      />
                    ) : (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "block pl-3 pr-4 py-2 border-l-4 text-base font-medium",
                          pathName === item.href
                            ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                            : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
