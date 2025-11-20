import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Target, AlertCircle, CheckCircle2, X, DollarSign, Users, Activity, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { InteractiveMetricCard } from "@/components/InteractiveMetricCard";
import { CEOPrompt } from "@/components/CEOPrompt";
import { ClickableInsightCard } from "@/components/ClickableInsightCard";
import { RealTimeIndicator } from "@/components/RealTimeIndicator";
import { useVoiceContext } from "@/contexts/VoiceContext";

const metrics = [
  {
    title: "Revenue Growth",
    value: "$2.4M",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-accent",
  },
  {
    title: "Active Initiatives",
    value: "24",
    change: "+3 this quarter",
    trend: "up",
    icon: Target,
    color: "text-cyan",
  },
  {
    title: "Team Engagement",
    value: "87%",
    change: "-2.3%",
    trend: "down",
    icon: Users,
    color: "text-primary",
  },
  {
    title: "Operational Efficiency",
    value: "94%",
    change: "+5.1%",
    trend: "up",
    icon: Activity,
    color: "text-success",
  },
];

const initiatives = [
  { name: "Digital Transformation Initiative", status: "on-track", progress: 78, priority: "high" },
  { name: "Market Expansion - MENA Region", status: "at-risk", progress: 45, priority: "high" },
  { name: "Supply Chain Optimization", status: "on-track", progress: 92, priority: "medium" },
  { name: "Talent Acquisition Program", status: "on-track", progress: 65, priority: "medium" },
  { name: "Sustainability Framework", status: "delayed", progress: 23, priority: "low" },
];

const alerts = [
  { message: "Q4 review meeting scheduled for Nov 15", type: "info" },
  { message: "2 governance items require attention", type: "warning" },
  { message: "Market expansion initiative behind schedule", type: "error" },
];

