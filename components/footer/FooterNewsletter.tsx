"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { subscribeNewsletter } from "@/lib/form-action";
import { toast } from "sonner";

export function FooterNewsletter() {
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || status === "loading") return;

        setStatus("loading");
        try {
            const response = await subscribeNewsletter(email)

            if (response.success) {
                setStatus("success");
                setEmail("");
            } else {
                toast.error(response.error);
                setStatus("idle")
                setEmail("")
            }
        } catch {
            setStatus("error");

        }
    };

    return (
        <div className="space-y-3">
            <p className="text-[10px] font-black text-foreground/25 uppercase tracking-[0.18em]">
                {t("footer.newsletter.label")}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
                {t("footer.newsletter.description")}
            </p>

            <AnimatePresence mode="wait">
                {status === "success" ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-semibold py-2"
                    >
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                        {t("footer.newsletter.success")}
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col gap-2"
                    >
                        <div className="flex items-center gap-2 bg-foreground/[0.05] dark:bg-white/[0.06]
                            border border-border hover:border-primary/40
                            rounded-xl px-3 py-2.5 transition-colors group
                            focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/10">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t("footer.newsletter.placeholder")}
                                required
                                className="flex-1 bg-transparent text-sm text-foreground
                           placeholder:text-muted-foreground/50
                           outline-none min-w-0"
                            />
                            <button
                                type="submit"
                                disabled={status === "loading" || !email}
                                className="flex-shrink-0 w-7 h-7 rounded-lg bg-primary disabled:bg-primary/40
                           flex items-center justify-center transition-all
                           hover:bg-primary/85 active:scale-95"
                                aria-label="Subscribe"
                            >
                                {status === "loading" ? (
                                    <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
                                ) : (
                                    <Send className="w-3.5 h-3.5 text-white" />
                                )}
                            </button>
                        </div>
                        {status === "error" && (
                            <p className="text-xs text-red-500">{t("footer.newsletter.error")}</p>
                        )}
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
}