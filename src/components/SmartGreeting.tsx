import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, RefreshCw } from "lucide-react";

const greetings = [
  {
    greeting: "Good morning, CEO 👋",
    insights: [
      "2 new risks detected",
      "1 negotiation flagged for tone review",
      "1 project trending behind schedule"
    ]
  },
  {
    greeting: "Good afternoon, CEO 👋",
    insights: [
      "3 compliance updates reviewed",
      "Market expansion forecast refreshed",
      "2 strategic initiatives ahead of plan"
    ]
  },
  {
    greeting: "Welcome back, CEO 👋",
    insights: [
      "Vendor contract analysis complete",
      "Team sentiment trending positive",
      "1 high-priority alert requires review"
    ]
  }
];

export function SmartGreeting() {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setCurrentGreeting((prev) => (prev + 1) % greetings.length);
      setIsRefreshing(false);
    }, 800);
  };

  const greeting = greetings[currentGreeting];

  return (
    <Card className="bg-gradient-to-r from-primary/10 via-accent/5 to-cyan/10 border-primary/20 shadow-glow mb-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent animate-pulse" />
      <CardContent className="p-6 relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <h2 className="text-xl font-bold flex items-center gap-2">
              {greeting.greeting}
            </h2>
            <div className="flex items-start gap-2">
              <Brain className="h-4 w-4 text-primary mt-1 flex-shrink-0 animate-pulse" />
              <div className={`transition-opacity duration-300 ${isRefreshing ? "opacity-50" : "opacity-100"}`}>
                <p className="text-sm font-medium text-foreground mb-2">
                  ORBITAL analyzed your organization overnight:
                </p>
                <ul className="space-y-1">
                  {greeting.insights.map((insight, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="text-accent">•</span>
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="gap-2 flex-shrink-0"
          >
            <RefreshCw className={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh Insights
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
