
import { useState } from "react";
import { motion } from "framer-motion";

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
