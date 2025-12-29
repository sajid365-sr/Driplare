import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const stats = [
  { number: 5, suffix: "+", label: "Countries Served", prefix: "" },
  { number: 500, suffix: "+", label: "Satisfied Clients", prefix: "" },
  { number: 1000000, suffix: "+", label: "API Calls Handled", prefix: "1M" }
];

export function StatsBanner() {
  const [animatedNumbers, setAnimatedNumbers] = useState(stats.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedNumbers(prev =>
        prev.map((num, index) => {
          const target = stats[index].number;
          const increment = target / 100; // Animate over 100 steps
          return num < target ? Math.min(num + increment, target) : target;
        })
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-[#0A0A0A] relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#1F1F1F] to-[#0A0A0A] opacity-50"></div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#FF6B00] rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="space-y-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              {/* Glowing Number */}
              <div className="relative">
                <motion.div
                  className="text-5xl md:text-6xl font-mono font-bold text-[#FF6B00]"
                  style={{
                    textShadow: '0 0 20px rgba(255, 107, 0, 0.5)',
                  }}
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(255, 107, 0, 0.5)',
                      '0 0 30px rgba(255, 107, 0, 0.8)',
                      '0 0 20px rgba(255, 107, 0, 0.5)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {stat.prefix}
                  {Math.floor(animatedNumbers[index]).toLocaleString()}
                  {stat.suffix}
                </motion.div>

                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 border-2 border-[#FF6B00] rounded-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.8, 1.1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                />
              </div>

              {/* Label */}
              <div className="space-y-2">
                <h3 className="text-white font-bold text-lg">{stat.label}</h3>
                <div className="w-16 h-0.5 bg-[#FF6B00] mx-auto"></div>
              </div>

              {/* Status indicator */}
              <div className="flex justify-center">
                <div className="flex items-center gap-2 bg-[#1F1F1F] px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white/60 font-mono text-xs">ACTIVE</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Footer */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <div className="inline-block bg-[#1F1F1F] border border-[#E5E5E5]/20 rounded-lg px-6 py-3">
            <div className="flex items-center gap-4 text-white/60 font-mono text-sm">
              <span>SYSTEM_STATUS:</span>
              <span className="text-green-400">OPERATIONAL</span>
              <span>|</span>
              <span>GLOBAL_UPTIME:</span>
              <span className="text-[#FF6B00]">99.9%</span>
              <span>|</span>
              <span>LAST_UPDATE:</span>
              <span className="text-white">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
