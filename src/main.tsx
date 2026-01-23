import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// material UI Tailwind import
import { ThemeProvider } from "@material-tailwind/react";
// Import GSAP to ensure it's loaded
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger);

// Expose GSAP to global window object for animation utilities
declare global {
  interface Window {
    gsap: typeof gsap;
    ScrollTrigger: typeof ScrollTrigger;
  }
}

window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;

// Force dark theme on document root
try {
  document.documentElement.setAttribute('data-theme', 'dark');
  localStorage.setItem('theme', 'dark');
} catch (e) {
  // Ignore write failures (e.g., private browsing / blocked storage)
  void e;
}

// Verify GSAP is loaded and exposed globally
console.log('✅ GSAP loaded:', gsap.version);
console.log('✅ ScrollTrigger loaded:', ScrollTrigger.version);
console.log('✅ GSAP exposed globally:', typeof window.gsap !== 'undefined');

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider value={"dark"}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
