
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function CollaborateBanner() {
  return (
    <section className="w-full py-16 bg-[#161221] flex flex-col md:flex-row items-center justify-center gap-6 mt-12 relative z-10">
      <div className="text-2xl md:text-3xl font-semibold text-white md:mr-6 text-center">
        Inspired? Let&apos;s Build Yours Next
        <motion.div
          className="w-full h-1 bg-[#F88220] mt-3 rounded-full"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.58, type: "tween" }}
          style={{ transformOrigin: "left" }}
        />
      </div>
      <Link to="/contact">
        <motion.button
          className="bg-[#F88220] hover:bg-[#fa973a] text-white px-10 py-4 rounded-xl text-lg font-bold shadow-xl tracking-tight focus:ring-2 focus:ring-[#F88220] focus:outline-none relative"
          initial={{ filter: "drop-shadow(0 0 0 #F88220)" }}
          animate={{ filter: [
            "drop-shadow(0 0 18px #F8822099)",
            "drop-shadow(0 0 55px #F8822099)",
            "drop-shadow(0 0 18px #F8822099)"
          ] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        >
          Start Your Project
        </motion.button>
      </Link>
    </section>
  );
}
