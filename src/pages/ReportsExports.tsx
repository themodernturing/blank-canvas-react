import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Shield, TrendingUp, MessageSquare } from "lucide-react";
import { useVoiceContext } from "@/contexts/VoiceContext";
import { toast } from "sonner";

export default function ReportsExports() {
  const { speak } = useVoiceContext();
  
  useEffect(() => {
    speak("ORBITAL Summary Systems engaged — preparing your executive briefing.");
  }, [speak]);

  const reports = [
    {
      icon: TrendingUp,
      title: "Executive Financial Summary",
      description: "Comprehensive P&L, cash flow, and forecast analysis",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/30"
    },
    {
      icon: Shield,
      title: "Governance Compliance Snapshot",
      description: "Risk alerts, compliance status, and audit readiness",
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/30"
    },
    {
      icon: MessageSquare,
      title: "Campaign Performance Review",
      description: "Communication effectiveness and engagement metrics",
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/30"
    },
    {
      icon: FileText,
      title: "Meeting Intelligence Brief",
      description: "Action items, decisions, and sentiment analysis",
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/30"
    }
  ];

  const handleExport = (reportTitle: string) => {
    speak("Report ready.");
    toast.success(`${reportTitle} prepared for download`);
  };

  return (
    <div className="space-y-6 animate-fade-in p-6">
      {/* ORBITAL Header */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/30 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-foreground">
          ORBITAL Summary Systems engaged — preparing your executive briefing.
        </h2>
      </div>
      
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Reports & Exports</h1>
        <p className="text-muted-foreground">
          AI-curated executive reports aligned with ORBITAL's unified analytics engine
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report, idx) => {
          const Icon = report.icon;
          return (
            <Card key={idx} className={`${report.borderColor} border-2 bg-card`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${report.bgColor}`}>
                    <Icon className={`h-6 w-6 ${report.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-bold text-foreground">{report.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{report.description}</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    AI-Curated
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Real-time Data
                  </Badge>
                </div>
                <Button 
                  onClick={() => handleExport(report.title)}
                  className="w-full gap-2"
                  variant="outline"
                >
                  <Download className="h-4 w-4" />
                  Export as PDF
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-primary/20 bg-secondary/30">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground text-center">
            All reports are AI-curated and aligned with ORBITAL's unified analytics engine.
            Data is synthesized from multiple intelligence layers across financial, operational, and strategic domains.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
