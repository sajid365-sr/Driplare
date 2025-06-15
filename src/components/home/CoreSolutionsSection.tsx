
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const mainCard = {
  img: "/lovable-uploads/1f7d0f6d-ced2-4ed3-9d47-45224395b708.png",
  tags: ["Real-time Analytics", "Social", "Agile Advance", "Advance"],
  title: "Rising Stars Obscure",
  number: "01"
};

const verticalCards = [
  {
    label: "Digital Marketing",
    desc:
      "Reprehendeuire irit in volut ate velit esse cillum dolDuis aute irure dolor in ore",
    link: "#",
    number: "02",
    rotText: "Instantly Analyze"
  },
  {
    label: "Web & Mobile",
    desc: "",
    link: "#",
    number: "03",
    rotText: "Web & Mobile"
  },
  {
    label: "Email Marketing",
    desc: "",
    link: "#",
    number: "04",
    rotText: "Email Marketing"
  }
];

// Animation variants for vertical cards
const cardVariants = {
  collapsed: {
    width: 72,
    boxShadow: "0 4px 14px 0 rgba(65,68,154,0.10)",
    borderRadius: "2rem",
    background: "linear-gradient(135deg,#816cff 60%,#4d39cf 100%)",
    transition: {
      type: "spring",
      stiffness: 340,
      damping: 30,
      duration: 0.42
    }
  },
  expanded: {
    width: 220,
    boxShadow: "0 12px 32px 0 rgba(77,57,207,.10),0 2px 8px 0 rgba(130,90,250,0.07)",
    borderRadius: "2rem",
    background: "linear-gradient(135deg,#816cff 60%,#4d39cf 100%)",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 23,
      duration: 0.48
    }
  }
};

export function CoreSolutionsSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section className="relative py-20 bg-white dark:bg-secondary/20 overflow-x-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-14 gap-8 md:gap-0">
          <div>
            <h2
              className="text-[2.4rem] md:text-[3.3rem] font-extrabold leading-tight text-neutral-900 dark:text-white mb-2"
              style={{
                fontFamily: 'Inter, sans-serif',
                letterSpacing: "-0.01em",
                lineHeight: 1.09,
                textShadow: "0 2px 10px rgba(65,41,180,.06)"
              }}
            >
              We Are A Creative Digital<br className="hidden md:block" />
              Marketing Agency
            </h2>
          </div>
          <div className="flex-shrink-0">
            <Link to="/digital-marketing">
              <button className="flex items-center bg-gradient-to-br from-[#816cff] to-[#4d39cf] text-white text-base font-semibold py-3 px-7 rounded-full shadow-xl gap-3 transition-all active:scale-95 hover:opacity-95">
                EXPLORE MORE
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>

        {/* Main card + vertical cards */}
        <div className="flex flex-col md:flex-row gap-7 items-stretch">
          {/* Main feature card */}
          <motion.div
            className="relative flex flex-col justify-end bg-gradient-to-tr from-[#eee0ff] via-[#b2b5fd] to-[#dcebfa] rounded-3xl w-full max-w-[540px] min-h-[340px] shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{
              borderRadius: '2.4rem',
              boxShadow: "0 14px 54px 0 rgba(130,104,246,.13),0 1.5px 8px 0 rgba(65,68,154,0.07)"
            }}
          >
            <img
              src={mainCard.img}
              alt="Digital hero"
              className="absolute inset-0 w-full h-full object-cover object-center rounded-3xl z-0"
              style={{ filter: "brightness(0.95)" }}
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#816cffcc] via-[#816cff30] to-transparent z-10 pointer-events-none rounded-3xl" />

            {/* Pills */}
            <div className="relative z-20 flex flex-wrap gap-3 p-7 pt-8">
              {mainCard.tags.map(tag => (
                <span
                  key={tag}
                  className="flex items-center bg-gradient-to-br from-[#816cff] to-[#4d39cf] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow hover:scale-105 transition-transform cursor-pointer"
                >
                  {tag}
                  <Send className="ml-1 w-3.5 h-3.5" />
                </span>
              ))}
            </div>
            {/* Title and number */}
            <div className="relative z-20 flex items-end justify-between px-7 pb-6 pt-4">
              <div className="flex items-center gap-2">
                <span className="inline-block bg-white/25 text-white px-2 py-1 rounded shadow">
                  <svg className="inline w-4 h-4 -mt-1 mr-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><circle cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={2.5} /><circle cx={12} cy={12} r={4} fill="currentColor" /></svg>
                </span>
                <span className="text-white font-bold text-lg drop-shadow">{mainCard.title}</span>
              </div>
              <span className="bg-white/25 text-white font-bold text-lg px-3 py-1 rounded-full drop-shadow">{mainCard.number}</span>
            </div>
          </motion.div>

          {/* Vertical expand cards */}
          <div className="flex flex-row gap-4">
            {verticalCards.map((card, i) => (
              <motion.div
                key={card.label}
                className="relative flex flex-col justify-between items-center cursor-pointer group"
                onMouseEnter={() => setExpanded(i)}
                onMouseLeave={() => setExpanded(null)}
                tabIndex={0}
                initial={false}
                animate={expanded === i ? "expanded" : "collapsed"}
                variants={cardVariants}
                style={{ minWidth: 72, maxWidth: 220, height: 340, borderRadius: "2rem", transition: "box-shadow 0.23s" }}
              >
                {/* Card Number */}
                <span className="absolute top-4 left-4 text-white font-bold opacity-70 text-[17px] select-none z-10">
                  {card.number}
                </span>
                {/* Rotated text (always visible) */}
                <motion.div
                  className="absolute left-2 bottom-4 origin-bottom-left"
                  animate={expanded === i
                    ? { rotate: 0, y: 0, x: 15, opacity: 0, transition: { duration: 0.22 } }
                    : { rotate: -90, y: 0, x: 0, opacity: 1 }
                  }
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed"
                  }}
                >
                  <span className="text-white font-bold text-lg tracking-wide select-none">{card.rotText}</span>
                </motion.div>
                {/* Expanded content on hover */}
                <AnimatePresence>
                  {expanded === i && (
                    <motion.div
                      className="w-full h-full flex flex-col justify-center items-center px-7"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.37, ease: "easeOut" }
                      }}
                      exit={{
                        opacity: 0,
                        x: 60,
                        transition: { duration: 0.23, ease: "easeIn" }
                      }}
                    >
                      <div className="mt-4 mb-2 text-white text-xl font-bold text-center">{card.label}</div>
                      {card.desc && (
                        <div className="text-white/90 text-sm mb-4 text-center">{card.desc}</div>
                      )}
                      <div>
                        <Link to={card.link}>
                          <span className="flex items-center gap-1 text-sm text-white underline-offset-4 underline hover:no-underline opacity-80 hover:opacity-100 transition">
                            Read More <ArrowRight className="ml-0.5 w-4 h-4" />
                          </span>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
