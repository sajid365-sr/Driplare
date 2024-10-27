"use client";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import useMediaQuery from "@/hooks/use-media-query";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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
        className="w-full flex justify-between items-center pl-3 pr-4 py-2 border-l-4 border-transparent text-base dark:text-white dark:bg-neutral  text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
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
            className="dark:bg-gray-800"
          >
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="block pl-8 pr-4 py-2 text-base dark:text-gray-200 text-gray-500 hover:text-gray-800 hover:bg-gray-100"
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
  services: { label: string; href: string; description: string }[];
}

const MainNav: React.FC<ServicesProps> = ({ services }) => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width:450px)");

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

  const Dropdown = () => {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Services</NavigationMenuTrigger>
            <NavigationMenuContent>
              <AnimatePresence>
                <motion.ul
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -100 }}
                  transition={{ duration: 0.2 }}
                  className="grid bg-white dark:bg-neutral  w-[400px] gap-4 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] "
                >
                  {services.map(({ href, label, description }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className={cn(
                          "block rounded-md px-4 py-2 transition-colors dark:hover:bg-gray-800 hover:bg-gray-100"
                        )}
                      >
                        <div className="text-sm mb-2 font-semibold  ">
                          {label}
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {description}
                        </p>
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  };

  return (
    <nav className="flex justify-center items-center flex-wrap z-[999]">
      {!isMobile && (
        <div className="  items-center justify-center sm:ml-6 sm:flex sm:space-x-8">
          {menuItem.map((item) =>
            item.dropdown ? (
              <Dropdown key={item.label} />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "hover:bg-gray-50 px-3 py-2 rounded-sm",
                  pathName === item.href && "text-primary"
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      )}

      {/* Mobile Menu */}

      {isMobile && (
        <div className="relative">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="absolute left-16 -bottom-5 ">
              <Button
                variant="ghost"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              >
                {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6 " aria-hidden="true" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="sm:hidden bg-white dark:bg-neutral"
            >
              <div className="pt-2 pb-3 space-y-1">
                {menuItem.map((item) =>
                  item.dropdown ? (
                    // (
                    // <MobileDropdown
                    //   key={item.label}
                    //   item={item}
                    //   services={services}
                    // />
                    // )
                    <Dropdown key={item.label} />
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block pl-3 pr-4 py-2 border-l-4 text-base ",
                        pathName === item.href
                          ? "dark:bg-gray-800 bg-gray-100 border-primary text-primary"
                          : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 dark:text-white hover:text-gray-700"
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
      )}
    </nav>
  );
};

export default MainNav;
