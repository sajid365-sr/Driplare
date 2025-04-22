
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const AIServices = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">AI Solutions</h1>
          <p className="text-muted-foreground text-lg mb-8">
            This is a placeholder page for AI Solutions services.
          </p>
          
          <div id="chatbot" className="py-12">
            <h2 className="text-3xl font-bold mb-4">Chatbot Integration</h2>
            <p>Service details would go here.</p>
          </div>
          
          <div id="agents" className="py-12">
            <h2 className="text-3xl font-bold mb-4">Custom AI Agents</h2>
            <p>Service details would go here.</p>
          </div>
          
          <div id="automation" className="py-12">
            <h2 className="text-3xl font-bold mb-4">AI Automation</h2>
            <p>Service details would go here.</p>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default AIServices;
