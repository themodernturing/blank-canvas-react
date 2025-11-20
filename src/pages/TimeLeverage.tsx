import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, FileText, Loader2, Sparkles, MessageSquare, CheckCircle, Lock, Brain, Calendar, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useVoiceContext } from "@/contexts/VoiceContext";
import { RealTimeIndicator } from "@/components/RealTimeIndicator";
import { CEOPrompt } from "@/components/CEOPrompt";
import { ClickableInsightCard } from "@/components/ClickableInsightCard";
import { PremiumOverlay } from "@/components/PremiumOverlay";

const inboxItems = [
  { id: 1, icon: Mail, title: "3 contracts pending approval", priority: "high", source: "email" },
  { id: 2, icon: MessageSquare, title: "2 meeting follow-ups needed", priority: "medium", source: "whatsapp" },
  { id: 3, icon: Phone, title: "1 supplier call rescheduled", priority: "low", source: "phone" },
];

const initialBrief = [
  { text: "📧 Email: MENA expansion brief received—legal review advised.", source: "📧" },
  { text: "🗂️ Docs: Budget variance workbook updated; CapEx +$180k.", source: "🗂️" },
  { text: "📱 WhatsApp: Supplier proposed shipment split; finance to confirm.", source: "📱" },
  { text: "📝 Drive: Compliance checklist awaiting CFO sign-off.", source: "📝" },
];

const mockMessages = [
  { title: "Re: Q4 Budget Review", source: "📧 Email", urgency: "High" },
  { title: "Supplier Agreement - Final Draft", source: "📧 Email", urgency: "Medium" },
  { title: "Team Update Request", source: "📱 WhatsApp", urgency: "Low" },
];

const mockTasks = [
  { task: "Approve vendor contracts", owner: "Legal Team", due: "Nov 12" },
  { task: "Review budget variance report", owner: "CFO", due: "Nov 14" },
  { task: "Sign compliance checklist", owner: "CEO", due: "Nov 15" },
];

const mockCalls = [
  { with: "MENA Partner - Strategy Sync", purpose: "Expansion Planning", time: "2:00 PM Today" },
  { with: "Supplier - Contract Terms", purpose: "Price Negotiation", time: "Tomorrow 10:00 AM" },
  { with: "Board Member", purpose: "Q4 Performance", time: "Nov 14, 3:30 PM" },
];

