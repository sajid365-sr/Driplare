
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CalendarClock, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { submitForm } from "@/utils/form-utils";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  phone: z.string().optional(),
  subject: z.string().min(2, {
    message: "Subject is required",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters",
  }),
});

export function ContactFormWithDetails() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Since values.name and values.email are guaranteed to exist due to the schema validation,
      // we can safely pass them to the submitForm function
      const success = await submitForm({
        form_type: 'contact_form',
        name: values.name,
        email: values.email,
        phone: values.phone,
        subject: values.subject,
        message: values.message
      });
      
      if (success) {
        form.reset();
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to submit form. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-7"
      >
        <div className="bg-gradient-to-br from-[#272A37]/80 to-[#272A37] p-8 md:p-10 rounded-2xl shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Get In Touch</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          className="bg-white/5 border-white/10 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="your.email@example.com"
                          className="bg-white/5 border-white/10 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your phone number"
                          className="bg-white/5 border-white/10 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Subject"
                          className="bg-white/5 border-white/10 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your project or inquiry"
                        className="min-h-[150px] bg-white/5 border-white/10 text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full bg-[#F88220] hover:bg-[#F88220]/90 text-white text-lg h-12"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-5"
      >
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
            <p className="text-white/80 mb-6">
              Have questions or ready to start your next project? Reach out to us
              through any of these channels.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-[#F88220]/10 rounded-full flex items-center justify-center mr-4">
                <Mail className="h-5 w-5 text-[#F88220]" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Email Us</h4>
                <a
                  href="mailto:hello@youragency.com"
                  className="text-white/70 hover:text-white hover:underline transition"
                >
                  hello@youragency.com
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 bg-[#F88220]/10 rounded-full flex items-center justify-center mr-4">
                <Phone className="h-5 w-5 text-[#F88220]" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Call Us</h4>
                <a
                  href="tel:+1234567890"
                  className="text-white/70 hover:text-white hover:underline transition"
                >
                  +1 (234) 567-890
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 bg-[#F88220]/10 rounded-full flex items-center justify-center mr-4">
                <MapPin className="h-5 w-5 text-[#F88220]" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Visit Us</h4>
                <p className="text-white/70">
                  2464 Royal Ln. Mesa, New Jersey 45463
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 bg-[#F88220]/10 rounded-full flex items-center justify-center mr-4">
                <CalendarClock className="h-5 w-5 text-[#F88220]" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Working Hours</h4>
                <p className="text-white/70">
                  Monday - Friday: 9:00 AM - 6:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
