"use client";
import { useState } from "react";

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);

  return { isDark, setIsDark };
};

export default useDarkMode;
