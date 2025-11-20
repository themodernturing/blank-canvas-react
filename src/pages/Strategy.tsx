import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Clock, Sparkles, Target, BarChart3, FileText, Calculator } from "lucide-react";
import { usePersona } from "@/contexts/PersonaContext";
import { RealTimeIndicator } from "@/components/RealTimeIndicator";
import { PremiumFeatureModal } from "@/components/PremiumFeatureModal";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useVoiceContext } from "@/contexts/VoiceContext";
import { useToast } from "@/hooks/use-toast";

type ScenarioOption = {
  id: string;
  question: string;
  scenario: string;
  description: string;
  tag: string;
  costImpact: number;
};

type ImpactLayer = {
  timeframe: string;
  description: string;
  metrics: { label: string; value: string }[];
};

const scenarioOptions: ScenarioOption[] = [
  {
    id: 'scenario1',
    question: 'What if we double production next quarter?',
    scenario: 'Scenario 1',
    description: 'Double production capacity',
    tag: 'High capital investment + moderate margins — profit impact +22%',
    costImpact: 880000
  },
  {
    id: 'scenario2',
    question: 'What if we delay procurement and adjust supplier credit terms?',
    scenario: 'Scenario 2',
    description: 'Delayed procurement + adjusted supplier credit',
    tag: 'Delayed procurement + supplier credit terms adjusted — cost exposure ↓12%',
    costImpact: -450000
  },
  {
    id: 'scenario3',
    question: 'What if we expand to two new MENA markets?',
    scenario: 'Scenario 3',
    description: 'MENA market expansion (2 countries)',
    tag: 'Market expansion + localization costs — revenue potential +35%, 18-month ROI',
    costImpact: 1200000
  }
];

