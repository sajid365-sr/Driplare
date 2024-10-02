import React from "react";
import { Button } from "./button";
import Link from "next/link";
import GetBanner from "@/actions/get-banner";

const Banner = async () => {
  const [banner] = await GetBanner();

  return (
    <section className="bg-gray-50 dark:bg-neutral min-h-screen px-5 lg:container py-10">
      <div className="text-center w-3/4 mx-auto mt-20">
        <h1 className="text-3xl lg:text-5xl  font-semibold mb-5 lg:mb-16 lg:leading-[4rem]">
          {banner?.heading}
        </h1>
        <p className="lg:text-lg tracking-wider dark:text-gray-100">
          {banner?.description}
        </p>
        <div className="pt-10">
          <Link href="/contact-us">
            <Button
              variant={"default"}
              size={"lg"}
              className="hover:bg-neutral hover:text-white dark:text-neutral w-1/3 text-lg"
            >
              {" "}
              {banner?.buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
