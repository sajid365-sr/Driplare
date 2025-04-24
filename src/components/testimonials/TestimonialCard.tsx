
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  image: string;
  delay?: number;
}

export function TestimonialCard({ quote, name, title, image, delay = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative flex flex-row gap-6 bg-[#FFF4F0] rounded-3xl p-6 overflow-hidden"
    >
      <div className="relative flex-1">
        <div className="absolute -right-4 -top-4">
          <Quote className="h-12 w-12 text-primary/20" />
        </div>
        <div className="mb-6">
          <img src={image} alt={name} className="w-[300px] h-[300px] object-cover rounded-2xl" />
        </div>
        <p className="text-xl font-medium mb-4">{quote}</p>
        <div>
          <h4 className="font-bold text-lg">{name}</h4>
          <p className="text-muted-foreground">{title}</p>
        </div>
      </div>
    </motion.div>
  );
}
