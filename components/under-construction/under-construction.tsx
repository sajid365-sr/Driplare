"use client";

import { useState } from "react";
import { Hammer, Mail, Facebook, Twitter, Linkedin } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { Button } from "../ui/button";
import logo from "@/assets/logo-white.png";
import Image from "next/image";
import axios from "axios";

export default function UnderConstruction() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    // setLoading(true);
    e.preventDefault();

    try {
      const res = await axios.post("/api/subscribe", { email: email });
      console.log(res.data);
    } catch (error) {}
  };

  return (
    <section className="bg-black">
      <Link href="/">
        <Image
          src={logo}
          className="xs:w-[100px] md:w-[150px] absolute top-5 left-5"
          alt="Driplare Logo"
          width={150}
        />
      </Link>
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center p-16 bg-black backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-[hsla(30,100%,60%,0.3)]">
          <div className="mb-6 animate-bounce">
            <Hammer
              className="w-20 h-20 mx-auto text-[hsla(30,100%,60%,1)]"
              aria-hidden="true"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-medium text-[hsla(30,100%,60%,1)] mb-4">
            Under Construction
          </h1>
          <p className="text-xl text-gray-300 mb-14">
            We&apos;re working to bring something special for you!
          </p>

          <form className="flex flex-col md:flex-row justify-center items-center gap-6 mb-10">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="px-4 flex-1 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[hsla(30,100%,60%,1)] w-full md:w-auto bg-white bg-opacity-10 text-white placeholder-gray-400"
              required
            />
            <Button
              onClick={handleSubmit}
              type="submit"
              className="bg-[hsla(30,100%,60%,1)]  text-black px-6 py-2 rounded-full hover:bg-opacity-10 transition duration-300 ease-in-out disabled:opacity-50"
            >
              <Mail className="w-5 h-5 mr-2" />
              {loading ? "Subscribing..." : "Notify Me"}
            </Button>
          </form>

          <div className="flex justify-center  space-x-6">
            <Link
              target="_blank"
              href="https://www.facebook.com/driplare/"
              className="text-[hsla(30,100%,60%,1)] hover:text-white transition-colors duration-300"
              aria-label="Facebook"
            >
              <Facebook className="w-8 h-8" />
            </Link>
            <Link
              href="#"
              className="text-[hsla(30,100%,60%,1)] hover:text-white transition-colors duration-300"
              aria-label="Twitter"
            >
              <Twitter className="w-8 h-8" />
            </Link>
            <Link
              href="#"
              className="text-[hsla(30,100%,60%,1)] hover:text-white transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-8 h-8" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
