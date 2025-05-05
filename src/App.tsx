
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Store from "./pages/Store";
import About from "./pages/About";
import Blog from "./pages/Blog";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import LocalRates from "./pages/LocalRates";
import NotFound from "./pages/NotFound";
import AIAssistant from "./pages/AIAssistant";
import MaterialAnalyzer from "./pages/MaterialAnalyzer";
import CarbonCalculator from "./pages/CarbonCalculator";
import RecyclingTips from "./pages/RecyclingTips";
import Checkout from "./pages/Checkout";
import MaterialMarketplace from "./pages/MaterialMarketplace";
import MaterialDetails from "./pages/MaterialDetails";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/store" element={<Store />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/local-rates" element={<LocalRates />} />
              <Route path="/material-marketplace" element={<MaterialMarketplace />} />
              <Route path="/material-details/:id" element={<MaterialDetails />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
              <Route path="/material-analyzer" element={<MaterialAnalyzer />} />
              <Route path="/carbon-calculator" element={<CarbonCalculator />} />
              <Route path="/recycling-tips" element={<RecyclingTips />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
