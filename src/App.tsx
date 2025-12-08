import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
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
          {/* SubTopic Routes */}
          <Route path="/expertise/:subtopic" element={<SubTopicPage />} />
          <Route path="/projects/:subtopic" element={<SubTopicPage />} />
          <Route path="/studio/:subtopic" element={<SubTopicPage />} />
          <Route path="/people/:subtopic" element={<SubTopicPage />} />
          <Route path="/news/:subtopic" element={<SubTopicPage />} />
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
