
import { useRef } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin } from "lucide-react";

// Animate in with framer-motion
const panelVariant = (direction: "left" | "right") => ({
  hidden: { opacity: 0, x: direction === "left" ? -64 : 64 },
  show: { opacity: 1, x: 0 }
});

export function ContactFormWithDetails() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div id="contact-form" className="flex flex-col md:flex-row gap-12">
      {/* Left Column: Form */}
      <motion.div
        className="bg-[#221F26]/70 dark:bg-[#221F26]/80 rounded-2xl shadow-xl flex-1 p-8 md:p-12 z-10 backdrop-blur-sm"
        variants={panelVariant("left")}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, type: "spring" }}
      >
        <form
          ref={formRef}
          className="space-y-6"
          autoComplete="off"
          onSubmit={e => { e.preventDefault(); /* ADD your submit logic here */ }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1 text-gray-200">
                Name
              </label>
              <Input
                name="name"
                required
                placeholder="Your full name"
                className="focus-visible:ring-2 focus-visible:ring-[#F88220] transition-all"
                autoComplete="off"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1 text-gray-200">Email</label>
              <Input
                name="email"
                type="email"
                required
                placeholder="you@email.com"
                className="focus-visible:ring-2 focus-visible:ring-[#F88220] transition-all"
                autoComplete="off"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-200">Company</label>
            <Input
              name="company"
              placeholder="Organization or company"
              className="focus-visible:ring-2 focus-visible:ring-[#F88220] transition-all"
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-200">Service Interest</label>
            <Select>
              <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-[#F88220]">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ai-web">AI-based Web</SelectItem>
                <SelectItem value="marketing">Digital Marketing</SelectItem>
                <SelectItem value="design">UI/UX Design</SelectItem>
                <SelectItem value="consult">Consultation</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-200">Message</label>
            <Textarea
              name="message"
              rows={4}
              placeholder="Describe your project or question..."
              className="focus-visible:ring-2 focus-visible:ring-[#F88220] transition-all"
              required
              autoComplete="off"
            />
          </div>
          <div>
            <Button
              type="submit"
              className="w-full h-12 bg-[#F88220] hover:bg-[#fa973a] text-lg font-semibold shadow-lg transition-glow"
              style={{ boxShadow: "0 4px 40px 0 #F8822077" }}
            >
              Send Message
            </Button>
          </div>
        </form>
      </motion.div>

      {/* Right Column: Quick Info */}
      <motion.div
        className="flex-1 rounded-2xl bg-[#1A1F2C]/90 p-8 md:p-12 md:ml-2 flex flex-col justify-center text-lg font-medium gap-5 min-w-[260px] shadow-lg"
        variants={panelVariant("right")}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, type: "spring" }}
      >
        <div className="flex items-center gap-4">
          <Phone size={22} className="text-[#F88220]" />
          <span>+880 1608331365</span>
        </div>
        <div className="flex items-center gap-4">
          <Mail size={22} className="text-[#F88220]" />
          <span>info@driplare.com</span>
        </div>
        <div className="flex items-center gap-4">
          <MapPin size={22} className="text-[#F88220]" />
          <span>Gazipur, Dhaka, Bangladesh</span>
        </div>
      </motion.div>
    </div>
  );
}
