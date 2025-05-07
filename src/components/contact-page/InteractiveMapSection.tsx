
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export function InteractiveMapSection() {
  return (
    <section className="relative flex flex-col md:flex-row items-center md:gap-12">
      {/* Map Card */}
      <motion.div
        className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#222222]/90 hover:shadow-orange-400/50 transition-shadow group max-w-xl flex-1"
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 230, damping: 26 }}
      >
        <div className="relative h-72 md:h-80">
          {/* Embed Google Maps, style as futuristic */}
          <iframe
            src="https://maps.google.com/maps?q=Gazipur,+Dhaka,+Bangladesh&z=13&output=embed"
            className="absolute inset-0 w-full h-full grayscale-[29%] contrast-110 border-0 rounded-2xl"
            loading="lazy"
            title="Driplare Office Location"
          />

          {/* Pulsing neon-orange pin */}
          <motion.div
            className="absolute z-20 left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            animate={{ scale: [1, 1.18, 1], filter: ["drop-shadow(0 0 10px #F88220BB)", "drop-shadow(0 0 22px #F88220FF)", "drop-shadow(0 0 10px #F88220BB)"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <MapPin size={37} strokeWidth={2.8} className="text-[#F88220]" />
          </motion.div>
        </div>
        {/* Office Hours card on hover */}
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#1A1F2C]/95 text-white rounded-xl p-4 px-7 shadow-lg text-center text-base font-medium opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-8 pointer-events-none transition duration-300 z-30"
          initial={false}
          animate={{}}
        >
          <div>
            <div className="font-bold mb-1 text-[#F88220]">Office Hours</div>
            <div>Sun-Thu: 9:00 AM – 6:00 PM</div>
            <div>Fri-Sat: Closed</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Text/caption */}
      <div className="flex-1 flex flex-col items-center md:items-start mt-8 md:mt-0 text-lg font-medium gap-2">
        <span className="mb-2">
          <span className="text-[#F88220] font-bold">Drop by</span> for a coffee &amp; a chat!
        </span>
        <span className="text-muted-foreground text-base">
          Gazipur, Dhaka, Bangladesh
        </span>
      </div>
    </section>
  );
}
