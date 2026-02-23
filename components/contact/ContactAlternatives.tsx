"use client";

import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin } from "lucide-react";

interface ContactAlternativesProps {
    email: string;
    phone: string;
    location: string;
}

export function ContactAlternatives({
    email,
    phone,
    location,
}: ContactAlternativesProps) {
    const { t } = useTranslation("contactPage");

    return (
        <section className="py-12 border-t border-border bg-muted/20">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="flex items-start gap-3 p-5 rounded-2xl bg-card border border-border">
                        <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-black text-foreground mb-1">
                                {t("alt.email.label")}
                            </p>
                            <a
                                href={`mailto:${email}`}
                                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                {email}
                            </a>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-5 rounded-2xl bg-card border border-border">
                        <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-black text-foreground mb-1">
                                {t("alt.phone.label")}
                            </p>
                            <a
                                href={`tel:${phone}`}
                                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                {phone}
                            </a>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-5 rounded-2xl bg-card border border-border">
                        <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-black text-foreground mb-1">
                                {t("alt.location.label")}
                            </p>
                            <p className="text-sm text-muted-foreground">{location}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}