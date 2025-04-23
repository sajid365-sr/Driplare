import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import AnimatedGridBg from "@/components/AnimatedGridBg";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Search, Target, Users, LineChart, PieChart, TrendingUp, BarChart2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import TestimonialSlider from "@/components/TestimonialSlider";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Typewriter } from "@/components/Typewriter";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

const performanceData = [
  { name: "Jan", value: 30 },
  { name: "Feb", value: 40 },
  { name: "Mar", value: 45 },
  { name: "Apr", value: 80 },
  { name: "May", value: 90 },
  { name: "Jun", value: 100 },
];

const capabilities = [
  {
    title: "SEO & Content Strategy",
    desc: "Rank higher and engage deeper.",
    icon: <Search className="w-8 h-8 text-primary" />,
  },
  {
    title: "Paid Media & PPC",
    desc: "Maximize ROI with precision targeting.",
    icon: <Target className="w-8 h-8 text-primary" />,
  },
  {
    title: "Social Media & Community",
    desc: "Build your brand voice.",
    icon: <Users className="w-8 h-8 text-primary" />,
  },
];

const approachSteps = [
  {
    title: "Audit & Research",
    desc: "Deep-dive analysis of current performance and market landscape.",
    icon: <Search className="w-6 h-6 text-primary" />,
  },
  {
    title: "Strategy & Planning",
    desc: "Custom roadmap for your specific business objectives.",
    icon: <LineChart className="w-6 h-6 text-primary" />,
  },
  {
    title: "Execution & Optimization",
    desc: "Implementation with continuous data-driven refinement.",
    icon: <TrendingUp className="w-6 h-6 text-primary" />,
  },
  {
    title: "Reporting & Growth",
    desc: "Transparent analytics and scaling successful tactics.",
    icon: <BarChart2 className="w-6 h-6 text-primary" />,
  },
];

const metrics = [
  {
    value: 120,
    label: "organic traffic in 6 months",
    prefix: "+",
    suffix: "%"
  },
  {
    value: 30,
    label: "CPC reduced by",
    suffix: "%"
  },
  {
    value: 50,
    label: "Engagement rates",
    prefix: "",
    suffix: "%↑"
  }
];

const testimonials = [
  {
    quote: "Driplare's strategy doubled our lead generation in just 3 months.",
    author: "Alex Chen, TechStart"
  },
  {
    quote: "Our PPC campaign ROI increased 4x after switching to Driplare.",
    author: "Sophia Martinez, GrowthBrand"
  },
  {
    quote: "SEO rankings jumped from page 3 to page 1 in competitive keywords.",
    author: "James Wilson, MarketEdge"
  }
];

