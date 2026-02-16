"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
    X, User, Mail, Phone, Briefcase, MessageSquare,
    ChevronDown, Loader2, CheckCircle2, ArrowRight, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createMarketplaceLead } from "@/lib/marketplace-action";
import { BUSINESS_TYPES, PLATFORMS } from "@/types/marketplace-types";

interface GetStartedModalProps {
    isOpen: boolean;
    onClose: () => void;
    productId: string;
    productSlug: string;
    productType: "agent" | "automation" | "website";
    productName: string;
    price: number;
    /** Your WhatsApp number in international format e.g. "8801XXXXXXXXX" */
    whatsappNumber?: string;
}

type Step = "form" | "success";

const EMPTY_FORM = {
    fullName: "",
    email: "",
    whatsappNumber: "",
    businessType: "",
    platform: "",
    requirements: "",
};

export function GetStartedModal({
    isOpen,
    onClose,
    productId,
    productSlug,
    productType,
    productName,
    price,
    whatsappNumber = "8801XXXXXXXXX", // ← replace with your number
}: GetStartedModalProps) {
    const { t, i18n } = useTranslation("marketplace");
    const [step, setStep] = useState<Step>("form");
    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState<Partial<typeof EMPTY_FORM>>({});
    const [loading, setLoading] = useState(false);

    function validate() {
        const e: Partial<typeof EMPTY_FORM> = {};
        if (!form.fullName.trim()) e.fullName = "Name is required";
        if (!form.email.includes("@")) e.email = "Valid email required";
        if (form.whatsappNumber.length < 10) e.whatsappNumber = "Valid WhatsApp number required";
        setErrors(e);
        return Object.keys(e).length === 0;
    }

    async function handleSubmit() {
        if (!validate()) return;
        setLoading(true);
        const res = await createMarketplaceLead({
            productId,
            productSlug,
            productType,
            productName,
            fullName: form.fullName,
            email: form.email,
            whatsappNumber: form.whatsappNumber,
            businessType: form.businessType || undefined,
            platform: form.platform || undefined,
            requirements: form.requirements || undefined,
        });
        setLoading(false);
        if (res.success) setStep("success");
    }

    function handleWhatsApp() {
        const msg = encodeURIComponent(
            `Hi! I'm interested in *${productName}* (৳${price}).\n\nMy details:\n• Name: ${form.fullName}\n• Business: ${form.businessType || "N/A"}\n• Platform: ${form.platform || "N/A"}\n\n${form.requirements ? `Requirements: ${form.requirements}` : ""}`
        );
        window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, "_blank");
    }

    function handleClose() {
        onClose();
        setTimeout(() => { setStep("form"); setForm(EMPTY_FORM); setErrors({}); }, 300);
    }

    const field = (
        name: keyof typeof EMPTY_FORM,
        label: string,
        placeholder: string,
        icon: React.ReactNode,
        type = "text"
    ) => (
        <div>
            <label className="block text-xs font-black text-foreground mb-1.5">{label}</label>
            <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {icon}
                </div>
                <input
                    type={type}
                    value={form[name]}
                    onChange={e => { setForm(f => ({ ...f, [name]: e.target.value })); setErrors(er => ({ ...er, [name]: undefined })); }}
                    placeholder={placeholder}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-muted/50 dark:bg-white/[0.05] border
            text-foreground placeholder:text-muted-foreground/60 outline-none
            focus:border-primary/50 transition-colors
            ${errors[name] ? "border-destructive/50" : "border-border dark:border-white/[0.08]"}`}
                />
            </div>
            {errors[name] && <p className="text-[11px] text-destructive mt-1">{errors[name]}</p>}
        </div>
    );

    const selectField = (
        name: keyof typeof EMPTY_FORM,
        label: string,
        placeholder: string,
        icon: React.ReactNode,
        options: readonly string[]
    ) => (
        <div>
            <label className="block text-xs font-black text-foreground mb-1.5">{label}</label>
            <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                    {icon}
                </div>
                <select
                    value={form[name]}
                    onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
                    className="w-full pl-10 pr-8 py-2.5 rounded-xl text-sm bg-muted/50 dark:bg-white/[0.05] border border-border dark:border-white/[0.08] text-foreground outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer"
                >
                    <option value="">{placeholder}</option>
                    {options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            </div>
        </div>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        onClick={handleClose}
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.97 }}
                        transition={{ type: "spring", damping: 26, stiffness: 300 }}
                        className="fixed inset-x-4 top-[50%] -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2
                       md:w-[480px] max-h-[90vh] overflow-y-auto z-50
                       bg-background dark:bg-[#0f0f1a] border border-border dark:border-white/[0.09]
                       rounded-3xl shadow-2xl shadow-black/30"
                    >
                        {/* Header gradient strip */}
                        <div className="relative bg-gradient-to-r from-primary via-primary to-secondary px-6 pt-6 pb-8 rounded-t-3xl overflow-hidden">
                            <div className="absolute inset-0 opacity-[0.06]"
                                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
                            <button onClick={handleClose} className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors">
                                <X className="w-4 h-4 text-white" />
                            </button>
                            <div className="flex items-center gap-2 mb-2">
                                <Zap className="w-4 h-4 text-white/80" />
                                <span className="text-xs font-bold text-white/70">Get Started</span>
                            </div>
                            <h2 className="text-lg font-black text-white leading-snug pr-8">{productName}</h2>
                            <p className="text-2xl font-black text-white mt-1">৳{price.toLocaleString()}</p>
                        </div>

                        <div className="px-6 pb-6">
                            {/* Pull tab */}
                            <div className="flex justify-center -mt-0 mb-5 pt-4">
                                <div className="text-xs text-muted-foreground font-medium text-center">
                                    Fill in your details — we'll reach out within 2 hours
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                {step === "form" ? (
                                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3.5">
                                        {field("fullName", "Full Name *", "Enter your full name", <User className="w-4 h-4" />)}
                                        {field("email", "Email Address *", "your@email.com", <Mail className="w-4 h-4" />, "email")}
                                        {field("whatsappNumber", "WhatsApp Number *", "+880 1XXX-XXXXXX", <Phone className="w-4 h-4" />)}
                                        <p className="text-[11px] text-muted-foreground -mt-2 pl-1">We'll contact you here within 2 hours</p>
                                        {selectField("businessType", "Business Type", "Select your business type", <Briefcase className="w-4 h-4" />, BUSINESS_TYPES)}
                                        {selectField("platform", "Automation Platform *", "Where do you need automation?", <MessageSquare className="w-4 h-4" />, PLATFORMS)}

                                        {/* Requirements */}
                                        <div>
                                            <label className="block text-xs font-black text-foreground mb-1.5">Brief Requirements <span className="text-muted-foreground font-normal">(Optional)</span></label>
                                            <textarea
                                                value={form.requirements}
                                                onChange={e => setForm(f => ({ ...f, requirements: e.target.value }))}
                                                placeholder="Tell us briefly what you need..."
                                                rows={3}
                                                className="w-full px-4 py-2.5 rounded-xl text-sm bg-muted/50 dark:bg-white/[0.05] border border-border dark:border-white/[0.08] text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary/50 transition-colors resize-none"
                                            />
                                        </div>

                                        <Button
                                            onClick={handleSubmit}
                                            disabled={loading}
                                            className="w-full bg-primary hover:bg-primary/90 font-black text-white shadow-lg shadow-primary/20 h-11 group"
                                        >
                                            {loading
                                                ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</>
                                                : <>Submit & Continue <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" /></>
                                            }
                                        </Button>
                                        <p className="text-[11px] text-center text-muted-foreground">Your information is safe and never shared with third parties.</p>
                                    </motion.div>

                                ) : (
                                    <motion.div key="success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-4 space-y-4">
                                        <div className="w-16 h-16 rounded-2xl bg-accent/15 border border-accent/20 flex items-center justify-center mx-auto">
                                            <CheckCircle2 className="w-8 h-8 text-accent" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-foreground mb-1">You're all set!</h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                We've received your details. Now message us on WhatsApp — our AI agent will give you a live demo of <strong>{productName}</strong> instantly.
                                            </p>
                                        </div>
                                        <Button
                                            onClick={handleWhatsApp}
                                            className="w-full bg-[#25D366] hover:bg-[#20bd59] text-white font-black shadow-lg shadow-[#25D366]/20 h-11 group"
                                        >
                                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                            </svg>
                                            Chat on WhatsApp for Demo
                                        </Button>
                                        <button onClick={handleClose} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                                            Close
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}