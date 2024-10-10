"use client";
import { useState, useEffect } from "react";

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    // Set initial state based on the HTML class
    setIsDarkMode(root.classList.contains("dark"));

    // Define a mutation observer to detect class changes
    const observer = new MutationObserver(() => {
      setIsDarkMode(root.classList.contains("dark"));
    });

    // Start observing changes to the HTML class attribute
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Cleanup observer on unmount
    return () => observer.disconnect();
  }, []);

  return isDarkMode;
};

export default useDarkMode;