export default function DigitalMarketing() {
  const [activeApproach, setActiveApproach] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative overflow-x-hidden">
      <AnimatedGridBg />
      <Navbar />
      <main className="flex-1 flex flex-col z-10">

        {/* Hero & Value Proposition */}
        <section className="relative min-h-[90vh] flex items-center justify-center py-20 md:py-0">
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-20">
            <motion.svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 100 100" 
              className="w-full h-full"
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              <motion.rect 
                x="10" 
                y="10" 
                width="80" 
                height="10" 
                rx="2" 
                fill="#F88220" 
                fillOpacity="0.3"
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 2.5, repeat: Infinity, repeatType: "loop", repeatDelay: 1 }}
              />
              <motion.rect 
                x="10" 
                y="30" 
                width="65" 
                height="10" 
                rx="2" 
                fill="#F88220" 
                fillOpacity="0.3"
                initial={{ width: 0 }}
                animate={{ width: 65 }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "loop", repeatDelay: 0.5 }}
              />
              <motion.rect 
                x="10" 
                y="50" 
                width="40" 
                height="10" 
                rx="2" 
                fill="#F88220" 
                fillOpacity="0.3"
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "loop", repeatDelay: 1.5 }}
              />
              <motion.rect 
                x="10" 
                y="70" 
                width="75" 
                height="10" 
                rx="2" 
                fill="#F88220" 
                fillOpacity="0.3"
                initial={{ width: 0 }}
                animate={{ width: 75 }}
                transition={{ duration: 3.5, repeat: Infinity, repeatType: "loop", repeatDelay: 0.75 }}
              />
              <motion.circle 
                cx="85" 
                cy="40" 
                r="10" 
                fill="#F88220" 
                fillOpacity="0.3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", repeatDelay: 2 }}
              />
            </motion.svg>
          </div>
          <div className="container flex flex-col items-center text-center relative z-10">
            <motion.h1
              className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight"
              initial={{ y: 30, opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Data-Driven Marketing That Converts
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl"
              initial={{ y: 30, opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              From SEO to social ads—strategies built on insights.
            </motion.p>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                className="bg-primary hover:bg-primary/90 text-lg px-8 h-12 shadow-xl"
                animate={{ 
                  boxShadow: ["0 0 0 0 rgba(248, 130, 32, 0.4)", "0 0 0 12px rgba(248, 130, 32, 0)", "0 0 0 0 rgba(248, 130, 32, 0)"]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                Request a Free Audit
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Core Capabilities */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <h2 className="text-xl md:text-2xl font-bold mb-8 text-center">Core Capabilities</h2>
            <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-4 px-4">
              {capabilities.map((capability, idx) => (
                <motion.div 
                  key={capability.title}
                  className="flex-1 bg-background rounded-xl shadow-lg p-6 flex flex-col items-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(248, 130, 32, 0.3)" }}
                >
                  <motion.div 
                    className="mb-4"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {capability.icon}
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-2">{capability.title}</h3>
                  <p className="text-center text-muted-foreground">{capability.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-20 container">
          <h2 className="text-xl md:text-2xl font-bold mb-10 text-center">Our Approach</h2>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 rounded-full bg-primary/10 border border-primary/20 z-0"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {approachSteps.map((step, idx) => (
                <motion.div
                  key={step.title}
                  className={`bg-background/80 backdrop-blur-sm p-6 rounded-xl border border-border shadow-md flex flex-col items-center md:items-start text-center md:text-left`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  whileHover={{ scale: 1.05 }}
                  onMouseEnter={() => setActiveApproach(idx)}
                >
                  <div className="flex items-center mb-3">
                    <motion.div 
                      className="p-2 rounded-full bg-primary/10"
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(248, 130, 32, 0.2)" }}
                    >
                      {step.icon}
                    </motion.div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </motion.div>
              ))}
            </div>
            <svg className="absolute top-0 left-0 w-full h-full z-[-1] hidden md:block">
              <motion.path
                d="M 150,100 H 350 M 150,300 H 350 M 100,150 V 250 M 400,150 V 250"
                stroke="#F88220"
                strokeWidth="2"
                strokeDasharray="5,5"
                strokeOpacity="0.3"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </svg>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <h2 className="text-xl md:text-2xl font-bold mb-10 text-center">Success Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {metrics.map((metric, idx) => (
                <motion.div
                  key={idx}
                  className="bg-background rounded-xl p-8 shadow-md flex flex-col items-center justify-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 10px 30px -5px rgba(248, 130, 32, 0.2)"
                  }}
                >
                  <div className="flex items-center justify-center">
                    <span className="text-muted-foreground">{metric.prefix || ""}</span>
                    <motion.span 
                      className="text-4xl md:text-5xl font-bold text-primary"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 + idx * 0.2 }}
                    >
                      <CountUpDisplay value={metric.value} />
                    </motion.span>
                    <span className="text-xl font-semibold">{metric.suffix || ""}</span>
                  </div>
                  <p className="text-center text-muted-foreground mt-3">{metric.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study Spotlight */}
        <section className="py-20 container">
          <h2 className="text-xl md:text-2xl font-bold mb-10 text-center">Case Study Spotlight</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2">EcommerceGiant</h3>
                <div className="w-16 h-1 bg-primary mb-4"></div>
              </div>
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Challenge</h4>
                <p className="text-muted-foreground">
                  Struggling with high PPC costs and low organic visibility in a competitive market.
                </p>
              </div>
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Solution</h4>
                <p className="text-muted-foreground">
                  Integrated SEO content strategy with targeted paid campaigns and conversion rate optimization.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Results</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• 120% increase in organic traffic</li>
                  <li>• 30% reduction in cost-per-conversion</li>
                  <li>• 45% improvement in ROAS</li>
                </ul>
              </div>
            </motion.div>
            
            <motion.div
              className="bg-background/90 p-6 rounded-xl shadow-lg"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="font-semibold mb-4 text-center">Campaign Performance</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <motion.g 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <Bar 
                      dataKey="value" 
                      fill="#F88220"
                      animationDuration={2000}
                      radius={[4, 4, 0, 0]}
                    />
                  </motion.g>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </section>

        {/* Client Testimonials */}
        <section className="py-20 bg-muted/50">
          <h2 className="text-xl md:text-2xl font-bold mb-12 text-center">Client Testimonials</h2>
          <TestimonialSlider />
        </section>

        {/* Get Started / Contact */}
        <section className="py-24 container flex justify-center">
          <Drawer>
            <DrawerTrigger asChild>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full max-w-md"
              >
                <Button className="w-full bg-primary hover:bg-primary/90 text-lg h-12 shadow-lg">
                  Let's Talk Strategy
                </Button>
              </motion.div>
            </DrawerTrigger>
            <DrawerContent className="px-6 pb-8">
              <div className="mx-auto w-full max-w-md">
                <h2 className="text-xl font-bold mb-6 mt-4 text-center">Tell Us About Your Project</h2>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="you@example.com" type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service">Service Interest</Label>
                    <select 
                      id="service" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    >
                      <option>SEO & Content Strategy</option>
                      <option>Paid Media & PPC</option>
                      <option>Social Media Management</option>
                      <option>Full Marketing Services</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Range</Label>
                    <select 
                      id="budget" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    >
                      <option>Less than $5,000</option>
                      <option>$5,000 - $10,000</option>
                      <option>$10,000 - $25,000</option>
                      <option>$25,000+</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us about your marketing goals..."
                      className="min-h-[120px]"
                    />
                  </div>
                  <Button className="w-full">Submit</Button>
                </form>
              </div>
            </DrawerContent>
          </Drawer>
        </section>

        {/* Bonus Footer Call-Out */}
        <section className="w-full py-8 bg-primary flex flex-col md:flex-row items-center justify-center gap-6 mt-4">
          <div className="text-lg font-semibold text-white md:mr-5 text-center">
            Ready for a data-driven marketing strategy?
          </div>
          <Button className="bg-white text-primary font-bold hover:bg-white/90 text-lg px-7 h-11">
            Get Started Now
          </Button>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

const CountUpDisplay = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = 0;
    
    const animate = (time: number) => {
      if (lastTime === 0) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;
      
      if (count < value) {
        setCount(Math.min(count + Math.ceil(value / 50), value));
      }
      
      if (count < value) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [count, value]);
  
  return <>{count}</>;
};
