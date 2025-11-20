import { Card, CardContent } from "@/components/ui/card";
import { Brain } from "lucide-react";
import { useEffect, useState } from "react";

interface AIInsightCardProps {
  insight: string;
  delay?: number;
}

export function AIInsightCard({ insight, delay = 2000 }: AIInsightCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <Card
      className={`bg-primary/5 border-primary/20 shadow-sm transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Brain className="h-4 w-4 text-primary mt-0.5 flex-shrink-0 animate-pulse" />
          <div className="flex-1">
            <p className="text-xs font-medium text-primary mb-1">AI Insight</p>
            <p className="text-sm text-foreground leading-relaxed">{insight}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
