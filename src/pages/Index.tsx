import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Cpu, Brain, Target, MessageSquare, Globe, 
  TrendingUp, Shield, Users, ArrowRight, Sparkles, Lock, Activity,
  Zap, AlertTriangle, DollarSign, BarChart3, X
} from "lucide-react";
import { usePersona } from "@/contexts/PersonaContext";
import { RealTimeIndicator } from "@/components/RealTimeIndicator";
import { PremiumFeatureModal } from "@/components/PremiumFeatureModal";
import { usePersonalization } from "@/contexts/PersonalizationContext";

const personas = [
  {
    id: "nexus",
    name: "ORBITAL",
    role: "Financial Command & Predictive Analytics",
    route: "/financial-command",
    icon: Cpu,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    description: "Real-time financial intelligence with AI-powered forecasting",
    capabilities: ["Cash flow prediction", "Scenario modeling", "Risk detection"],
    isPremium: false
  },
  {
    id: "luna",
    name: "ORBITAL",
    role: "Risk & Compliance Radar + Early Warning",
    route: "/risk-compliance",
    icon: Shield,
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/30",
    description: "Proactive risk monitoring and compliance intelligence",
    capabilities: ["Risk constellation", "Predictive alerts", "Compliance tracking"],
    isPremium: false
  },
  {
    id: "aras",
    name: "ORBITAL",
    role: "AI Negotiation Co-Pilot",
    route: "/negotiation-copilot",
    icon: Target,
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/30",
    description: "Strategic negotiation analysis and deal intelligence",
    capabilities: ["Tone analysis", "Leverage assessment", "Counter-move simulation"],
    isPremium: false
  },
  {
    id: "selene",
    name: "ORBITAL",
    role: "Communications Director",
    route: "/communications-director",
    icon: MessageSquare,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    description: "Real-time tone coaching and cultural intelligence",
    capabilities: ["Language gym", "Tone metrics", "Audience intelligence"],
    isPremium: true
  },
  {
    id: "faris",
    name: "ORBITAL",
    role: "Arabic Intelligence Hub",
    route: "/arabic-intelligence",
    icon: Globe,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    description: "Cultural sensitivity and MENA business intelligence",
    capabilities: ["Diplomatic scoring", "Regional insights", "Cultural protocols"],
    isPremium: false
  },
  {
    id: "atlas",
    name: "ORBITAL",
    role: "Strategic Foresight Console",
    route: "/predictive-analytics",
    icon: TrendingUp,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    description: "Advanced predictive analytics and strategic forecasting",
    capabilities: ["Trend analysis", "Market forecasting", "Strategic modeling"],
    isPremium: false
  }
];

const kpiData = [
  { 
    id: "revenue",
    label: "Revenue Momentum", 
    value: 87, 
    icon: DollarSign, 
    color: "text-success",
    insight: "Q4 revenue trending 23% above forecast. KSA expansion driving growth.",
    status: "optimal"
  },
  { 
    id: "risk",
    label: "Risk Climate", 
    value: 34, 
    icon: AlertTriangle, 
    color: "text-warning",
    insight: "Risk indicators rising in KSA logistics. Recommend tightening supplier terms this quarter.",
    status: "caution"
  },
  { 
    id: "leverage",
    label: "Negotiation Leverage", 
    value: 72, 
    icon: Target, 
    color: "text-primary",
    insight: "Current market position provides strong leverage in upcoming supplier negotiations.",
    status: "strong"
  },
  { 
    id: "culture",
    label: "Cultural Alignment", 
    value: 91, 
    icon: Globe, 
    color: "text-orange-500",
    insight: "MENA operations show excellent cultural integration. Communications protocols effective.",
    status: "optimal"
  },
  { 
    id: "efficiency",
    label: "AI Efficiency", 
    value: 95, 
    icon: Zap, 
    color: "text-cyan-500",
    insight: "All AI personas operating at peak efficiency. 98% uptime maintained.",
    status: "optimal"
  }
];

