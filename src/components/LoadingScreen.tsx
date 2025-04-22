
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-500">
      <div className="flex flex-col items-center">
        <div className="mb-4 text-2xl font-bold">
          <span className="text-primary">Drip</span>lare
        </div>
        <div className="flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-primary animate-[bounce_0.7s_infinite_0s]"></div>
          <div className="h-3 w-3 rounded-full bg-primary animate-[bounce_0.7s_infinite_0.1s]"></div>
          <div className="h-3 w-3 rounded-full bg-primary animate-[bounce_0.7s_infinite_0.2s]"></div>
        </div>
      </div>
    </div>
  );
}
