// src/components/Hero.tsx
import { useState } from "react";
import statue from "/statue.png"; // replace with your Statue illustration
import documentImg from "/irs-doc.png"; // replace with your IRS doc image
import waveLogo from "/wave-logo.png"; // replace with your Waves logo
import rotaLogo from "/rota-logo.png"; // replace with your RotaShow logo
import travelersLogo from "/travelers-logo.png"; // replace with your Travelers logo
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const [company, setCompany] = useState("");

  return (
    <section className="bg-white min-h-screen dark:bg-transparent text-gray-900 dark:text-gray-100 py-16">
      <div className="container">
        <div className=" p-10 mx-auto  grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl text-neutral-700 dark:text-neutral-300 font-bold leading-tight">
              Empower Your Brand with{" "}
            </h1>
            <h1 className="text-green-500 dark:text-green-400 text-4xl sm:text-5xl font-bold leading-tight">
              AI-Driven Digital Excellence
            </h1>{" "}
            <p className="text-gray-600 dark:text-gray-300 max-w-lg">
              Cutting-edge solutions that transform how businesses connect with
              their audience.
            </p>
            {/* Form */}
            {/* <div className="flex flex-col sm:flex-row gap-3">
              <select
                title="text"
                className="w-full sm:w-32 px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded focus:ring-2 focus:ring-green-500"
              >
                <option>LLC</option>
                <option>Corp</option>
                <option>LLP</option>
              </select>
              <input
                type="text"
                placeholder="Company Name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded focus:ring-2 focus:ring-green-500"
              />
              <button className="px-6 py-2 bg-green-500 dark:bg-green-400 text-white dark:text-gray-900 font-semibold rounded hover:bg-green-600 dark:hover:bg-green-500 transition">
                Start Now
              </button>
            </div> */}
            <div className="flex flex-col sm:flex-row  gap-4 fade-in slide-up">
              <Link to="/contact">
                <Button className="bg-primary hover:bg-primary/90 h-12 px-8 text-lg">
                  Let's Connect
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button variant="outline" className="h-12 px-8 text-lg group">
                  <span>Check Our Works</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            {/* Notes */}
            <div className="flex flex-col sm:flex-row sm:space-x-6 text-sm text-gray-500 dark:text-gray-400 mt-2">
              <div className="flex items-center space-x-1">
                <span className="block w-3 h-3 bg-green-500 dark:bg-green-400 rounded-full" />
                <span>No Hidden Fees</span>
              </div>
              <div className="flex items-center space-x-1 mt-2 sm:mt-0">
                <span className="block w-3 h-3 bg-green-500 dark:bg-green-400 rounded-full" />
                <span>No Document Required</span>
              </div>
            </div>
          </div>
          {/* Right Side */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Background circle */}
            <div className="absolute w-80 h-80 bg-primary dark:bg-orange-400 rounded-full -top-20 -right-10" />

            {/* Statue + Doc */}
            <div className="relative z-10">
              {/* <img
              src={statue}
              alt="Statue of Liberty"
              className="w-64 mx-auto lg:mr-0"
            />
            <img
              src={documentImg}
              alt="IRS document"
              className="absolute top-8 left-1/2 transform -translate-x-1/2 w-40 shadow-lg"
            /> */}
            </div>
          </div>
        </div>
        {/* Rating & Logos */}
        <div className="mt-16 px-10 flex gap-5 flex-col md:flex-row  ">
          {/* Rating */}
          <div className="flex flex-1 items-center space-x-3 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <div className="text-3xl font-bold">4.8</div>
            <div className="flex items-center">
              {/* <img src={waveLogo} alt="Stars" className="h-6 w-auto" /> */}
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                502 reviews
              </span>
            </div>
          </div>

          {/* Satisfied Customers */}
          <div className="mt-4 sm:mt-0 flex flex-col  sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-gray-500 dark:text-gray-400">
            <span className="font-semibold">
              500+ Total Satisfied Customers Worldwide
            </span>
            <div className="flex items-center space-x-4">
              <img src="trusted-company.png" alt="Waves" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
