"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { GridLayer, DarkGridBoost, GlowBlob, BRAND } from "@/components/effects/bg-effects";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactFormModal } from "@/components/contact/ContactFormModal";
import { ContactAlternatives } from "@/components/contact/ContactAlternatives";
import { ContactFAQ } from "@/components/contact/ContactFAQ";

export default function ContactPage() {
    const { t } = useTranslation("contactPage");
    const [formOpen, setFormOpen] = useState(false);

    // Replace with your actual contact details
    const whatsappNumber = "+8801305792949";
    const whatsappMessage = encodeURIComponent(
        t("whatsapp.defaultMessage")
    );
    const calendarUrl = "https://cal.com/driplare";
    const email = "hello@driplare.com";
    const phone = "+880 1305792949";
    const location = t("alt.location.value");

    return (
        <div className="min-h-screen bg-background relative overflow-x-hidden">
            {/* bg-effects */}
            <div className="absolute inset-0 pointer-events-none">
                <GridLayer color={BRAND.violet} opacity={0.03} cellSize={44} style="dots" />
                <DarkGridBoost color={BRAND.violet} opacity={0.055} cellSize={44} />
                <GlowBlob
                    color={BRAND.violet}
                    position="top-left"
                    size={500}
                    opacity={0.05}
                    duration={22}
                />
                <GlowBlob
                    color={BRAND.blue}
                    position="top-right"
                    size={420}
                    opacity={0.04}
                    duration={26}
                    delay={8}
                />
            </div>

            <div className="relative z-10">
                <ContactHero
                    onFormOpen={() => setFormOpen(true)}
                    whatsappNumber={whatsappNumber}
                    whatsappMessage={whatsappMessage}
                    calendarUrl={calendarUrl}
                />

                <ContactAlternatives
                    email={email}
                    phone={phone}
                    location={location}
                />

                <ContactFAQ />
            </div>

            {/* Form Modal */}
            <ContactFormModal open={formOpen} onClose={() => setFormOpen(false)} />
        </div>
    );
}