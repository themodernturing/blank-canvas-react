import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ShieldCheck, AlertTriangle, CheckCircle, XCircle, RefreshCw, Loader2, Sparkles, Download } from "lucide-react";
import { AIInsightCard } from "@/components/AIInsightCard";
import { useToast } from "@/hooks/use-toast";
import { useVoiceContext } from "@/contexts/VoiceContext";
import { PremiumFeatureModal } from "@/components/PremiumFeatureModal";

type RiskAlert = {
  id: string;
  severity: "critical" | "warning" | "safe";
  message: string;
  acknowledged: boolean;
};

type GaugeMetric = {
  label: string;
  value: number;
  tooltip: string;
  insight: string;
};

const gaugeMetrics: GaugeMetric[] = [
  {
    label: "Compliance Health",
    value: 82,
    tooltip: "Overall compliance score based on regulatory adherence",
    insight: "AI Suggestion: Schedule quarterly compliance review to maintain current standards."
  },
  {
    label: "Operational Stability",
    value: 76,
    tooltip: "Operational stability dropped 5% due to vendor delays",
    insight: "AI Suggestion: Increase supplier monitoring in MENA region."
  },
  {
    label: "Financial Integrity",
    value: 91,
    tooltip: "Strong financial controls and audit compliance",
    insight: "AI Suggestion: Continue current financial oversight practices."
  }
];

const initialRiskAlerts: RiskAlert[] = [
  { id: "1", severity: "critical", message: "Data privacy audit overdue – 28 days past compliance threshold", acknowledged: false },
  { id: "2", severity: "warning", message: "Supplier contract expiring in 5 days (High value: $1.2M)", acknowledged: false },
  { id: "3", severity: "safe", message: "No new HR compliance risks detected", acknowledged: false },
];

const complianceTrackers = [
  { label: "Legal & Contract Adherence", value: 84, detail: "Procurement policy update overdue by 45 days" },
  { label: "Internal Audit Completion", value: 68, detail: "Q3 audit cycle in progress" },
  { label: "Policy Update Cycle", value: 72, detail: "HR policy review scheduled for next month" }
];

