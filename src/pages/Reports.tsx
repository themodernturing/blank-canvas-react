import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Target, RefreshCw, TrendingUp, AlertTriangle, Sparkles, DollarSign, FileText, Shield, Copy, Download, MessageSquare, BarChart3, Building2, Users, Brain, Scale } from "lucide-react";
import { usePersona } from "@/contexts/PersonaContext";
import { RealTimeIndicator } from "@/components/RealTimeIndicator";
import { toast } from "sonner";

type ScenarioPath = 'independent' | 'acquisition' | 'both' | null;
type FlowStep = 'intro' | 'scenario-trigger' | 'stakeholder' | 'stance' | 'context' | 'branches' | 'risk' | 'decision' | 'reply' | 'summary';
type Tone = 'assertive' | 'collaborative' | 'guarded';
type CEODecision = 'hold' | 'engage' | 'both-on-table' | null;

const SESSION_KEY = 'aras-intro-played';

export default function Reports() {
  const { speakAsPersona } = usePersona();
  const [flowStep, setFlowStep] = useState<FlowStep>('intro');
  const [scenarioPath, setScenarioPath] = useState<ScenarioPath>(null);
  const [showMessageAnalysis, setShowMessageAnalysis] = useState(false);
  const [incomingMessage, setIncomingMessage] = useState(
    "We've admired your momentum. To unlock scale and reduce duplication, we're prepared to acquire a controlling stake at a 20% premium to your market cap. We believe a friendly merger would maximize value for both teams."
  );
  const [selectedTone, setSelectedTone] = useState<Tone>('collaborative');
  const [ceoDecision, setCeoDecision] = useState<CEODecision>(null);
  const [showStakeholders, setShowStakeholders] = useState(false);
  const [showBoardSummary, setShowBoardSummary] = useState(false);
  const hasPlayedIntro = useRef(false);

  // One-time intro voice (session-scoped)
  useEffect(() => {
    const sessionPlayed = sessionStorage.getItem(SESSION_KEY);
    if (!sessionPlayed && !hasPlayedIntro.current) {
      hasPlayedIntro.current = true;
      sessionStorage.setItem(SESSION_KEY, 'true');
      speakAsPersona(
        "ORBITAL Negotiation Advisor online — preparing data-backed negotiation strategy.",
        'aras',
        { key: 'orbital-negotiation-intro' }
      );
    }
  }, [speakAsPersona]);

  const handleRunScenario = () => {
    setFlowStep('scenario-trigger');
    setTimeout(() => {
      speakAsPersona(
        "Breaking development — your board just received an acquisition proposal from a larger rival, offering a twenty percent premium on your company's valuation.",
        'aras'
      );
    }, 300);
  };

  const handleViewStakeholders = () => {
    setShowStakeholders(true);
    setFlowStep('stakeholder');
    setTimeout(() => {
      speakAsPersona(
        "Before reacting, let's understand the people — and their motives. The board may see short-term gain, but your people and regulators will question control. You'll need both data and diplomacy.",
        'aras'
      );
    }, 500);
  };

  const handleStanceSelect = (path: ScenarioPath) => {
    setScenarioPath(path);
    setFlowStep('context');
    setTimeout(() => {
      speakAsPersona("Understood — let's see where this choice leads. Starting analysis.", 'aras');
    }, 300);
    setTimeout(() => {
      speakAsPersona(
        "Let's assess the battlefield — where you stand, and what they're playing with. Your company projects a hundred-twenty million in revenue next year, with eighteen percent margin.",
        'aras'
      );
    }, 2000);
    setTimeout(() => {
      setFlowStep('branches');
    }, 6000);
  };

  const handleCEODecision = (decision: CEODecision) => {
    setCeoDecision(decision);
    setFlowStep('reply');
    
    const responses = {
      hold: "Strong stance — conviction builds value.",
      engage: "Smart — you lead if you define the anchor.",
      'both-on-table': "Balanced — the board will thank you."
    };
    
    setTimeout(() => {
      speakAsPersona(responses[decision!], 'aras');
    }, 300);
    
    setTimeout(() => {
      speakAsPersona("Here are two tone variants — firm and collaborative. Both get your point across, safely.", 'aras');
    }, 2000);
  };

  const handleGenerateBoardSummary = () => {
    setShowBoardSummary(true);
    setFlowStep('summary');
    setTimeout(() => {
      speakAsPersona(
        "Board summary ready. Rival: four times your size. Offer: twenty percent premium. Integration risk: high. Engage smartly, but keep your escape route open.",
        'aras'
      );
    }, 300);
    setTimeout(() => {
      speakAsPersona("Decision recorded. Whatever path you take — control stays with you.", 'aras');
    }, 6000);
  };

  const handleRestart = () => {
    setFlowStep('intro');
    setScenarioPath(null);
    setShowMessageAnalysis(false);
    setShowBoardSummary(false);
    setShowStakeholders(false);
    setCeoDecision(null);
    setTimeout(() => {
      speakAsPersona("Back to the strategy desk — ready to test another move?", 'aras');
    }, 300);
    toast.info("Negotiation scenario reset");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyReply = (variant: string) => {
    navigator.clipboard.writeText(variant);
    toast.success("Reply copied to clipboard");
  };

  return (
    <div className="space-y-6 animate-fade-in p-6">
      {/* ORBITAL Header */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/30 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-foreground">
          ORBITAL Negotiation Advisor online — preparing data-backed negotiation strategy.
        </h2>
      </div>
      
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">AI Negotiation Co-Pilot</h1>
          <p className="text-muted-foreground">Takeover Intelligence & Deal Strategy</p>
        </div>
        <RealTimeIndicator label="ORBITAL Active" />
      </div>

      {/* Persona Welcome */}
      <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Meet Your Negotiation Co-Pilot
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-foreground leading-relaxed">
            "Share a real negotiation message or test a live takeover scenario. I'll handle the math — you handle the call."
          </p>
          <div className="flex gap-3">
            <Button 
              onClick={handleRunScenario} 
              variant="default"
              className="gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              ▶ Run Takeover Scenario
            </Button>
            <Button 
              onClick={() => setShowMessageAnalysis(true)} 
              variant="outline"
              className="gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              💬 Analyze a Real Message
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold">AI Impact Insight:</span> Dependency on staff decreased — saving ~38 staff hours per week.
          </p>
        </CardContent>
      </Card>

      {/* Scenario Trigger - Breaking Development */}
      {flowStep === 'scenario-trigger' && (
        <Card className="bg-gradient-to-br from-warning/20 to-destructive/10 border-warning/40 animate-fade-in">
          <CardContent className="pt-6 space-y-4">
            <div className="p-4 bg-warning/10 border-l-4 border-warning rounded-lg">
              <p className="text-sm font-bold text-foreground mb-2">
                🚨 Breaking Development
              </p>
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                Your board just received an acquisition proposal from a larger rival, offering a <span className="font-semibold text-warning">20% premium</span> on your company's valuation.
              </p>
            </div>
            
            <Card className="bg-card/50 border-border typing-effect">
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 text-accent mt-1" />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Incoming Message</p>
                    <p className="text-sm text-foreground leading-relaxed">
                      {incomingMessage}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button onClick={handleViewStakeholders} variant="default" className="gap-2">
                <Users className="h-4 w-4" />
                🔍 View Stakeholder Analysis
              </Button>
              <Button onClick={() => setFlowStep('decision')} variant="outline" className="gap-2">
                <Brain className="h-4 w-4" />
                ⚡ Respond to Offer
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stakeholder Map & Motivations */}
      {showStakeholders && (
        <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-accent/30 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-accent" />
              Stakeholder Map & Motivations
            </CardTitle>
            <CardDescription>Understanding the people behind the deal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 font-semibold">Stakeholder</th>
                    <th className="text-left py-2 px-3 font-semibold">Position</th>
                    <th className="text-left py-2 px-3 font-semibold">Likely Preference</th>
                    <th className="text-left py-2 px-3 font-semibold">Influence</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-3 font-semibold">You (CEO)</td>
                    <td className="py-2 px-3 text-muted-foreground">Founder-Operator</td>
                    <td className="py-2 px-3">Stay Independent</td>
                    <td className="py-2 px-3"><Badge variant="default" className="text-xs">High</Badge></td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-3 font-semibold">Board Chair</td>
                    <td className="py-2 px-3 text-muted-foreground">Investor-Rep</td>
                    <td className="py-2 px-3">Open to Acquisition</td>
                    <td className="py-2 px-3"><Badge variant="secondary" className="text-xs">Medium</Badge></td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-3 font-semibold">Employees</td>
                    <td className="py-2 px-3 text-muted-foreground">Key Talent</td>
                    <td className="py-2 px-3">Prefer Stability</td>
                    <td className="py-2 px-3"><Badge variant="secondary" className="text-xs">Medium</Badge></td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-3 font-semibold">Rival CEO</td>
                    <td className="py-2 px-3 text-muted-foreground">Expansionist</td>
                    <td className="py-2 px-3">Push Takeover</td>
                    <td className="py-2 px-3"><Badge variant="default" className="text-xs">High</Badge></td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold">Regulators</td>
                    <td className="py-2 px-3 text-muted-foreground">Policy Gatekeepers</td>
                    <td className="py-2 px-3">Cautious</td>
                    <td className="py-2 px-3"><Badge variant="outline" className="text-xs">Variable</Badge></td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 p-3 bg-accent/10 border border-accent/30 rounded-lg">
              <p className="text-xs text-muted-foreground italic">
                <span className="font-semibold text-accent">Aras Insight:</span> "The board may see short-term gain, but your people and regulators will question control. You'll need both data and diplomacy."
              </p>
            </div>

            <div className="mt-4">
              <p className="text-sm font-semibold mb-3">Choose Your Stance</p>
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => handleStanceSelect('independent')} variant="outline" className="gap-2">
                  <Brain className="h-4 w-4" />
                  🧠 Stay Independent
                </Button>
                <Button onClick={() => handleStanceSelect('acquisition')} variant="outline" className="gap-2">
                  <Target className="h-4 w-4" />
                  🤝 Explore Acquisition
                </Button>
                <Button onClick={() => handleStanceSelect('both')} variant="default" className="gap-2">
                  <Scale className="h-4 w-4" />
                  ⚖️ Compare Both Paths
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Context Before Numbers */}
      {(flowStep === 'context' || flowStep === 'branches' || flowStep === 'decision' || flowStep === 'reply' || flowStep === 'summary') && scenarioPath && (
        <Card className="bg-gradient-to-br from-success/10 to-primary/10 border-success/30 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-success" />
              Context Before Numbers
            </CardTitle>
            <CardDescription>Assessing the battlefield</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-card border border-border rounded-lg">
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  Your Company
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Revenue Forecast:</span>
                    <span className="font-semibold">$120M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Margin:</span>
                    <span className="font-semibold">18%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Runway:</span>
                    <span className="font-semibold">24 months</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-card border border-border rounded-lg">
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4 text-accent" />
                  Rival
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Revenue:</span>
                    <span className="font-semibold">$480M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Margin:</span>
                    <span className="font-semibold">22%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Recent M&A:</span>
                    <span className="font-semibold">3 startups</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-warning/10 border border-warning/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold">🟡 Deal Viability</span>
                <Badge variant="outline" className="text-xs">Moderate</Badge>
              </div>
              <Progress value={60} className="h-2 mb-2" />
              <p className="text-xs text-muted-foreground">
                Combined market share: 35% — High strategic fit, regulatory review likely.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Scenario Branches */}
      {flowStep === 'branches' && scenarioPath && (
        <div className="space-y-4 animate-fade-in">
          {(scenarioPath === 'independent' || scenarioPath === 'both') && (
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Brain className="h-5 w-5 text-primary" />
                  🧠 Path A – Stay Independent
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground italic">
                  "If you reject the offer, here's what the next 24 months look like."
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-card border border-border rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Projected Equity Growth</p>
                    <p className="text-lg font-bold text-success">+26–32%</p>
                  </div>
                  <div className="p-3 bg-card border border-border rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Capital Requirement</p>
                    <p className="text-lg font-bold text-warning">~$14M</p>
                  </div>
                  <div className="p-3 bg-card border border-border rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Rival Counter-Investment</p>
                    <p className="text-sm font-semibold text-destructive">Medium Threat</p>
                  </div>
                </div>
                <div className="p-3 bg-accent/10 border border-accent/30 rounded-lg">
                  <p className="text-xs text-muted-foreground italic">
                    <span className="font-semibold text-accent">Aras:</span> "You'll keep control — but you'll need speed and sharper execution."
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {(scenarioPath === 'acquisition' || scenarioPath === 'both') && (
            <Card className="bg-gradient-to-br from-success/10 to-primary/10 border-success/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-success" />
                  🤝 Path B – Open to Acquisition
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground italic">
                  "If you engage, the math and politics unfold like this."
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 bg-card border border-border rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Implied Enterprise Value</p>
                    <p className="text-lg font-bold text-success">$144M (+20%)</p>
                  </div>
                  <div className="p-3 bg-card border border-border rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Offer Mix</p>
                    <p className="text-sm font-semibold">70% cash / 30% stock</p>
                  </div>
                  <div className="p-3 bg-card border border-border rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Integration Risk</p>
                    <Badge variant="outline" className="text-warning border-warning/30">Medium-High</Badge>
                  </div>
                  <div className="p-3 bg-card border border-border rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Retention Pool</p>
                    <p className="text-sm font-semibold text-primary">15% EV recommended</p>
                  </div>
                </div>
                <div className="p-3 bg-accent/10 border border-accent/30 rounded-lg">
                  <p className="text-xs text-muted-foreground italic">
                    <span className="font-semibold text-accent">Aras:</span> "Fair premium — but if retention terms fail, your edge walks out the door."
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {scenarioPath === 'both' && (
            <Card className="bg-gradient-to-r from-accent/10 via-primary/10 to-success/10 border-accent/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5 text-accent" />
                  ⚖️ Path C – Compare Both
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3">Option</th>
                        <th className="text-left py-2 px-3">Upside</th>
                        <th className="text-left py-2 px-3">Risk</th>
                        <th className="text-left py-2 px-3">Strategic Fit</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs">
                      <tr className="border-b border-border/50">
                        <td className="py-2 px-3 font-semibold">Stay Independent</td>
                        <td className="py-2 px-3 text-success">+30% growth</td>
                        <td className="py-2 px-3 text-warning">Cash burn risk</td>
                        <td className="py-2 px-3">High cultural control</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold">Sell</td>
                        <td className="py-2 px-3 text-success">Instant liquidity</td>
                        <td className="py-2 px-3 text-destructive">Integration chaos</td>
                        <td className="py-2 px-3">Strong financial logic</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 p-3 bg-accent/10 border border-accent/30 rounded-lg">
                  <p className="text-xs text-muted-foreground italic">
                    <span className="font-semibold text-accent">Aras:</span> "Independence protects culture; acquisition secures liquidity. What's your gut telling you, CEO?"
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-center">
            <Button onClick={() => setFlowStep('decision')} variant="default" size="lg" className="gap-2">
              <Brain className="h-5 w-5" />
              Make CEO Decision
            </Button>
          </div>
        </div>
      )}

      {/* Risk & Compliance Overlay */}
      {(flowStep === 'decision' || flowStep === 'reply' || flowStep === 'summary') && scenarioPath && (
        <Card className="bg-gradient-to-br from-destructive/10 to-warning/10 border-destructive/30 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Risk & Compliance Overlay
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Regulatory Friction Risk</span>
              <Badge variant="destructive">40% Probability</Badge>
            </div>
            <Progress value={40} className="h-2" />
            <p className="text-xs text-muted-foreground">
              The merger may face regulatory scrutiny. Before any exclusivity, run a compliance preview.
            </p>
            <Button variant="outline" size="sm" className="w-full gap-2">
              <Shield className="h-4 w-4" />
              Run Compliance Simulation
            </Button>
          </CardContent>
        </Card>
      )}

      {/* CEO Decision Point */}
      {flowStep === 'decision' && !ceoDecision && (
        <Card className="bg-gradient-to-r from-primary/20 to-accent/20 border-primary/40 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              CEO Decision Point
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground italic">
              "You've seen the motives, numbers, and pressure. What's your instinct?"
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => handleCEODecision('hold')} variant="outline" className="gap-2">
                <Brain className="h-4 w-4" />
                🧠 Hold the Line
              </Button>
              <Button onClick={() => handleCEODecision('engage')} variant="outline" className="gap-2">
                <Target className="h-4 w-4" />
                🤝 Engage in Talks
              </Button>
              <Button onClick={() => handleCEODecision('both-on-table')} variant="default" className="gap-2">
                <Scale className="h-4 w-4" />
                ⚖️ Keep Both on Table
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI-Generated Replies */}
      {(flowStep === 'reply' || flowStep === 'summary') && ceoDecision && (
        <Card className="bg-gradient-to-br from-primary/10 to-success/10 border-primary/30 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              AI-Generated Reply
            </CardTitle>
            <CardDescription>Two tone variants — choose your voice</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sm">Variant A – Assertive</h4>
                <Badge variant="outline" className="text-xs">Firm</Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                "Thank you for your proposal. We're currently focused on scaling independently to capture full market potential. However, we remain open to partnership models aligned with our long-term roadmap."
              </p>
              <Button size="sm" variant="outline" className="gap-2" onClick={() => handleCopyReply('assertive')}>
                <Copy className="h-3 w-3" />
                📋 Copy Reply
              </Button>
            </div>

            <div className="p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sm">Variant B – Collaborative</h4>
                <Badge variant="outline" className="text-xs">Diplomatic</Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                "We appreciate your interest. We're open to structured discussions that respect our product and team autonomy. Let's schedule a preliminary call to outline potential terms."
              </p>
              <Button size="sm" variant="outline" className="gap-2" onClick={() => handleCopyReply('collaborative')}>
                <Copy className="h-3 w-3" />
                📋 Copy Reply
              </Button>
            </div>

            <div className="flex gap-3">
              <Button variant="ghost" size="sm" className="flex-1">✍️ Refine Tone</Button>
              <Button variant="ghost" size="sm" className="flex-1">🧠 Explain Strategy</Button>
            </div>

            <Button variant="default" className="w-full gap-2" onClick={handleGenerateBoardSummary}>
              <FileText className="h-4 w-4" />
              📄 Create Board Summary
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Board-Ready Summary */}
      {showBoardSummary && flowStep === 'summary' && (
        <Card className="bg-gradient-to-r from-warning/10 via-accent/10 to-primary/10 border-warning/40 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-warning" />
              Board Situation Report — Operation Atlas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 bg-card border border-border rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Rival Size</p>
                <p className="text-sm font-bold">4× your size</p>
              </div>
              <div className="p-3 bg-card border border-border rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Offer Premium</p>
                <p className="text-sm font-bold text-success">20%</p>
              </div>
              <div className="p-3 bg-card border border-border rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Antitrust Risk</p>
                <Badge variant="outline" className="text-warning border-warning/30">Moderate</Badge>
              </div>
              <div className="p-3 bg-card border border-border rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Integration Risk</p>
                <Badge variant="destructive">High</Badge>
              </div>
            </div>

            <div className="p-4 bg-card border border-border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Recommendation</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                "Engage strategically while maintaining independent runway extension options. Talent flight probability: 22%."
              </p>
            </div>

            <div className="p-3 bg-success/10 border border-success/30 rounded-lg">
              <p className="text-xs font-semibold text-success">
                AI Impact Insight: Dependency on staff decreased — saving ~31 staff hours/week; decision clarity ↑ 28%.
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="default" className="flex-1 gap-2">
                <Download className="h-4 w-4" />
                Export PDF
              </Button>
              <Button variant="outline" className="flex-1">
                Save to Reports
              </Button>
            </div>

            <div className="p-3 bg-primary/10 border border-primary/30 rounded-lg text-center">
              <p className="text-sm font-semibold text-primary italic">
                "Decision recorded. Whatever path you take — control stays with you."
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Message Analysis Flow */}
      {showMessageAnalysis && flowStep === 'intro' && (
        <Card className="bg-card border-border animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Analyze an Incoming Message
            </CardTitle>
            <CardDescription>Paste an email or message for AI-powered negotiation analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea 
              placeholder="Paste the incoming negotiation message here..."
              className="min-h-[120px]"
            />
            <Button className="w-full gap-2">
              <Sparkles className="h-4 w-4" />
              Analyze Tone, Intent & Leverage
            </Button>
            <p className="text-xs text-muted-foreground italic">
              "I'll read tone, intent, and leverage, then build a safe reply."
            </p>
          </CardContent>
        </Card>
      )}

      {/* Restart Button */}
      {flowStep !== 'intro' && (
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            className="gap-2 fixed bottom-8 right-8 shadow-lg"
            onClick={handleRestart}
          >
            <RefreshCw className="h-4 w-4" />
            🔁 Try Another Negotiation Path
          </Button>
        </div>
      )}

      {/* AI Impact Insight Footer */}
      <div className="p-6 bg-gradient-to-r from-success/10 via-accent/10 to-primary/10 border border-success/30 rounded-lg text-center">
        <p className="text-lg font-semibold text-success mb-2">🎯 AI Impact Insight</p>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          Dependency on staff decreased — saving ~<span className="text-success font-bold">38 staff hours per week</span>. 
          Playbook updated with today's negotiation outcome.
        </p>
      </div>
    </div>
  );
}
