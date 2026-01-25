"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, MessageCircle, Calendar, CheckCircle2, User, Phone, Mail, Globe } from "lucide-react";
import { leadFormSchema, type LeadFormData } from "@/types/booking-types";
import { createLead } from "@/lib/booking-action";
import { toast } from "sonner";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentSlug: string;
  agentName: string;
}

type ModalStep = "form" | "success";

export default function LeadModal({ isOpen, onClose, agentSlug, agentName }: LeadModalProps) {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState<ModalStep>("form");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      agentSlug,
    },
  });

  const selectedPlatform = watch("platform");

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    try {
      const result = await createLead({ ...data, agentSlug });

      if (result.success) {
        setCurrentStep("success");
        toast.success("Lead submitted successfully!");
      } else {
        toast.error(result.error || "Failed to submit lead");
      }
    } catch (error) {
      console.error("Error submitting lead:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const formData = watch();
    const message = encodeURIComponent(
      `Hi! I'm interested in the ${agentName} agent. My name is ${formData.name} and I'd like to chat with an AI expert.`
    );
    const whatsappUrl = `https://wa.me/8801305792949?text=${message}`; // Replace with actual WhatsApp number
    window.open(whatsappUrl, "_blank");
    onClose();
    reset();
    setCurrentStep("form");
  };

  const handleCalendlyRedirect = () => {
    const calendlyUrl = "https://calendar.google.com/calendar/u/0/r?pli=1"; // Replace with actual Calendly link
    window.open(calendlyUrl, "_blank");
    onClose();
    reset();
    setCurrentStep("form");
  };

  const handleClose = () => {
    onClose();
    reset();
    setCurrentStep("form");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-800 border-0 shadow-2xl">
        <DialogHeader className="text-center pb-4">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {currentStep === "form" ? "Get Started with AI Agent" : "Success!"}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {currentStep === "form" ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center text-sm text-slate-600 dark:text-slate-400 mb-6">
                Tell us about yourself and we'll connect you with the right AI expert for {agentName}
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
                    <User size={16} />
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Enter your full name"
                    className="h-12"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                {/* WhatsApp Number */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium">
                    <Phone size={16} />
                    WhatsApp Number *
                  </Label>
                  <Input
                    id="phone"
                    {...register("phone")}
                    placeholder="+880 1XX XXX XXXX"
                    className="h-12"
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                    <Mail size={16} />
                    Email (Optional)
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="your@email.com"
                    className="h-12"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                {/* Targeted Platform */}
                <div className="space-y-2">
                  <Label htmlFor="platform" className="flex items-center gap-2 text-sm font-medium">
                    <Globe size={16} />
                    Targeted Platform *
                  </Label>
                  <Select onValueChange={(value) => setValue("platform", value as any)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select your preferred platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Facebook Messenger">Facebook Messenger</SelectItem>
                      <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                      <SelectItem value="Both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.platform && (
                    <p className="text-sm text-red-500">{errors.platform.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      Continue
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Success Message */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    Thank you for your interest!
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Choose how you'd like to proceed with your AI agent setup
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 gap-4">
                {/* WhatsApp Button */}
                <Card className="border-2 border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700 transition-colors cursor-pointer">
                  <CardContent
                    className="p-6 text-center space-y-3"
                    onClick={handleWhatsAppRedirect}
                  >
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                      <MessageCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
                        Chat with AI Expert
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Get instant answers and personalized guidance via WhatsApp
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      Recommended
                    </Badge>
                  </CardContent>
                </Card>

                {/* Calendly Button */}
                <Card className="border-2 border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors cursor-pointer">
                  <CardContent
                    className="p-6 text-center space-y-3"
                    onClick={handleCalendlyRedirect}
                  >
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
                        Book Free Consultation
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Schedule a detailed call to discuss your specific needs
                      </p>
                    </div>
                    <Badge variant="outline" className="border-blue-200 text-blue-700">
                      30 minutes
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              <Button
                variant="outline"
                onClick={handleClose}
                className="w-full h-12"
              >
                Close
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}