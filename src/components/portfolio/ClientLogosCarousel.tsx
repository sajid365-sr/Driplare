
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const logos = [
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    alt: "Microsoft",
    quote: "Their AI solutions exceeded our expectations."
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    alt: "Netflix",
    quote: "Outstanding design, seamless delivery!"
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    alt: "IBM",
    quote: "Professional, future-minded partnership."
  },
];

export function ClientLogosCarousel() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [active, setActive] = useState(0);

  // cycle active logo for testimonial
  useEffect(() => {
    const timer = setInterval(() => setActive((a) => (a + 1) % logos.length), 4200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section>
      <h3 className="text-2xl font-bold mb-8 text-center">Our Clients &amp; Endorsements</h3>
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        {/* Carousel */}
        <div className="flex-1 flex overflow-x-auto gap-10 py-4 scrollbar-none">
          {logos.map((logo, i) => (
            <motion.div
              key={logo.alt}
              className="flex flex-col items-center cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              animate={{
                scale: hovered === i || active === i ? 1.22 : 1,
                filter: (hovered === i || active === i) ? "drop-shadow(0 0 18px #F8822040)" : "none"
              }}
              transition={{ type: "spring" }}
            >
              <img src={logo.img} alt={logo.alt} className="h-16 md:h-20 w-auto mb-2 transition-all duration-200" />
            </motion.div>
          ))}
        </div>
        {/* Testimonial */}
        <motion.div
          className="flex-1 min-w-[250px] flex flex-col items-center justify-center bg-[#181C22] rounded-xl p-8 shadow-xl text-center relative"
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-xl font-bold mb-4 text-[#F88220]">{logos[active].alt}</div>
          <div className="text-base text-blue-100 font-medium max-w-xs">{logos[active].quote}</div>
        </motion.div>
      </div>
    </section>
  );
}
