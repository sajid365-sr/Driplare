
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ContactNewsletterSection } from "@/components/ContactNewsletterSection";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-16">
        <div className="container mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-muted-foreground text-lg mb-8">
            We'd love to hear from you. Reach out to discuss your project or learn more about our services.
          </p>
        </div>
        <ContactNewsletterSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Contact;