export default function Governance() {
  const { speak } = useVoiceContext();
  const { toast } = useToast();
  const [riskAlerts, setRiskAlerts] = useState(initialRiskAlerts);
  const [selectedGauge, setSelectedGauge] = useState<GaugeMetric | null>(null);
  const [showRiskSummary, setShowRiskSummary] = useState(false);
  const [showActionPlan, setShowActionPlan] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<any>(null);
  const [insightText, setInsightText] = useState("AI forecasts increasing compliance risk in Procurement (74% confidence). Recommended action: initiate vendor contract revalidation.");
  const [isUpdatingInsight, setIsUpdatingInsight] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  useEffect(() => {
    speak("ORBITAL Governance Intelligence active — monitoring compliance and risk.");
  }, [speak]);

  const acknowledgeAlert = (id: string) => {
    setRiskAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, acknowledged: true } : alert
    ));
  };

  const runAIScan = () => {
    setIsScanning(true);
    setScanResults(null);
    
    setTimeout(() => {
      setScanResults({
        predictions: [
          { risk: "Supply Chain Delay", likelihood: 78, severity: "warning" },
          { risk: "Data Compliance Breach", likelihood: 54, severity: "warning" },
          { risk: "Finance Audit Stable", likelihood: 8, severity: "safe" }
        ],
        actionPlan: "AI suggests renegotiating supplier contracts and scheduling privacy training."
      });
      setIsScanning(false);
      setInsightText("AI suggests renegotiating supplier contracts and scheduling privacy training.");
    }, 1500);
  };

  const handleQuickPrompt = (prompt: string) => {
    setIsUpdatingInsight(true);
    setTimeout(() => {
      const insights: Record<string, string> = {
        "Show top risks": "Top risks this week: Supply Chain Delay (78%), Data Compliance Breach (54%), Finance Audit Stable (8%). Recommend: contract revalidation + privacy refresher.",
        "Forecast next quarter": "Stable posture expected; focus areas: procurement oversight, vendor documents, and training cadence.",
        "Summarize compliance posture": "Strengths: Financial integrity (91%), solid legal adherence. Gaps: Operational stability requires vendor monitoring. Next steps: Update procurement policy, schedule privacy training."
      };
      setInsightText(insights[prompt] || insights["Summarize compliance posture"]);
      setIsUpdatingInsight(false);
    }, 1000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-danger border-danger/30 bg-danger/10";
      case "warning": return "text-warning border-warning/30 bg-warning/10";
      case "safe": return "text-success border-success/30 bg-success/10";
      default: return "";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical": return <XCircle className="h-5 w-5" />;
      case "warning": return <AlertTriangle className="h-5 w-5" />;
      case "safe": return <CheckCircle className="h-5 w-5" />;
      default: return null;
    }
  };

  const getGaugeColor = (value: number) => {
    if (value >= 80) return "text-success";
    if (value >= 60) return "text-warning";
    return "text-danger";
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <AIInsightCard 
          insight="Detected 1 compliance anomaly in Procurement cycle — monitoring closely." 
          delay={2000}
        />
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-primary" />
            Risk & Stability Matrix
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time foresight into organizational risk and compliance integrity
          </p>
        </div>

        {/* System Health Overview - Circular Gauges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gaugeMetrics.map((metric) => (
            <Tooltip key={metric.label}>
              <TooltipTrigger asChild>
                <Card 
                  className="bg-gradient-card border-border shadow-card cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all group"
                  onClick={() => setSelectedGauge(metric)}
                >
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-4">
                      <svg className="transform -rotate-90 w-32 h-32">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          className="text-secondary"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={`${2 * Math.PI * 56}`}
                          strokeDashoffset={`${2 * Math.PI * 56 * (1 - metric.value / 100)}`}
                          className={`${getGaugeColor(metric.value)} transition-all duration-1000 animate-fade-in`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-3xl font-bold ${getGaugeColor(metric.value)}`}>
                          {metric.value}%
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-center">{metric.label}</h3>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>{metric.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Active Risk Feed */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Active Risk Feed
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {riskAlerts.filter(alert => !alert.acknowledged).map((alert, index) => (
              <Alert 
                key={alert.id}
                className={`${getSeverityColor(alert.severity)} animate-fade-in border ${
                  alert.severity === "critical" ? "animate-pulse" : ""
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {getSeverityIcon(alert.severity)}
                    <AlertDescription className="flex-1">
                      {alert.message}
                      {index === 0 && <Badge className="ml-2 bg-warning/20 text-warning">New</Badge>}
                    </AlertDescription>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => acknowledgeAlert(alert.id)}
                    className="hover:bg-secondary/50"
                  >
                    Acknowledge
                  </Button>
                </div>
              </Alert>
            ))}
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => setShowRiskSummary(true)}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Summarize Risks
            </Button>
          </CardContent>
        </Card>

        {/* Compliance Integrity Tracker */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle>Compliance Integrity Tracker</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {complianceTrackers.map((tracker) => (
              <Tooltip key={tracker.label}>
                <TooltipTrigger asChild>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{tracker.label}</span>
                      <span className={`font-bold ${getGaugeColor(tracker.value)}`}>
                        {tracker.value}%
                      </span>
                    </div>
                    <Progress value={tracker.value} className="h-3 animate-fade-in" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{tracker.detail}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Predictive Risk Simulator */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Predictive Risk Simulator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full bg-primary hover:bg-primary/90"
                onClick={runAIScan}
                disabled={isScanning}
              >
                {isScanning ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    AI analyzing 17 data clusters...
                  </>
                ) : (
                  "Run AI Scan"
                )}
              </Button>

              {isScanning && (
                <div className="space-y-2">
                  <Progress value={66} className="h-2 animate-pulse" />
                </div>
              )}

              {scanResults && (
                <div className="space-y-3 animate-fade-in">
                  {scanResults.predictions.map((pred: any, i: number) => (
                    <div 
                      key={i}
                      className={`p-3 rounded-lg border ${getSeverityColor(pred.severity)}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{pred.risk}</span>
                        <Badge variant="outline">{pred.likelihood}%</Badge>
                      </div>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    className="w-full mt-2"
                    onClick={() => setShowActionPlan(true)}
                  >
                    Generate Action Plan
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Risk Intelligence Insights */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Risk Intelligence Insights
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleQuickPrompt("Forecast next quarter")}
                  disabled={isUpdatingInsight}
                >
                  {isUpdatingInsight ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                <p className="text-sm leading-relaxed animate-fade-in">
                  {insightText}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Quick Prompts:</p>
                <div className="flex flex-wrap gap-2">
                  {["Show top risks", "Forecast next quarter", "Summarize compliance posture"].map((prompt) => (
                    <Button
                      key={prompt}
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() => handleQuickPrompt(prompt)}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gauge Insight Modal */}
        <Dialog open={selectedGauge !== null} onOpenChange={() => setSelectedGauge(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedGauge?.label}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <div className={`text-5xl font-bold ${selectedGauge && getGaugeColor(selectedGauge.value)}`}>
                  {selectedGauge?.value}%
                </div>
              </div>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-sm">{selectedGauge?.insight}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Risk Summary Modal */}
        <Dialog open={showRiskSummary} onOpenChange={setShowRiskSummary}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Risk Summary</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                <p className="font-semibold mb-2">
                  {riskAlerts.filter(a => !a.acknowledged).length} open risk items detected.
                </p>
                <p className="text-sm">
                  Priority: Supplier contract renewal, audit scheduling, policy review.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Action Plan Drawer */}
        <Drawer open={showActionPlan} onOpenChange={setShowActionPlan}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>30-Day Risk Action Plan</DrawerTitle>
            </DrawerHeader>
            <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <h4 className="font-semibold text-sm mb-2">Week 1: Vendor Contract Revalidation</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Review all active supplier contracts expiring in Q1</li>
                    <li>• Identify high-value contracts ($1M+) requiring renewal</li>
                    <li>• Schedule meetings with procurement team and legal</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <h4 className="font-semibold text-sm mb-2">Week 2: Data Privacy Training</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Target teams: Operations, Finance, HR</li>
                    <li>• Owners: Chief Compliance Officer + HR Director</li>
                    <li>• Format: 2-hour workshop + online module</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-cyan/10 border border-cyan/20">
                  <h4 className="font-semibold text-sm mb-2">Week 3: Audit Evidence Collection</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Procurement policy documentation</li>
                    <li>• Vendor performance reports (last 6 months)</li>
                    <li>• Compliance checklist sign-offs</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                  <h4 className="font-semibold text-sm mb-2">Week 4: Executive Review + Sign-Off</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Present findings to executive committee</li>
                    <li>• Obtain CFO and CEO approval on updated policies</li>
                    <li>• Publish compliance status report</li>
                  </ul>
                </div>
              </div>
            </div>
            <DrawerFooter>
              <Button className="gap-2" onClick={() => {
                toast({
                  title: "Action Plan Downloaded",
                  description: "30-day plan saved as PDF"
                });
              }}>
                <Download className="h-4 w-4" />
                Download Plan (PDF)
              </Button>
              <Button variant="outline" onClick={() => setShowActionPlan(false)}>
                Close
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        {/* Premium Feature Modal */}
        <PremiumFeatureModal open={showPremiumModal} onOpenChange={setShowPremiumModal} />
      </div>
    </TooltipProvider>
  );
}
