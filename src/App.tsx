import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PersonalizationProvider } from "@/contexts/PersonalizationContext";
import { VoiceProvider } from "@/contexts/VoiceContext";
import { PersonaProvider } from "@/contexts/PersonaContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Farewell } from "@/components/Farewell";
import { useState } from "react";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Strategy from "./pages/Strategy";
import RiskComplianceRadar from "./pages/RiskComplianceRadar";
import Reports from "./pages/Reports";
import ReportsExports from "./pages/ReportsExports";
import PredictiveAnalytics from "./pages/PredictiveAnalytics";
import EarlyWarning from "./pages/EarlyWarning";
import FinancialCommand from "./pages/FinancialCommand";
import CFOCopilot from "./pages/CFOCopilot";
import TimeLeverage from "./pages/TimeLeverage";
import MeetingCompanion from "./pages/MeetingCompanion";
import CommunicationsDirector from "./pages/CommunicationsDirector";
import ArabicIntelligence from "./pages/ArabicIntelligence";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const [showFarewell, setShowFarewell] = useState(false);

  const handleExit = () => {
    setShowFarewell(true);
  };

  const handleRestart = () => {
    setShowFarewell(false);
    window.location.href = "/";
  };

  if (showFarewell) {
    return <Farewell onRestart={handleRestart} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public auth route */}
        <Route path="/auth" element={<Auth />} />
        
        {/* Protected routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout onExit={handleExit}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/strategy" element={<Strategy />} />
                  <Route path="/risk-compliance" element={<RiskComplianceRadar />} />
                  <Route path="/negotiation-copilot" element={<Reports />} />
                  <Route path="/predictive-analytics" element={<PredictiveAnalytics />} />
                  <Route path="/early-warning" element={<EarlyWarning />} />
                  <Route path="/financial-command" element={<FinancialCommand />} />
                  <Route path="/cfo-copilot" element={<CFOCopilot />} />
                  <Route path="/time-leverage" element={<TimeLeverage />} />
                  <Route path="/negotiation" element={<Reports />} />
                  <Route path="/meeting-companion" element={<MeetingCompanion />} />
                  <Route path="/communications" element={<CommunicationsDirector />} />
                  <Route path="/exports" element={<ReportsExports />} />
                  <Route path="/arabic-intelligence" element={<ArabicIntelligence />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <PersonalizationProvider>
        <VoiceProvider>
          <PersonaProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <AppContent />
            </TooltipProvider>
          </PersonaProvider>
        </VoiceProvider>
      </PersonalizationProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
