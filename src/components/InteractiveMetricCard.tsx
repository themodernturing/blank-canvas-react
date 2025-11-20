import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Brain, TrendingUp, TrendingDown, Info } from "lucide-react";
import { useState } from "react";
import { LucideIcon } from "lucide-react";

interface InsightData {
  title: string;
  details: string;
  chart?: { label: string; value: number; color?: string }[];
  chartData?: { month: string; value: number }[];
  aiSummary?: string;
  recommendations?: string[];
}

interface InteractiveMetricCardProps {
  title: string;
  value: string;
  change: number;
  trend: "up" | "down";
  icon: LucideIcon;
  color?: string;
  onCardClick?: () => void;
  insightData?: InsightData;
  showRealTime?: boolean;
}

export function InteractiveMetricCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  color = "text-primary",
  insightData,
  showRealTime = false
}: InteractiveMetricCardProps) {
  const [showInsight, setShowInsight] = useState(false);

  return (
    <>
      <Card
        className="bg-card border-border hover:border-primary/50 hover:shadow-glow transition-all cursor-pointer group"
        onClick={() => insightData && setShowInsight(true)}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            {title}
          </CardTitle>
          <div className="flex items-center gap-2">
            {showRealTime && (
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <span className="text-[10px] text-muted-foreground">Live</span>
              </div>
            )}
            <Icon className={`h-4 w-4 ${color} group-hover:scale-110 transition-transform`} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold transition-all">{value}</div>
          <div className="flex items-center text-xs mt-1">
            {trend === "up" ? (
              <TrendingUp className="h-3 w-3 text-success mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 text-danger mr-1" />
            )}
            <span className={trend === "up" ? "text-success" : "text-danger"}>
              {change}
            </span>
          </div>
          {insightData && (
            <div className="mt-2 flex items-center gap-1 text-[10px] text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              <Info className="h-3 w-3" />
              <span>Click for AI insights</span>
            </div>
          )}
        </CardContent>
      </Card>

      {insightData && (
        <Dialog open={showInsight} onOpenChange={setShowInsight}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Icon className={`h-5 w-5 ${color}`} />
                {insightData.title} - AI Analysis
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {insightData.chart && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Breakdown</h4>
                  {insightData.chart.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.label}</span>
                        <span className={item.color || "text-primary"}>{item.value}%</span>
                      </div>
                      <Progress value={item.value} className="h-2" />
                    </div>
                  ))}
                </div>
              )}

              {insightData.details && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">{insightData.details}</p>
                </div>
              )}

              {insightData.aiSummary && (
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Brain className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-primary mb-1">AI Insight</p>
                      <p className="text-sm text-foreground leading-relaxed">{insightData.aiSummary}</p>
                    </div>
                  </div>
                </div>
              )}

              {insightData.recommendations && insightData.recommendations.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Recommendations</h4>
                  <div className="space-y-2">
                    {insightData.recommendations.map((rec, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                        <div className="h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-accent">{idx + 1}</span>
                        </div>
                        <p className="text-sm text-foreground">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
