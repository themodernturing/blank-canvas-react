import { Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

/**
 * @deprecated Use PremiumFeatureModal instead for a consistent modal experience
 */
export const PremiumOverlay = () => {
  return (
    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-500">
      <Card className="w-full max-w-md mx-4 border-2 border-amber-500/30 shadow-2xl bg-card/95">
        <CardContent className="pt-8 pb-8 text-center space-y-4">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-amber-500/10 border border-amber-500/30">
              <Lock className="w-12 h-12 text-amber-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            🔒 Premium Feature
          </h2>
          <p className="text-lg text-muted-foreground">
            Available in full deployed version
          </p>
          <p className="text-sm text-muted-foreground/70 pt-2 border-t border-border/50">
            Included in Orbital Enterprise Package
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
