
import { Navbar } from "@/components/common/navigation/Navbar";
import { Button } from "@/components/ui/button";
import { Code, Pen, Users, Check, Star, Timer, FileText, LayoutGrid, LayoutDashboard, LayoutList } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedGridBg from "@/components/common/AnimatedGridBg";
import ProcessTimeline from "@/components/ProcessTimeline";
import TestimonialSlider from "@/components/TestimonialSlider";
import FloatingFormCard from "@/components/FloatingFormCard";
import { Link } from "react-router-dom";
import { useState } from "react";

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

const bestStack = [
  { icon: <LayoutDashboard />, title: "Next.js / React 18" },
  { icon: <Code />, title: "TypeScript" },
  { icon: <LayoutGrid />, title: "Tailwind CSS" },
  { icon: <LayoutList />, title: "Headless CMS & API" },
];

const futuristicGradient =
  "bg-gradient-to-tr from-primary/90 via-background/90 to-accent/70";

const projectHighlights = [
  {
    label: "320+",
    text: "Web Projects Delivered",
  },
  {
    label: "98%",
    text: "Client Satisfaction Score",
  },
  {
    label: "2x Faster",
    text: "Average Project Launch",
  },
  {
    label: "75%",
    text: "Repeat Clients",
  },
];

export default function WebDesign() {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative overflow-x-hidden">
      <AnimatedGridBg />
      <Navbar />
      <main className="flex-1 flex flex-col z-10">
        {/* Futuristic Hero */}
        <section className="relative pt-32 pb-20 px-4 flex flex-col md:flex-row items-center md:items-end justify-between overflow-hidden">
          {/* Left content */}
          <div className="md:w-2/3 mb-16 md:mb-0">
            <motion.h1
              className="text-[2.5rem] sm:text-[3.2rem] md:text-[4.2rem] font-extrabold max-w-3xl leading-tight mb-5"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              style={{
                lineHeight: 1.08,
                letterSpacing: "-0.01em"
              }}
            >
              Web Design & Development <span className="text-primary">for Visionary Teams</span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.13 }}
            >
              We craft high-performing, pixel-perfect sites custom-built for your brand's needs. We blend <span className="font-semibold">compelling design</span> with <span className="font-semibold">cutting-edge technology</span> to captivate your audience and drive results.
            </motion.p>
            <div className="flex gap-4">
              <Button className="bg-primary hover:bg-primary/80 text-lg px-8 h-12 shadow-2xl" onClick={() => setShowContact(true)}>
                Get Your Free Audit
              </Button>
              <Link to="/portfolio">
                <Button variant="outline" className="text-lg px-8 h-12 border-primary/50 border-2">
                  See Client Results
                </Button>
              </Link>
            </div>
          </div>
          {/* Right "What's Best" sidebar */}
          <motion.div
            className={"hidden md:flex flex-col gap-5 items-start bg-background/80 shadow-xl rounded-3xl p-9 border border-primary/10"}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.17 }}
            style={{
              minWidth: 260,
              maxWidth: 320
            }}
          >
            <div className="text-xl font-bold mb-2 text-primary flex items-center gap-2">
              <LayoutGrid className="w-6 h-6" />
              What’s Best for Your Project?
            </div>
            <p className="text-muted-foreground mb-3 text-sm">
              Our preferred stack for scale, performance & reliability.
            </p>
            <div className="flex flex-col gap-3 w-full">
              {bestStack.map(b => (
                <div key={b.title} className="flex gap-3 items-center text-base font-medium text-foreground/90">
                  <span className="p-2 bg-primary/10 rounded-lg">{b.icon}</span>
                  {b.title}
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Futuristic divider */}
        <div className="w-full h-4 bg-gradient-to-r from-primary/30 via-primary/0 to-background" />

        {/* Project Highlights */}
        <section className="container mx-auto py-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
          <div className="flex flex-row flex-wrap gap-3 md:gap-7 items-center">
            {projectHighlights.map((ph, idx) => (
              <motion.div
                key={ph.label}
                className="rounded-2xl border bg-primary/5 shadow-xl text-center px-7 py-8 min-w-[130px]"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.07 }}
              >
                <span className="text-3xl md:text-4xl font-extrabold text-primary block mb-1">{ph.label}</span>
                <span className="text-base text-foreground/80">{ph.text}</span>
              </motion.div>
            ))}
          </div>
          <div className="text-lg mt-7 md:mt-0 text-primary/90 font-semibold max-w-sm text-center md:text-right">
            Building next-gen sites & digital products for growth-focused brands.
          </div>
        </section>

        {/* Web Design & Dev Explained */}
        <section className={`relative py-16 px-2 ${futuristicGradient} rounded-b-3xl`}>
          <div className="container mx-auto flex flex-col md:flex-row gap-14 items-center">
            {/* Visual mockup */}
            <motion.div
              className="relative w-full max-w-[440px] h-[300px] md:h-[380px] bg-background rounded-3xl overflow-hidden shadow-xl border-2 border-primary/15"
              initial={{ opacity: 0, scale: 0.97, x: -20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7 }}
            >
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                alt="Futuristic web dashboard"
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{ filter: 'brightness(0.96) saturate(1.3)' }}
              />
              <div className="absolute bottom-5 right-5 bg-primary text-white py-1 px-4 rounded-full text-xs font-bold shadow-xl">Live Preview</div>
            </motion.div>
            {/* Explanatory Content */}
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">What Sets Our Web Experiences Apart</h2>
              <ul className="space-y-3">
                <li>
                  <span className="font-semibold text-primary">Human-centered Design: </span>
                  Clean, emotionally engaging interfaces—no cookie-cutter templates.
                </li>
                <li>
                  <span className="font-semibold text-primary">Modern Frontend & Backend: </span>
                  We use React + TypeScript + Headless CMS for ultra-fast, scalable apps.
                </li>
                <li>
                  <span className="font-semibold text-primary">SEO & Analytics Ready: </span>
                  Sites launch with structured data, lightning load, and advanced tracking.
                </li>
                <li>
                  <span className="font-semibold text-primary">Launch & Beyond: </span>
                  Ongoing support, enhancements, and growth-powered experiments.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Why Choose Driplare */}
        <section className="container py-20">
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
                  y: -6, scale: 1.04, boxShadow: "0 2px 32px #8F5CFF66"
                }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                transition={{
                  delay: idx * 0.08 + 0.1,
                  duration: 0.7, type: "spring",
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
                  className="absolute inset-0 bg-primary/90 text-white flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <ul className="mb-4">
                    {c.metrics.map((m) => (
                      <li
                        key={m}
                        className="text-white font-semibold text-base"
                      >
                        {m}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={c.link}
                    className="bg-white text-primary font-bold hover:bg-white/90 px-5 py-2 rounded-lg shadow-lg inline-block"
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
      {/* Floating Get in Touch button */}
      <Button
        className="fixed z-[99] bottom-7 right-7 bg-primary text-white px-7 py-4 rounded-full shadow-2xl text-base font-bold hover:bg-primary/80 transition-all"
        style={{ boxShadow: "0 1.5px 18px 0 #8F5CFF70" }}
        onClick={() => setShowContact(true)}
      >
        Get in Touch
      </Button>
      {/* Floating form modal */}
      {showContact && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-[1000]">
          <div className="bg-background rounded-2xl shadow-2xl max-w-lg w-full p-7 relative animate-fade-in">
            <button
              className="absolute top-5 right-5 text-xl font-bold text-muted-foreground p-1 hover:text-primary"
              onClick={() => setShowContact(false)}
              aria-label="Close"
            >
              ×
            </button>
            <FloatingFormCard />
          </div>
        </div>
      )}
    </div>
  );
}
