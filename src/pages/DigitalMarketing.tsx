
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const DigitalMarketing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Digital Marketing</h1>
          <p className="text-muted-foreground text-lg mb-8">
            This is a placeholder page for the Digital Marketing services.
          </p>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default DigitalMarketing;
