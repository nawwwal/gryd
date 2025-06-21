
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Work from "./pages/Work";
import About from "./pages/About";
import Playground from "./pages/Playground";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { PerformanceMonitor } from "./components/PerformanceMonitor"

// Enhanced QueryClient configuration for optimal performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale-while-revalidate pattern
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes (garbage collection time)

      // Network optimizations
      refetchOnWindowFocus: false, // Prevent excessive refetching
      refetchOnMount: false, // Use cached data if available
      refetchOnReconnect: true, // Refetch when connection is restored

      // Error handling with smart retry logic
      retry: (failureCount, error: any) => {
        // Don't retry on client errors (4xx), but retry on server errors (5xx) and network errors
        if (error?.status >= 400 && error?.status < 500) return false;
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff

      // Performance optimizations
      structuralSharing: true, // Enable structural sharing for better performance
      refetchInterval: false, // Disable automatic refetching by default
    },
    mutations: {
      retry: 1, // Retry mutations once on failure
      retryDelay: 1000,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Analytics/>
    <SpeedInsights/>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>

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
    </TooltipProvider>
    {/* Development Tools - only in development */}
    {import.meta.env.DEV && (
      <>
        <ReactQueryDevtools initialIsOpen={false} />
        <PerformanceMonitor />
      </>
    )}
  </QueryClientProvider>
);

export default App;