export default function Dashboard() {
  const { personalization } = usePersonalization();
  const { speak } = useVoiceContext();
  const [showInitiativeSummary, setShowInitiativeSummary] = useState(false);
  const [showAlertSummary, setShowAlertSummary] = useState(false);
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState<number[]>([]);
  const [showPrompt, setShowPrompt] = useState(true);
  const [liveMetrics, setLiveMetrics] = useState({
    revenue: 2.4,
    initiatives: 24,
    engagement: 87,
    efficiency: 94
  });

  useEffect(() => {
    speak("Executive Command Center online. Real-time intelligence ready.");
    
    // Simulate live data updates
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        revenue: +(prev.revenue + (Math.random() - 0.5) * 0.05).toFixed(1),
        initiatives: Math.round(prev.initiatives + (Math.random() - 0.5)),
        engagement: Math.min(100, Math.max(75, Math.round(prev.engagement + (Math.random() - 0.5) * 2))),
        efficiency: Math.min(100, Math.max(85, Math.round(prev.efficiency + (Math.random() - 0.5) * 2)))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [speak]);

  const acknowledgeAlert = (index: number) => {
    setAcknowledgedAlerts(prev => [...prev, index]);
  };

  const metricsData = [
    {
      title: "Revenue Growth",
      value: `$${liveMetrics.revenue}M`,
      change: 12.5,
      trend: "up" as const,
      icon: DollarSign,
      color: "text-accent",
      insightData: {
        title: "Revenue Growth",
        details: "Revenue growth is driven by MENA expansion and digital transformation initiatives.",
        chart: [
          { label: "MENA Region", value: 60, color: "text-accent" },
          { label: "Digital Channels", value: 25, color: "text-cyan" },
          { label: "North America", value: 15, color: "text-primary" },
        ],
        aiSummary: "MENA region shows exceptional growth at +60%, driven by infrastructure projects. Digital channels contribute +25% through e-commerce expansion.",
        recommendations: [
          "Increase MENA marketing budget by 15% to capitalize on momentum",
          "Expand digital sales team to handle growing demand",
          "Establish regional office in UAE by Q2"
        ]
      }
    },
    {
      title: "Active Initiatives",
      value: `${liveMetrics.initiatives}`,
      change: 3,
      trend: "up" as const,
      icon: Target,
      color: "text-cyan",
      insightData: {
        title: "Active Initiatives",
        details: "Strategic initiatives tracking across digital transformation, market expansion, and operational excellence.",
        aiSummary: "Top performers are Supply Chain Optimization (92%) and Digital Transformation (78%). MENA Expansion requires immediate attention due to resource constraints.",
        recommendations: [
          "Reallocate 2 senior engineers to MENA expansion project",
          "Extend Sustainability Framework timeline by 30 days",
          "Increase budget for Digital Transformation by $50K"
        ]
      }
    },
    {
      title: "Team Engagement",
      value: `${liveMetrics.engagement}%`,
      change: -2.3,
      trend: "down" as const,
      icon: Users,
      color: "text-primary",
      insightData: {
        title: "Team Engagement",
        details: "Employee satisfaction and engagement metrics across all departments.",
        aiSummary: "Operations team shows minor decline due to Q4 workload pressure. HR department recovering well after Q3 restructuring. Sales and Engineering maintain strong levels.",
        recommendations: [
          "Schedule town hall with Operations team this week",
          "Review workload distribution in Operations",
          "Consider hiring 2 additional ops specialists"
        ]
      }
    },
    {
      title: "Operational Efficiency",
      value: `${liveMetrics.efficiency}%`,
      change: 5.1,
      trend: "up" as const,
      icon: Activity,
      color: "text-success",
      insightData: {
        title: "Operational Efficiency",
        details: "System uptime, automation rate, and process improvement metrics.",
        aiSummary: "System uptime at 98.5% exceeds industry benchmark. Automation initiatives deliver 76% coverage with 15% improvement YoY.",
        recommendations: [
          "Expand automation to customer support workflows",
          "Document best practices from high-performing teams",
          "Set target of 98% efficiency for Q1"
        ]
      }
    },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        {personalization ? (
          <>
            <h1 className="text-3xl font-bold tracking-tight">
              Good morning, CEO {personalization.name} 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              ORBITAL systems are now active for {personalization.company}.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold tracking-tight">Executive Command Center</h1>
            <p className="text-muted-foreground mt-1">Real-time intelligence for executive decisions</p>
          </>
        )}
        
        {showPrompt && (
          <div className="mt-4">
            <CEOPrompt
              question="Would you like me to prioritize the most critical initiatives for your review?"
              onYes={() => {
                setShowPrompt(false);
                speak("Analyzing initiatives. Digital Transformation and MENA Expansion require your attention.");
              }}
              onNo={() => setShowPrompt(false)}
            />
          </div>
        )}
      </div>

      {/* Real-Time KPI Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Live Performance Metrics</h2>
          <RealTimeIndicator />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metricsData.map((metric) => (
            <InteractiveMetricCard
              key={metric.title}
              {...metric}
              showRealTime={true}
            />
          ))}
        </div>
      </div>

      {/* AI-Generated Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ClickableInsightCard
          title="Priority Alert"
          summary="MENA expansion project is 23 days behind schedule. Recommend reallocating 2 senior resources from Sustainability Framework."
          badge="Urgent"
          badgeVariant="destructive"
          icon={<AlertCircle />}
          detailedInsights={[
            "Current progress: 45% (Target: 68%)",
            "Resource constraint identified in engineering team",
            "Delayed vendor approvals adding 14 days to timeline"
          ]}
          recommendations={[
            "Reassign 2 senior engineers from lower-priority projects",
            "Fast-track vendor approval process with legal team",
            "Consider hiring 1 contract specialist for 3-month period"
          ]}
          nextSteps={[
            "Schedule resource reallocation meeting tomorrow",
            "Contact legal for vendor approval acceleration",
            "Review Q1 hiring budget for contract position"
          ]}
        />
        <ClickableInsightCard
          title="Opportunity Detected"
          summary="Digital channel revenue up 25% this quarter. AI recommends increasing digital marketing budget by $75K to capitalize on momentum."
          badge="Opportunity"
          badgeVariant="default"
          icon={<TrendingUp />}
          detailedInsights={[
            "E-commerce conversion rate improved from 2.1% to 3.8%",
            "Customer acquisition cost decreased 18%",
            "Average order value increased $23 (12% improvement)"
          ]}
          recommendations={[
            "Increase paid search budget by $45K",
            "Expand social media advertising by $30K",
            "Launch retargeting campaign for cart abandoners"
          ]}
          nextSteps={[
            "Get marketing budget approval from CFO",
            "Brief digital marketing team on expansion plan",
            "Set KPIs for increased spend (target: 35% growth)"
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Initiatives Section */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Active Strategic Initiatives
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <TooltipProvider>
              {initiatives.map((initiative, index) => (
                <div
                  key={initiative.name}
                  className="space-y-2 animate-fade-in hover:bg-muted/30 p-3 rounded-lg transition-all cursor-pointer"
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() => speak(`${initiative.name}: ${initiative.progress}% complete, priority ${initiative.priority}`)}
                >
                  <div className="flex items-center justify-between">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-2 cursor-help">
                          <span className="font-medium text-sm">{initiative.name}</span>
                          <Badge
                            variant={initiative.priority === "high" ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {initiative.priority}
                          </Badge>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs">
                        <p className="text-xs">
                          <strong>AI Analysis:</strong>{" "}
                          {initiative.status === "at-risk"
                            ? "Slight delay due to resource bottlenecks. Recommend increasing team allocation."
                            : initiative.status === "delayed"
                            ? "Critical delays detected. Requires immediate executive intervention."
                            : "On track with healthy progress. Minimal intervention required."}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                    <span className="text-xs text-muted-foreground">{initiative.progress}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <Progress
                      value={initiative.progress}
                      className={`h-2 transition-all duration-1000 ${
                        initiative.status === "on-track"
                          ? "[&>div]:bg-success"
                          : initiative.status === "at-risk"
                          ? "[&>div]:bg-warning"
                          : "[&>div]:bg-danger"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </TooltipProvider>
          </CardContent>
        </Card>

        {/* Live Alerts Section */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-warning" />
                Live Alerts
              </div>
              <RealTimeIndicator label="Monitoring" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-96 overflow-y-auto">
            {alerts.map((alert, index) => {
              const isAcknowledged = acknowledgedAlerts.includes(index);
              if (isAcknowledged) return null;

              return (
                <div
                  key={index}
                  className={`group relative flex items-start gap-2 p-3 rounded-lg transition-all animate-fade-in hover:shadow-glow cursor-pointer ${
                    alert.type === "error"
                      ? "bg-danger/10 border border-danger/20 animate-pulse"
                      : alert.type === "warning"
                      ? "bg-warning/10 border border-warning/20"
                      : "bg-primary/10 border border-primary/20"
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                  onClick={() => speak(alert.message)}
                >
                  {alert.type === "error" ? (
                    <AlertCircle className="h-4 w-4 text-danger mt-0.5 animate-pulse" />
                  ) : alert.type === "warning" ? (
                    <AlertCircle className="h-4 w-4 text-warning mt-0.5" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                  )}
                  <p className="text-xs flex-1">{alert.message}</p>
                  {index < 2 && (
                    <Badge variant="outline" className="text-[10px] px-1 py-0 bg-accent/20 border-accent/40">
                      New
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      acknowledgeAlert(index);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
