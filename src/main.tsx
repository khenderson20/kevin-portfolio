import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
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
} catch {}

// Configure Amplify with error handling
try {
  Amplify.configure(outputs);
  console.log('✅ Amplify configured successfully');
} catch (error) {
  console.warn('⚠️ Amplify configuration failed:', error);
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
