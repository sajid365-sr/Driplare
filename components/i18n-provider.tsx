"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";

const LanguageContext = createContext({
  currentLanguage: "en",
  changeLanguage: (lang: string) => {},
});

export const useLanguage = () => useContext(LanguageContext);

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  useEffect(() => {
    // আগের সেভ করা ল্যাঙ্গুয়েজ লোড করা
    const savedLang = localStorage.getItem("language") || "en";
    i18n.changeLanguage(savedLang);
    setCurrentLanguage(savedLang);
  }, []);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
    localStorage.setItem("language", lang); // ল্যাঙ্গুয়েজ সেভ রাখা
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      <I18nextProvider i18n={i18n}>
        {/* ল্যাঙ্গুয়েজ অনুযায়ী ফন্ট ক্লাস পরিবর্তন হবে */}
        <div
          className={currentLanguage === "bn" ? "font-hind" : "font-montserrat"}
        >
          {children}
        </div>
      </I18nextProvider>
    </LanguageContext.Provider>
  );
}
