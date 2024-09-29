import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="-mr-2 flex items-center sm:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </Button>
        </SheetTrigger>
        {/* <SheetContent side="right" className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {menuItem.map((item) =>
              item.dropdown ? (
                <MobileDropdown
                  key={item.label}
                  item={item}
                  services={services}
                />
              ) : (
                <MobileNavLink
                  key={item.href}
                  href={item.href}
                  active={pathName === item.href}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </MobileNavLink>
              )
            )}
          </div>
        </SheetContent> */}
      </Sheet>
    </div>
  );
};

export default MobileMenu;
