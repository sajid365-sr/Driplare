"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User, Mail, Phone, Briefcase, MessageSquare,
    ChevronDown, Loader2, CheckCircle2, ArrowRight,
    Zap, ShieldCheck, Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { createMarketplaceLead } from "@/lib/marketplace-action";
import { BUSINESS_TYPES, PLATFORMS } from "@/types/marketplace-types";

// ─── Props ────────────────────────────────────────────────────────────────────
interface GetStartedModalProps {
    isOpen: boolean;
    onClose: () => void;
    productId: string;
    productSlug: string;
    productType: "agent" | "automation" | "website";
    productName: string;
    price: number;
    /** WhatsApp number in international format e.g. "8801XXXXXXXXX" */
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

// ─── Field sub-components ─────────────────────────────────────────────────────
function Field({
    label, placeholder, icon, type = "text", value, error, onChange,
}: {
    label: string; placeholder: string; icon: React.ReactNode;
    type?: string; value: string; error?: string;
    onChange: (v: string) => void;
}) {
    return (
        <div>
            <label className="block text-xs font-black text-foreground mb-1.5">{label}</label>
            <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                    {icon}
                </div>
                <input
                    type={type}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm
            bg-muted/50 dark:bg-white/[0.05]
            border text-foreground placeholder:text-muted-foreground/60
            outline-none focus:border-primary/50 transition-colors
            ${error ? "border-destructive/50" : "border-border dark:border-white/[0.08]"}`}
                />
            </div>
            {error && <p className="text-[11px] text-destructive mt-1">{error}</p>}
        </div>
    );
}

function SelectField({
    label, placeholder, icon, options, value, onChange,
}: {
    label: string; placeholder: string; icon: React.ReactNode;
    options: readonly string[]; value: string; onChange: (v: string) => void;
}) {
    return (
        <div>
            <label className="block text-xs font-black text-foreground mb-1.5">{label}</label>
            <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                    {icon}
                </div>
                <select
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className="w-full pl-10 pr-8 py-2.5 rounded-xl text-sm
            bg-muted/50 dark:bg-white/[0.05]
            border border-border dark:border-white/[0.08]
            text-foreground outline-none focus:border-primary/50
            transition-colors appearance-none cursor-pointer"
                >
                    <option value="">{placeholder}</option>
                    {options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            </div>
        </div>
    );
}

// ─── Main component ────────────────────────────────────────────────────────────
export function GetStartedModal({
    isOpen,
    onClose,
    productId,
    productSlug,
    productType,
    productName,
    price,
    whatsappNumber = "8801305792949",
}: GetStartedModalProps) {
    const [step, setStep] = useState<Step>("form");
    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState<Partial<typeof EMPTY_FORM>>({});
    const [loading, setLoading] = useState(false);

    const set = (k: keyof typeof EMPTY_FORM) => (v: string) => {
        setForm(f => ({ ...f, [k]: v }));
        setErrors(e => ({ ...e, [k]: undefined }));
    };

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
            `Hi! I'm interested in *${productName}* (৳${price.toLocaleString()}).\n\nMy details:\n• Name: ${form.fullName}\n• Business: ${form.businessType || "N/A"}\n• Platform: ${form.platform || "N/A"}\n\n${form.requirements ? `Requirements: ${form.requirements}` : ""}`
        );
        window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, "_blank");
    }

    function handleClose() {
        onClose();
        setTimeout(() => { setStep("form"); setForm(EMPTY_FORM); setErrors({}); }, 400);
    }

    return (
        <Sheet open={isOpen} onOpenChange={open => { if (!open) handleClose(); }}>
            {/*
        SheetContent fills the full viewport height from top to bottom.
        Internal layout: flex-col with a scrollable middle section.
        The header and footer are flex-shrink-0 — they never scroll.
      */}
            <SheetContent
                side="left"
                className="w-full sm:max-w-[460px] p-0 flex flex-col gap-0
                   bg-background dark:bg-[#0f0f1a]
                   border-l border-border dark:border-white/[0.09]"
            >
                {/* ── Gradient header (fixed height, never scrolls) ─────── */}
                <div className="relative bg-gradient-to-br from-primary via-primary to-secondary px-6 pt-8 pb-7 flex-shrink-0 overflow-hidden">
                    {/* Noise texture */}
                    <div
                        className="absolute inset-0 opacity-[0.06] pointer-events-none"
                        style={{
                            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                        }}
                    />
                    {/* Ghost icon watermark */}
                    <div className="absolute -right-6 -bottom-4 opacity-[0.08] pointer-events-none" aria-hidden>
                        <Zap className="w-28 h-28 text-white" />
                    </div>

                    <SheetHeader className="relative z-10 text-left space-y-0">
                        <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-3.5 h-3.5 text-white/70" />
                            <span className="text-[11px] font-bold text-white/70 uppercase tracking-widest">
                                Get Started
                            </span>
                        </div>
                        <SheetTitle className="text-xl font-black text-white leading-snug">
                            {productName}
                        </SheetTitle>
                        <SheetDescription className="text-white/60 text-sm font-medium pt-0.5">
                            Fill in your details — we'll reach out within 2 hours
                        </SheetDescription>
                        {/* Price pill */}
                        <div className="inline-flex items-baseline gap-1.5 mt-4 bg-white/15 rounded-xl px-4 py-2 w-fit">
                            <span className="text-2xl font-black text-white">৳{price.toLocaleString()}</span>
                            <span className="text-white/60 text-xs font-medium">
                                {productType === "website" ? "fixed price" : "one-time"}
                            </span>
                        </div>
                    </SheetHeader>
                </div>

                {/* ── Trust bar ─────────────────────────────────────────── */}
                <div className="flex items-center gap-4 px-6 py-2.5 bg-muted/40 dark:bg-white/[0.02] border-b border-border dark:border-white/[0.06] flex-shrink-0">
                    {[
                        { icon: <Clock className="w-3 h-3" />, text: "Reply within 2 hrs" },
                        { icon: <ShieldCheck className="w-3 h-3" />, text: "Data never shared" },
                        { icon: <CheckCircle2 className="w-3 h-3" />, text: "Free consultation" },
                    ].map(({ icon, text }) => (
                        <div key={text} className="flex items-center gap-1 text-[10px] text-muted-foreground font-semibold">
                            <span className="text-accent">{icon}</span>
                            {text}
                        </div>
                    ))}
                </div>

                {/* ── Scrollable body ───────────────────────────────────── */}
                <div className="flex-1 overflow-y-auto">
                    <AnimatePresence mode="wait">

                        {/* ── FORM step ─────────────────────────────────────── */}
                        {step === "form" && (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.18 }}
                                className="px-6 py-6 space-y-4"
                            >
                                {/* Row 1: Name + Email */}
                                <div className="grid grid-cols-2 gap-3">
                                    <Field
                                        label="Full Name *"
                                        placeholder="Your name"
                                        icon={<User className="w-4 h-4" />}
                                        value={form.fullName}
                                        error={errors.fullName}
                                        onChange={set("fullName")}
                                    />
                                    <Field
                                        label="Email *"
                                        placeholder="your@email.com"
                                        type="email"
                                        icon={<Mail className="w-4 h-4" />}
                                        value={form.email}
                                        error={errors.email}
                                        onChange={set("email")}
                                    />
                                </div>

                                {/* Row 2: WhatsApp — full width */}
                                <div>
                                    <Field
                                        label="WhatsApp Number *"
                                        placeholder="+880 1XXX-XXXXXX"
                                        icon={<Phone className="w-4 h-4" />}
                                        value={form.whatsappNumber}
                                        error={errors.whatsappNumber}
                                        onChange={set("whatsappNumber")}
                                    />
                                    <p className="text-[11px] text-muted-foreground mt-1.5 pl-1">
                                        We'll message you here with next steps
                                    </p>
                                </div>

                                {/* Row 3: Business Type + Platform */}
                                <div className="grid grid-cols-2 gap-3">
                                    <SelectField
                                        label="Business Type"
                                        placeholder="Select type"
                                        icon={<Briefcase className="w-4 h-4" />}
                                        options={BUSINESS_TYPES}
                                        value={form.businessType}
                                        onChange={set("businessType")}
                                    />
                                    <SelectField
                                        label="Platform"
                                        placeholder="Select platform"
                                        icon={<MessageSquare className="w-4 h-4" />}
                                        options={PLATFORMS}
                                        value={form.platform}
                                        onChange={set("platform")}
                                    />
                                </div>

                                {/* Row 4: Requirements */}
                                <div>
                                    <label className="block text-xs font-black text-foreground mb-1.5">
                                        Requirements{" "}
                                        <span className="font-normal text-muted-foreground">(Optional)</span>
                                    </label>
                                    <textarea
                                        value={form.requirements}
                                        onChange={e => set("requirements")(e.target.value)}
                                        placeholder="Tell us briefly what you need — e.g. 'I sell clothing on Facebook and need to automate order replies'"
                                        rows={4}
                                        className="w-full px-4 py-2.5 rounded-xl text-sm
                      bg-muted/50 dark:bg-white/[0.05]
                      border border-border dark:border-white/[0.08]
                      text-foreground placeholder:text-muted-foreground/60
                      outline-none focus:border-primary/50 transition-colors resize-none"
                                    />
                                </div>

                                <p className="text-[11px] text-center text-muted-foreground pb-2">
                                    Your information is safe and never shared with third parties.
                                </p>
                            </motion.div>
                        )}

                        {/* ── SUCCESS step ──────────────────────────────────── */}
                        {step === "success" && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.97 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.25 }}
                                className="px-6 py-10 flex flex-col items-center text-center gap-5"
                            >
                                <div className="w-20 h-20 rounded-3xl bg-accent/15 border-2 border-accent/25 flex items-center justify-center">
                                    <CheckCircle2 className="w-10 h-10 text-accent" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-foreground mb-2">You're all set!</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                                        We've received your details for{" "}
                                        <strong className="text-foreground">{productName}</strong>. Tap below — our
                                        AI agent will give you a live demo on WhatsApp instantly.
                                    </p>
                                </div>

                                {/* Summary grid */}
                                <div className="w-full grid grid-cols-2 gap-2 pt-2">
                                    {[
                                        { label: "Name", value: form.fullName },
                                        { label: "Contact", value: form.whatsappNumber },
                                        { label: "Business", value: form.businessType || "—" },
                                        { label: "Platform", value: form.platform || "—" },
                                    ].map(({ label, value }) => (
                                        <div
                                            key={label}
                                            className="bg-muted/50 dark:bg-white/[0.03] rounded-xl p-3
                                 border border-border dark:border-white/[0.06] text-left"
                                        >
                                            <div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">
                                                {label}
                                            </div>
                                            <div className="text-sm font-bold text-foreground truncate">{value}</div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>

                {/* ── Pinned footer — always visible at bottom ───────────── */}
                <div className="flex-shrink-0 px-6 py-4 border-t border-border dark:border-white/[0.08] bg-background dark:bg-[#0f0f1a] space-y-2.5">
                    {step === "form" ? (
                        <Button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary/90 font-black text-white
                         shadow-lg shadow-primary/20 h-12 text-base group"
                        >
                            {loading ? (
                                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Submitting...</>
                            ) : (
                                <>Submit & Continue <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" /></>
                            )}
                        </Button>
                    ) : (
                        <>
                            <Button
                                onClick={handleWhatsApp}
                                className="w-full bg-[#25D366] hover:bg-[#20bd59] text-white font-black
                           shadow-lg shadow-[#25D366]/20 h-12 text-base"
                            >
                                {/* WhatsApp icon */}
                                <svg className="w-5 h-5 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                Chat on WhatsApp for Live Demo
                            </Button>
                            <button
                                onClick={handleClose}
                                className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
                            >
                                Close
                            </button>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}