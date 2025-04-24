
import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  image: string;
  delay?: number;
  fullReview?: string;
}

export function TestimonialCard({ 
  quote, 
  name, 
  title, 
  image, 
  delay = 0,
  fullReview = "The complete experience was outstanding. Their attention to detail and commitment to delivering exceptional results truly sets them apart. Working with them has been transformative for our business." 
}: TestimonialCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="relative bg-[#FFF4F0] rounded-3xl p-6 overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
      >
        <CollapsibleTrigger className="w-full text-left">
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
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-6 pt-6 border-t border-primary/10"
          >
            <p className="text-lg leading-relaxed text-muted-foreground">
              {fullReview}
            </p>
          </motion.div>
        </CollapsibleContent>
      </Collapsible>
    </motion.div>
  );
}
