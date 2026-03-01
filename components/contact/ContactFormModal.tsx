"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { X, Send, Loader2, CheckCircle2 } from "lucide-react";
import type { ContactFormData } from "@/types/contact-types";

interface ContactFormModalProps {
    open: boolean;
    onClose: () => void;
}

export function ContactFormModal({ open, onClose }: ContactFormModalProps) {
    const { t } = useTranslation("contactPage");
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "AI Agents",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        setErrorMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || "Failed to submit form");
            }

            setStatus("success");
            setTimeout(() => {
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    company: "",
                    service: "AI Agents",
                    message: "",
                });
                setStatus("idle");
                onClose();
            }, 3000);
        } catch (error: any) {
            console.error("Form submission error:", error);
            setStatus("error");
            setErrorMessage(error.message || "Failed to submit form. Please try again.");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                                            {t("form.successTitle")}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {t("form.successMessage")}
                                        </p>
                                    </motion.div>
                                ) : (
                                    <>
                                        <h3 className="text-2xl font-black text-foreground mb-2">
                                            {t("form.title")}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-6">
                                            {t("form.subtitle")}
                                        </p>

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-foreground mb-1.5">
                                                        {t("form.name")} *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        required
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        className="w-full px-3 py-2.5 text-sm bg-muted border border-border rounded-xl
                                       text-foreground placeholder:text-muted-foreground/50
                                       focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20
                                       transition-all"
                                                        placeholder="Your name"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-foreground mb-1.5">
                                                        {t("form.email")} *
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={handleChange}
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
                                                        {t("form.phone")}
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        className="w-full px-3 py-2.5 text-sm bg-muted border border-border rounded-xl
                                       text-foreground placeholder:text-muted-foreground/50
                                       focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20
                                       transition-all"
                                                        placeholder="+880..."
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-foreground mb-1.5">
                                                        {t("form.company")}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="company"
                                                        value={formData.company}
                                                        onChange={handleChange}
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
                                                    {t("form.service")} *
                                                </label>
                                                <select
                                                    name="service"
                                                    required
                                                    value={formData.service}
                                                    onChange={handleChange}
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
                                                    {t("form.message")} *
                                                </label>
                                                <textarea
                                                    name="message"
                                                    required
                                                    value={formData.message}
                                                    onChange={handleChange}
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
                                                        {t("form.submitting")}
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="w-4 h-4" />
                                                        {t("form.submit")}
                                                    </>
                                                )}
                                            </button>

                                            {status === "error" && (
                                                <p className="text-xs text-red-500 text-center">
                                                    {errorMessage || t("form.error")}
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