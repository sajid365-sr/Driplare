import { Navbar } from "@/components/common/navigation/Navbar";
import { Button } from "@/components/ui/button";
import { Code, Pen, Users, Check, Star, Timer, FileText } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedGridBg from "@/components/common/AnimatedGridBg";
import ProcessTimeline from "@/components/ProcessTimeline";
import TestimonialSlider from "@/components/TestimonialSlider";
import FloatingFormCard from "@/components/FloatingFormCard";
import { Link } from "react-router-dom";

const caseStudies = [
  {
    title: "Visionary Health Portal",
    goal: "Healthcare UX overhaul",
    metrics: ["↑ 40% conversions", "Load time ↓ 60%"],
    link: "/portfolio",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "SyncWin SaaS",
    goal: "Lightning-fast onboarding",
    metrics: ["Signups 2x", "Bounce ↓ 50%"],
    link: "/portfolio",
    img: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=2074&auto=format&fit=crop",
  },
  {
    title: "EcoSites Commerce",
    goal: "Mobile-first redesign",
    metrics: ["Mobile conversions ↑ 70%"],
    link: "/portfolio",
    img: "https://images.unsplash.com/photo-1677442135136-760c813dfc5c?q=80&w=2232&auto=format&fit=crop",
  },
];

const highlights = [
  {
    icon: <Users className="w-7 h-7 text-primary" />,
    title: "Mobile-First & Responsive",
    desc: "Every device looks perfect.",
  },
  {
    icon: <Timer className="w-7 h-7 text-primary" />,
    title: "Performance Optimization",
    desc: "Under-1s load times.",
  },
  {
    icon: <Star className="w-7 h-7 text-primary" />,
    title: "SEO-Friendly Build",
    desc: "Search engines love our structure.",
  },
  {
    icon: <Check className="w-7 h-7 text-primary" />,
    title: "Accessible by Design",
    desc: "WCAG 2.1 compliance.",
  },
];

const services = [
  {
    icon: <Pen className="w-7 h-7 text-primary" />,
    title: "UI/UX Design",
    desc: "Intuitive interfaces that delight.",
    align: "left",
  },
  {
    icon: <Code className="w-7 h-7 text-primary" />,
    title: "Front-End Development",
    desc: "React, Next.js, Tailwind CSS for lightning speed.",
    align: "right",
  },
  {
    icon: <FileText className="w-7 h-7 text-primary" />,
    title: "Back-End Integration",
    desc: "Node.js, Python, or headless CMS—scalable & secure.",
    align: "left",
  },
];

