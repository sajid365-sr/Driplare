
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
  fullReview = "" 
}: TestimonialCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="w-full"
    >
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className={`relative bg-[#FFF4F0] rounded-3xl transition-all duration-300 hover:shadow-lg cursor-pointer 
          ${isOpen ? 'col-span-3 w-[200%]' : 'w-full'}`}
      >
        <CollapsibleTrigger className="w-full text-left p-6">
          <div className="relative">
            <Quote className="absolute -right-2 -top-2 h-8 w-8 text-primary/20" />
            <p className="text-lg font-medium mb-4">{quote}</p>
            <div>
              <img src={image} alt={name} className="w-16 h-16 rounded-full object-cover mb-2" />
              <h4 className="font-bold">{name}</h4>
              <p className="text-muted-foreground text-sm">{title}</p>
            </div>
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-6 pt-2 border-t border-primary/10"
          >
            <p className="text-muted-foreground">
              {fullReview}
            </p>
          </motion.div>
        </CollapsibleContent>
      </Collapsible>
    </motion.div>
  );
}
