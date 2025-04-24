
import { UserCheck, Headphones, CalendarCheck, Award } from "lucide-react";
import { motion } from "framer-motion";

export function WhyChooseSection() {
  const features = [
    {
      icon: UserCheck,
      title: "Skilled & Qualified Associates",
      description: "Our team consists of highly skilled and certified professionals dedicated to delivering excellence."
    },
    {
      icon: Headphones,
      title: "24/7 Customer Support",
      description: "Round-the-clock support to assist you whenever you need help."
    },
    {
      icon: CalendarCheck,
      title: "180 Days After Sale Support",
      description: "Extended support period to ensure your long-term success and satisfaction."
    },
    {
      icon: Award,
      title: "Record of Success",
      description: "Proven track record of delivering successful projects and satisfied clients."
    }
  ];

  return (
    <section className="py-20 bg-[#1A1F2C] text-white relative overflow-hidden">
      <div className="container">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Why Choose Driplare?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            We combine expertise, dedication, and innovation to deliver exceptional results
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
