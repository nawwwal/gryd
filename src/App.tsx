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
import PlaygroundDetail from "./pages/PlaygroundDetail";
import NotFound from "./pages/NotFound";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import clarityService from "./utils/clarityService";
import MagazineTracking from "./utils/clarityMagazineTracking";

import { Suspense, useEffect } from 'react';
import './App.css';

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

function App() {
  // Initialize service worker, performance optimizations, and Clarity analytics
  useEffect(() => {
    // Initialize Microsoft Clarity
    const initializeClarity = async () => {
      const clarityProjectId = import.meta.env.VITE_CLARITY_PROJECT_ID;

      if (clarityProjectId) {
        try {
          clarityService.init({
            projectId: clarityProjectId,
            enableConsent: false, // Set to true if you need cookie consent
            autoInit: true
          });

                    // Initialize magazine-specific tracking
          MagazineTracking.initialize();

          console.log('[Clarity] Initialized successfully');
        } catch (error) {
          console.error('[Clarity] Failed to initialize:', error);
        }
      } else {
        console.warn('[Clarity] Project ID not found in environment variables. Add VITE_CLARITY_PROJECT_ID to your .env file.');
      }
    };

    initializeClarity();

    // Register service worker for caching
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('[SW] Registered successfully:', registration);
        })
        .catch(error => {
          console.warn('[SW] Registration failed:', error);
        });
    }

    // Initialize performance monitoring
    if ('performance' in window && 'measure' in performance) {
      // Mark app start time
      performance.mark('app-start');

      // Measure app initialization time
      window.addEventListener('load', () => {
        performance.mark('app-loaded');
        try {
          performance.measure('app-load-time', 'app-start', 'app-loaded');
          const measure = performance.getEntriesByName('app-load-time')[0];
          console.log(`[Performance] App loaded in ${measure.duration.toFixed(2)}ms`);

          // Track performance metrics with Clarity
          if (clarityService.isInitialized()) {
            clarityService.trackPerformance('app_load_time', measure.duration, 'ms');
          }
        } catch (error) {
          console.warn('[Performance] Could not measure app load time:', error);
        }
      });
    }

    // Prefetch DNS for external resources
    const prefetchDomains = [
      'cdn.sanity.io',
      'fonts.googleapis.com',
      'fonts.gstatic.com'
    ];

    prefetchDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = `//${domain}`;
      document.head.appendChild(link);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="overflow-x-hidden w-full max-w-full">
        <Analytics/>
        <SpeedInsights/>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Suspense
              fallback={
                <div className="route-loading">
                  <div className="loading-spinner" />
                  <p>Loading page...</p>
                </div>
              }
            >
              <Routes>
                {/* Public Routes - With Layout */}
                <Route path="/" element={<Layout><Index /></Layout>} />
                <Route path="/work" element={<Layout><Work /></Layout>} />
                <Route path="/work/:slug" element={<Layout><ProjectDetail /></Layout>} />
                <Route path="/about" element={<Layout><About /></Layout>} />
                <Route path="/playground" element={<Layout><Playground /></Layout>} />
                <Route path="/playground/:slug" element={<Layout><PlaygroundDetail /></Layout>} />
                <Route path="*" element={<Layout><NotFound /></Layout>} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>

        {/* Development Tools - only in development */}
        {import.meta.env.DEV && (
          <>
            <ReactQueryDevtools initialIsOpen={false} />

          </>
        )}
      </div>
    </QueryClientProvider>
  );
}

export default App;
