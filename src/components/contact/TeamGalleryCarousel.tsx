
import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const teamMembers = [
  {
    name: "Farhan Ahmed",
    role: "AI Project Lead",
    img: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Sumaiya Rahman",
    role: "Marketing Strategist",
    img: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    name: "Tanvir Hasan",
    role: "UI/UX Designer",
    img: "https://randomuser.me/api/portraits/men/76.jpg"
  },
  {
    name: "Nabila Chowdhury",
    role: "Full Stack Dev",
    img: "https://randomuser.me/api/portraits/women/43.jpg"
  }
];

export function TeamGalleryCarousel() {
  const [active, setActive] = useState<number | null>(null);

  // Simple horizontal carousel (manual for now)
  return (
    <section className="relative text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">
        Meet our experts driving innovation.
      </h2>
      <div className="flex justify-center items-center gap-6 md:gap-10 flex-wrap">
        {teamMembers.map((member, i) => (
          <motion.div
            key={member.name}
            className="relative flex flex-col items-center cursor-pointer"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            initial={false}
            animate={{
              scale: active === i ? 1.18 : 1,
              zIndex: active === i ? 2 : 1
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <motion.img
              src={member.img}
              alt={member.name}
              className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-full border-4 border-[#F88220] shadow-lg"
              whileHover={{ filter: "brightness(1.07)" }}
              style={{
                boxShadow: active === i ? "0 0 0 6px #F8822066" : undefined
              }}
            />
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 mt-3 bg-black/90 text-white rounded-xl px-4 py-2 text-base font-semibold pointer-events-none z-30"
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: active === i ? 1 : 0,
                y: active === i ? 0 : 8
              }}
              transition={{ duration: 0.24 }}
              style={{ bottom: "-44px", whiteSpace: "nowrap" }}
            >
              <span className="block font-bold">{member.name}</span>
              <span className="text-sm text-[#F88220] font-normal">{member.role}</span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
</lov_write>

<lov-write file_path="src/components/contact/InteractiveMapSection.tsx">
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
