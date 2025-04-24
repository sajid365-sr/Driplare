
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { sendContactFormConfirmation, sendContactNotificationToAdmin } from "@/utils/email-service";

export function ContactNewsletterSection() {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [company, setCompany] = useState("");
  const [serviceInterest, setServiceInterest] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send confirmation to the user
      await sendContactFormConfirmation(
        contactName,
        contactEmail,
        contactMessage
      );
      
      // Send notification to admin
      await sendContactNotificationToAdmin(
        contactName,
        contactEmail,
        company,
        serviceInterest,
        contactMessage
      );
      
      toast.success("Thanks for contacting us! We'll get back to you soon.");
      
      // Reset form
      setContactName("");
      setContactEmail("");
      setContactMessage("");
      setCompany("");
      setServiceInterest("");
    } catch (error) {
      console.error("Error sending contact emails:", error);
      toast.error("There was a problem sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    
    try {
      // Use the generic form submission since we don't have enough fields for newsletter
      const formData = {
        email: newsletterEmail,
      };
      
      await sendContactNotificationToAdmin(
        "Newsletter Subscriber",
        newsletterEmail,
        "N/A",
        "Newsletter",
        "New newsletter subscription"
      );
      
      toast.success("You've been subscribed to our newsletter!");
      setNewsletterEmail("");
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast.error("There was a problem with your subscription. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-secondary/50 dark:bg-secondary/20"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in slide-up">
              Get in Touch
            </h2>
            <p className="text-muted-foreground mb-6 fade-in slide-up">
              Ready to transform your digital presence? Let's start a
              conversation about your project.
            </p>

            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleContactSubmit}>
                  <div className="space-y-4">
                    <div>
                      <Input
                        placeholder="Name"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        placeholder="Company (Optional)"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </div>
                    <div>
                      <Select value={serviceInterest} onValueChange={setServiceInterest}>
                        <SelectTrigger>
                          <SelectValue placeholder="Service Interest" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web-design">Web Design</SelectItem>
                          <SelectItem value="ai-services">AI Services</SelectItem>
                          <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Textarea
                        placeholder="Tell us about your project..."
                        className="min-h-32"
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 bg-primary/10 rounded-xl p-8 md:p-12"
          >
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Stay Updated with Our Newsletter
              </h3>
              <p className="text-muted-foreground mb-8">
                Subscribe to receive the latest insights on AI, web design, and
                digital marketing directly to your inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input
                  placeholder="Enter your email"
                  className="h-12 bg-background"
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                />
                <Button 
                  className="h-12 bg-primary hover:bg-primary/90"
                  type="submit"
                  disabled={isSubscribing}
                >
                  {isSubscribing ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
