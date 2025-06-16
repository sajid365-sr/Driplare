import { useState } from "react";
import { toast } from "sonner";
import { submitNewsletter } from "@/utils/form-utils";

export function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await submitNewsletter({ email });

      if (success) {
        toast.success("Thank you for subscribing to our newsletter!");
        setEmail("");
      }
    } catch (error) {
      console.error("Newsletter submission error:", error);
      toast.error("Failed to subscribe. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="col-span-2 md:col-span-1">
      <h3 className="font-bold mb-4">Newsletter</h3>
      <form onSubmit={handleNewsletterSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Your email"
          className="w-full px-4 py-2 rounded-md bg-background border border-border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-secondary-foreground hover:bg-accent  text-white px-4 py-2 rounded-md transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
}
