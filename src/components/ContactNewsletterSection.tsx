
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export function ContactNewsletterSection() {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  
  const [newsletterName, setNewsletterName] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [role, setRole] = useState("");
  
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thanks for contacting us! We'll get back to you soon.");
    setContactName("");
    setContactEmail("");
    setContactMessage("");
  };
  
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("You've been subscribed to our newsletter!");
    setNewsletterName("");
    setNewsletterEmail("");
    setRole("");
  };
  
  return (
    <section id="contact" className="py-20 bg-secondary/50 dark:bg-secondary/20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in slide-up">Get in Touch</h2>
            <p className="text-muted-foreground mb-6 fade-in slide-up">
              Ready to transform your digital presence? Let's start a conversation about your project.
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
                      <Textarea 
                        placeholder="Tell us about your project..." 
                        className="min-h-32"
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      Send Message
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in slide-up">Stay Ahead with AI Insights</h2>
            <p className="text-muted-foreground mb-6 fade-in slide-up">
              Subscribe to our newsletter for the latest trends, tips, and insights in AI and digital innovation.
            </p>
            
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleNewsletterSubmit}>
                  <div className="space-y-4">
                    <div>
                      <Input 
                        placeholder="Name" 
                        value={newsletterName}
                        onChange={(e) => setNewsletterName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Input 
                        type="email" 
                        placeholder="Email" 
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Select value={role} onValueChange={setRole}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="business-owner">Business Owner</SelectItem>
                          <SelectItem value="marketing">Marketing Professional</SelectItem>
                          <SelectItem value="developer">Developer</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      Subscribe
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <div className="mt-6 p-6 rounded-xl bg-primary/10">
              <h3 className="text-xl font-bold mb-2">Why Subscribe?</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Exclusive AI and digital transformation insights</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Early access to new tools and case studies</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Monthly digital strategy tips</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