export default function WebDesign() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative overflow-x-hidden">
      <AnimatedGridBg />
      <Navbar />
      <main className="flex-1 flex flex-col z-10">
        {/* Hero & Overview */}
        <section className="relative flex flex-col md:flex-row min-h-[80vh] items-center justify-center py-20 md:py-0">
          <div className="flex-1 flex justify-center items-center h-80 md:h-auto">
            {/* Faux code-to-mockup animation: looped using Framer Motion on SVG */}
            <motion.div
              className="relative w-72 h-72 md:w-[400px] md:h-[400px] flex items-center justify-center bg-black rounded-xl border border-[#292929] overflow-hidden"
              initial={{ boxShadow: "0 0 32px #F8822033" }}
              animate={{
                boxShadow: [
                  "0 0 32px #F8822033",
                  "0 0 76px #F8822066",
                  "0 0 32px #F8822033",
                ],
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              {/* Code Side */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full bg-[#18191c] z-10"
                initial={{ opacity: 1 }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{
                  times: [0, 0.5, 1],
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {/* Simulated code SVG */}
                <svg viewBox="0 0 180 180" className="w-full h-full">
                  <rect
                    x="18"
                    y="28"
                    width="144"
                    height="12"
                    rx="4"
                    fill="#23242a"
                  />
                  <rect
                    x="18"
                    y="48"
                    width="88"
                    height="10"
                    rx="3"
                    fill="#F88220"
                  />
                  <rect
                    x="18"
                    y="64"
                    width="120"
                    height="10"
                    rx="3"
                    fill="#23242a"
                  />
                  <rect
                    x="18"
                    y="84"
                    width="80"
                    height="10"
                    rx="3"
                    fill="#23242a"
                  />
                  <rect
                    x="18"
                    y="104"
                    width="105"
                    height="10"
                    rx="3"
                    fill="#23242a"
                  />
                  <rect
                    x="18"
                    y="124"
                    width="68"
                    height="10"
                    rx="3"
                    fill="#F88220"
                  />
                </svg>
              </motion.div>
              {/* Mockup Side overlays in */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#191c23] to-[#111114] z-20 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  times: [0.5, 0.95, 1],
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {/* Simulated web mockup SVG */}
                <svg viewBox="0 0 180 180" className="w-full h-full">
                  <rect
                    x="12"
                    y="32"
                    width="156"
                    height="112"
                    rx="12"
                    fill="#ffffff10"
                  />
                  <rect
                    x="28"
                    y="50"
                    width="124"
                    height="24"
                    rx="7"
                    fill="#fff3"
                  />
                  <rect
                    x="28"
                    y="86"
                    width="90"
                    height="14"
                    rx="5"
                    fill="#F88220"
                  />
                  <rect
                    x="28"
                    y="108"
                    width="46"
                    height="10"
                    rx="5"
                    fill="#fff5"
                  />
                  <rect
                    x="80"
                    y="108"
                    width="46"
                    height="10"
                    rx="5"
                    fill="#fff2"
                  />
                </svg>
              </motion.div>
            </motion.div>
          </div>
          {/* Text Block */}
          <div className="flex-1 flex flex-col items-center md:items-start justify-center px-2 md:pl-12 mt-10 md:mt-0 text-center md:text-left relative z-10">
            <motion.h1
              className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Web Experiences That Captivate & Convert
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-7 max-w-xl"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.3 }}
            >
              Responsive, pixel-perfect sites built for performance and growth.
            </motion.p>
            <Button className="bg-primary hover:bg-primary/90 text-lg px-8 h-12 shadow-xl">
              Get Your Free Audit
            </Button>
          </div>
        </section>

        {/* Why Choose Driplare */}
        <section className="container py-16">
          <h2 className="text-xl md:text-2xl font-bold mb-8 text-center">
            Why Choose Driplare?
          </h2>
          <div className="flex flex-wrap justify-center gap-5">
            {highlights.map((h, idx) => (
              <motion.div
                key={h.title}
                className="flex flex-col items-center px-6 py-8 rounded-xl bg-muted shadow-md transition-transform"
                initial={{ y: 35, opacity: 0, scale: 0.95 }}
                whileHover={{
                  y: -6,
                  scale: 1.04,
                  boxShadow: "0 2px 32px #F8822040",
                }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                transition={{
                  delay: idx * 0.08 + 0.1,
                  duration: 0.7,
                  type: "spring",
                }}
              >
                <div className="mb-3">{h.icon}</div>
                <div className="text-lg font-bold mb-1 text-center">
                  {h.title}
                </div>
                <div className="text-sm text-muted-foreground text-center">
                  {h.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Our Process */}
        <section className="py-20 bg-background/90">
          <h2 className="text-xl md:text-2xl font-bold mb-10 text-center">
            Our Process
          </h2>
          <ProcessTimeline />
        </section>

        {/* Core Services Breakdown */}
        <section className="container py-20">
          <h2 className="text-xl md:text-2xl font-bold mb-8 text-center">
            Core Services
          </h2>
          <div className="flex flex-col gap-10">
            {services.map((s, idx) => (
              <motion.div
                key={s.title}
                className={`flex flex-col md:flex-row items-center gap-6 px-6 py-8 rounded-2xl bg-muted/70 shadow-md`}
                initial={{ x: s.align === "left" ? -70 : 70, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.7, delay: 0.12 * idx }}
              >
                {s.align === "left" && <div className="order-1">{s.icon}</div>}
                <div className="text-center md:text-left flex-1">
                  <div className="text-lg font-bold mb-2">{s.title}</div>
                  <div className="text-muted-foreground">{s.desc}</div>
                </div>
                {s.align === "right" && <div className="order-3">{s.icon}</div>}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Showcase & Case Studies */}
        <section className="container py-20">
          <h2 className="text-xl md:text-2xl font-bold mb-8 text-center">
            Showcase & Case Studies
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((c, idx) => (
              <motion.div
                key={c.title}
                className="relative rounded-2xl overflow-hidden shadow-lg group border bg-background"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 * idx }}
                whileHover={{ y: -4, scale: 1.03 }}
              >
                <img
                  src={c.img}
                  alt={c.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-6 pb-10">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold">{c.title}</span>
                  </div>
                  <div className="text-muted-foreground text-sm mt-2">
                    {c.goal}
                  </div>
                </div>
                {/* Hover Overlay */}
                <motion.div
                  className="absolute inset-0 bg-black/80 text-white flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <ul className="mb-4">
                    {c.metrics.map((m) => (
                      <li
                        key={m}
                        className="text-primary font-semibold text-base"
                      >
                        {m}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={c.link}
                    className="bg-primary hover:bg-primary/90 px-5 py-2 rounded-lg font-bold shadow-lg inline-block"
                  >
                    View Case Study
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-muted">
          <h2 className="text-xl md:text-2xl font-bold mb-10 text-center">
            Testimonials
          </h2>
          <TestimonialSlider />
        </section>

        {/* Ready to Start? Floating form */}
        <section className="py-24 flex justify-center bg-background/90 relative z-10">
          <FloatingFormCard />
        </section>

        {/* Bonus Footer Call-Out */}
        <section className="w-full py-8 bg-primary flex flex-col md:flex-row items-center justify-center gap-6 mt-4">
          <div className="text-lg font-semibold text-white md:mr-5 text-center">
            Want a Custom Quote for Your Project?
          </div>
          <Button className="bg-white text-primary font-bold hover:bg-white/90 text-lg px-7 h-11">
            Get a Quote
          </Button>
        </section>
      </main>
    </div>
  );
}
