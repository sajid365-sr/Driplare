"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { link } from "fs";

const Navbar = () => {
  const pathName = usePathname();
  const params = useParams();

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
      href: `/abut-us`,
      label: "About Us",
      active: pathName === `/abut-us`,
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
    <section className="flex justify-between">
      <div className="w-1/5">Logo</div>
      <NavigationMenu className="w-3/5">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/"
              className={cn(
                "hover:bg-orange-100",
                navigationMenuTriggerStyle()
              )}
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
      <div className="w-1/5">Login/SignUp</div>

      {/* <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        shadcn/ui
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Beautifully designed components that you can copy and
                        paste into your apps. Accessible. Customizable. Open
                        Source.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/docs" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="/docs/installation" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <ListItem href="/docs">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Documentation
              </NavigationMenuLink>
            </ListItem>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu> */}
    </section>
  );
};

export default Navbar;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
