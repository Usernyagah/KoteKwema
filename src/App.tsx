import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import SubTopicPage from "./pages/SubTopicPage";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <a 
      href="#main-content" 
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:font-bold focus:rounded focus:shadow-lg"
    >
      Skip to main content
    </a>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
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
            {/* Project Detail */}
            <Route path="/projects/project/:id" element={<ProjectDetailsPage />} />
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
