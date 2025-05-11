// src/pages/NotFound.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => navigate("/"), 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  if (!mounted) return null;

  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    initialX: Math.random() * window.innerWidth,
    initialY: Math.random() * window.innerHeight,
    destinationX: Math.random() * window.innerWidth,
    destinationY: Math.random() * window.innerHeight,
  }));

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background dark:bg-background-dark">
      {/* animated particles background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#4dd193_0%,_transparent_50%)]"
        />
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: p.initialX, y: p.initialY }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: p.destinationX,
              y: p.destinationY,
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full"
          />
        ))}
      </div>

      {/* content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-7xl md:text-9xl font-bold mb-4 bg-gradient-to-r from-[#4dd193] via-purple-500 to-[#4dd193] bg-[length:200%_100%] animate-gradient text-transparent bg-clip-text">
            404
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-foreground-dark dark:text-foreground-light">
            Oops! You’ve ventured off the map…
          </h2>
          <p className="text-muted-foreground dark:text-muted-foreground-dark mb-6 max-w-md mx-auto">
            We’ll bring you back home in a few seconds.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </Button>
            <Link to="/">
              <Button className="bg-gradient-to-r from-[#4dd193] to-purple-500 group">
                <Home className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Home Page
              </Button>
            </Link>
          </div>

          {/* progress bar */}
          <div className="max-w-xs mx-auto">
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="h-1 bg-gradient-to-r from-[#4dd193] to-purple-500 rounded-full"
            />
            <p className="text-sm text-muted-foreground dark:text-muted-foreground-dark mt-2">
              Redirecting in 5 seconds…
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