export default function Strategy() {
  const { speakAsPersona } = usePersona();
  const { isSpeaking } = useVoiceContext();
  const { toast } = useToast();
  const [selectedScenario, setSelectedScenario] = useState<ScenarioOption | null>(null);
  const [showImpactLayers, setShowImpactLayers] = useState(false);
  const [impactLayers, setImpactLayers] = useState<ImpactLayer[]>([]);
  const [cashFlowData, setCashFlowData] = useState<any[]>([]);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [activeSpeakingScenario, setActiveSpeakingScenario] = useState<string | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [radarData, setRadarData] = useState<any[]>([]);
  const [marginData, setMarginData] = useState<any[]>([]);
  const [showCharts, setShowCharts] = useState(false);

  useEffect(() => {
    speakAsPersona(
      "ORBITAL Strategic Intelligence online — modeling future trade-offs.",
      undefined,
      { key: 'orbital-strategy-intro' }
    );
  }, [speakAsPersona]);

  const handleScenarioSelect = (scenario: ScenarioOption) => {
    // Prevent interaction if voice is already playing
    if (isSpeaking) {
      toast({
        title: "Please wait",
        description: "Current scenario analysis in progress.",
        variant: "destructive"
      });
      return;
    }

    setSelectedScenario(scenario);
    setShowImpactLayers(true);
    setShowCharts(false);
    setActiveSpeakingScenario(scenario.id);
    
    // Delay chart animation
    setTimeout(() => setShowCharts(true), 300);
    
    // Generate impact layers
    const layers: ImpactLayer[] = [
      {
        timeframe: '0-3 months (Immediate Impact)',
        description: 'Initial capital deployment and operational setup',
        metrics: [
          { label: 'Cash Outflow', value: `$${(Math.abs(scenario.costImpact) / 3).toLocaleString()}` },
          { label: 'Team Allocation', value: '12 FTEs' },
          { label: 'Timeline Risk', value: scenario.id === 'scenario1' ? 'High' : 'Medium' }
        ]
      },
      {
        timeframe: '3-9 months (Mid-term Effect)',
        description: 'Operational stabilization and early returns',
        metrics: [
          { label: 'Revenue Impact', value: scenario.id === 'scenario3' ? '+$2.1M' : scenario.id === 'scenario1' ? '+$1.8M' : '+$420K' },
          { label: 'Margin Shift', value: scenario.id === 'scenario2' ? '+4.2%' : '-1.8%' },
          { label: 'Market Position', value: 'Strengthened' }
        ]
      },
      {
        timeframe: '12+ months (Long-term Outcome)',
        description: 'Full implementation and strategic positioning',
        metrics: [
          { label: 'Annual Revenue Gain', value: scenario.id === 'scenario3' ? '+$8.4M' : scenario.id === 'scenario1' ? '+$5.2M' : '+$1.2M' },
          { label: 'ROI', value: scenario.id === 'scenario3' ? '18 mo' : scenario.id === 'scenario1' ? '14 mo' : '6 mo' },
          { label: 'Strategic Value', value: 'High' }
        ]
      }
    ];
    setImpactLayers(layers);
    
    // Generate radar chart data
    const radar = [
      {
        metric: 'Timeline Risk',
        value: scenario.id === 'scenario1' ? 85 : scenario.id === 'scenario2' ? 45 : 70,
        fullMark: 100
      },
      {
        metric: 'ROI',
        value: scenario.id === 'scenario3' ? 95 : scenario.id === 'scenario1' ? 82 : 65,
        fullMark: 100
      },
      {
        metric: 'Margin Stability',
        value: scenario.id === 'scenario2' ? 92 : scenario.id === 'scenario1' ? 68 : 75,
        fullMark: 100
      },
      {
        metric: 'Strategic Value',
        value: scenario.id === 'scenario3' ? 90 : scenario.id === 'scenario1' ? 78 : 60,
        fullMark: 100
      },
      {
        metric: 'Market Position',
        value: scenario.id === 'scenario3' ? 88 : scenario.id === 'scenario1' ? 80 : 55,
        fullMark: 100
      }
    ];
    setRadarData(radar);
    
    // Generate margin over time data
    const margins = [
      { month: 'M0', margin: 22 },
      { month: 'M3', margin: scenario.id === 'scenario2' ? 26 : scenario.id === 'scenario1' ? 20 : 18 },
      { month: 'M6', margin: scenario.id === 'scenario2' ? 28 : scenario.id === 'scenario1' ? 24 : 25 },
      { month: 'M9', margin: scenario.id === 'scenario2' ? 29 : scenario.id === 'scenario1' ? 28 : 30 },
      { month: 'M12', margin: scenario.id === 'scenario2' ? 30 : scenario.id === 'scenario1' ? 32 : 35 }
    ];
    setMarginData(margins);
    
    // Generate cash flow projections
    const projections = [
      { month: 'M1', flow: scenario.costImpact > 0 ? -200 : 150 },
      { month: 'M2', flow: scenario.costImpact > 0 ? -150 : 200 },
      { month: 'M3', flow: scenario.costImpact > 0 ? -100 : 250 },
      { month: 'M4', flow: scenario.costImpact > 0 ? 50 : 300 },
      { month: 'M5', flow: scenario.costImpact > 0 ? 150 : 350 },
      { month: 'M6', flow: scenario.costImpact > 0 ? 250 : 400 }
    ];
    setCashFlowData(projections);
    
    // AI Voice
    const impactAmount = Math.abs(scenario.costImpact);
    const impactPrefix = scenario.costImpact > 0 ? "plus" : "minus";
    const formattedImpact = `Projected impact: ${impactPrefix} ${impactAmount.toLocaleString()} dollars.`;
    
    const voiceText = `${scenario.scenario} activated.|${scenario.question}|${scenario.tag}|${formattedImpact}`;
    
    speakAsPersona(voiceText, 'lyra', {
      onEnd: () => {
        setActiveSpeakingScenario(null);
      }
    });
    toast({
      title: "Analyzing Scenario",
      description: `Running analysis for ${scenario.scenario}`
    });
  };

  const handleActionClick = () => {
    if (isSpeaking) {
      toast({
        title: "Please wait",
        description: "Current scenario analysis in progress.",
        variant: "destructive"
      });
      return;
    }
    setSelectedAction('financial-impact');
    speakAsPersona('Rendering 6-month cash flow projection with profitability sensitivity analysis.', 'lyra');
    toast({
      title: "Generating Report",
      description: "Rendering 6-month cash flow projection with profitability sensitivity analysis."
    });
    setTimeout(() => setSelectedAction(null), 3000);
  };

  const handlePremiumFeatureClick = () => {
    setShowPremiumModal(true);
  };

  return (
    <div className="space-y-6 animate-fade-in p-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">AI What-If Advisor</h1>
          <p className="text-muted-foreground">ORBITAL • Strategic Scenario Modeling</p>
        </div>
        <RealTimeIndicator label="ORBITAL Active" />
      </div>

      {/* Dynamic Scenario Tiles */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Strategic Scenarios — Model Future Trade-Offs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TooltipProvider>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {scenarioOptions.map((scenario) => {
                const isActiveSpeaking = activeSpeakingScenario === scenario.id;
                const isDisabled = isSpeaking && !isActiveSpeaking;
                
                return (
                  <Tooltip key={scenario.id}>
                    <TooltipTrigger asChild>
                      <div
                        className={`p-4 border rounded-lg transition-all duration-400 ${
                          isDisabled 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'cursor-pointer hover:border-primary hover:bg-primary/5'
                        } ${
                          selectedScenario?.id === scenario.id ? 'border-primary bg-primary/10' : 'border-border'
                        } ${
                          isActiveSpeaking 
                            ? 'border-[#3A7BFF] shadow-[0_0_20px_rgba(58,123,255,0.4)] animate-pulse' 
                            : ''
                        }`}
                        onClick={() => handleScenarioSelect(scenario)}
                      >
                        <div className="mb-3">
                          <Badge 
                            className="text-xs font-semibold px-2.5 py-1 bg-[#1D2633] border-[#3A7BFF] text-white shadow-[0_0_8px_rgba(58,123,255,0.3)]"
                          >
                            {scenario.scenario}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-sm mb-2">{scenario.question}</h3>
                        <div className="space-y-2">
                          <p className="text-xs text-muted-foreground">{scenario.tag}</p>
                          <div className="flex items-center gap-1 text-xs">
                            <DollarSign className={`h-3 w-3 ${scenario.costImpact > 0 ? 'text-warning' : 'text-success'}`} />
                            <span className={scenario.costImpact > 0 ? 'text-warning' : 'text-success'}>
                              {scenario.costImpact > 0 ? '+' : ''}{(scenario.costImpact / 1000).toFixed(0)}K impact
                            </span>
                          </div>
                        </div>
                      </div>
                    </TooltipTrigger>
                    {isDisabled && (
                      <TooltipContent>
                        <p>Voice playback in progress — please wait.</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                );
              })}
            </div>
          </TooltipProvider>
        </CardContent>
      </Card>

      {/* 3-Layer Impact Output */}
      {showImpactLayers && selectedScenario && (
        <div className="space-y-4 animate-fade-in">
          <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-accent/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-accent" />
                {selectedScenario.scenario} — Scenario Impact Visualization
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                AI models predict impact evolution across operational timelines.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profit Trajectory Bar */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground">Profit Trajectory (Time-Phased Impact)</h4>
                <div className="relative h-12 bg-card border border-border rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex">
                    <div 
                      className={`flex items-center justify-center text-xs font-bold text-white bg-orange-500 transition-all duration-1000 ease-out ${showCharts ? 'w-[25%]' : 'w-0'}`}
                    >
                      {showCharts && '0-3mo: -$400K'}
                    </div>
                    <div 
                      className={`flex items-center justify-center text-xs font-bold text-white bg-yellow-500 transition-all duration-1000 ease-out delay-300 ${showCharts ? 'w-[35%]' : 'w-0'}`}
                    >
                      {showCharts && '3-9mo: +$2.1M'}
                    </div>
                    <div 
                      className={`flex items-center justify-center text-xs font-bold text-white bg-green-500 transition-all duration-1000 ease-out delay-500 ${showCharts ? 'w-[40%]' : 'w-0'}`}
                    >
                      {showCharts && '12+mo: +$8.4M'}
                    </div>
                  </div>
                </div>
                <p className="text-sm font-bold text-primary">
                  Net ROI (18 months): <span className="text-success">+$10.1M</span> <span className="text-muted-foreground text-xs">(24× return)</span>
                </p>
              </div>

              {/* Market Position Radar */}
              <div className={`space-y-3 transition-opacity duration-500 ${showCharts ? 'opacity-100' : 'opacity-0'}`}>
                <h4 className="text-sm font-semibold text-foreground">Market Position Radar</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis 
                      dataKey="metric" 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                    />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <Radar 
                      name={selectedScenario.scenario} 
                      dataKey="value" 
                      stroke={selectedScenario.id === 'scenario1' ? '#3b82f6' : selectedScenario.id === 'scenario2' ? '#22c55e' : '#eab308'}
                      fill={selectedScenario.id === 'scenario1' ? '#3b82f6' : selectedScenario.id === 'scenario2' ? '#22c55e' : '#eab308'}
                      fillOpacity={0.3}
                    />
                    <Legend 
                      wrapperStyle={{ fontSize: '12px' }}
                      iconType="circle"
                    />
                    <RechartsTooltip
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        fontSize: '12px'
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Margin vs. Time Line Graph */}
              <div className={`space-y-3 transition-opacity duration-500 delay-200 ${showCharts ? 'opacity-100' : 'opacity-0'}`}>
                <h4 className="text-sm font-semibold text-foreground">Margin % Over Time</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={marginData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} domain={[0, 40]} />
                    <RechartsTooltip
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        fontSize: '12px'
                      }}
                      formatter={(value) => [`${value}%`, 'Margin']}
                      labelFormatter={(label) => `Margin trend and cash-flow inflection point: ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="margin" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ r: 5, fill: 'hsl(var(--primary))' }}
                      animationDuration={1500}
                      animationEasing="ease-in-out"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Textual metrics as secondary context */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-border">
                {impactLayers.map((layer, idx) => (
                  <div key={idx} className="p-3 bg-card/50 border border-border/50 rounded-lg">
                    <h5 className="text-[10px] font-semibold text-accent mb-1">{layer.timeframe}</h5>
                    <p className="text-[9px] text-muted-foreground mb-2">{layer.description}</p>
                    <div className="space-y-1">
                      {layer.metrics.map((metric, mIdx) => (
                        <div key={mIdx} className="flex justify-between text-[10px]">
                          <span className="text-muted-foreground">{metric.label}:</span>
                          <span className="font-semibold text-foreground">{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Clickable Follow-Up Actions */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-success" />
                Actionable Follow-Ups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Button
                  variant="outline"
                  className="gap-2 justify-start h-auto py-3"
                  onClick={handleActionClick}
                  disabled={selectedAction === 'financial-impact' || isSpeaking}
                >
                  <BarChart3 className="h-4 w-4" />
                  <span className="text-xs">Financial Impact (6mo)</span>
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 justify-start h-auto py-3"
                  onClick={handlePremiumFeatureClick}
                  disabled={isSpeaking}
                >
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-xs">Alternative Suppliers</span>
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 justify-start h-auto py-3"
                  onClick={handlePremiumFeatureClick}
                  disabled={isSpeaking}
                >
                  <Calculator className="h-4 w-4" />
                  <span className="text-xs">Cash-Flow Analysis</span>
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 justify-start h-auto py-3"
                  onClick={handlePremiumFeatureClick}
                  disabled={isSpeaking}
                >
                  <FileText className="h-4 w-4" />
                  <span className="text-xs">Contract Terms</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Cash Flow Chart */}
          {cashFlowData.length > 0 && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  6-Month Cash Flow Projection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <RechartsTooltip
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    />
                    <Line type="monotone" dataKey="flow" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* AI Impact Insight */}
      <div className="p-6 bg-gradient-to-r from-primary/10 via-accent/10 to-success/10 border border-primary/30 rounded-lg text-center">
        <p className="text-lg font-semibold text-primary mb-2">🧩 AI Impact Insight</p>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          Dependency on staff decreased by ≈ <span className="text-success font-bold">63 staff hours per week</span>; 
          decision clarity ↑ <span className="text-primary font-bold">26%</span>
        </p>
      </div>

      {/* Premium Feature Modal */}
      <PremiumFeatureModal open={showPremiumModal} onOpenChange={setShowPremiumModal} />
    </div>
  );
}
