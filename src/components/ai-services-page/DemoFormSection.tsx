import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const SERVICE_OPTIONS = [
  "Chatbot Integration",
  "Custom AI Agent",
  "AI Automation",
];
export function DemoFormSection() {
  const [visible, setVisible] = useState(false);
  const [fields, setFields] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
  });

  // Show form when scrolled near end (simple trigger via button for demo)
  return (
    <>
      <div className="py-24 px-4 flex justify-center items-center">
        <Button
          className="bg-gradient-to-r from-[#1EAEDB] to-[#F88220] px-8 py-4 text-lg font-bold shadow-lg animate-bounce"
          onClick={() => setVisible(true)}
        >
          Request a Demo
        </Button>
      </div>
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 flex items-end justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.form
              className="w-full max-w-lg rounded-t-3xl bg-[#1A1F2C] px-8 py-10 shadow-2xl flex flex-col gap-5 glass-morphism relative"
              initial={{ y: 500 }}
              animate={{ y: 0 }}
              exit={{ y: 500 }}
              transition={{ type: "spring", bounce: 0.28, duration: 0.8 }}
              onSubmit={(e) => {
                e.preventDefault();
                setVisible(false);
                // Here you would handle submit (API/send etc)
              }}
            >
              <button
                type="button"
                onClick={() => setVisible(false)}
                className="absolute top-4 right-4 text-blue-200 hover:text-white bg-[#22233a]/60 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none font-bold"
                aria-label="Close"
              >
                ×
              </button>
              <h4 className="text-2xl font-bold text-[#1EAEDB] mb-2 text-center">
                Request a Demo
              </h4>
              <input
                required
                type="text"
                placeholder="Full Name"
                value={fields.name}
                onChange={(e) =>
                  setFields((f) => ({ ...f, name: e.target.value }))
                }
                className="bg-[#22243d] rounded-md px-4 py-3 text-white outline-none border-0 placeholder:text-blue-200 focus:ring-2 focus:ring-[#1eaedb] transition"
              />
              <input
                required
                type="email"
                placeholder="Email"
                value={fields.email}
                onChange={(e) =>
                  setFields((f) => ({ ...f, email: e.target.value }))
                }
                className="bg-[#22243d] rounded-md px-4 py-3 text-white outline-none border-0 placeholder:text-blue-200 focus:ring-2 focus:ring-[#1eaedb] transition"
              />
              <input
                required
                type="text"
                placeholder="Company"
                value={fields.company}
                onChange={(e) =>
                  setFields((f) => ({ ...f, company: e.target.value }))
                }
                className="bg-[#22243d] rounded-md px-4 py-3 text-white outline-none border-0 placeholder:text-blue-200 focus:ring-2 focus:ring-[#1eaedb] transition"
              />
              <select
                title="AI Service"
                required
                value={fields.service}
                onChange={(e) =>
                  setFields((f) => ({ ...f, service: e.target.value }))
                }
                className="bg-[#22243d] rounded-md px-4 py-3 text-white border-0 focus:ring-2 focus:ring-[#1EAEDB] outline-none"
              >
                <option value="">Which AI service?</option>
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <motion.button
                type="submit"
                className="w-full mt-4 py-3 rounded-lg text-lg font-bold bg-gradient-to-r from-[#1EAEDB] to-[#F88220] shadow-xl hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#F88220] transition-all"
                whileHover={{
                  boxShadow: "0 0 16px 8px #1eaedb66, 0 0 0 0 #f8822066",
                  scale: 1.04,
                }}
              >
                Submit
              </motion.button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
