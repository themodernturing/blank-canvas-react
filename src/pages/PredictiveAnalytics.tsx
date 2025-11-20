import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Sparkles, AlertTriangle, Target, BarChart3, Activity, DollarSign, Gauge, ChevronRight, Brain, Smile, Users, TrendingUpIcon, Lightbulb, Newspaper, Lock, Zap, Radio, BarChart } from "lucide-react";
import { usePersona } from "@/contexts/PersonaContext";
import { RealTimeIndicator } from "@/components/RealTimeIndicator";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { toast } from "@/hooks/use-toast";
import { useVoiceContext } from "@/contexts/VoiceContext";

interface ForecastMetric {
  name: string;
  icon: any;
  current: number;
  forecast: number;
  unit: string;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  variance: string;
  status: 'on-track' | 'watch' | 'deviation';
}

interface Scenario {
  id: number;
  title: string;
  summary: string;
  impact: string;
  impactValue: string;
  type: 'positive' | 'neutral' | 'negative';
  narrative?: string;
}

export default function PredictiveAnalytics() {
  const { speakAsPersona } = usePersona();
  const { speak, isSpeaking } = useVoiceContext();
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [showDeepDive, setShowDeepDive] = useState(false);
  const [activeCardVoice, setActiveCardVoice] = useState<string | null>(null);

  const forecastMetrics: ForecastMetric[] = [
    {
      name: "Revenue",
      icon: DollarSign,
      current: 4200000,
      forecast: 4662000,
      unit: "$",
      confidence: 89,
      trend: 'up',
      variance: "Variance primarily driven by MENA expansion momentum (+18%) and improved conversion rates. Expected acceleration in Q2.",
      status: 'on-track'
    },
    {
      name: "Operational Efficiency",
      icon: Activity,
      current: 88,
      forecast: 91,
      unit: "%",
      confidence: 86,
      trend: 'up',
      variance: "Efficiency gains from automation rollout and process optimization. Minor drag from onboarding costs offset by productivity lift.",
      status: 'on-track'
    },
    {
      name: "Market Share",
      icon: Target,
      current: 23.4,
      forecast: 25.1,
      unit: "%",
      confidence: 81,
      trend: 'up',
      variance: "Competitive landscape shift favoring our positioning. Regional expansion creating new foothold. Monitor competitor response.",
      status: 'watch'
    },
    {
      name: "Customer Satisfaction",
      icon: Sparkles,
      current: 8.2,
      forecast: 8.5,
      unit: "/10",
      confidence: 92,
      trend: 'up',
      variance: "Service improvements and response time reduction driving satisfaction lift. NPS scores trending upward consistently.",
      status: 'on-track'
    }
  ];

  const strategicScenarios: Scenario[] = [
    {
      id: 1,
      title: "Double production capacity next quarter",
      summary: "Accelerate manufacturing output by 100% to capture market demand",
      impact: "+$880K profit",
      impactValue: "+22%",
      type: 'positive',
      narrative: "Doubling production improves market presence but stresses working capital by 11%. AI recommends partial scale-up (65%) for optimal margin preservation while capturing demand surge. Risk: supply chain strain in weeks 6-8."
    },
    {
      id: 2,
      title: "Delay procurement & adjust credit terms",
      summary: "Extend payment cycles and renegotiate supplier agreements",
      impact: "−$450K cost exposure",
      impactValue: "−8%",
      type: 'negative',
      narrative: "Credit term extension reduces immediate cash pressure but damages supplier relationships and increases future pricing risk. Alternative: Stagger procurement across 3 suppliers to maintain flexibility without straining single relationships."
    },
    {
      id: 3,
      title: "Expand to two new MENA markets",
      summary: "Geographic expansion into Saudi Arabia and UAE segments",
      impact: "+$1.2M revenue",
      impactValue: "18-month ROI",
      type: 'positive',
      narrative: "MENA expansion taps high-growth segments with favorable regulatory environment. Initial investment $420K, break-even month 11. Cultural adaptation and local partnerships critical. Faris (Arabic Intelligence) flagged strong opportunity alignment."
    }
  ];

  const forecastData = [
    { month: 'Jan', actual: 3800, predicted: 3750, confidence: 88 },
    { month: 'Feb', actual: 3950, predicted: 3900, confidence: 89 },
    { month: 'Mar', actual: 4200, predicted: 4150, confidence: 87 },
    { month: 'Apr', actual: null, predicted: 4380, confidence: 86 },
    { month: 'May', actual: null, predicted: 4520, confidence: 84 },
    { month: 'Jun', actual: null, predicted: 4662, confidence: 82 },
  ];

  const [sentimentLoaded, setSentimentLoaded] = useState(false);

  useEffect(() => {
    speakAsPersona(
      "ORBITAL Predictive Intelligence online — projecting trends and scenarios ahead.",
      "nova",
      { key: 'orbital-predictive-intro' }
    );
  }, [speakAsPersona]);


  const handleMetricClick = (metricName: string, variance: string) => {
    // Prevent clicks if another card is speaking
    if (activeCardVoice && activeCardVoice !== metricName) {
      return;
    }
    
    setSelectedMetric(metricName);
    setActiveCardVoice(metricName);
    
    toast({
      title: metricName,
      description: variance,
    });
    
    speakAsPersona(`${metricName} variance analysis: ${variance}`, "nova", {
      onEnd: () => setActiveCardVoice(null)
    });
  };

  const handlePremiumFeatureClick = () => {
    toast({
      title: "🔒 Premium Feature",
      description: "Available in full deployed version.",
    });
  };

  const handleScenarioClick = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    if (scenario.narrative) {
      toast({
        title: scenario.title,
        description: scenario.narrative,
      });
      speakAsPersona(scenario.narrative, "nova");
    }
  };

  const getStatusColor = (status: 'on-track' | 'watch' | 'deviation') => {
    switch (status) {
      case 'on-track': return 'text-success border-success/30 bg-success/10';
      case 'watch': return 'text-warning border-warning/30 bg-warning/10';
      case 'deviation': return 'text-destructive border-destructive/30 bg-destructive/10';
    }
  };

  const getImpactColor = (type: 'positive' | 'neutral' | 'negative') => {
    switch (type) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-destructive';
      case 'neutral': return 'text-muted-foreground';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-6 animate-fade-in p-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            🔮 Predictive Intelligence Hub
          </h1>
          <p className="text-muted-foreground">
            AI-driven forecasts across revenue, operational efficiency, market growth, and customer sentiment — empowering strategic foresight and business optimization.
          </p>
        </div>
        <RealTimeIndicator label="ORBITAL Active • Models Updated 2h ago" />
      </div>

      <p className="text-sm font-medium text-blue-400/80">
        Click any card to hear AI-driven forecasts and detailed performance insights.
      </p>

      {/* Model Forecast Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {forecastMetrics.map((metric) => {
          const Icon = metric.icon;
          const delta = ((metric.forecast - metric.current) / metric.current * 100).toFixed(1);
          const isPositive = metric.forecast > metric.current;
          const isActive = activeCardVoice === metric.name;
          const isDisabled = activeCardVoice && activeCardVoice !== metric.name;
          
          return (
            <Card
              key={metric.name}
              className={`cursor-pointer transition-all duration-200 border ${getStatusColor(metric.status)} ${
                isActive ? 'ring-2 ring-primary shadow-lg shadow-primary/50 animate-pulse' : ''
              } ${isDisabled ? 'opacity-60 pointer-events-none' : 'hover:shadow-lg'}`}
              onClick={() => handleMetricClick(metric.name, metric.variance)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {metric.name}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {metric.confidence}% confidence
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Current</p>
                    <p className="text-2xl font-bold text-foreground">
                      {metric.unit === '$' ? formatCurrency(metric.current) : `${metric.current}${metric.unit}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Forecast</p>
                    <p className="text-lg font-semibold text-primary">
                      {metric.unit === '$' ? formatCurrency(metric.forecast) : `${metric.forecast}${metric.unit}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isPositive ? (
                    <TrendingUp className="h-4 w-4 text-success" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-destructive" />
                  )}
                  <span className={`text-sm font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}>
                    {isPositive ? '+' : ''}{delta}%
                  </span>
                  <span className="text-xs text-muted-foreground">vs current</span>
                </div>

                <Progress value={metric.confidence} className="h-1.5" />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Sentiment Intelligence Panel - Executive Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2 mb-2">
                <Brain className="h-5 w-5 text-accent" />
                🧠 Executive Multidimensional Sentiment Analysis
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                AI interpretation of internal, customer, market, and public sentiment streams.
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <p className="text-xs text-blue-400">Click here for the AI Sentiment Brief.</p>
              <Button
                onClick={() => {
                  if (!isSpeaking && !activeCardVoice) {
                    speak("Sentiment briefing: workforce morale steady, customer optimism improving, media perception positive.");
                  }
                }}
                disabled={isSpeaking || !!activeCardVoice}
                className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 relative overflow-hidden group disabled:opacity-50"
                size="sm"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 animate-pulse"></span>
                🎙️ AI Sentiment Briefing
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {isSpeaking && (
            <div className="mb-4 text-sm text-muted-foreground italic animate-fade-in">
              AI summarizing current sentiment signals…
            </div>
          )}
          
          {/* Summary Line */}
          <div className="pb-4 border-b border-border">
            <p className="text-xl font-bold text-foreground animate-pulse">
              Overall Sentiment Index: <span className="text-success">78%</span> — stable across departments.
            </p>
          </div>

          {/* Executive Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Domain</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Emoji/Visual</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Meaning</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Current Sentiment</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground w-1/3">Example AI Insight</th>
                </tr>
              </thead>
              <tbody>
                {/* Employee Morale */}
                <tr className="border-b border-border/50 bg-gradient-to-r from-background to-muted/10">
                  <td className="py-4 px-4 text-sm text-foreground">🧑‍💼 Employee Morale</td>
                  <td className="py-4 px-4 text-center text-lg">😊😀😐☹️</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">Internal culture pulse</td>
                  <td className="py-4 px-4 text-center text-sm font-semibold text-warning">78% steady</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">"Employee sentiment steady — morale holding post-shift change."</td>
                </tr>

                {/* Customer Pulse */}
                <tr className="border-b border-border/50">
                  <td className="py-4 px-4 text-sm text-foreground">🗣️ Customer Pulse</td>
                  <td className="py-4 px-4 text-center text-lg">❤️‍🔥❤️🙂😐💔</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">Client sentiment & advocacy</td>
                  <td className="py-4 px-4 text-center text-sm font-semibold text-success">84% positive</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">"Customer confidence improving — slight dip in post-delivery feedback."</td>
                </tr>

                {/* Market Mood */}
                <tr className="border-b border-border/50 bg-gradient-to-r from-background to-muted/10">
                  <td className="py-4 px-4 text-sm text-foreground">🌍 Market Mood</td>
                  <td className="py-4 px-4 text-center text-lg">🌤️☀️⛅🌧️🌩️</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">Investor and competitor tone</td>
                  <td className="py-4 px-4 text-center text-sm font-semibold text-warning">71% neutral</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">"Market sentiment neutral — expected lift with upcoming product wave."</td>
                </tr>

                {/* Innovation Confidence */}
                <tr className="border-b border-border/50">
                  <td className="py-4 px-4 text-sm text-foreground">🧠 Innovation Confidence</td>
                  <td className="py-4 px-4 text-center text-lg">🚀📈🧩</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">Internal R&D optimism</td>
                  <td className="py-4 px-4 text-center text-sm font-semibold text-success">82% strong</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">"Innovation outlook steady — teams confident in new prototype phase."</td>
                </tr>

                {/* Media & Public Perception */}
                <tr className="bg-gradient-to-r from-background to-muted/10">
                  <td className="py-4 px-4 text-sm text-foreground">📰 Media & Public Perception</td>
                  <td className="py-4 px-4 text-center text-lg">🗞️📣⭐⚡</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">Public image sentiment</td>
                  <td className="py-4 px-4 text-center text-sm font-semibold text-success">76% stable</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">"Media perception positive — strong coverage on leadership visibility."</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Optional Metadata */}
          <div className="mt-6 pt-4 border-t border-border flex gap-6 text-xs text-muted-foreground">
            <p>Last sentiment refresh: 2h ago</p>
            <p>Confidence range: 82%–91%</p>
          </div>
        </CardContent>
      </Card>

      {/* Premium Feature Placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workforce Energy Tracker */}
        <Card 
          className="bg-gradient-card border-border shadow-card cursor-pointer hover:border-accent/50 transition-all relative overflow-hidden"
          onClick={handlePremiumFeatureClick}
        >
          <div className="absolute top-4 right-4">
            <Lock className="h-5 w-5 text-yellow-600" />
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-muted-foreground">
              <Zap className="h-5 w-5 text-accent" />
              Workforce Energy Tracker
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative w-full aspect-square max-w-[180px] mx-auto">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Energy wave visualization */}
                <path 
                  d="M 20 100 Q 60 60, 100 100 T 180 100" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  className="text-accent"
                >
                  <animate attributeName="d" 
                    values="M 20 100 Q 60 60, 100 100 T 180 100;M 20 100 Q 60 140, 100 100 T 180 100;M 20 100 Q 60 60, 100 100 T 180 100" 
                    dur="3s" 
                    repeatCount="indefinite" 
                  />
                </path>
                <path 
                  d="M 20 120 Q 60 80, 100 120 T 180 120" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  className="text-success opacity-60"
                >
                  <animate attributeName="d" 
                    values="M 20 120 Q 60 80, 100 120 T 180 120;M 20 120 Q 60 160, 100 120 T 180 120;M 20 120 Q 60 80, 100 120 T 180 120" 
                    dur="2.5s" 
                    repeatCount="indefinite" 
                  />
                </path>
              </svg>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Real-time team productivity and engagement energy levels across departments.
            </p>
          </CardContent>
        </Card>

        {/* Market Reaction Radar */}
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
              Market Reaction Radar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative w-full aspect-square max-w-[180px] mx-auto">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Radar sweep */}
                <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1" className="text-border/40" />
                <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="1" className="text-border/40" />
                <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="1" className="text-border/40" />
                <line x1="100" y1="100" x2="100" y2="30" stroke="currentColor" strokeWidth="2" className="text-accent">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 100 100"
                    to="360 100 100"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </line>
                {/* Blips */}
                <circle cx="130" cy="70" r="4" className="fill-warning">
                  <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="85" cy="120" r="3" className="fill-primary">
                  <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Monitor live market reactions to company announcements and competitive moves.
            </p>
          </CardContent>
        </Card>

        {/* Reputation Timeline */}
        <Card 
          className="bg-gradient-card border-border shadow-card cursor-pointer hover:border-accent/50 transition-all relative overflow-hidden"
          onClick={handlePremiumFeatureClick}
        >
          <div className="absolute top-4 right-4">
            <Lock className="h-5 w-5 text-yellow-600" />
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-muted-foreground">
              <BarChart className="h-5 w-5 text-accent" />
              Reputation Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative w-full aspect-[2/1] max-w-[240px] mx-auto">
              <svg viewBox="0 0 240 120" className="w-full h-full">
                {/* Timeline bars */}
                <rect x="20" y="80" width="15" height="30" className="fill-success/60" />
                <rect x="50" y="70" width="15" height="40" className="fill-success/70" />
                <rect x="80" y="60" width="15" height="50" className="fill-primary/60" />
                <rect x="110" y="55" width="15" height="55" className="fill-primary/70" />
                <rect x="140" y="50" width="15" height="60" className="fill-accent/60" />
                <rect x="170" y="45" width="15" height="65" className="fill-accent/70" />
                <rect x="200" y="40" width="15" height="70" className="fill-success/80" />
                {/* Baseline */}
                <line x1="10" y1="110" x2="230" y2="110" stroke="currentColor" strokeWidth="1" className="text-border/40" />
              </svg>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Historical brand reputation tracking with sentiment trend analysis over time.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI Executive Commentary */}
      <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-success/10 border-primary/30">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground mb-2">🧠 AI Executive Commentary</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sentiment trends remain positive across all measured dimensions. Workforce morale stable with no warning signals. 
                Customer optimism rising as service improvements take effect. Market sentiment cautiously positive with innovation 
                confidence strong at 82%. Media perception remains favorable with consistent positive coverage. Overall sentiment 
                index indicates <strong className="text-foreground">organizational health and stakeholder alignment</strong> are well-maintained.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
