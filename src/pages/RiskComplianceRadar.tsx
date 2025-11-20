import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Sparkles, TrendingUp, TrendingDown, AlertTriangle, Clock, ArrowUpRight, Zap, Target, Shield, Lock, Radio, Globe, Gauge } from "lucide-react";
import { RealTimeIndicator } from "@/components/RealTimeIndicator";
import { ClickableInsightCard } from "@/components/ClickableInsightCard";
import { useVoiceContext } from "@/contexts/VoiceContext";
import { toast } from "@/hooks/use-toast";
import { PremiumFeatureModal } from "@/components/PremiumFeatureModal";

type RiskZone = {
  id: string;
  name: string;
  status: 'stable' | 'minor' | 'moderate';
  description: string;
  position: { x: number; y: number };
  pulse: boolean;
};

type BenchmarkData = {
  metric: string;
  yourValue: number;
  industry: number;
  gap: number;
  unit: string;
};

type PredictiveMetric = {
  label: string;
  predicted: number;
  actual: number | null;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
};

const riskZones: RiskZone[] = [
  { 
    id: 'finance', 
    name: 'Finance', 
    status: 'stable',
    description: 'Cash flow deviation <2% — stable',
    position: { x: 250, y: 100 },
    pulse: false
  },
  { 
    id: 'procurement', 
    name: 'Procurement', 
    status: 'minor',
    description: 'Vendor delay risk — minor; under watch',
    position: { x: 100, y: 200 },
    pulse: true
  },
  { 
    id: 'it', 
    name: 'IT', 
    status: 'stable',
    description: 'Security protocols updated — stable',
    position: { x: 400, y: 200 },
    pulse: false
  },
  { 
    id: 'hr', 
    name: 'HR', 
    status: 'stable',
    description: 'Compliance training on track — stable',
    position: { x: 250, y: 320 },
    pulse: false
  }
];

const benchmarkData: BenchmarkData[] = [
  { metric: 'SLA Adherence', yourValue: 92, industry: 85, gap: 7, unit: '%' },
  { metric: 'Decision Accuracy', yourValue: 94, industry: 88, gap: 6, unit: '%' },
  { metric: 'Compliance Score', yourValue: 88, industry: 82, gap: 6, unit: '/100' },
  { metric: 'Sentiment Index', yourValue: 82, industry: 75, gap: 7, unit: '/100' }
];

type ForecastInsight = {
  domain: string;
  insight: string;
  prediction: string;
  voice: string;
};

const forecastInsights: ForecastInsight[] = [
  { 
    domain: 'Operations', 
    insight: 'Delivery reliability forecast at 95%',
    prediction: 'Operational efficiency trending up',
    voice: 'Operational efficiency trending up — delivery reliability forecast at ninety-five percent.'
  },
  { 
    domain: 'People', 
    insight: 'Workforce utilization steady at 87%',
    prediction: 'Team productivity stable',
    voice: 'Workforce utilization steady at eighty-seven percent.'
  },
  { 
    domain: 'Risk', 
    insight: 'Procurement risk expected to reduce by 12%',
    prediction: 'Risk mitigation progressing',
    voice: 'Procurement risk expected to reduce by twelve percent.'
  },
  { 
    domain: 'Customer', 
    insight: 'Client sentiment improving — predicted 8-point gain next quarter',
    prediction: 'Customer satisfaction rising',
    voice: 'Client sentiment improving — predicted eight-point gain next quarter.'
  }
];

