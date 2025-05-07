import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WebDesign from "./pages/WebDesign";
import DigitalMarketing from "./pages/DigitalMarketing";
import AIServices from "./pages/AIServices";
import Portfolio from "./pages/Portfolio";
import Insights from "./pages/Insights";
import Contact from "./pages/Contact";
import Layout from "./components/common/layout/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/web-design" element={<WebDesign />} />
            <Route path="/digital-marketing" element={<DigitalMarketing />} />
            <Route path="/ai-services" element={<AIServices />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
