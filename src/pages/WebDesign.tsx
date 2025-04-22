
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ArrowRight, Code, LayoutGrid, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    icon: <LayoutGrid className="h-10 w-10 text-primary" />,
    title: "Responsive UX Design",
    description: "Crafting intuitive interfaces that adapt seamlessly to any device size."
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Performance Optimization",
    description: "Lightning-fast load times and smooth animations for exceptional user experience."
  },
  {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: "Mobile-First Development",
    description: "Building from the ground up with mobile prioritization for today's on-the-go users."
  }
];

const portfolioItems = [
  {
    title: "TechVision Platform",
    category: "SaaS Application",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "EcoStore E-commerce",
    category: "Online Retail",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=2074&auto=format&fit=crop"
  },
  {
    title: "Fintech Dashboard",
    category: "Financial Interface",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "HealthConnect Portal",
    category: "Healthcare Solution",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=2074&auto=format&fit=crop"
  }
];

const WebDesign = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Hero Section with Video Background */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black/60">
          <video 
            className="w-full h-full object-cover opacity-40"
            autoPlay 
            muted 
            loop 
            playsInline
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-programming-screen-closeup-2625-large.mp4" type="video/mp4" />
          </video>
        </div>
        
        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Web Design & Development
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8">
              Creating compelling digital experiences that captivate audiences and drive results.
            </p>
            <Button className="bg-primary hover:bg-primary/90 h-12 px-8 text-lg">
              Get Started
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Approach</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We combine cutting-edge technologies with timeless design principles to create websites and applications that stand out.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-none bg-card shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="mb-6">{benefit.icon}</div>
                    <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Portfolio Gallery */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our latest web design and development work showcasing our expertise.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg aspect-square">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-primary text-sm font-medium">{item.category}</span>
                    <h3 className="text-white text-xl font-bold mb-2">{item.title}</h3>
                    <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/20 hover:text-white">
                      View Project
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link to="/portfolio">
              <Button variant="outline" className="group">
                <span>View All Projects</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary/10">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Create Something Amazing?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Let's discuss how we can elevate your brand's digital presence with a custom-designed website or application.
              </p>
              <Link to="/contact">
                <Button className="bg-primary hover:bg-primary/90 h-12 px-8 text-lg">
                  Contact Us Today
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default WebDesign;
