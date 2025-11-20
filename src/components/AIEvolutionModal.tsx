import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Brain, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

interface AIEvolutionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AIEvolutionModal({ open, onOpenChange }: AIEvolutionModalProps) {
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    if (open) {
      setAccuracy(0);
      const interval = setInterval(() => {
        setAccuracy((prev) => {
          if (prev >= 8) {
            clearInterval(interval);
            return 8;
          }
          return prev + 1;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Evolution Log
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/10">
              <div className="h-2 w-2 rounded-full bg-primary mt-2" />
              <div className="flex-1">
                <p className="text-sm">Trained on <span className="font-semibold text-primary">4 new</span> executive decisions this week.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-success/5 border border-success/10">
              <div className="h-2 w-2 rounded-full bg-success mt-2" />
              <div className="flex-1">
                <p className="text-sm">
                  Improved forecast accuracy by{" "}
                  <span className="font-semibold text-success inline-flex items-center gap-1">
                    +{accuracy}%
                    <TrendingUp className="h-3 w-3" />
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-accent/5 border border-accent/10">
              <div className="h-2 w-2 rounded-full bg-accent mt-2" />
              <div className="flex-1">
                <p className="text-sm">Adjusted tone bias based on <span className="font-semibold text-accent">2 negotiations</span>.</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gradient-card border border-border">
            <p className="text-sm text-muted-foreground italic text-center">
              "ORBITAL continuously learns from leadership behavior — evolving every cycle."
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
