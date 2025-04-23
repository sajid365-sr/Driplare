import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = ["All", "Web Design", "Digital Marketing", "AI Solutions"];

const projects = [
  {
    id: 1,
    title: "TechVision Dashboard",
    category: "Web Design",
    description: "Modern SaaS platform interface with intuitive UX",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "GreenLife E-commerce",
    category: "Web Design",
    description: "Sustainable products online store with seamless checkout",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=2074&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "IntelliAssist Chatbot",
    category: "AI Solutions",
    description: "AI-powered customer service assistant for financial services",
    image: "https://images.unsplash.com/photo-1677442135136-760c813dfc5c?q=80&w=2232&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Metro Growth Campaign",
    category: "Digital Marketing",
    description: "Multi-channel marketing strategy that increased leads by 156%",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "HealthConnect Portal",
    category: "Web Design",
    description: "Patient management system with telehealth integration",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=2074&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "PredictiveInsight AI",
    category: "AI Solutions",
    description: "Custom machine learning solution for inventory forecasting",
    image: "https://images.unsplash.com/photo-1677442135136-760c813dfc5c?q=80&w=2232&auto=format&fit=crop"
  },
  {
    id: 7,
    title: "Luxury Brand SEO",
    category: "Digital Marketing",
    description: "Comprehensive SEO strategy that increased traffic by 210%",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=2074&auto=format&fit=crop"
  },
  {
    id: 8,
    title: "WorkStream Platform",
    category: "Web Design",
    description: "Collaborative workspace tool with real-time project tracking",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
  }
];

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (selectedCategory === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === selectedCategory));
    }
  }, [selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-32 pb-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Portfolio</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our showcase of creative solutions that have helped businesses transform their digital presence.
            </p>
          </motion.div>
          
          <Tabs defaultValue="All" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-muted/30">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    onClick={() => setSelectedCategory(category)}
                    className="px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <TabsContent value={selectedCategory} className="mt-0">
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ y: -10 }}
                      className="group cursor-pointer"
                    >
                      <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                          <span className="text-primary text-sm font-medium">{project.category}</span>
                          <h3 className="text-white text-xl font-bold mb-2">{project.title}</h3>
                          <p className="text-white/80 mb-4">{project.description}</p>
                          <Button className="w-full bg-primary hover:bg-primary/90">
                            View Case Study
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
        <section className="py-12">
          <div className="flex justify-center">
            <a
              href="/showcase"
              className="bg-[#F88220] hover:bg-[#fa973a] text-white font-bold px-6 py-3 rounded-lg shadow-md transition hover:scale-105"
            >
              New: See Interactive Showcase Page
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Portfolio;
