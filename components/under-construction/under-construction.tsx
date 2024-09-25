"use client";

import { useState, useEffect } from "react";
import { Hammer, Mail, Facebook, Twitter, Linkedin } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

const initialState = {
  message: "",
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      // onClick={() => {
      //   !pending &&
      //     toast({
      //       description: "We will notify you on time.",
      //       className: "text-white",
      //     });
      // }}
      type="submit"
      disabled={pending}
      className="bg-[hsla(30,100%,60%,1)] text-black px-6 py-2 rounded-full hover:bg-opacity-90 transition duration-300 ease-in-out flex items-center justify-center w-full md:w-auto disabled:opacity-50"
    >
      <Mail className="w-5 h-5 mr-2" />
      {pending ? "Subscribing..." : "Notify Me"}
    </button>
  );
}

export default function UnderConstruction() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  async function subscribeToNewsletter(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;

    if (!email) {
      return { success: false, message: "Email is required" };
    }

    await new Promise((resolve) =>
      setTimeout(() => {
        resolve;
        toast({
          description: "We will notify you on time.",
          className: "text-white",
        });
      }, 1000)
    );

    return {
      success: true,
    };
  }

  const [state, formAction] = useFormState(subscribeToNewsletter, initialState);

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);

    const timer = setInterval(() => {
      const difference = +targetDate - +new Date();
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center p-8 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-[hsla(30,100%,60%,0.3)]">
        <div className="mb-8 animate-bounce">
          <Hammer
            className="w-24 h-24 mx-auto text-[hsla(30,100%,60%,1)]"
            aria-hidden="true"
          />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-[hsla(30,100%,60%,1)] mb-4">
          Under Construction
        </h1>
        <p className="text-xl text-white mb-8">
          We&apos;re working hard to bring you something amazing!
        </p>
        <div className="flex justify-center space-x-4 mb-8">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="text-center">
              <div className="text-3xl md:text-5xl font-bold text-[hsla(30,100%,60%,1)]">
                {value}
              </div>
              <div className="text-sm uppercase text-white">{unit}</div>
            </div>
          ))}
        </div>
        <form
          action={formAction}
          className="flex  flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 mb-6"
        >
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="px-4 flex-1 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[hsla(30,100%,60%,1)] w-full md:w-auto bg-white bg-opacity-10 text-white placeholder-gray-400"
            required
          />
          <SubmitButton />
        </form>
        {state.message && (
          <p
            className={`mb-6 text-lg ${
              state.success ? "text-green-400" : "text-red-400"
            }`}
            role="status"
          >
            {state.message}
          </p>
        )}
        <div className="flex justify-center space-x-6">
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
  );
}
