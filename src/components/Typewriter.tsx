
import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  onDone?: () => void;
}
export function Typewriter({ text, speed = 35, onDone }: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) {
        clearInterval(interval);
        onDone && onDone();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return <span>{displayed}</span>;
}
