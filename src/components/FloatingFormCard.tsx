
import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const projectTypes = [
  "Website Design",
  "App Development",
  "SEO/Digital Marketing",
  "AI Solutions"
];

export default function FloatingFormCard() {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    project: "",
    desc: ""
  });

  const [focus, setFocus] = useState("");

  return (
    <motion.div
      className="max-w-md w-full shadow-lg rounded-xl bg-background border border-muted mx-auto p-8"
      animate={{
        y: [0, -10, 0]
      }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
    >
      <form
        className="flex flex-col gap-5"
        onSubmit={e => {
          e.preventDefault();
          alert("Thanks! We’ll be in touch soon.");
        }}
      >
        <div>
          <label className="block text-sm mb-1 font-semibold text-foreground" htmlFor="web-inp-name">Name</label>
          <Input
            id="web-inp-name"
            value={fields.name}
            onFocus={() => setFocus("name")}
            onBlur={() => setFocus("")}
            onChange={e => setFields(f => ({ ...f, name: e.target.value }))}
            className={focus === "name" ? "border-primary ring-2 ring-primary" : ""}
            required
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm mb-1 font-semibold text-foreground" htmlFor="web-inp-email">Email</label>
          <Input
            id="web-inp-email"
            value={fields.email}
            required
            type="email"
            onFocus={() => setFocus("email")}
            onBlur={() => setFocus("")}
            onChange={e => setFields(f => ({ ...f, email: e.target.value }))}
            className={focus === "email" ? "border-primary ring-2 ring-primary" : ""}
            placeholder="you@email.com"
          />
        </div>
        <div>
          <label className="block text-sm mb-1 font-semibold text-foreground" htmlFor="web-inp-type">Project Type</label>
          <select
            id="web-inp-type"
            required
            className={`w-full h-10 rounded-md border bg-background px-3 text-base focus:outline-none ${focus === "project" ? "border-primary ring-2 ring-primary" : "border-input"}`}
            value={fields.project}
            onFocus={() => setFocus("project")}
            onBlur={() => setFocus("")}
            onChange={e => setFields(f => ({ ...f, project: e.target.value }))}
          >
            <option value="" disabled>Select project type</option>
            {projectTypes.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1 font-semibold text-foreground" htmlFor="web-inp-desc">Describe your needs</label>
          <Textarea
            id="web-inp-desc"
            value={fields.desc}
            required
            rows={3}
            onFocus={() => setFocus("desc")}
            onBlur={() => setFocus("")}
            onChange={e => setFields(f => ({ ...f, desc: e.target.value }))}
            className={focus === "desc" ? "border-primary ring-2 ring-primary" : ""}
            placeholder="What would make your project a success?"
          />
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-lg h-11 mt-2">Send</Button>
        <a href="/contact" className="block mt-3 text-primary text-center hover:underline font-semibold transition">Schedule a 15-min call</a>
      </form>
    </motion.div>
  );
}
