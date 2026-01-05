"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CalendarEmbed() {
  return (
    <section className="py-20 bg-[#F9F9F9] relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(#E5E5E5 1px, transparent 1px),
            linear-gradient(90deg, #E5E5E5 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-[#FF6B00] text-white px-4 py-2 rounded-full font-mono text-sm mb-4">
              <Calendar className="w-4 h-4" />
              DIRECT_SCHEDULING
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4 font-montserrat">
              Prefer a Direct Bridge?
            </h2>
            <p className="text-lg text-[#0A0A0A]/70 max-w-2xl mx-auto font-montserrat">
              Select a 15-minute technical discovery slot directly on our
              calendar. No forms, no waiting.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar Preview */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl shadow-xl border border-[#E5E5E5] overflow-hidden">
                {/* Calendar Header */}
                <div className="bg-[#0A0A0A] text-white p-4 border-b border-[#E5E5E5]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-[#FF6B00]" />
                      <span className="font-bold">Technical Discovery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-mono">15 MIN</span>
                    </div>
                  </div>
                </div>

                {/* Calendar Interface Mockup */}
                <div className="p-6">
                  {/* Month/Year Header */}
                  <div className="flex justify-between items-center mb-6">
                    <button className="p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors">
                      <ArrowRight className="w-4 h-4 rotate-180" />
                    </button>
                    <h3 className="text-xl font-bold text-[#0A0A0A] font-mono">
                      DECEMBER 2025
                    </h3>
                    <button className="p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Days of Week */}
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
                      (day) => (
                        <div
                          key={day}
                          className="text-center text-sm font-bold text-[#0A0A0A]/60 font-mono py-2"
                        >
                          {day}
                        </div>
                      )
                    )}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2">
                    {/* Previous month dates */}
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={`prev-${i}`}
                        className="aspect-square flex items-center justify-center text-[#0A0A0A]/30 font-mono text-sm"
                      >
                        {28 + i}
                      </div>
                    ))}

                    {/* Current month dates */}
                    {[...Array(31)].map((_, i) => {
                      const day = i + 1;
                      const isToday = day === 26; // Current date
                      const hasSlots = [15, 18, 22, 26, 28].includes(day);

                      return (
                        <motion.button
                          key={day}
                          className={`aspect-square rounded-lg border transition-all duration-200 ${
                            isToday
                              ? "bg-[#FF6B00] text-white border-[#FF6B00] font-bold"
                              : hasSlots
                                ? "bg-white text-[#0A0A0A] border-[#E5E5E5] hover:border-[#FF6B00] hover:bg-[#FF6B00]/5"
                                : "bg-[#F5F5F5] text-[#0A0A0A]/30 border-[#E5E5E5]"
                          }`}
                          whileHover={hasSlots ? { scale: 1.05 } : {}}
                          whileTap={hasSlots ? { scale: 0.95 } : {}}
                        >
                          <span className="font-mono text-sm">{day}</span>
                          {hasSlots && !isToday && (
                            <div className="w-1 h-1 bg-[#FF6B00] rounded-full mx-auto mt-1"></div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Available Times */}
                  <div className="mt-6">
                    <h4 className="font-bold text-[#0A0A0A] mb-3">
                      Available Times - Dec 26
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {["09:00 AM", "10:30 AM", "02:00 PM", "03:30 PM"].map(
                        (time) => (
                          <button
                            key={time}
                            className="p-3 text-center bg-white border border-[#E5E5E5] rounded-lg hover:border-[#FF6B00] hover:bg-[#FF6B00]/5 transition-colors font-mono text-sm"
                          >
                            {time}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Quick Book CTA */}
              <div className="bg-[#FF6B00] text-white p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-3">Book Instantly</h3>
                <p className="text-white/90 mb-4 text-sm">
                  Select any available time slot and get instant confirmation.
                </p>
                <Button className="w-full bg-white text-[#FF6B00] hover:bg-white/90 font-bold">
                  Open Full Calendar
                </Button>
              </div>

              {/* What to Expect */}
              <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5]">
                <h4 className="font-bold text-[#0A0A0A] mb-4">
                  What to Expect
                </h4>
                <div className="space-y-3">
                  {[
                    "Technical project assessment",
                    "Solution architecture overview",
                    "Timeline and budget discussion",
                    "Next steps planning",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#FF6B00] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-[#0A0A0A]/70">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Alternative */}
              <div className="bg-[#F5F5F5] p-6 rounded-2xl border border-[#E5E5E5]">
                <h4 className="font-bold text-[#0A0A0A] mb-3">
                  Need a Different Time?
                </h4>
                <p className="text-sm text-[#0A0A0A]/70 mb-4">
                  Can't find a slot that works? Send us a message and we'll find
                  a time.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white"
                >
                  Contact Support
                </Button>
              </div>
            </motion.div>
          </div>

          {/* System Status */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-[#E5E5E5]">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-mono text-sm text-[#0A0A0A]/70">
                CALENDAR_STATUS: ACTIVE | TIMEZONE: UTC+6 | AVAILABILITY: HIGH
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
