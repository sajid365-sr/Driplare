import React from "react";
import { Button } from "./button";
import Link from "next/link";

const Banner = () => {
  return (
    <section className="bg-gray-50 dark:bg-neutral min-h-screen px-5 lg:container py-10">
      <div className="flex flex-col md:flex-row ">
        <div className="lg:w-3/5 w-full text-center lg:text-start">
          <h1 className="text-3xl lg:text-5xl  font-semibold mb-5 lg:mb-16 lg:leading-[4rem]">
            Your Partner in Digital Growth and Creative Excellence
          </h1>
          <p className="lg:text-lg tracking-wider dark:text-gray-100">
            Driplare offers expert web development, digital marketing, graphic
            design, and content writing services. We create responsive websites,
            boost online presence through strategic marketing, and craft
            standout visuals and content. <br /> <br /> Our goal is to help your
            business succeed in the digital world with innovative and
            high-quality solutions.
          </p>
          <div className="pt-10">
            <Link href="/contact-us">
              <Button
                variant={"default"}
                size={"lg"}
                className="hover:bg-neutral hover:text-white dark:text-neutral w-1/3 text-lg"
              >
                {" "}
                Get Started
              </Button>
            </Link>
          </div>
        </div>
        <div className="lg:w-2/5 w-full"></div>
      </div>
    </section>
  );
};

export default Banner;