export default function RiskComplianceRadar() {
  const [selectedZone, setSelectedZone] = useState<RiskZone | null>(null);
  const [showBenchmark, setShowBenchmark] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [efficiencyDelta] = useState({ reduction: 42, increase: 18 });
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  
  const { speak } = useVoiceContext();


  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Voice on page load
    speak('Risk intelligence active. Monitoring four risk zones. All departments stable. Procurement under enhanced watch.', { priority: 'high' });
    setTimeout(() => {
      speak('Click any department node to hear its live risk update.', { priority: 'medium' });
    }, 3000);
  }, [speak]);

  const getZoneColor = (status: string) => {
    switch (status) {
      case 'stable': return 'text-success fill-success/20 hover:fill-success/30';
      case 'minor': return 'text-warning fill-warning/20 hover:fill-warning/30 animate-pulse';
      case 'moderate': return 'text-danger fill-danger/20 hover:fill-danger/30';
      default: return 'text-primary fill-primary/20';
    }
  };

  const handleZoneClick = (zone: RiskZone) => {
    setSelectedZone(zone);
    
    // Voice for each zone
    const voiceMessages: Record<string, string> = {
      'finance': 'Finance — cash flow deviation less than two percent. Stable.',
      'procurement': 'Procurement risk — vendor delay, minor under watch. Monitoring every twelve hours.',
      'it': 'IT — security protocols updated. Stable.',
      'hr': 'HR — compliance training on track. Stable.'
    };
    
    speak(voiceMessages[zone.id] || zone.description, { priority: 'medium' });
  };

  const handleBenchmarkClick = () => {
    setShowBenchmark(true);
    speak('Executive benchmark report loaded. Performance exceeds industry average across multiple departments.', { priority: 'medium' });
  };

  const handleCompareBenchmarks = () => {
    // PDF generation placeholder
  };

  const handlePremiumFeatureClick = () => {
    setShowPremiumModal(true);
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-primary bg-clip-text text-transparent">
              Risk Intelligence Hub
            </h1>
            <p className="text-muted-foreground mt-1">AI translating complex risk signals into real-time executive insight</p>
          </div>
          <RealTimeIndicator label="Live monitoring active" />
        </div>

        <ClickableInsightCard
          title="Risk Intelligence Active"
          summary="Monitoring 4 risk zones. All departments within acceptable thresholds. Procurement under enhanced surveillance."
          badge="Active"
          badgeVariant="default"
          icon={<Shield />}
          detailedInsights={[
            "Last anomaly detected: 6 hours ago (auto-resolved)",
            "Average detection latency: 2.3 minutes",
            "False positive rate: <4%"
          ]}
        />

        {/* Departmental Risk Map */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-accent" />
                Departmental Risk Map
              </CardTitle>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {lastUpdate.toLocaleTimeString()}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative w-full aspect-[5/3] max-w-2xl mx-auto bg-background/50 rounded-lg border border-border/50 overflow-hidden">
              <svg viewBox="0 0 500 350" className="w-full h-full">
                {/* Constellation connections */}
                <line x1="250" y1="100" x2="100" y2="200" stroke="currentColor" strokeWidth="1" className="text-border/30" />
                <line x1="250" y1="100" x2="400" y2="200" stroke="currentColor" strokeWidth="1" className="text-border/30" />
                <line x1="250" y1="100" x2="250" y2="320" stroke="currentColor" strokeWidth="1" className="text-border/30" />
                <line x1="100" y1="200" x2="250" y2="320" stroke="currentColor" strokeWidth="1" className="text-border/30" />
                <line x1="400" y1="200" x2="250" y2="320" stroke="currentColor" strokeWidth="1" className="text-border/30" />

                {/* Risk zones */}
                {riskZones.map((zone) => (
                  <Tooltip key={zone.id}>
                    <TooltipTrigger asChild>
                      <g
                        className="cursor-pointer group"
                        onClick={() => handleZoneClick(zone)}
                      >
                        <circle
                          cx={zone.position.x}
                          cy={zone.position.y}
                          r="35"
                          className={`${getZoneColor(zone.status)} transition-all`}
                          strokeWidth="2"
                          stroke="currentColor"
                        />
                        <text
                          x={zone.position.x}
                          y={zone.position.y}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-xs font-semibold fill-foreground pointer-events-none"
                        >
                          {zone.name}
                        </text>
                        {zone.pulse && (
                          <circle
                            cx={zone.position.x}
                            cy={zone.position.y}
                            r="45"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-warning animate-ping"
                            opacity="0.6"
                          />
                        )}
                      </g>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs max-w-xs">{zone.description}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </svg>

              {selectedZone && (
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-card/95 backdrop-blur-sm border border-accent/30 rounded-lg shadow-lg">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm mb-1">{selectedZone.name}</h4>
                      <p className="text-xs text-muted-foreground">{selectedZone.description}</p>
                      <p className="text-[10px] text-accent mt-2">Monitoring every 12 hours</p>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => setSelectedZone(null)}>
                      Close
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-xs text-muted-foreground">Stable</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-warning animate-pulse" />
                <span className="text-xs text-muted-foreground">Minor Watch</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-danger" />
                <span className="text-xs text-muted-foreground">Moderate Risk</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Executive Benchmark Insight */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowUpRight className="h-5 w-5 text-success" />
                Executive Benchmark Insight
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!showBenchmark ? (
                <div className="py-4 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    View cross-functional performance across operations, people, governance, and culture against industry benchmarks.
                  </p>
                  <Button 
                    onClick={handleBenchmarkClick}
                    className="w-full"
                    variant="outline"
                  >
                    Compare Benchmarks
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-4 bg-success/10 border border-success/30 rounded-lg">
                    <p className="text-sm font-medium mb-2">🎯 Cross-Functional Performance</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Performance exceeds industry average across operations, governance, and culture metrics. Strong alignment detected in decision accuracy and sentiment index.
                    </p>
                  </div>

                  {benchmarkData.map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium">{item.metric}</span>
                        <span className={item.gap > 0 ? "text-success" : "text-muted-foreground"}>
                          {item.gap > 0 ? '+' : ''}{item.gap}{item.unit}
                        </span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between text-[10px]">
                            <span className="text-muted-foreground">You: {item.yourValue}{item.unit}</span>
                            <span className="text-muted-foreground">Industry: {item.industry}{item.unit}</span>
                          </div>
                          <Progress value={(item.yourValue / Math.max(item.yourValue, item.industry)) * 100} className="h-1.5" />
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button size="sm" variant="outline" className="w-full mt-2" onClick={handleCompareBenchmarks}>
                    Generate Competitive Report (PDF)
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Automation & Human Reliance Insight */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-accent" />
                Automation & Human Reliance Insight
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-success/20 to-success/10 border border-success/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingDown className="h-4 w-4 text-success" />
                    <span className="text-xs text-muted-foreground">Human Reliance</span>
                  </div>
                  <p className="text-2xl font-bold text-success">-{efficiencyDelta.reduction}%</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Reduced dependency</p>
                </div>

                <div className="p-4 bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-accent" />
                    <span className="text-xs text-muted-foreground">Automation</span>
                  </div>
                  <p className="text-2xl font-bold text-accent">+{efficiencyDelta.increase}%</p>
                  <p className="text-[10px] text-muted-foreground mt-1">QoQ efficiency gain</p>
                </div>
              </div>

              <div className="pt-4 border-t border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium">Efficiency Trend</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-8 bg-gradient-to-r from-warning/20 via-success/20 to-accent/20 rounded overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold">
                      Continuous improvement detected
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Premium Feature Previews */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Predictive Risk Alerts */}
          <Card 
            className="bg-gradient-card border-border shadow-card cursor-pointer hover:border-accent/50 transition-all relative overflow-hidden"
            onClick={handlePremiumFeatureClick}
          >
            <div className="absolute top-4 right-4">
              <Lock className="h-5 w-5 text-yellow-600" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-muted-foreground">
                <Radio className="h-5 w-5 text-accent" />
                Predictive Risk Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative w-full aspect-square max-w-[200px] mx-auto">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Radar circles */}
                  <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" className="text-border/30" />
                  <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" className="text-border/30" />
                  <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1" className="text-border/30" />
                  <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="1" className="text-border/30" />
                  
                  {/* Pulsing points */}
                  <circle cx="140" cy="70" r="6" className="fill-warning">
                    <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="70" cy="130" r="5" className="fill-accent">
                    <animate attributeName="r" values="5;8;5" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Real-time AI alerts for emerging business risks before they escalate.
              </p>
            </CardContent>
          </Card>

          {/* Global Exposure Heatmap */}
          <Card 
            className="bg-gradient-card border-border shadow-card cursor-pointer hover:border-accent/50 transition-all relative overflow-hidden"
            onClick={handlePremiumFeatureClick}
          >
            <div className="absolute top-4 right-4">
              <Lock className="h-5 w-5 text-yellow-600" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-muted-foreground">
                <Globe className="h-5 w-5 text-accent" />
                Global Exposure Heatmap
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative w-full aspect-[2/1] max-w-[280px] mx-auto bg-background/50 rounded-lg p-4">
                <svg viewBox="0 0 300 150" className="w-full h-full">
                  {/* Simplified world map regions with color shading */}
                  <path d="M 20 40 L 80 40 L 80 80 L 20 80 Z" className="fill-success/30 stroke-success/50" strokeWidth="1" />
                  <path d="M 90 30 L 150 30 L 150 90 L 90 90 Z" className="fill-warning/30 stroke-warning/50" strokeWidth="1" />
                  <path d="M 160 35 L 220 35 L 220 85 L 160 85 Z" className="fill-accent/30 stroke-accent/50" strokeWidth="1" />
                  <path d="M 230 45 L 280 45 L 280 75 L 230 75 Z" className="fill-success/40 stroke-success/50" strokeWidth="1" />
                  <path d="M 40 95 L 100 95 L 100 130 L 40 130 Z" className="fill-danger/20 stroke-danger/40" strokeWidth="1" />
                  <path d="M 110 100 L 170 100 L 170 135 L 110 135 Z" className="fill-warning/20 stroke-warning/40" strokeWidth="1" />
                </svg>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Global risk exposure by geography and partner dependency.
              </p>
            </CardContent>
          </Card>

          {/* Executive Resilience Index */}
          <Card 
            className="bg-gradient-card border-border shadow-card cursor-pointer hover:border-accent/50 transition-all relative overflow-hidden"
            onClick={handlePremiumFeatureClick}
          >
            <div className="absolute top-4 right-4">
              <Lock className="h-5 w-5 text-yellow-600" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-muted-foreground">
                <Gauge className="h-5 w-5 text-accent" />
                Executive Resilience Index
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative w-full aspect-square max-w-[180px] mx-auto">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Outer ring */}
                  <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="8" className="text-border/20" />
                  
                  {/* Progress arc (85% - resilience score) */}
                  <circle 
                    cx="100" 
                    cy="100" 
                    r="80" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    className="text-success"
                    strokeDasharray="502.4"
                    strokeDashoffset="75.36"
                    strokeLinecap="round"
                    transform="rotate(-90 100 100)"
                  />
                  
                  {/* Center text */}
                  <text x="100" y="95" textAnchor="middle" className="text-3xl font-bold fill-foreground">85</text>
                  <text x="100" y="115" textAnchor="middle" className="text-xs fill-muted-foreground">Stability</text>
                </svg>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Unified metric blending financial, cultural, and operational resilience.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* AI Impact Footer */}
        <div className="mt-8 pt-6 border-t border-border/50">
          <p className="text-xs text-muted-foreground italic flex items-center gap-2">
            <Sparkles className="h-3 w-3 text-accent" />
            <strong>AI Impact Insight:</strong> Dependency on staff decreased — saving ~47 staff hours per week; average decision latency reduced by 31%.
          </p>
        </div>

        {/* Premium Feature Modal */}
        <PremiumFeatureModal open={showPremiumModal} onOpenChange={setShowPremiumModal} />
      </div>
    </TooltipProvider>
  );
}