export default function TimeLeverage() {
  const { speak } = useVoiceContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [dailyBrief, setDailyBrief] = useState(initialBrief);
  const [lastGenerated, setLastGenerated] = useState<Date | null>(null);
  const [selectedModal, setSelectedModal] = useState<"messages" | "tasks" | "calls" | null>(null);
  const [showPrompt, setShowPrompt] = useState(true);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  useEffect(() => {
    // Initial shimmer load
    setTimeout(() => {
      setIsLoading(false);
      speak("ORBITAL Time Intelligence active — your daily brief is ready.");
    }, 2000);
  }, [speak]);

  const generateBrief = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setDailyBrief([
        { text: "📧 Email: MENA expansion Q4 performance exceeded targets by 12%", source: "📧" },
        { text: "🗂️ Docs: 5 new compliance requirements identified - action needed", source: "🗂️" },
        { text: "📱 WhatsApp: Supplier negotiations completed - contracts ready", source: "📱" },
        { text: "📝 Sheets: Team engagement survey results show 89% satisfaction", source: "📝" },
      ]);
      setLastGenerated(new Date());
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Executive Time Leverage
          </h1>
          <p className="text-muted-foreground mt-2">
            AI-powered summarization and intelligent task prioritization
          </p>
        </div>
        <RealTimeIndicator label="Inbox monitoring" />
      </div>

      {showPrompt && (
        <CEOPrompt
          question="3 contracts awaiting your approval. Should I prioritize these for today?"
          onYes={() => {
            speak("Contracts moved to high priority queue.");
            setShowPrompt(false);
          }}
          onNo={() => setShowPrompt(false)}
        />
      )}

      <ClickableInsightCard
        title="AI Task Insights"
        summary="12 items need attention — 3 are time-sensitive"
        icon={<Sparkles className="h-5 w-5 text-primary" />}
        badge="Priority"
        detailedInsights={[
          "3 contracts require approval by EOD (MENA expansion, supplier agreement, legal review)",
          "2 budget reports ready for CFO sign-off",
          "7 standard items can be deferred to next week"
        ]}
        recommendations={[
          "Focus on contracts first (blocks other teams)",
          "Delegate budget sign-offs to COO",
          "Batch remaining items for Friday review"
        ]}
        nextSteps={[
          "Review MENA expansion contract (30 min)",
          "Approve supplier agreement (15 min)",
          "Schedule CFO sync for budget items"
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Inbox Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {isLoading ? (
              <>
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </>
            ) : (
              inboxItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-card border border-border hover:border-primary/50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </div>
                    <Badge
                      variant={
                        item.priority === "high"
                          ? "destructive"
                          : item.priority === "medium"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {item.priority}
                    </Badge>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-gradient-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                Daily AI Brief
              </CardTitle>
              <Button
                onClick={generateBrief}
                disabled={isGenerating || isLoading}
                size="sm"
                className="gap-2"
              >
                {isGenerating && <Loader2 className="h-4 w-4 animate-spin" />}
                {isGenerating ? "Generating..." : "Generate Brief"}
              </Button>
            </div>
            {lastGenerated && (
              <p className="text-xs text-muted-foreground">
                Last updated: {lastGenerated.toLocaleTimeString()}
              </p>
            )}
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : (
              <ul className="space-y-3">
                {dailyBrief.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm animate-fade-in p-2 rounded-lg bg-muted/50">
                    <span className="text-lg">{item.source}</span>
                    <span className="text-muted-foreground leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          className="hover:shadow-glow transition-all cursor-pointer group"
          onClick={() => setSelectedModal("messages")}
        >
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Unread Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="hover:shadow-glow transition-all cursor-pointer group"
          onClick={() => setSelectedModal("tasks")}
        >
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                <FileText className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">Pending Tasks</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="hover:shadow-glow transition-all cursor-pointer group"
          onClick={() => setSelectedModal("calls")}
        >
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-cyan/10 group-hover:bg-cyan/20 transition-colors">
                <Phone className="h-6 w-6 text-cyan" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Scheduled Calls</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Premium Section Divider */}
      <div className="flex items-center justify-center mt-8 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/5 border border-amber-500/20">
          <Lock className="h-4 w-4 text-amber-500" />
          <span className="text-sm font-medium text-amber-500/90">
            Premium Capabilities — Unlock Advanced Executive Intelligence
          </span>
        </div>
      </div>

      {/* Premium Feature Teasers */}
      <div className="p-6 rounded-lg bg-muted/30 border border-border/50">
        <TooltipProvider>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Executive Focus Optimizer */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Card 
                  className="relative border-2 border-amber-500/30 bg-gradient-card hover:shadow-glow cursor-pointer group overflow-hidden"
                  onClick={() => setShowPremiumModal(true)}
                >
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
                    <Lock className="h-3 w-3 text-amber-500 animate-pulse" />
                    <span className="text-xs font-medium text-amber-500">Premium</span>
                  </div>
                  <CardHeader className="pt-8">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Brain className="h-5 w-5 text-primary" />
                      Executive Focus Optimizer
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-2">
                      AI auto-prioritizes your day based on impact, deadlines, and mental energy curve.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 rounded-lg bg-muted/50 border border-border">
                      <p className="text-sm text-foreground leading-relaxed">
                        🧠 "AI recommends reshuffling your afternoon — two high-impact meetings could move forward three hours for better leverage."
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>Upgrade to unlock full executive capabilities.</p>
              </TooltipContent>
            </Tooltip>

            {/* Strategic Time Forecast */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Card 
                  className="relative border-2 border-amber-500/30 bg-gradient-card hover:shadow-glow cursor-pointer group overflow-hidden"
                  onClick={() => setShowPremiumModal(true)}
                >
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
                    <Lock className="h-3 w-3 text-amber-500 animate-pulse" />
                    <span className="text-xs font-medium text-amber-500">Premium</span>
                  </div>
                  <CardHeader className="pt-8">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Calendar className="h-5 w-5 text-primary" />
                      Strategic Time Forecast
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-2">
                      Predict your next 7 days of focus and decision intensity — before they happen.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 rounded-lg bg-muted/50 border border-border">
                      <p className="text-sm text-foreground leading-relaxed">
                        📊 "AI predicts: next Wednesday will be your highest-impact day (Decision Load: 92%). Suggest rescheduling non-strategic calls to Thursday for optimal leverage."
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>Upgrade to unlock full executive capabilities.</p>
              </TooltipContent>
            </Tooltip>

            {/* Delegation Intelligence */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Card 
                  className="relative border-2 border-amber-500/30 bg-gradient-card hover:shadow-glow cursor-pointer group overflow-hidden"
                  onClick={() => setShowPremiumModal(true)}
                >
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
                    <Lock className="h-3 w-3 text-amber-500 animate-pulse" />
                    <span className="text-xs font-medium text-amber-500">Premium</span>
                  </div>
                  <CardHeader className="pt-8">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Users className="h-5 w-5 text-primary" />
                      Delegation Intelligence
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-2">
                      Automatically assigns routine tasks to team leads based on past approvals.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 rounded-lg bg-muted/50 border border-border">
                      <p className="text-sm text-foreground leading-relaxed">
                        🤖 "AI has identified 4 tasks suitable for delegation — supplier review reassigned to COO; logistics summary sent to Operations Lead."
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>Upgrade to unlock full executive capabilities.</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>

      {/* Message Peek Modal */}
      <Dialog open={selectedModal === "messages"} onOpenChange={() => setSelectedModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message Peek</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {mockMessages.map((msg, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-muted border border-border">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{msg.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{msg.source}</p>
                  </div>
                  <Badge variant={msg.urgency === "High" ? "destructive" : msg.urgency === "Medium" ? "secondary" : "outline"}>
                    {msg.urgency}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Pending Tasks Modal */}
      <Dialog open={selectedModal === "tasks"} onOpenChange={() => setSelectedModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pending Tasks</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {mockTasks.map((task, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-muted border border-border">
                <p className="font-medium text-sm">{task.task}</p>
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>Owner: {task.owner}</span>
                  <span>Due: {task.due}</span>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Scheduled Calls Modal */}
      <Dialog open={selectedModal === "calls"} onOpenChange={() => setSelectedModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scheduled Calls</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {mockCalls.map((call, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-muted border border-border">
                <p className="font-medium text-sm">{call.with}</p>
                <p className="text-xs text-muted-foreground mt-1">Purpose: {call.purpose}</p>
                <p className="text-xs text-accent mt-1">{call.time}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Premium Feature Modal */}
      <Dialog open={showPremiumModal} onOpenChange={setShowPremiumModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-amber-500" />
              Premium Feature
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-amber-500/10 border border-amber-500/30">
                <Lock className="w-12 h-12 text-amber-500" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <p className="text-lg font-semibold text-foreground">
                Available in Premium Version
              </p>
              <p className="text-sm text-muted-foreground">
                This advanced feature is available in the full Orbital Premium Edition.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
