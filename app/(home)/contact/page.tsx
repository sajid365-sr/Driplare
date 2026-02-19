"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
    Calendar as CalendarIcon, MessageCircle, Mail, Send,
    Clock, Globe, Star, CheckCircle2, X, Sparkles,
    MapPin, Phone, Loader2,
} from "lucide-react";
import { GridLayer, DarkGridBoost, GlowBlob, BRAND } from "@/components/effects/bg-effects";

// ─── Contact Form Modal ───────────────────────────────────────────────────────
function ContactFormModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    const { t } = useTranslation("contactPage");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "AI Agents",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            // Replace with your actual n8n webhook URL
            const webhookUrl = process.env.NEXT_PUBLIC_N8N_CONTACT_WEBHOOK || "/api/contact";

            const res = await fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    timestamp: new Date().toISOString(),
                    source: "contact_page",
                }),
            });

            if (!res.ok) throw new Error("Failed");

            setStatus("success");
            // Reset form after 3 seconds
            setTimeout(() => {
                setFormData({ name: "", email: "", phone: "", company: "", service: "AI Agents", message: "" });
                setStatus("idle");
                onClose();
            }, 3000);
        } catch {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                            className="bg-background border border-border rounded-3xl shadow-2xl
                         w-full max-w-lg max-h-[85vh] overflow-y-auto pointer-events-auto
                         relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-muted hover:bg-muted/80
                           flex items-center justify-center transition-colors z-10"
                                aria-label="Close"
                            >
                                <X className="w-4 h-4 text-muted-foreground" />
                            </button>

                            <div className="p-6 md:p-8">
                                {status === "success" ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center text-center py-8"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                                            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                                        </div>
                                        <h3 className="text-xl font-black text-foreground mb-2">
                                            {t("contact.form.successTitle")}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {t("contact.form.successMessage")}
                                        </p>
                                    </motion.div>
                                ) : (
                                    <>
                                        <h3 className="text-2xl font-black text-foreground mb-2">
                                            {t("contact.form.title")}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-6">
                                            {t("contact.form.subtitle")}
                                        </p>

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-foreground mb-1.5">
                                                        {t("contact.form.name")} *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        className="w-full px-3 py-2.5 text-sm bg-muted border border-border rounded-xl
                                       text-foreground placeholder:text-muted-foreground/50
                                       focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20
                                       transition-all"
                                                        placeholder="Your name"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-foreground mb-1.5">
                                                        {t("contact.form.email")} *
                                                    </label>
                                                    <input
                                                        type="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        className="w-full px-3 py-2.5 text-sm bg-muted border border-border rounded-xl
                                       text-foreground placeholder:text-muted-foreground/50
                                       focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20
                                       transition-all"
                                                        placeholder="your@email.com"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-foreground mb-1.5">
                                                        {t("contact.form.phone")}
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        className="w-full px-3 py-2.5 text-sm bg-muted border border-border rounded-xl
                                       text-foreground placeholder:text-muted-foreground/50
                                       focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20
                                       transition-all"
                                                        placeholder="+880..."
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-foreground mb-1.5">
                                                        {t("contact.form.company")}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.company}
                                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                        className="w-full px-3 py-2.5 text-sm bg-muted border border-border rounded-xl
                                       text-foreground placeholder:text-muted-foreground/50
                                       focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20
                                       transition-all"
                                                        placeholder="Your company"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-foreground mb-1.5">
                                                    {t("contact.form.service")} *
                                                </label>
                                                <select
                                                    required
                                                    value={formData.service}
                                                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                                    className="w-full px-3 py-2.5 text-sm bg-muted border border-border rounded-xl
                                     text-foreground focus:outline-none focus:border-primary/50
                                     focus:ring-2 focus:ring-primary/20 transition-all"
                                                >
                                                    <option>AI Agents</option>
                                                    <option>Workflow Automation</option>
                                                    <option>Web Development</option>
                                                    <option>AI Consulting</option>
                                                    <option>Not sure yet</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-foreground mb-1.5">
                                                    {t("contact.form.message")} *
                                                </label>
                                                <textarea
                                                    required
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    rows={4}
                                                    className="w-full px-3 py-2.5 text-sm bg-muted border border-border rounded-xl
                                     text-foreground placeholder:text-muted-foreground/50 resize-none
                                     focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20
                                     transition-all"
                                                    placeholder="Tell us about your project..."
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={status === "submitting"}
                                                className="w-full inline-flex items-center justify-center gap-2
                                   bg-primary hover:bg-primary/90 disabled:bg-primary/50
                                   text-primary-foreground font-black text-sm px-6 py-3 rounded-xl
                                   shadow-md shadow-primary/20 transition-all"
                                            >
                                                {status === "submitting" ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                        {t("contact.form.submitting")}
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="w-4 h-4" />
                                                        {t("contact.form.submit")}
                                                    </>
                                                )}
                                            </button>

                                            {status === "error" && (
                                                <p className="text-xs text-red-500 text-center">
                                                    {t("contact.form.error")}
                                                </p>
                                            )}
                                        </form>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

