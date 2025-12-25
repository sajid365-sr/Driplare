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
import Portfolio from "./pages/Portfolio";
import Insights from "./pages/insights/Insights";
import Contact from "./pages/Contact";
import Layout from "./components/common/layout/Layout";
import AdminLayout from "./components/common/layout/AdminLayout";
import InsightDetail from "./pages/insights/insightsDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/ai-agents" element={<AIAgents />} />
            <Route path="/workflow-automation" element={<WorkflowAutomation />} />
            <Route path="/web-development" element={<WebDevelopment />} />
            <Route path="/data-scraping" element={<DataScraping />} />
            <Route path="/b2b-consulting" element={<B2BConsulting />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:id" element={<InsightDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
