"use client";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const MainNav = () => {
  const pathName = usePathname();

  const menuItem = [
    {
      href: `/projects`,
      label: "Projects",
      active: pathName === `/projects`,
    },
    {
      href: `/teams`,
      label: "Teams",
      active: pathName === `/teams`,
    },
    {
      href: `/about-us`,
      label: "About Us",
      active: pathName === `/about-us`,
    },
  ];

  const services = [
    {
      href: `/services/web-development`,
      label: "Web Development",
      active: pathName === `/services/web-development`,
    },
    {
      href: `/services/digital-marketing`,
      label: "Digital Marketing",
      active: pathName === `/services/digital-marketing`,
    },
    {
      href: `/services/graphics-design`,
      label: "Graphics Design",
      active: pathName === `/services/graphics-design`,
    },
    {
      href: `/services/content-writing`,
      label: "Content Writing",
      active: pathName === `/services/content-writing`,
    },
  ];

  return (
    <div>
      <NavigationMenu className="font-primary">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              datatype="active"
              href="/"
              className={cn(navigationMenuTriggerStyle())}
            >
              Overview
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Services</NavigationMenuTrigger>
            <NavigationMenuContent className="">
              <ul>
                {services.map(({ active, href, label }) => (
                  <NavigationMenuLink
                    key={href}
                    className={cn("", navigationMenuTriggerStyle())}
                    href={href}
                  >
                    {label}
                  </NavigationMenuLink>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {menuItem.map(({ active, href, label }) => (
            <NavigationMenuItem key={href}>
              <NavigationMenuLink
                href={href}
                className={navigationMenuTriggerStyle()}
              >
                {label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default MainNav;
