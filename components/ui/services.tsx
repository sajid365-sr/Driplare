"use client";
import { services } from "@/constants/data";
import React from "react";
import { Tilt } from "react-tilt";
import { ChevronRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import Image from "next/image";

const Services = () => {
  const defaultOptions = {
    reverse: false, // reverse the tilt direction
    max: 30, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1, // 2 = 200%, 1.5 = 150%, etc..
    speed: 1000, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  };
  return (
    <section className="lg:container px-5 mt-32 flex flex-col gap-10">
      <div className="text-center">
        <h1 className="lg:text-6xl text-4xl font-semibold">We Offer</h1>
        <p className="lg:text-xl  mt-5">
          Boost your business with custom, responsive web design and development
          that drives results.
        </p>
      </div>
      <div className="bg-orange-50 rounded-2xl lg:pl-20 pl-5 pb-24">
        <Carousel
          opts={{
            align: "start",
          }}
          className="relative"
        >
          <CarouselContent>
            {services.map(({ id, title, thumbnail, description }) => (
              <CarouselItem key={id} className="md:basis-1/2 lg:basis-1/3">
                <Tilt options={defaultOptions}>
                  <Card className=" h-[400px] w-[350px]  relative bg-white border-0">
                    <CardContent className="p-5">
                      <div className="mb-5 grid place-items-center rounded-md bg-orange-50">
                        <Image
                          src={thumbnail}
                          height={150}
                          width={200}
                          alt="Driplare Service Image"
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl mb-5 font-semibold">{title}</h3>
                        <p>{description}</p>

                        <Link
                          className="text-primary items-center gap-3 hover:gap-5 transition-all flex absolute bottom-5 mt-5"
                          href="#"
                        >
                          Learn More
                          <ChevronRight size={20} />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </Tilt>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute -bottom-10 hidden md:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Services;
