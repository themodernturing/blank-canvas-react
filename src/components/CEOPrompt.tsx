import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, ChevronRight } from "lucide-react";

interface CEOPromptProps {
  question: string;
  onYes?: () => void;
  onNo?: () => void;
  onCustom?: (response: string) => void;
  variant?: "yesno" | "custom";
}

export function CEOPrompt({ question, onYes, onNo, variant = "yesno" }: CEOPromptProps) {
  return (
    <Card className="bg-gradient-card border-primary/30 shadow-glow animate-fade-in">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
            <Brain className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground mb-3">{question}</p>
            {variant === "yesno" && (
              <div className="flex gap-2">
                <Button
                  onClick={onYes}
                  size="sm"
                  className="flex-1 gap-1"
                >
                  Yes
                  <ChevronRight className="h-3 w-3" />
                </Button>
                <Button
                  onClick={onNo}
                  size="sm"
                  variant="outline"
                  className="flex-1"
                >
                  Not now
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
