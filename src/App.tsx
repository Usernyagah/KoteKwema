import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ExpertisePage from "./pages/Expertise";
import ProjectsPage from "./pages/Projects";
import StudioPage from "./pages/Studio";
import PeoplePage from "./pages/People";
import NewsPage from "./pages/News";
import InsightsPage from "./pages/Insights";
import CareersPage from "./pages/Careers";
import ContactPage from "./pages/Contact";
import SubTopicPage from "./pages/SubTopicPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/expertise" element={<ExpertisePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/studio" element={<StudioPage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* SubTopic Routes */}
          <Route path="/expertise/:subtopic" element={<SubTopicPage />} />
          <Route path="/projects/:subtopic" element={<SubTopicPage />} />
          <Route path="/studio/:subtopic" element={<SubTopicPage />} />
          <Route path="/people/:subtopic" element={<SubTopicPage />} />
          <Route path="/news/:subtopic" element={<SubTopicPage />} />
          <Route path="/insights/:subtopic" element={<SubTopicPage />} />
          <Route path="/careers/:subtopic" element={<SubTopicPage />} />
          <Route path="/contact/:subtopic" element={<SubTopicPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
