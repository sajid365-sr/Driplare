// src/components/FlexSlider.tsx
import React, { useState, useRef, useEffect } from "react";
import "./FlexSlider.css"; // contains the cube keyframes

type SlideDef = {
  key: string;
  title: string;
  bgImage: string;
  content: React.ReactNode;
};

const SLIDES: SlideDef[] = [
  {
    key: "home",
    title: "Home",
    bgImage:
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/769286/lake-macquarie-71208_1920.jpg",
    content: "Click here to navigate to the home section of the website",
  },
  {
    key: "about",
    title: "About",
    bgImage:
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/769286/beach-2089959_1280.jpg",
    content: "Click here to navigate to the About section of the website",
  },
  {
    key: "work",
    title: "Work",
    bgImage:
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/769286/forest-208517_1280.jpg",
    content: (
      <ul className="list-disc list-inside">
        <li>First piece of work</li>
        <li>Second piece of work</li>
        <li>Third piece of work</li>
      </ul>
    ),
  },
  {
    key: "contact",
    title: "Contact",
    bgImage:
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/769286/lake-696098_1920.jpg",
    content: <></>,
  },
];

export default function FlexSlider() {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const handleClick = (key: string) => {
    setActiveKey((current) => (current === key ? null : key));
  };

  return (
    <div className="relative h-screen w-full">
      <div className="flex h-full w-full overflow-hidden">
        {SLIDES.map(({ key, title, bgImage, content }) => {
          const isActive = key === activeKey;
          return (
            <div
              key={key}
              data-bg={bgImage}
              onClick={() => handleClick(key)}
              className={`
                flex-shrink-0 flex rounded-2xl mx-5
                items-center justify-center text-white 
                text-center cursor-pointer transition-[flex] duration-500
                ${isActive ? "flex-[3]" : "flex-[1]"}
              `}
              style={{
                background: `url(${bgImage}) center/cover no-repeat`,
              }}
            >
              <div
                className={`transform rotate-90 text-6xl font-bold select-none transition-transform duration-500 ${
                  isActive ? "rotate-0" : "rotate-90"
                }`}
              >
                {title}
              </div>
              <div
                className={`mt-4 px-4 transition-opacity duration-500 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              >
                {content}
              </div>
            </div>
          );
        })}
      </div>

      {/* Branding SVG Link */}
      <a
        className="fixed bottom-5 right-5 bg-white p-3 rounded-full shadow-lg"
        href="https://cameronfitzwilliam.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* SVG here */}
      </a>
    </div>
  );
}
