import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

interface ClickableInsightCardProps {
  title: string;
  summary: string;
  icon?: React.ReactNode;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  detailedInsights?: string[];
  recommendations?: string[];
  nextSteps?: string[];
  onClick?: () => void;
}

export function ClickableInsightCard({
  title,
  summary,
  icon,
  badge,
  badgeVariant = "outline",
  detailedInsights = [],
  recommendations = [],
  nextSteps = [],
  onClick
}: ClickableInsightCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (detailedInsights.length > 0 || recommendations.length > 0 || nextSteps.length > 0) {
      setShowDetails(true);
    }
  };

  return (
    <>
      <Card
        className="bg-primary/5 border-primary/20 hover:border-primary/50 hover:shadow-glow transition-all cursor-pointer group"
        onClick={handleClick}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              {icon}
              <h4 className="text-sm font-medium group-hover:text-primary transition-colors">{title}</h4>
            </div>
            {badge && <Badge variant={badgeVariant}>{badge}</Badge>}
          </div>
          <p className="text-sm text-foreground leading-relaxed mb-2">{summary}</p>
          <div className="flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Click for deeper analysis</span>
            <ChevronRight className="h-3 w-3" />
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {icon}
              {title} - Detailed Analysis
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {detailedInsights.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm">AI Analysis</h4>
                <div className="space-y-2">
                  {detailedInsights.map((insight, idx) => (
                    <div key={idx} className="p-3 bg-muted rounded-lg">
                      <p className="text-sm text-foreground">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {recommendations.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Recommendations</h4>
                <div className="space-y-2">
                  {recommendations.map((rec, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                      <div className="h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-accent">{idx + 1}</span>
                      </div>
                      <p className="text-sm text-foreground">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {nextSteps.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Next Steps</h4>
                <div className="space-y-2">
                  {nextSteps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                      <ChevronRight className="h-4 w-4 text-primary flex-shrink-0" />
                      <p className="text-sm text-foreground">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
