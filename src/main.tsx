import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initPerformanceOptimizations } from './utils/serviceWorker'
import { HelmetProvider } from 'react-helmet-async'

// Initialize performance optimizations
initPerformanceOptimizations().then(() => {
  console.log('[Performance] Optimizations initialized');
}).catch((error) => {
  console.warn('[Performance] Failed to initialize optimizations:', error);
});

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
