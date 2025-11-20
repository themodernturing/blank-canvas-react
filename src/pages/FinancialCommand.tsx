import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DollarSign, TrendingUp, Wallet, Activity, Gauge, Volume2, Info, Lock, Brain, ArrowUp, ArrowDown, ChevronRight } from "lucide-react";
import { useVoiceContext } from "@/contexts/VoiceContext";
import { RealTimeIndicator } from "@/components/RealTimeIndicator";
import { ScenarioSimulator } from "@/components/ScenarioSimulator";
import { ClickableInsightCard } from "@/components/ClickableInsightCard";
import { PremiumFeatureModal } from "@/components/PremiumFeatureModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function FinancialCommand() {
  const { speak } = useVoiceContext();
  const [liveData, setLiveData] = useState({
    revenue: 18.4,
    margin: 24.8,
    cash: 4.2,
    burnRate: 0.85,
    runway: 148
  });

  const [revenueGrowth, setRevenueGrowth] = useState([5]);
  const [expenseAdjustment, setExpenseAdjustment] = useState([0]);
  const [headcountChange, setHeadcountChange] = useState([0]);
  const [projectedRunway, setProjectedRunway] = useState(148);
  const [projectedCashFlow, setProjectedCashFlow] = useState(4.2);
  const [projectedMargin, setProjectedMargin] = useState(24.8);
  const [projectedRisk, setProjectedRisk] = useState(18);
  const [forecastAccuracy, setForecastAccuracy] = useState(87);
  const [forecastHistory, setForecastHistory] = useState([84, 86, 87]);
  const [selectedVariance, setSelectedVariance] = useState<string | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const varianceDetails = {
    revenue: {
      title: "Revenue Variance",
      amount: "+$420K",
      percentage: "+2.3%",
      reason: "Vendor costs increased 12% due to new infrastructure contracts and earlier-than-planned headcount expansion.",
      action: "Renegotiate cloud provider contracts by Q2. Consider shifting 15% of workload to cost-optimized tier.",
      type: "success"
    },
    expense: {
      title: "Expense Variance",
      amount: "+$115K",
      percentage: "+1.4%",
      reason: "Marketing campaign performance exceeded expectations, driving increased customer acquisition costs but yielding 18% higher conversions.",
      action: "Review discretionary marketing spend. Reallocate budget to high-ROI channels identified in Q4 analysis.",
      type: "warning"
    },
    net: {
      title: "Net Impact",
      amount: "+$305K",
      percentage: "+1.7%",
      reason: "Combined effect of increased revenue and controlled expense growth resulted in positive net impact to cash position.",
      action: "Maintain current trajectory. Monitor expense volatility closely to preserve margin gains.",
      type: "success"
    }
  };

  const recommendations = [
    "Delay non-critical CAPEX by 14 days to extend runway without impacting operations",
    "Shift 20% of cloud infrastructure to reserved instances for 12% annual savings",
    "Consolidate vendor contracts to reduce administrative overhead by $45K quarterly"
  ];

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        revenue: +(prev.revenue + (Math.random() - 0.5) * 0.1).toFixed(1),
        margin: +(prev.margin + (Math.random() - 0.5) * 0.2).toFixed(1),
        cash: +(prev.cash + (Math.random() - 0.5) * 0.05).toFixed(2),
        burnRate: +(prev.burnRate + (Math.random() - 0.5) * 0.02).toFixed(2),
        runway: Math.round(prev.runway + (Math.random() - 0.5) * 2)
      }));
      setForecastAccuracy(prev => {
        const next = prev + (Math.random() - 0.5) * 2;
        return Math.min(95, Math.max(85, Math.round(next)));
      });
      setForecastHistory(prev => [...prev.slice(-2), forecastAccuracy]);
    }, 5000);

    return () => clearInterval(interval);
  }, [forecastAccuracy]);

  // Update scenario projections based on sliders
  useEffect(() => {
    const baseRunway = 148;
    const baseCash = 4.2;
    const baseMargin = 24.8;
    const baseRisk = 18;

    const growthImpact = revenueGrowth[0] * 2;
    const expenseImpact = -expenseAdjustment[0] * 1.5;
    const headcountImpact = -headcountChange[0] * 3;

    setProjectedRunway(Math.round(baseRunway + growthImpact + expenseImpact + headcountImpact));
    setProjectedCashFlow(+(baseCash + (revenueGrowth[0] * 0.05) - (expenseAdjustment[0] * 0.03) - (headcountChange[0] * 0.08)).toFixed(2));
    setProjectedMargin(+(baseMargin + (revenueGrowth[0] * 0.2) - (expenseAdjustment[0] * 0.15)).toFixed(1));
    setProjectedRisk(Math.max(5, Math.min(45, Math.round(baseRisk + (expenseAdjustment[0] * 0.8) + (headcountChange[0] * 1.2)))));

    if (Math.abs(revenueGrowth[0]) > 0 || Math.abs(expenseAdjustment[0]) > 0 || Math.abs(headcountChange[0]) > 0) {
      speak("Scenario updated successfully.");
    }
  }, [revenueGrowth, expenseAdjustment, headcountChange]);

  const handleVoiceSummary = () => {
    speak("Real-time financial data streaming. Revenue steady at eighteen point four million. Margins at twenty four point eight percent. All indicators normal.");
  };

  const handleResetScenario = () => {
    setRevenueGrowth([5]);
    setExpenseAdjustment([0]);
    setHeadcountChange([0]);
    speak("Scenario reset to baseline.");
  };

  const handleApplyScenario = () => {
    speak(`Scenario applied. Projected runway: ${projectedRunway} days. Cash flow: ${projectedCashFlow} million dollars.`);
  };

  useEffect(() => {
    speak("ORBITAL Financial Systems calibrated — monitoring performance in real time.");
  }, [speak]);

  return (
    <TooltipProvider>
      <div className="space-y-6 animate-fade-in p-6">
        {/* ORBITAL Header */}
        <div className="bg-gradient-to-r from-primary/10 via-success/10 to-primary/10 border border-primary/30 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-foreground">
            ORBITAL Financial Systems calibrated — monitoring performance in real time.
          </h2>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">AI Financial Command Deck</h1>
            <p className="text-muted-foreground">Live financial intelligence with scenario modeling</p>
          </div>
          <Button onClick={handleVoiceSummary} variant="outline" className="gap-2">
            <Volume2 className="h-4 w-4" />
            AI Voice Summary
          </Button>
        </div>

        {/* Live Financial Pulse */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary animate-pulse" />
                Live Financial Pulse
              </div>
              <RealTimeIndicator />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <p className="text-xs text-muted-foreground">Revenue</p>
                </div>
                <p className="text-2xl font-bold text-foreground transition-all">${liveData.revenue}M</p>
              </div>
              <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <p className="text-xs text-muted-foreground">Operating Margin</p>
                </div>
                <p className="text-2xl font-bold text-foreground transition-all">{liveData.margin}%</p>
              </div>
              <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="h-4 w-4 text-accent" />
                  <p className="text-xs text-muted-foreground">Cash Reserves</p>
                </div>
                <p className="text-2xl font-bold text-foreground transition-all">${liveData.cash}M</p>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-4 bg-secondary/30 rounded-lg border border-border cursor-help">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="h-4 w-4 text-warning" />
                      <p className="text-xs text-muted-foreground">Burn Rate</p>
                    </div>
                    <p className="text-2xl font-bold text-foreground transition-all">${liveData.burnRate}M/mo</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">Average monthly cash outflow based on current expenses</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-4 bg-secondary/30 rounded-lg border border-border cursor-help">
                    <div className="flex items-center gap-2 mb-2">
                      <Gauge className="h-4 w-4 text-primary" />
                      <p className="text-xs text-muted-foreground">Runway</p>
                    </div>
                    <p className="text-2xl font-bold text-foreground transition-all">{liveData.runway} days</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">Estimated days before cash reserves are exhausted at current burn rate</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardContent>
        </Card>

        {/* Profit & Loss Analyzer */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Profit & Loss Analyzer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                <p className="text-sm font-semibold text-primary mb-2">Weekly AI Summary</p>
                <p className="text-sm text-foreground">
                  Operating margin up 1.2%. Marketing expenses rose by 4.8%, reducing net margin by 0.5%.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  onClick={() => setSelectedVariance('revenue')}
                  className="p-3 bg-secondary/30 rounded-lg border border-border cursor-pointer hover:border-success/50 transition-all"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-muted-foreground">Revenue Variance</p>
                    <Info className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <p className="text-lg font-bold text-success">+$420K</p>
                  <p className="text-xs text-success">+2.3%</p>
                </div>
                <div 
                  onClick={() => setSelectedVariance('expense')}
                  className="p-3 bg-secondary/30 rounded-lg border border-border cursor-pointer hover:border-warning/50 transition-all"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-muted-foreground">Expense Variance</p>
                    <Info className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <p className="text-lg font-bold text-warning">+$115K</p>
                  <p className="text-xs text-warning">+1.4%</p>
                </div>
                <div 
                  onClick={() => setSelectedVariance('net')}
                  className="p-3 bg-secondary/30 rounded-lg border border-border cursor-pointer hover:border-success/50 transition-all"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-muted-foreground">Net Impact</p>
                    <Info className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <p className="text-lg font-bold text-success">+$305K</p>
                  <p className="text-xs text-success">+1.7%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Margin Intelligence */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-accent" />
                🧠 AI Margin Intelligence
              </CardTitle>
              <Badge variant="outline" className="text-xs text-accent border-accent/30">
                🧩 AI Margin Intelligence Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Cost Drivers */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground border-b border-border pb-2">
                  Cost Drivers
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Labor costs</span>
                    <div className="flex items-center gap-1">
                      <span className="text-destructive font-medium">+4.1%</span>
                      <ArrowUp className="h-3 w-3 text-destructive" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Materials</span>
                    <div className="flex items-center gap-1">
                      <span className="text-destructive font-medium">+2.3%</span>
                      <ArrowUp className="h-3 w-3 text-destructive" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Infrastructure</span>
                    <div className="flex items-center gap-1">
                      <span className="text-success font-medium">-1.2%</span>
                      <ArrowDown className="h-3 w-3 text-success" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Revenue Drivers */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground border-b border-border pb-2">
                  Revenue Drivers
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">MENA growth</span>
                    <div className="flex items-center gap-1">
                      <span className="text-success font-medium">+6.4%</span>
                      <ArrowUp className="h-3 w-3 text-success" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">FX impact</span>
                    <div className="flex items-center gap-1">
                      <span className="text-success font-medium">+1.7%</span>
                      <ArrowUp className="h-3 w-3 text-success" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Upsell rate</span>
                    <div className="flex items-center gap-1">
                      <span className="text-success font-medium">+2.1%</span>
                      <ArrowUp className="h-3 w-3 text-success" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Operational Gains */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground border-b border-border pb-2">
                  Operational Gains
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Automation</span>
                    <div className="flex items-center gap-1">
                      <span className="text-success font-medium">+1.2%</span>
                      <ArrowUp className="h-3 w-3 text-success" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Efficiency</span>
                    <div className="flex items-center gap-1">
                      <span className="text-success font-medium">+0.8%</span>
                      <ArrowUp className="h-3 w-3 text-success" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Workflow optimization</span>
                    <div className="flex items-center gap-1">
                      <span className="text-success font-medium">+0.5%</span>
                      <ArrowUp className="h-3 w-3 text-success" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Forecast Deviation Tracker (Premium) */}
        <Card 
          className="bg-card border-border relative overflow-hidden cursor-pointer hover:border-primary/50 transition-all"
          onClick={() => setShowPremiumModal(true)}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                📊 Forecast Deviation Tracker
              </CardTitle>
              <Badge className="bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/50 animate-pulse">
                <Lock className="h-3 w-3 mr-1" />
                Available in Premium Version
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Forecast accuracy: <span className="font-semibold text-foreground">89%</span> — deviations within acceptable limits.
            </p>
            
            {/* Compact Deviation Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 text-sm font-semibold text-muted-foreground">Metric</th>
                    <th className="text-right py-2 px-3 text-sm font-semibold text-muted-foreground">Forecast</th>
                    <th className="text-right py-2 px-3 text-sm font-semibold text-muted-foreground">Actual</th>
                    <th className="text-right py-2 px-3 text-sm font-semibold text-muted-foreground">Deviation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-3 text-sm text-foreground">Revenue</td>
                    <td className="py-3 px-3 text-sm text-right text-muted-foreground">$18.4M</td>
                    <td className="py-3 px-3 text-sm text-right text-muted-foreground">$17.6M</td>
                    <td className="py-3 px-3 text-sm text-right">
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-destructive font-semibold">-4%</span>
                        <span className="text-destructive">🔻</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-3 text-sm text-foreground">Expenses</td>
                    <td className="py-3 px-3 text-sm text-right text-muted-foreground">$13.1M</td>
                    <td className="py-3 px-3 text-sm text-right text-muted-foreground">$13.6M</td>
                    <td className="py-3 px-3 text-sm text-right">
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-destructive font-semibold">+3.8%</span>
                        <span className="text-destructive">🔺</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-sm text-foreground">Margin</td>
                    <td className="py-3 px-3 text-sm text-right text-muted-foreground">24.8%</td>
                    <td className="py-3 px-3 text-sm text-right text-muted-foreground">22.1%</td>
                    <td className="py-3 px-3 text-sm text-right">
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-destructive font-semibold">-2.7%</span>
                        <span className="text-destructive">🔻</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Premium Modal */}
        {showPremiumModal && (
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setShowPremiumModal(false)}
          >
            <Card className="max-w-md w-full bg-card border-primary/50 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse">
                    <Lock className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-center text-xl">Premium Feature</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-muted-foreground">
                  This advanced feature is available in the full <span className="font-semibold text-primary">Orbital Premium Edition</span>.
                </p>
                <div className="pt-4 flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowPremiumModal(false)}
                  >
                    Close
                  </Button>
                  <Button 
                    className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    onClick={() => setShowPremiumModal(false)}
                  >
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Interactive Scenario Simulator */}
        <ScenarioSimulator
          title="Financial Scenario Simulator"
          parameters={[
            {
              label: "Revenue Growth",
              value: revenueGrowth,
              onChange: setRevenueGrowth,
              min: -10,
              max: 20,
              step: 1,
              unit: "%"
            },
            {
              label: "Expense Adjustment",
              value: expenseAdjustment,
              onChange: setExpenseAdjustment,
              min: -20,
              max: 20,
              step: 1,
              unit: "%"
            },
            {
              label: "Headcount Change",
              value: headcountChange,
              onChange: setHeadcountChange,
              min: -15,
              max: 25,
              step: 1,
              unit: "%"
            }
          ]}
          results={[
            {
              label: "Runway",
              value: `${projectedRunway} days`,
              baseline: 148,
              change: projectedRunway - 148
            },
            {
              label: "Cash Flow",
              value: `$${projectedCashFlow}M`,
              baseline: 4.2,
              change: Number((projectedCashFlow - 4.2).toFixed(2))
            },
            {
              label: "Margin",
              value: `${projectedMargin}%`,
              baseline: 24.8,
              change: Number((projectedMargin - 24.8).toFixed(1))
            },
            {
              label: "Risk",
              value: `${projectedRisk}%`,
              baseline: 18,
              change: projectedRisk - 18
            }
          ]}
          onReset={handleResetScenario}
          onApplyScenario={handleApplyScenario}
        />

        {/* AI Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ClickableInsightCard
            title="Cost Optimization Opportunity"
            summary="Cloud infrastructure spend is 22% above industry benchmark. Shifting to reserved instances could save $400K annually."
            badge="High Impact"
            detailedInsights={[
              "Current monthly cloud spend: $150K (projected annual: $1.8M)",
              "Industry benchmark for similar scale: $123K/month",
              "Reserved instance pricing available: $115K/month (23% savings)"
            ]}
            recommendations={[
              "Migrate 60% of workloads to 1-year reserved instances",
              "Move dev/test environments to spot instances (additional $45K savings)",
              "Implement auto-scaling policies to reduce idle capacity"
            ]}
            nextSteps={[
              "Request reserved instance quote from cloud provider",
              "Audit current instance usage patterns",
              "Get CFO approval for 1-year commitment"
            ]}
          />
          <ClickableInsightCard
            title="Variance Alert"
            summary="Marketing expenses exceeded budget by $115K this month, but drove 18% higher conversions. ROI remains positive."
            badge="Monitor"
            badgeVariant="outline"
            detailedInsights={[
              "Planned marketing spend: $200K, Actual: $315K",
              "Conversion rate improvement: 2.1% → 3.8%",
              "Customer acquisition cost decreased by 18%",
              "Net revenue impact: +$420K"
            ]}
            recommendations={[
              "Review discretionary marketing spend allocation",
              "Reallocate budget to high-ROI channels (paid search, retargeting)",
              "Set spending alerts at 90% of monthly budget"
            ]}
            nextSteps={[
              "Schedule marketing budget review with CMO",
              "Analyze channel-level performance data",
              "Adjust Q1 marketing budget forecast"
            ]}
          />
        </div>

        {/* Premium Feature Modal */}
        <PremiumFeatureModal open={showPremiumModal} onOpenChange={setShowPremiumModal} />
      </div>
    </TooltipProvider>
  );
}