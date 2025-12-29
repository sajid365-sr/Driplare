import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AIAgents from "./pages/services/AIAgents";
import WorkflowAutomation from "./pages/services/WorkflowAutomation";
import WebDevelopment from "./pages/services/WebDevelopment";
import DataScraping from "./pages/services/DataScraping";
import B2BConsulting from "./pages/services/B2BConsulting";
import Insights from "./pages/insights/Insights";
import Contact from "./pages/Contact";
import Layout from "./components/common/layout/Layout";
import AdminLayout from "./components/common/layout/AdminLayout";
import InsightDetail from "./pages/insights/insightsDetails";
import CaseStudies from "./pages/services/CaseStudies";
import AboutUs from "./pages/AboutUs";
import Pricing from "./pages/Pricing";
import Security from "./pages/Security";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import OurMethodology from "./pages/OurMethodology";
import AgentMarketplace from "./pages/agent-marketplace/AgentMarketplace";
import ProductDetails from "./pages/agent-marketplace/ProductDetails";
import { ClerkProvider } from "@clerk/clerk-react";
import AuthPage from "./pages/AuthPage";
import Product from "./pages/marketplace/Products";
import ProductDetailsPage from "./pages/marketplace/ProductDetails";
import CaseStudies2 from "./pages/services/CaseStudies-2";
import CaseStudyDetailPage from "./pages/CaseStudyDetailPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ClerkProvider
        publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      >
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/ai-agents" element={<AIAgents />} />
              <Route
                path="/workflow-automation"
                element={<WorkflowAutomation />}
              />
              <Route path="/web-development" element={<WebDevelopment />} />
              <Route path="/data-scraping" element={<DataScraping />} />
              <Route path="/b2b-consulting" element={<B2BConsulting />} />
              {/* <Route path="/case-studies" element={<CaseStudies />} /> */}
              <Route path="/case-studies" element={<CaseStudies2 />} />
              <Route
                path="/case-studies/:id"
                element={<CaseStudyDetailPage />}
              />
              <Route path="/insights" element={<Insights />} />
              <Route path="/about-us" element={<AboutUs />} />
              {/* <Route path="/agent-marketplace" element={<AgentMarketplace />} /> */}
              {/* <Route
                path="/agent-marketplace/:id"
                element={<ProductDetails />}
              /> */}
              <Route path="/agent-marketplace" element={<Product />} />
              <Route
                path="/agent-marketplace/:id"
                element={<ProductDetailsPage />}
              />

              <Route path="/pricing" element={<Pricing />} />
              <Route path="/sign-in/*" element={<AuthPage mode="login" />} />
              <Route path="/sign-up/*" element={<AuthPage mode="signup" />} />
              <Route path="/security" element={<Security />} />
              <Route path="/insights/:id" element={<InsightDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/methodology" element={<OurMethodology />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/admin" element={<AdminLayout />} />
          </Routes>
        </BrowserRouter>
      </ClerkProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
