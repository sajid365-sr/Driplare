"use client";

import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "./i18n-provider";
import Image from "next/image";
import { motion } from "framer-motion";

const languages = [
  {
    code: "en",
    name: "English",
    short: "US",
    flag: "https://flagcdn.com/w40/us.png",
  },
  {
    code: "bn",
    name: "বাংলা",
    short: "BD",
    flag: "https://flagcdn.com/w40/bd.png",
  },
];

export function LanguageSwitcher() {
  const { currentLanguage, changeLanguage } = useLanguage();

  // বর্তমান সিলেক্টেড ল্যাঙ্গুয়েজ অবজেক্ট খুঁজে বের করা
  const selectedLang =
    languages.find((l) => l.code === currentLanguage) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 px-2 h-9 hover:bg-gray-100 rounded-full transition-all"
        >
          <div className="relative w-5 h-5 overflow-hidden rounded-full border border-gray-200">
            <Image
              src={selectedLang.flag}
              alt={selectedLang.name}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-sm font-medium text-gray-700 uppercase">
            {selectedLang.code}
          </span>
          <ChevronDown className="h-3 w-3 text-gray-400" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[150px] p-1 rounded-xl shadow-xl border-gray-100"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
              currentLanguage === lang.code
                ? "bg-orange-50 text-orange-600"
                : "text-gray-600"
            }`}
          >
            <div className="relative w-5 h-5 overflow-hidden rounded-full border border-gray-100">
              <Image
                src={lang.flag}
                alt={lang.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col flex-1">
              <span className="text-[13px] font-semibold leading-none">
                {lang.name}
              </span>
            </div>

            {currentLanguage === lang.code && (
              <motion.div layoutId="activeCheck">
                <Check className="h-4 w-4 text-orange-600" />
              </motion.div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
