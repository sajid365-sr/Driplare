import { useEffect } from "react";
import { Navbar } from "@/components/common/navigation/Navbar";
import AnimatedGridBg from "@/components/common/AnimatedGridBg";
import { HeroShowcase } from "@/components/portfolio-page/HeroShowcase";
import { ProjectGrid } from "@/components/portfolio-page/ProjectGrid";
import { FeaturedCaseStudy } from "@/components/portfolio-page/FeaturedCaseStudy";
import { InsightsChart } from "@/components/portfolio-page/InsightsChart";
// Replace ClientLogosCarousel with our new infinite slider:
import { InfiniteBrandsSlider } from "@/components/portfolio-page/InfiniteBrandsSlider";
import { CollaborateBanner } from "@/components/portfolio-page/CollaborateBanner";
import { motion } from "framer-motion";

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay },
});

const containerFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 0.15 } },
};

const sectionCard =
  "backdrop-blur-xl bg-white/10 border border-primary/5 rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col items-center w-full max-w-6xl mx-auto my-12";

const description = `Step into tomorrow's web and brand experience. At Driplare, we design bleeding-edge solutions that blend creativity with AI innovation. Our portfolio showcases vision, performance, and elegance — built for the future-facing team. From strategy to launch, every pixel and interaction pushes the boundaries of what's possible.`;

const description2 = `Explore our selected projects and discover how we transform ideas into beautiful, impactful products that don't just meet the moment, but shape what's next.`;

const highlightGradient = "bg-gradient-to-r from-primary/30 via-background/80 to-primary/50";

const trustedDesc =
  "Trusted by industry leaders and innovators who demand performance, design excellence, and future-ready technology.";

export default function Portfolio() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#16192C] text-white relative overflow-x-hidden">
      <AnimatedGridBg />
      <Navbar />
      <main className="flex-1 z-10">
        {/* Hero Section */}
        <motion.section
          {...fadeIn(0)}
          className="container pt-28 pb-12 flex flex-col md:flex-row items-center justify-between gap-10"
        >
          <div className="flex-1">
            <motion.h1
              className="text-[2.8rem] sm:text-[3.4rem] md:text-[4.5rem] font-extrabold leading-tight tracking-tight drop-shadow-xl mb-6"
              {...fadeIn(0.07)}
            >
              The Future is <span className="text-primary">Built Here.</span>
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground max-w-2xl mb-8 font-medium"
              {...fadeIn(0.17)}
            >
              {description}
            </motion.p>
            <motion.p className="max-w-xl text-lg text-foreground/80 mb-2" {...fadeIn(0.23)}>
              {description2}
            </motion.p>
          </div>
          {/* Futuristic glow card */}
          <motion.div
            className="flex-1 w-full max-w-lg md:max-w-md rounded-[2rem] bg-gradient-to-br from-[#171a32] via-[#1b1647ee] to-primary/70 shadow-2xl p-0 outline outline-2 outline-primary/20 relative"
            initial={{ opacity: 0, y: 30, scale: 0.93 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.88, delay: 0.21 }}
          >
            <HeroShowcase />
          </motion.div>
        </motion.section>

        {/* Trusted Brands Infinite Slider */}
        <motion.section {...fadeIn(0.1)} className="relative py-12 mb-10">
          <h3 className="text-2xl md:text-3xl font-semibold mb-1 text-center tracking-tight">
            Trusted by Global Brands
          </h3>
          <p className="text-muted-foreground text-lg mb-6 text-center">{trustedDesc}</p>
          <div className="max-w-6xl mx-auto">
            <InfiniteBrandsSlider />
          </div>
        </motion.section>

        {/* Project Grid */}
        <motion.section {...fadeIn(0.04)} className={`w-full ${sectionCard}`}>
          <motion.h2
            className="text-2xl md:text-3xl font-bold mb-8"
            {...fadeIn(0.05)}
          >
            Project Highlights
          </motion.h2>
          <div className="w-full">
            <ProjectGrid />
          </div>
        </motion.section>

        {/* Featured Case Study */}
        <motion.section {...fadeIn(0.06)} className={`w-full ${sectionCard} ${highlightGradient}`}>
          <FeaturedCaseStudy />
        </motion.section>

        {/* Insights & Analytics */}
        <motion.section {...fadeIn(0.08)} className={`w-full ${sectionCard}`}>
          <InsightsChart />
        </motion.section>

        {/* Collaborate CTA */}
        <motion.div
          {...fadeIn(0.15)}
          className="z-30"
        >
          <CollaborateBanner />
        </motion.div>
      </main>
    </div>
  );
}
