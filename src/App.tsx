
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Work from "./pages/Work";
import About from "./pages/About";
import Playground from "./pages/Playground";
import ProjectDetail from "./pages/ProjectDetail";
import CMS from "./pages/CMS";
import WorkCMSPage from "./pages/WorkCMSPage";
import PlaygroundCMSPage from "./pages/PlaygroundCMSPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* CMS Routes - No Layout */}
            <Route path="/cms" element={<CMS />} />
            <Route path="/cms/work" element={<WorkCMSPage />} />
            <Route path="/cms/playground" element={<PlaygroundCMSPage />} />
            
            {/* Public Routes - With Layout */}
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/work" element={<Layout><Work /></Layout>} />
            <Route path="/work/:slug" element={<Layout><ProjectDetail /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/playground" element={<Layout><Playground /></Layout>} />
            {/* Redirect contact to about page */}
            <Route path="/contact" element={<Navigate to="/about" replace />} />
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