const Index = () => {
  const navigate = useNavigate();
  const { speakAsPersona } = usePersona();
  const { personalization } = usePersonalization();
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showSnapshot, setShowSnapshot] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedKpi, setSelectedKpi] = useState<string | null>(null);
  const [showPersonas, setShowPersonas] = useState(true);

  const ceoName = personalization?.name || "Executive";
  const companyName = personalization?.company || "your organization";

  const handlePersonaClick = (persona: typeof personas[0]) => {
    if (persona.isPremium) {
      setShowPremiumModal(true);
    } else {
      navigate(persona.route);
    }
  };

  const handleActivateSnapshot = () => {
    setShowPersonas(false);
    setIsScanning(true);
    
    setTimeout(() => {
      setIsScanning(false);
      setShowSnapshot(true);
    }, 2000);
  };

  const handleKpiClick = (kpiId: string) => {
    setSelectedKpi(selectedKpi === kpiId ? null : kpiId);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    speakAsPersona(
      "Good morning. ORBITAL systems are active — your command center is ready.",
      "nexus",
      { 
        key: 'orbital-command-center-intro',
        priority: 'high'
      }
    );
  }, [speakAsPersona]);

  return (
    <div className="min-h-screen bg-background p-6 space-y-8 animate-fade-in">
      {/* Cinematic Greeting */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-background to-accent/5 border border-primary/20 p-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent animate-pulse" />
        <div className="relative z-10 space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-3 max-w-4xl">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground animate-fade-in">
                Welcome, {ceoName}.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Orbital is connecting <span className="text-primary font-semibold">{companyName}'s</span> intelligence streams — 
                financial systems, CRM, logistics, HR, and communications data — into a unified network of AI-driven 
                decision systems designed to empower you to optimize your decision making and minimize human dependency.
              </p>
            </div>
            <RealTimeIndicator label="All Systems Active" />
          </div>

          {/* Activation Button */}
          {!showSnapshot && !isScanning && (
            <div className="pt-4">
              <Button 
                onClick={handleActivateSnapshot}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/50 transition-all"
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                Show me {companyName}'s AI Snapshot
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* AI Scanning Transition */}
      {isScanning && (
        <div className="relative overflow-hidden rounded-2xl bg-card border border-primary/30 p-12 animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 animate-pulse" />
          <div className="absolute inset-0 opacity-30">
            <div className="h-full w-full" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, hsl(var(--primary) / 0.1) 0px, transparent 1px, transparent 2px, hsl(var(--primary) / 0.1) 3px)',
              animation: 'scan 2s linear infinite'
            }} />
          </div>
          <div className="relative z-10 text-center space-y-4">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Activity className="h-16 w-16 text-primary animate-pulse" />
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground">Analyzing corporate data streams…</h3>
            <p className="text-muted-foreground">Establishing live intelligence link…</p>
          </div>
        </div>
      )}

      {/* Dynamic Company Snapshot */}
      {showSnapshot && (
        <div className="space-y-6 animate-scale-in">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              {companyName} — Live Intelligence Overview
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowSnapshot(false);
                setShowPersonas(true);
                setSelectedKpi(null);
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Close Snapshot
            </Button>
          </div>

          {/* KPI Wheel */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {kpiData.map((kpi, idx) => (
              <Card 
                key={kpi.id}
                className={`relative overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 ${
                  selectedKpi === kpi.id ? 'border-primary shadow-lg shadow-primary/20' : 'border-border'
                }`}
                onClick={() => handleKpiClick(kpi.id)}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <kpi.icon className={`h-8 w-8 ${kpi.color}`} />
                    <Badge variant="outline" className={kpi.color}>
                      {kpi.status}
                    </Badge>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">{kpi.label}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-foreground">{kpi.value}</span>
                      <span className="text-xs text-muted-foreground">/ 100</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${
                        kpi.status === 'optimal' ? 'from-success to-success/70' :
                        kpi.status === 'caution' ? 'from-warning to-warning/70' :
                        'from-primary to-primary/70'
                      } transition-all duration-1000 animate-scale-in`}
                      style={{ width: `${kpi.value}%` }}
                    />
                  </div>

                  {/* Insight Popup */}
                  {selectedKpi === kpi.id && (
                    <div className="absolute inset-0 bg-card/95 backdrop-blur-sm p-4 flex items-center justify-center animate-fade-in">
                      <p className="text-sm text-foreground text-center">{kpi.insight}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={() => {
                setShowSnapshot(false);
                setShowPersonas(true);
                setSelectedKpi(null);
              }}
              size="lg"
              variant="outline"
              className="border-primary/30 hover:bg-primary/10"
            >
              Continue to AI Executive Team
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {/* AI Personas Grid */}
      {showPersonas && (
        <div className="space-y-4 animate-fade-in">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Your AI Executive Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {personas.map((persona) => (
              <Card 
                key={persona.id} 
                className={`bg-card border-2 ${persona.borderColor} hover:shadow-lg transition-all cursor-pointer group hover:scale-105`}
                onClick={() => handlePersonaClick(persona)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className={`relative p-3 rounded-lg ${persona.bgColor} border ${persona.borderColor}`}>
                      <persona.icon className={`h-6 w-6 ${persona.color}`} />
                      {persona.isPremium && (
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <Lock className="h-4 w-4 text-amber-500" />
                        </div>
                      )}
                    </div>
                    <Badge variant="outline" className={`${persona.isPremium ? 'text-amber-500 border-amber-500/30' : `${persona.color} ${persona.borderColor}`}`}>
                      {persona.isPremium ? "Premium" : "Active"}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-foreground">{persona.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">{persona.role}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{persona.description}</p>
                  
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-foreground">Key Capabilities:</p>
                    <div className="space-y-1">
                      {persona.capabilities.map((cap, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className={`h-1.5 w-1.5 rounded-full ${persona.bgColor}`} />
                          <p className="text-xs text-muted-foreground">{cap}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                    variant="outline"
                  >
                    {persona.isPremium ? "Unlock Access" : "Access Persona"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* System Pulse HUD */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border border-primary/20 p-6">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, hsl(var(--primary) / 0.3) 0px, transparent 1px, transparent 40px, hsl(var(--primary) / 0.3) 41px)',
            animation: 'shimmer 3s linear infinite'
          }} />
        </div>
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm text-muted-foreground">Forecast modules online</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">6 personas synced</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-success" />
              <span className="text-sm text-muted-foreground">AI systems <span className="font-semibold text-success">98%</span> operational</span>
            </div>
          </div>
        </div>
      </div>

      <PremiumFeatureModal 
        open={showPremiumModal}
        onOpenChange={setShowPremiumModal}
      />
    </div>
  );
};

export default Index;
