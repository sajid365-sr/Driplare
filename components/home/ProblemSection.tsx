"use client";

import { motion } from "framer-motion";
import { Clock, Moon, DollarSign, TrendingDown } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ProblemSection() {
  const { t } = useTranslation("homePage");

  const problems = [
    {
      icon: Clock,
      title: t("problem.points.slow.title"),
      description: t("problem.points.slow.description"),
      color: "from-red-500 to-red-600",
      stat: "60%",
      statLabel: t("problem.stats.lostCustomers"),
    },
    {
      icon: Moon,
      title: t("problem.points.sleep.title"),
      description: t("problem.points.sleep.description"),
      color: "from-blue-500 to-blue-600",
      stat: "8hrs",
      statLabel: t("problem.stats.missedTime"),
    },
    {
      icon: DollarSign,
      title: t("problem.points.staff.title"),
      description: t("problem.points.staff.description"),
      color: "from-yellow-500 to-yellow-600",
      stat: "$300+",
      statLabel: t("problem.stats.monthlyCost"),
    },
  ];

  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-destructive/10 border border-destructive/20 rounded-full px-4 py-2 mb-6"
          >
            <TrendingDown className="w-4 h-4 text-destructive" />
            <span className="text-sm font-semibold text-destructive">
              {t("problem.badge")}
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
            {t("problem.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("problem.subtitle")}
          </p>
        </motion.div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card border-2 border-border rounded-2xl p-8 h-full hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                {/* Icon with Gradient */}
                <div className="mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${problem.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <problem.icon className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {problem.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {problem.description}
                </p>

                {/* Stat */}
                <div className="pt-6 border-t border-border">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-3xl font-black bg-gradient-to-br ${problem.color} bg-clip-text text-transparent`}>
                      {problem.stat}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {problem.statLabel}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 bg-primary/10 border-2 border-primary/20 rounded-2xl px-8 py-4 group cursor-pointer hover:bg-primary/20 transition-all">
            <span className="text-lg font-bold text-foreground">
              {t("problem.cta")}
            </span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <span className="text-2xl">→</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}