// ─── Main Contact Page ────────────────────────────────────────────────────────
export default function ContactPage() {
    const { t } = useTranslation("contactPage");
    const [formOpen, setFormOpen] = useState(false);

    // Replace with your actual WhatsApp number
    const whatsappNumber = "+8801305792949";
    const whatsappMessage = encodeURIComponent(
        t("contact.whatsapp.defaultMessage")
    );

    const faqs = t("contact.faq.items", { returnObjects: true }) as Array<{
        q: string; a: string;
    }>;

    return (
        <div className="min-h-screen bg-background relative overflow-x-hidden">
            {/* bg-effects */}
            <div className="absolute inset-0 pointer-events-none">
                <GridLayer color={BRAND.violet} opacity={0.03} cellSize={44} style="dots" />
                <DarkGridBoost color={BRAND.violet} opacity={0.055} cellSize={44} />
                <GlowBlob color={BRAND.violet} position="top-left" size={500} opacity={0.05} duration={22} />
                <GlowBlob color={BRAND.blue} position="top-right" size={420} opacity={0.04} duration={26} delay={8} />
            </div>

            <div className="relative z-10">
                {/* ── Hero + 3 Conversion Paths ── */}
                <section className="pt-28 pb-16">
                    <div className="container mx-auto px-4 md:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-4xl mx-auto text-center"
                        >
                            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20
                              rounded-full px-3 py-1.5 mb-6">
                                <Sparkles className="w-3.5 h-3.5 text-primary" />
                                <span className="text-[11px] font-black text-primary uppercase tracking-widest">
                                    {t("contact.hero.badge")}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-black text-foreground leading-tight mb-4">
                                {t("contact.hero.title")}{" "}
                                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                                    {t("contact.hero.titleAccent")}
                                </span>
                            </h1>

                            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12">
                                {t("contact.hero.subtitle")}
                            </p>

                            {/* 3 BIG conversion buttons */}
                            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
                                {/* Calendar */}
                                <motion.button
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1, duration: 0.4 }}
                                    onClick={() => {
                                        // Open Cal.com or Calendly embed
                                        // For now, link to your calendar page
                                        window.open("https://cal.com/sajid-sorker-lpluwn", "_blank");
                                    }}
                                    className="group flex flex-col items-center gap-3 p-6 rounded-2xl
                             border-2 border-border hover:border-primary/40
                             bg-card hover:bg-muted/40 hover:shadow-lg
                             transition-all duration-200"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center
                                  group-hover:scale-110 transition-transform">
                                        <CalendarIcon className="w-7 h-7 text-primary" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-black text-foreground mb-1">
                                            {t("contact.paths.calendar.title")}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {t("contact.paths.calendar.desc")}
                                        </p>
                                    </div>
                                </motion.button>

                                {/* WhatsApp */}
                                <motion.a
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.4 }}
                                    href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col items-center gap-3 p-6 rounded-2xl
                             border-2 border-border hover:border-emerald-500/40
                             bg-card hover:bg-emerald-500/5 hover:shadow-lg
                             transition-all duration-200"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center
                                  group-hover:scale-110 transition-transform">
                                        <MessageCircle className="w-7 h-7 text-emerald-500" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-black text-foreground mb-1">
                                            {t("contact.paths.whatsapp.title")}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {t("contact.paths.whatsapp.desc")}
                                        </p>
                                    </div>
                                </motion.a>

                                {/* Form */}
                                <motion.button
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.4 }}
                                    onClick={() => setFormOpen(true)}
                                    className="group flex flex-col items-center gap-3 p-6 rounded-2xl
                             border-2 border-border hover:border-blue-500/40
                             bg-card hover:bg-blue-500/5 hover:shadow-lg
                             transition-all duration-200"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center
                                  group-hover:scale-110 transition-transform">
                                        <Mail className="w-7 h-7 text-blue-500" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-black text-foreground mb-1">
                                            {t("contact.paths.form.title")}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {t("contact.paths.form.desc")}
                                        </p>
                                    </div>
                                </motion.button>
                            </div>

                            {/* Social proof strip */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-muted-foreground"
                            >
                                <span className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5 text-primary" />
                                    <strong className="text-foreground">{t("contact.social.response")}</strong>
                                </span>
                                <span className="hidden sm:block w-px h-3 bg-border" />
                                <span className="flex items-center gap-1.5">
                                    <Globe className="w-3.5 h-3.5 text-primary" />
                                    {t("contact.social.countries")}
                                </span>
                                <span className="hidden sm:block w-px h-3 bg-border" />
                                <span className="flex items-center gap-1.5">
                                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                    {t("contact.social.rating")}
                                </span>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* ── Alternative Contact Info ── */}
                <section className="py-12 border-t border-border bg-muted/20">
                    <div className="container mx-auto px-4 md:px-8">
                        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            <div className="flex items-start gap-3 p-5 rounded-2xl bg-card border border-border">
                                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs font-black text-foreground mb-1">
                                        {t("contact.alt.email.label")}
                                    </p>
                                    <a href="mailto:hello@driplare.com"
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        hello@driplare.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-5 rounded-2xl bg-card border border-border">
                                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs font-black text-foreground mb-1">
                                        {t("contact.alt.phone.label")}
                                    </p>
                                    <a href={`tel:${whatsappNumber}`}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        {whatsappNumber}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-5 rounded-2xl bg-card border border-border">
                                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs font-black text-foreground mb-1">
                                        {t("contact.alt.location.label")}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {t("contact.alt.location.value")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── FAQ ── */}
                <section className="py-16 border-t border-border">
                    <div className="container mx-auto px-4 md:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45 }}
                            className="text-center mb-10"
                        >
                            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
                                {t("contact.faq.title")}
                            </h2>
                            <p className="text-muted-foreground">
                                {t("contact.faq.subtitle")}
                            </p>
                        </motion.div>

                        <div className="max-w-3xl mx-auto space-y-4">
                            {faqs.map((faq, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08, duration: 0.4 }}
                                    className="p-5 rounded-2xl border border-border bg-card"
                                >
                                    <h3 className="text-sm font-black text-foreground mb-2">
                                        {faq.q}
                                    </h3>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        {faq.a}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {/* Form Modal */}
            <ContactFormModal open={formOpen} onClose={() => setFormOpen(false)} />
        </div>
    );
}