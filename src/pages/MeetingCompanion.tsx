import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PremiumOverlay } from "@/components/PremiumOverlay";

export default function MeetingCompanion() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-8 relative">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            AI Meeting Companion
          </h1>
          <p className="text-muted-foreground">
            Upload meeting notes or capture live audio for instant AI intelligence
          </p>
        </div>
        
        <PremiumOverlay />
      </div>
    </div>
  );
}
