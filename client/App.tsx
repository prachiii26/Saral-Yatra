import "./global.css";

import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import MainLayout from "@/components/layout/MainLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LiveTracking from "./pages/LiveTracking";
import RouteInfo from "./pages/RouteInfo";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PlaceholderPage from "./pages/Placeholder";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Index />} />
              <Route path="live-tracking" element={<LiveTracking />} />
              <Route path="route-info" element={<RouteInfo />} />
              <Route path="contact" element={<Contact />} />
              <Route path="about" element={<About />} />
              <Route
                path="download"
                element={
                  <PlaceholderPage
                    title="Download the Saral Yatra App"
                    description="The mobile experience is being polished with offline mode and multi-language support. Stay tuned for the official app release."
                    actionLabel="Back to Home"
                    actionHref="/"
                  />
                }
              />
              <Route
                path="privacy"
                element={
                  <PlaceholderPage
                    title="Privacy & Data Security"
                    description="We are finalising privacy safeguards that keep your journey data in your control with complete transparency."
                    actionLabel="Back to Home"
                    actionHref="/"
                  />
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
