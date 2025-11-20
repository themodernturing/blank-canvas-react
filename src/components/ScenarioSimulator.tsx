import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, TrendingDown } from "lucide-react";
import { useState, useEffect } from "react";

interface ScenarioParameter {
  label: string;
  value: number[];
  onChange: (value: number[]) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
}

interface ScenarioResult {
  label: string;
  value: string | number;
  baseline: number;
  change: number;
  color?: string;
}

interface ScenarioSimulatorProps {
  title: string;
  parameters: ScenarioParameter[];
  results: ScenarioResult[];
  onReset?: () => void;
  onApplyScenario?: () => void;
}

export function ScenarioSimulator({
  title,
  parameters,
  results,
  onReset,
  onApplyScenario
}: ScenarioSimulatorProps) {
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const anyChange = parameters.some(p => p.value[0] !== 0);
    setHasChanges(anyChange);
  }, [parameters]);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            {title}
          </CardTitle>
          {hasChanges && (
            <Badge variant="outline" className="gap-1">
              <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              Modified
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {parameters.map((param, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">{param.label}</label>
                <span className="text-sm text-primary font-semibold">
                  {param.value[0] > 0 ? "+" : ""}{param.value[0]}{param.unit || "%"}
                </span>
              </div>
              <Slider
                value={param.value}
                onValueChange={param.onChange}
                min={param.min}
                max={param.max}
                step={param.step || 1}
                className="w-full"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {results.map((result, idx) => (
            <div key={idx} className={`p-4 rounded-lg border ${
              result.change >= 0 ? 'bg-success/10 border-success/30' : 'bg-warning/10 border-warning/30'
            }`}>
              <p className="text-xs text-muted-foreground mb-1">{result.label}</p>
              <p className="text-2xl font-bold text-foreground">{result.value}</p>
              <div className="flex items-center gap-1 mt-1">
                {result.change >= 0 ? (
                  <TrendingUp className="h-3 w-3 text-success" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-warning" />
                )}
                <span className={`text-xs font-semibold ${
                  result.change >= 0 ? 'text-success' : 'text-warning'
                }`}>
                  {result.change >= 0 ? '+' : ''}{result.change} vs baseline
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-4 border-t border-border">
          {hasChanges && onReset && (
            <Button
              onClick={onReset}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              Reset to Baseline
            </Button>
          )}
          {hasChanges && onApplyScenario && (
            <Button
              onClick={onApplyScenario}
              size="sm"
              className="flex-1 gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Apply Scenario
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
