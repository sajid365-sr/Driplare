"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { X, MessageCircle, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createLead } from "@/lib/lead-actions";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentSlug: string;
  agentName: string;
  source?: string;
}

export default function LeadModal({
  isOpen,
  onClose,
  agentSlug,
  agentName,
  source = "product-page"
}: LeadModalProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState({
    name: "",
    platform: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    businessType: "",
    platform: "",
    requirements: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save the data before clearing
      setSubmittedData({
        name: formData.name,
        platform: formData.platform,
      });

      const result = await createLead({
        ...formData,
        agentSlug,
        agentName,
        source,
      });

      if (result.success) {
        setIsSuccess(true);
        // Clear form after success
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            whatsapp: "",
            businessType: "",
            platform: "",
            requirements: "",
          });
        }, 5000);
      }
    } catch (error) {
      console.error("Error submitting lead:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const whatsappNumber = "8801305792949";
    const message = encodeURIComponent(
      `Hi! I just submitted a request for ${agentName}. My name is ${submittedData.name}.`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
    onClose();
  };

  const handleClose = () => {
    onClose();
    // Reset everything after modal closes
    setTimeout(() => {
      setIsSuccess(false);
      setSubmittedData({ name: "", platform: "" });
      setFormData({
        name: "",
        email: "",
        whatsapp: "",
        businessType: "",
        platform: "",
        requirements: "",
      });
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            {!isSuccess ? t("leadModal.title") : t("leadModal.successTitle")}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-4 mt-4"
            >
              <p className="text-sm text-muted-foreground mb-6">
                {t("leadModal.subtitle")}
              </p>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">{t("leadModal.name")} *</Label>
                <Input
                  id="name"
                  required
                  placeholder={t("leadModal.namePlaceholder")}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">{t("leadModal.email")} *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder={t("leadModal.emailPlaceholder")}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background"
                />
              </div>

              {/* WhatsApp */}
              <div className="space-y-2">
                <Label htmlFor="whatsapp">{t("leadModal.whatsapp")} *</Label>
                <Input
                  id="whatsapp"
                  required
                  placeholder={t("leadModal.whatsappPlaceholder")}
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="bg-background"
                />
                <p className="text-xs text-muted-foreground">
                  {t("leadModal.whatsappNote")}
                </p>
              </div>

              {/* Business Type */}
              <div className="space-y-2">
                <Label htmlFor="businessType">{t("leadModal.businessType")}</Label>
                <Select
                  value={formData.businessType}
                  onValueChange={(value) => setFormData({ ...formData, businessType: value })}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder={t("leadModal.businessTypePlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ecommerce">{t("leadModal.businessTypes.ecommerce")}</SelectItem>
                    <SelectItem value="fashion">{t("leadModal.businessTypes.fashion")}</SelectItem>
                    <SelectItem value="restaurant">{t("leadModal.businessTypes.restaurant")}</SelectItem>
                    <SelectItem value="service">{t("leadModal.businessTypes.service")}</SelectItem>
                    <SelectItem value="beauty">{t("leadModal.businessTypes.beauty")}</SelectItem>
                    <SelectItem value="retail">{t("leadModal.businessTypes.retail")}</SelectItem>
                    <SelectItem value="other">{t("leadModal.businessTypes.other")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Platform */}
              <div className="space-y-2">
                <Label htmlFor="platform">{t("leadModal.platform")} *</Label>
                <Select
                  value={formData.platform}
                  onValueChange={(value) => setFormData({ ...formData, platform: value })}
                  required
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder={t("leadModal.platformPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="messenger">{t("leadModal.platforms.messenger")}</SelectItem>
                    <SelectItem value="whatsapp">{t("leadModal.platforms.whatsapp")}</SelectItem>
                    <SelectItem value="both">{t("leadModal.platforms.both")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Requirements */}
              <div className="space-y-2">
                <Label htmlFor="requirements">{t("leadModal.requirements")}</Label>
                <Textarea
                  id="requirements"
                  placeholder={t("leadModal.requirementsPlaceholder")}
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  rows={3}
                  className="bg-background"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-driplare hover:bg-driplare/90 text-white font-semibold py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {t("leadModal.submitting")}
                  </>
                ) : (
                  t("leadModal.submit")
                )}
              </Button>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-2">
                <CheckCircle2 className="h-4 w-4 text-trust" />
                <span>{t("leadModal.trustBadge")}</span>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-6"
            >
              <div className="w-20 h-20 bg-trust/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-10 w-10 text-trust" />
              </div>

              <div>
                <p className="text-lg text-muted-foreground mb-4">
                  {t("leadModal.successMessage")}
                </p>
                <div className="bg-muted/50 rounded-lg p-4 mb-6">
                  <p className="text-sm font-semibold mb-2">
                    {t("leadModal.yourRequest")}
                  </p>
                  <p className="text-sm">
                    <strong>{t("leadModal.agent")}:</strong> {agentName}
                  </p>
                  <p className="text-sm">
                    <strong>{t("leadModal.platform")}:</strong> {submittedData.platform}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold py-6"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {t("leadModal.chatButton")}
                </Button>
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="w-full"
                >
                  {t("leadModal.closeButton")}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}