import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Globe, Shield, TrendingUp, AlertTriangle, CheckCircle, Award, Radio, Search, MessageSquare, Copy, BarChart3, MapPin, Lock, Mic, Brain, Users } from "lucide-react";
import { usePersona } from "@/contexts/PersonaContext";
import { RealTimeIndicator } from "@/components/RealTimeIndicator";
import { toast } from "sonner";

export default function ArabicIntelligence() {
  const { speakAsPersona } = usePersona();
  
  // Media Intelligence
  const [mediaBrief, setMediaBrief] = useState<any[]>([]);
  const [showMediaBrief, setShowMediaBrief] = useState(false);
  
  // Company Monitoring
  const [companyName, setCompanyName] = useState("");
  const [companyMentions, setCompanyMentions] = useState<any[]>([]);
  const [showCompanyMentions, setShowCompanyMentions] = useState(false);
  
  // Diplomatic Advisor
  const [diplomaticInput, setDiplomaticInput] = useState("Our regional partner in Riyadh has delayed the final contract signing again despite prior commitments. We've already extended timelines twice. I need to communicate our concern firmly but without damaging the relationship — especially since their ministry may be monitoring this project.");
  const [diplomaticReply, setDiplomaticReply] = useState<any>(null);
  const [showDiplomaticReply, setShowDiplomaticReply] = useState(false);
  
  // Implications and responses
  const [activeImplication, setActiveImplication] = useState<number | null>(null);
  const [activeResponse, setActiveResponse] = useState<number | null>(null);
  const [activeSentiment, setActiveSentiment] = useState<number | null>(null);
  const [activeDraft, setActiveDraft] = useState<number | null>(null);
  
  // Premium modal state
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  // Regional business intelligence
  const [regionalInsights] = useState([
    { 
      country: "Saudi Arabia", 
      context: "Vision 2030 focus",
      priority: "Digital transformation, diversification",
      culturalNote: "High formality, respect hierarchy",
      businessClimate: 95
    },
    { 
      country: "UAE", 
      context: "Innovation hub",
      priority: "Tech, sustainability, global partnerships",
      culturalNote: "Modern + traditional blend",
      businessClimate: 98
    },
    { 
      country: "Qatar", 
      context: "Economic expansion",
      priority: "Infrastructure, World Cup legacy",
      culturalNote: "Formal protocols, long-term relationships",
      businessClimate: 91
    }
  ]);


  useEffect(() => {
    speakAsPersona(
      "ORBITAL Cultural Bridge online — scanning Arabic media and diplomatic signals in real time.",
      "faris",
      { key: 'orbital-arabic-intro' }
    );
  }, [speakAsPersona]);

  const generateMediaBrief = () => {
    speakAsPersona("Generating your Arabic media brief for today.", "faris");
    
    setTimeout(() => {
      setMediaBrief([
        {
          headline: "Saudi Arabia Launches New Tech Investment Fund",
          summary: "The Kingdom announces $5B fund targeting AI and digital infrastructure startups.",
          impact: "High",
          region: "Saudi Arabia",
          sentiment: "Positive"
        },
        {
          headline: "UAE Announces Carbon Neutrality Partnership",
          summary: "New regional coalition formed to accelerate sustainability initiatives across Gulf states.",
          impact: "Moderate",
          region: "UAE",
          sentiment: "Positive"
        },
        {
          headline: "Qatar Economic Forum Highlights Trade Diversification",
          summary: "Regional leaders emphasize reducing oil dependency through technology and innovation.",
          impact: "Moderate",
          region: "Qatar",
          sentiment: "Neutral"
        }
      ]);
      setShowMediaBrief(true);
      
      setTimeout(() => {
        speakAsPersona("Your Arabic media brief is ready. Three priority narratives may influence your sector today.", "faris");
      }, 500);
    }, 1200);
  };

  const scanCompanyMentions = () => {
    if (!companyName.trim()) {
      toast.error("Please enter a company or project name");
      return;
    }
    
    speakAsPersona("Scanning Arabic publications for company-related coverage.", "faris");
    
    setTimeout(() => {
      setCompanyMentions([
        {
          sentiment: "Positive",
          source: "Al Arabiya Business",
          summary: `${companyName} praised for sustainable business practices and regional job creation.`,
          impact: "Partnership visibility opportunity"
        },
        {
          sentiment: "Neutral",
          source: "Gulf News",
          summary: `${companyName} announces regional expansion plans in technology sector.`,
          impact: "Positive coverage indicates growing reputation in MENA"
        },
        {
          sentiment: "Critical",
          source: "Arab Times",
          summary: `Delays in ${companyName}'s infrastructure project raise questions about timeline management.`,
          impact: "Critical coverage may require official clarification"
        }
      ]);
      setShowCompanyMentions(true);
    }, 1500);
  };

  const generateDiplomaticReply = () => {
    if (!diplomaticInput.trim()) {
      toast.error("Please enter your situation context");
      return;
    }
    
    speakAsPersona("Crafting culturally precise Arabic response.", "faris");
    
    setTimeout(() => {
      setDiplomaticReply({
        arabic: "معالي الشريك الكريم،\n\nتحية طيبة وبعد،\n\nنُقدّر عاليًا التزامكم المستمر وحرصكم على إنجاح هذا المشروع الاستراتيجي. نُدرك تمامًا التحديات التي قد تواجهون في المرحلة الحالية، ونثمّن جهودكم في التنسيق مع الجهات المعنية.\n\nفي ذات الوقت، نود التأكيد على أهمية الالتزام بالجدول الزمني المتفق عليه لضمان تحقيق الأهداف المشتركة بكفاءة عالية. نحن واثقون من قدرتنا المشتركة على تجاوز هذه المرحلة بنجاح، ونتطلع إلى استكمال الإجراءات في أقرب وقت ممكن.\n\nنبقى على تواصل دائم لمناقشة أي تحديات قد تطرأ، ونجدد التزامنا الكامل بهذه الشراكة الاستراتيجية.\n\nمع خالص التقدير والاحترام",
        english: "Your Excellency, Esteemed Partner,\n\nWarm greetings,\n\nWe deeply value your continued commitment and dedication to the success of this strategic project. We fully understand the challenges you may be facing at this stage, and we appreciate your efforts in coordinating with the relevant authorities.\n\nAt the same time, we would like to emphasize the importance of adhering to the agreed timeline to ensure the achievement of our shared objectives with the highest efficiency. We are confident in our mutual ability to successfully navigate this phase, and we look forward to completing the procedures at the earliest opportunity.\n\nWe remain in constant communication to discuss any challenges that may arise, and we renew our complete commitment to this strategic partnership.\n\nWith deepest appreciation and respect",
        tone: "Diplomatic",
        rationale: "This response balances firmness with respect by:\n\n• Using formal honorifics (معالي) to maintain hierarchical respect\n• Acknowledging challenges first to show empathy and understanding\n• Expressing concern indirectly through emphasis on 'shared objectives' rather than direct criticism\n• Maintaining face-saving language throughout\n• Positioning urgency as mutual benefit, not pressure\n• Keeping partnership language strong to preserve long-term relationship\n• Avoiding any accusatory tone while clearly communicating timeline importance\n\nThis approach respects Arabic business culture's emphasis on hierarchy, indirect communication, and relationship preservation while still conveying the need for action."
      });
      setShowDiplomaticReply(true);
      
      setTimeout(() => {
        speakAsPersona("Response ready. Tone calibrated for senior-level diplomacy.", "faris");
      }, 500);
    }, 1800);
  };

  const copyArabicMessage = () => {
    if (diplomaticReply?.arabic) {
      navigator.clipboard.writeText(diplomaticReply.arabic);
      toast.success("Arabic message copied to clipboard");
    }
  };



  const getClimateColor = (score: number) => {
    if (score >= 95) return "text-success";
    if (score >= 85) return "text-primary";
    return "text-orange-500";
  };

  return (
    <div className="space-y-6 animate-fade-in p-6">
      {/* ORBITAL Header */}
      <div className="bg-gradient-to-r from-orange-500/10 via-primary/10 to-orange-500/10 border border-orange-500/30 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-foreground">
          ORBITAL Cultural Bridge engaged — adapting intelligence for Arabic context.
        </h2>
      </div>
      
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Regional AI Command Hub</h1>
          <p className="text-muted-foreground">Dynamic intelligence · predictive scenarios · action-driven insights</p>
        </div>
        <RealTimeIndicator label="ORBITAL Active" />
      </div>

      {/* Live Arabic Media Intelligence */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radio className="h-5 w-5 text-orange-500 animate-pulse" />
            Live Arabic Media Intelligence
          </CardTitle>
          <p className="text-sm text-muted-foreground">Real-time regional scanning and sentiment tracking</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
            <p className="text-sm text-foreground">
              <Radio className="h-4 w-4 text-orange-500 inline mr-2" />
              ORBITAL Media Radar Active — 128 verified Arabic sources monitored
            </p>
          </div>

          <Button onClick={generateMediaBrief} className="w-full gap-2" size="lg">
            <TrendingUp className="h-4 w-4" />
            Generate Today's Arabic Media Brief
          </Button>

          {showMediaBrief && (
            <div className="space-y-3 animate-fade-in">
              {mediaBrief.map((item, idx) => (
                <Card key={idx} className="bg-secondary/30 border-border">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{item.headline}</h3>
                        <p className="text-sm text-muted-foreground">{item.summary}</p>
                      </div>
                      <Badge variant="outline" className={
                        item.impact === "High" ? "text-orange-500 border-orange-500/30" : "text-primary border-primary/30"
                      }>
                        {item.impact} Impact
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        <MapPin className="h-3 w-3 mr-1" />
                        {item.region}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">{item.sentiment}</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant={activeImplication === idx ? "default" : "outline"} 
                        className="text-xs"
                        onClick={() => {
                          setActiveImplication(activeImplication === idx ? null : idx);
                          if (activeImplication !== idx) {
                            speakAsPersona("Analyzing company implications now.", "faris");
                          }
                        }}
                      >
                        Show Implications for Our Company
                      </Button>
                      <Button 
                        size="sm" 
                        variant={activeResponse === idx ? "default" : "outline"} 
                        className="text-xs"
                        onClick={() => {
                          setActiveResponse(activeResponse === idx ? null : idx);
                          if (activeResponse !== idx) {
                            speakAsPersona("Generating recommended action plan.", "faris");
                          }
                        }}
                      >
                        Recommended Response
                      </Button>
                    </div>
                    
                    {activeImplication === idx && (
                      <div className="p-3 bg-primary/10 border border-primary/30 rounded-lg animate-fade-in">
                        <p className="text-xs font-semibold text-primary mb-1">🤖 AI Analysis</p>
                        <p className="text-xs text-foreground">
                          {item.region === "Saudi Arabia" && "Rising tech investment signals increased competition for talent acquisition. Recommend accelerating recruitment partnerships with regional universities. Estimated impact: +15% talent pool access within 90 days."}
                          {item.region === "UAE" && "Sustainability mandates may accelerate regulatory pressure on carbon reporting. Action: Audit current ESG compliance by Q2 to avoid potential penalties (est. risk: $200K–$500K)."}
                          {item.region === "Qatar" && "Trade diversification creates opportunity for tech sector partnerships. Market entry window: 6-month optimal timing before saturation. Confidence: 78%."}
                        </p>
                      </div>
                    )}
                    
                    {activeResponse === idx && (
                      <div className="p-3 bg-success/10 border border-success/30 rounded-lg animate-fade-in">
                        <p className="text-xs font-semibold text-success mb-1">✅ Recommended Action</p>
                        <p className="text-xs text-foreground">
                          {item.region === "Saudi Arabia" && "• Initiate strategic outreach to Vision 2030 tech accelerators this week\n• Schedule meetings with Ministry of Investment contacts by Friday\n• Prepare localized pitch deck highlighting regional job creation (target: +200 roles)"}
                          {item.region === "UAE" && "• Commission third-party ESG audit immediately\n• Re-evaluate pricing models to capture green premium opportunity (+8-12% margin)\n• Brief CFO on compliance timeline and budget requirements"}
                          {item.region === "Qatar" && "• Contact Qatar Development Bank for partnership exploration\n• Identify local champions for joint venture discussions\n• Conduct competitive analysis of existing market players by next Monday"}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              
              <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                <p className="text-xs font-semibold text-primary mb-1">🤖 AI Impact Insight</p>
                <p className="text-xs text-muted-foreground">
                  Traditional translation workflows require 4–6 hours. ORBITAL delivers context-aware insights instantly — saving ≈22 analyst hours daily.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Company Media Tracker */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-accent" />
            Company Media Tracker
          </CardTitle>
          <p className="text-sm text-muted-foreground">Scans Arabic-language media for your company and sector</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Global Tech Solutions..."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && scanCompanyMentions()}
            />
            <Button onClick={scanCompanyMentions} className="gap-2">
              <Search className="h-4 w-4" />
              Scan Mentions
            </Button>
          </div>

          {showCompanyMentions && (
            <div className="space-y-3 animate-fade-in">
              {companyMentions.map((mention, idx) => (
                <Card key={idx} className={`border ${
                  mention.sentiment === "Positive" ? "border-success/30 bg-success/5" :
                  mention.sentiment === "Critical" ? "border-orange-500/30 bg-orange-500/5" :
                  "border-border bg-secondary/30"
                }`}>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className={
                            mention.sentiment === "Positive" ? "text-success border-success/30" :
                            mention.sentiment === "Critical" ? "text-orange-500 border-orange-500/30" :
                            "text-muted-foreground border-border"
                          }>
                            {mention.sentiment}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{mention.source}</span>
                        </div>
                        <p className="text-sm text-foreground mb-2">{mention.summary}</p>
                        <p className="text-xs text-muted-foreground italic">{mention.impact}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant={activeSentiment === idx ? "default" : "outline"} 
                        className="text-xs"
                        onClick={() => {
                          setActiveSentiment(activeSentiment === idx ? null : idx);
                          if (activeSentiment !== idx) {
                            speakAsPersona("Analyzing sentiment and approval probability.", "faris");
                          }
                        }}
                      >
                        View Sentiment Summary
                      </Button>
                      <Button 
                        size="sm" 
                        variant={activeDraft === idx ? "default" : "outline"} 
                        className="text-xs"
                        onClick={() => {
                          setActiveDraft(activeDraft === idx ? null : idx);
                          if (activeDraft !== idx) {
                            speakAsPersona("Response generated successfully.", "faris");
                          }
                        }}
                      >
                        Generate Response Draft
                      </Button>
                    </div>
                    
                    {activeSentiment === idx && (
                      <div className="p-3 bg-primary/10 border border-primary/30 rounded-lg animate-fade-in mt-2">
                        <p className="text-xs font-semibold text-primary mb-1">📊 Sentiment Analysis</p>
                        <p className="text-xs text-foreground">
                          {mention.sentiment === "Positive" && "Tone: Strongly positive with emphasis on innovation leadership (87% favorable). Likelihood of partnership inquiries: 73%. Recommendation: Capitalize on momentum with targeted regional PR campaign."}
                          {mention.sentiment === "Neutral" && "Tone: Balanced reporting with cautious optimism (neutral-to-positive lean). Probability of stakeholder acceptance: 68%. Monitor for follow-up coverage to gauge sustained interest."}
                          {mention.sentiment === "Critical" && "Tone: Concerned but not hostile; focus on accountability (42% negative, 31% neutral, 27% constructive). Risk of reputational damage: moderate. Immediate response recommended to control narrative."}
                        </p>
                      </div>
                    )}
                    
                    {activeDraft === idx && (
                      <div className="p-3 bg-success/10 border border-success/30 rounded-lg animate-fade-in mt-2 space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-success">✍️ AI-Generated Response</p>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-6 text-xs gap-1"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                mention.sentiment === "Positive" 
                                  ? "We are honored by this recognition and deeply appreciate the coverage. Our commitment to sustainable practices and regional development remains our highest priority. We look forward to continuing our contribution to the region's economic growth."
                                  : mention.sentiment === "Neutral"
                                  ? "Thank you for covering our expansion plans. We remain dedicated to bringing innovation and opportunity to the region, and we're excited to share more details as our initiatives progress."
                                  : "We appreciate the opportunity to address these concerns. We've initiated corrective measures and scheduled a comprehensive review for next week to ensure all stakeholders are aligned. We remain fully committed to delivering on our promises and maintaining transparent communication throughout this project."
                              );
                              toast.success("Response copied to clipboard");
                            }}
                          >
                            <Copy className="h-3 w-3" />
                            Copy
                          </Button>
                        </div>
                        <p className="text-xs text-foreground border-l-2 border-success/50 pl-3">
                          {mention.sentiment === "Positive" && "We are honored by this recognition and deeply appreciate the coverage. Our commitment to sustainable practices and regional development remains our highest priority. We look forward to continuing our contribution to the region's economic growth."}
                          {mention.sentiment === "Neutral" && "Thank you for covering our expansion plans. We remain dedicated to bringing innovation and opportunity to the region, and we're excited to share more details as our initiatives progress."}
                          {mention.sentiment === "Critical" && "We appreciate the opportunity to address these concerns. We've initiated corrective measures and scheduled a comprehensive review for next week to ensure all stakeholders are aligned. We remain fully committed to delivering on our promises and maintaining transparent communication throughout this project."}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Diplomatic Decision Advisor */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            AI Diplomatic Decision & Response Engine
          </CardTitle>
          <p className="text-sm text-muted-foreground">Context-aware executive communication with cultural precision</p>
          <p className="text-sm text-muted-foreground">Craft high-context Arabic executive communication</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Our regional partner in Riyadh has delayed the final contract signing again despite prior commitments. We've already extended timelines twice. I need to communicate our concern firmly but without damaging the relationship — especially since their ministry may be monitoring this project."
            value={diplomaticInput}
            onChange={(e) => setDiplomaticInput(e.target.value)}
            rows={4}
            className="text-sm"
          />

          <Button onClick={generateDiplomaticReply} className="w-full gap-2" size="lg">
            <MessageSquare className="h-4 w-4" />
            Generate Arabic Strategic Reply
          </Button>

          {showDiplomaticReply && diplomaticReply && (
            <div className="space-y-4 animate-fade-in">
              <Card className="bg-secondary/30 border-border">
                <CardContent className="p-4 space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Arabic Message</p>
                    <div className="p-4 bg-background border border-border rounded-lg" dir="rtl">
                      <p className="text-sm text-foreground whitespace-pre-line text-right leading-relaxed">
                        {diplomaticReply.arabic}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-2">English Translation</p>
                    <div className="p-4 bg-background border border-border rounded-lg">
                      <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                        {diplomaticReply.english}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                    <p className="text-xs font-semibold text-primary mb-2">Why this message works</p>
                    <p className="text-xs text-muted-foreground whitespace-pre-line leading-relaxed">
                      {diplomaticReply.rationale}
                    </p>
                    <Badge variant="outline" className="mt-2 text-primary border-primary/30">
                      Tone: {diplomaticReply.tone}
                    </Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={copyArabicMessage} variant="outline" className="gap-2">
                      <Copy className="h-4 w-4" />
                      Copy Arabic Message
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Simulate Recipient Reaction
                    </Button>
                    <Button variant="outline" className="gap-2 flex-1">
                      Adjust Tone
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Regional AI Command Hub */}
      <Card className="bg-gradient-to-br from-success/5 via-card to-primary/5 border-success/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-success animate-pulse" />
            AI Regional Snapshot
          </CardTitle>
          <p className="text-sm text-muted-foreground">Auto-updated predictive intelligence for MENA business landscape</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-4 bg-success/10 border border-success/30 rounded-lg">
              <p className="text-sm text-foreground font-semibold mb-1">🔮 Regional Forecast</p>
              <p className="text-sm text-muted-foreground">
                AI forecasts GCC infrastructure growth <span className="text-success font-semibold">+6.3% YoY</span> — UAE leading recovery with digital transformation initiatives.
              </p>
            </div>
            
            <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
              <p className="text-sm text-foreground font-semibold mb-1">💱 Market Intelligence</p>
              <p className="text-sm text-muted-foreground">
                Currency stabilization in KSA and Egypt improves import margins by <span className="text-primary font-semibold">9%</span> — optimal window for supplier renegotiation.
              </p>
            </div>
            
            <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
              <p className="text-sm text-foreground font-semibold mb-1">⚡ Opportunity Signal</p>
              <p className="text-sm text-muted-foreground">
                AI detects emerging investment signals in healthcare and logistics sectors — confidence <span className="text-orange-500 font-semibold">81%</span>. Partnership window: 90 days.
              </p>
            </div>
          </div>

          {/* Scenario Simulator */}
          <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg space-y-3">
            <p className="text-sm font-semibold text-accent">🎯 Scenario Simulator</p>
            <p className="text-xs text-muted-foreground mb-3">
              Test strategic hypotheses and receive instant impact analysis
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="text-xs justify-start"
                onClick={() => {
                  speakAsPersona("Analyzing oil price scenario impact.", "faris");
                  toast.success("Scenario Result: Export margins shrink 3.5%, supply chain cost pressure increases 7%. Recommendation: Renegotiate supplier contracts within 60 days.");
                }}
              >
                What if oil prices drop 10%?
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="text-xs justify-start"
                onClick={() => {
                  speakAsPersona("Analyzing regional expansion scenario.", "faris");
                  toast.success("Scenario Result: Market entry cost: $1.2M, ROI timeline: 18 months. Confidence: 74%. Proceed with pilot in UAE first.");
                }}
              >
                Expand to 3 new GCC markets?
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="text-xs justify-start"
                onClick={() => {
                  speakAsPersona("Analyzing tariff impact scenario.", "faris");
                  toast.success("Scenario Result: Import costs rise 12%, profit margin compression of 4.8%. Mitigation: Source 40% from local suppliers by Q3.");
                }}
              >
                New tariffs on imports (+15%)?
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="text-xs justify-start"
                onClick={() => {
                  speakAsPersona("Analyzing competitor pricing scenario.", "faris");
                  toast.success("Scenario Result: Market share risk: -8% if no response. Recommended action: Strategic price matching on top 3 SKUs + value-add bundle.");
                }}
              >
                Competitor undercuts pricing?
              </Button>
            </div>
          </div>

          {/* Regional Opportunity Lens */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" />
              Regional Opportunity Lens
            </p>
            
            {regionalInsights.slice(0, 2).map((insight, idx) => (
              <div key={idx} className="p-4 bg-secondary/30 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground">{insight.country}</p>
                    <p className="text-xs text-muted-foreground">{insight.context}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getClimateColor(insight.businessClimate)}`}>
                      {insight.businessClimate}
                    </div>
                    <p className="text-xs text-muted-foreground">Climate Score</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                  <span className="font-semibold text-foreground">Priority: </span>
                  {insight.priority}
                </p>
                <p className="text-xs text-accent italic">{insight.culturalNote}</p>
                
                {idx === 0 && (
                  <Button 
                    size="sm" 
                    className="w-full mt-3 gap-2"
                    onClick={() => {
                      speakAsPersona("Generating regional action plan for Saudi market entry.", "faris");
                      toast.success("Action Plan: 1) Target partnership with regional logistics leaders. 2) Expand Gulf market outreach via bilingual campaigns. 3) Engage with Vision 2030 accelerators.");
                    }}
                  >
                    <CheckCircle className="h-3 w-3" />
                    Generate Action Plan
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Impact Summary */}
          <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
            <p className="text-xs font-semibold text-primary mb-1">🤖 AI Impact Insight</p>
            <p className="text-xs text-muted-foreground">
              Traditional regional intelligence gathering requires dedicated analyst teams (~5-8 staff). ORBITAL automates cultural analysis and opportunity detection — saving <span className="font-semibold text-foreground">~54 staff hours per week</span>.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Strategic Playbooks for Arabic Business */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-accent" />
            Strategic Playbooks for Arabic Business
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                scenario: "Government Negotiations",
                levers: ["Respect Hierarchy", "Gradual Persuasion", "Protocol Deference"],
                icon: Shield
              },
              {
                scenario: "Delayed Payments",
                levers: ["Empathy Framing", "Face Preservation", "Mutual Partnership"],
                icon: TrendingUp
              },
              {
                scenario: "Joint Venture Discussions",
                levers: ["Relationship Continuity", "Cultural Compliments", "Trust Phrasing"],
                icon: Globe
              }
            ].map((playbook, idx) => (
              <Card key={idx} className="bg-secondary/30 border-border">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <playbook.icon className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-sm text-foreground">{playbook.scenario}</h3>
                  </div>
                  <div className="space-y-1">
                    {playbook.levers.map((lever, lIdx) => (
                      <div key={lIdx} className="p-2 bg-primary/10 border border-primary/30 rounded text-xs">
                        {lever}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full text-xs"
                      onClick={() => toast.success(`Example message generated for ${playbook.scenario}`)}
                    >
                      Generate Example Message
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full text-xs"
                      onClick={() => toast.info(`Simulating tone impact for ${playbook.scenario}`)}
                    >
                      Simulate Tone Impact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* MENA Sentiment Observatory */}
      <Card className="bg-gradient-to-br from-primary/5 via-card to-success/5 border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-success" />
            🌍 MENA Sentiment Observatory
          </CardTitle>
          <p className="text-sm text-muted-foreground">Live sentiment and tone mapping across Arabic media, business, and public channels</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Live Sentiment Indicators */}
          <div className="space-y-3">
            <div className="p-4 bg-success/10 border border-success/30 rounded-lg">
              <p className="text-sm text-foreground font-semibold mb-1 flex items-center gap-2">
                <Brain className="h-4 w-4 text-success" />
                Positive sentiment +6%
              </p>
              <p className="text-sm text-muted-foreground">
                Optimism rising in UAE energy and Saudi digital sectors.
              </p>
            </div>
            
            <div className="p-4 bg-secondary/30 border border-border rounded-lg">
              <p className="text-sm text-foreground font-semibold mb-1 flex items-center gap-2">
                <Brain className="h-4 w-4 text-muted-foreground" />
                Neutral tone in Egypt and Oman
              </p>
              <p className="text-sm text-muted-foreground">
                Cautious outlook on trade growth.
              </p>
            </div>
          </div>

          {/* Interactive Sentiment Bars */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">Regional Sentiment Breakdown</p>
            
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-foreground font-medium">UAE</span>
                  <span className="text-xs text-success font-semibold">+8% Positive</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-foreground font-medium">Saudi Arabia</span>
                  <span className="text-xs text-success font-semibold">+7% Positive</span>
                </div>
                <Progress value={82} className="h-2" />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-foreground font-medium">Qatar</span>
                  <span className="text-xs text-primary font-semibold">+4% Stable</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-foreground font-medium">Egypt</span>
                  <span className="text-xs text-muted-foreground font-semibold">Neutral</span>
                </div>
                <Progress value={58} className="h-2" />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-foreground font-medium">Oman</span>
                  <span className="text-xs text-muted-foreground font-semibold">Neutral</span>
                </div>
                <Progress value={55} className="h-2" />
              </div>
            </div>
          </div>

          {/* AI Trend Forecast */}
          <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
            <p className="text-sm text-foreground font-semibold mb-1 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              AI Trend Arrow
            </p>
            <p className="text-sm text-muted-foreground">
              Forecast: <span className="text-primary font-semibold">+4.2% optimism growth</span> next quarter.
            </p>
          </div>

          {/* Why It Works */}
          <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-accent">Why it works:</span> Feels alive and strategic — a live market mood indicator that ties emotional intelligence to MENA market data.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Transition Line */}
      <div className="text-center py-8 border-t border-border">
        <p className="text-sm text-muted-foreground mb-4">
          Current tools shown above. Below are upcoming AI capabilities available in the full Orbital Premium Suite.
        </p>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Premium Capabilities Section */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
            <Lock className="h-6 w-6 text-accent" />
            Premium Capabilities — The Future of Multilingual Executive Intelligence
          </h2>
        </div>

        {/* 1. Real-Time Multilingual Conversation Intelligence */}
        <Card 
          className="bg-gradient-to-br from-accent/5 via-card to-primary/5 border-accent/30 cursor-pointer hover:border-accent/50 transition-all duration-300 relative overflow-hidden"
          onClick={() => setShowPremiumModal(true)}
        >
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-accent/20 text-accent border-accent/30 gap-1">
              <Lock className="h-3 w-3" />
              Premium
            </Badge>
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Globe className="h-6 w-6 text-accent" />
              Real-Time Multilingual Conversation Intelligence
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Speak in English — be heard in Arabic, Chinese, or Urdu — with tone, emotion, and authority intact.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 p-4 bg-secondary/30 border border-border rounded-lg">
              <div className="flex items-start gap-3">
                <Mic className="h-5 w-5 text-primary mt-1" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground mb-1">You (English):</p>
                  <p className="text-sm text-muted-foreground italic">
                    "We value your partnership and want to move this forward quickly."
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-accent mt-1" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground mb-1">Arabic Output:</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    "نحن نقدر شراكتكم حقًا ونتطلع للمضي قدمًا في الوقت المناسب بما يليق بكم."
                  </p>
                  <Badge variant="outline" className="text-xs text-success border-success/30">
                    Tone: Respectful, Warm
                  </Badge>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mic className="h-5 w-5 text-accent mt-1" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground mb-1">Arabic Reply:</p>
                  <p className="text-sm text-muted-foreground">
                    "إن شاء الله سنراجع التفاصيل خلال الأسبوع."
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-primary mt-1" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground mb-1">You Hear:</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    "God willing, we'll review the details this week."
                  </p>
                  <Badge variant="outline" className="text-xs text-primary border-primary/30">
                    Tone: Reassuring
                  </Badge>
                </div>
              </div>
            </div>

            <div className="p-3 bg-accent/10 border border-accent/30 rounded-lg">
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-accent">Why it works:</span> Translates live speech-to-speech across English, Arabic, Urdu, and Chinese, keeping tone and emotion intact with indicators like "Tone: Diplomatic | Emotion: Respectful | Alignment: 96%"
              </p>
            </div>

            <div className="text-center pt-2">
              <p className="text-sm font-semibold text-accent">
                🔒 Available in Premium Version — Real-Time Language Bridge for Leaders
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 2. Strategic Negotiation Tone Twin */}
        <Card 
          className="bg-gradient-to-br from-primary/5 via-card to-accent/5 border-primary/30 cursor-pointer hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
          onClick={() => setShowPremiumModal(true)}
        >
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-accent/20 text-accent border-accent/30 gap-1">
              <Lock className="h-3 w-3" />
              Premium
            </Badge>
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Brain className="h-6 w-6 text-primary" />
              Strategic Negotiation Tone Twin
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Your AI listens, learns, and mirrors your ideal negotiation persona in any language.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 p-4 bg-secondary/30 border border-border rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-500 mt-1" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground mb-1">🤖 AI Alert:</p>
                  <p className="text-sm text-muted-foreground">
                    "Tone spike detected — soften phrasing."
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-success mt-1" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground mb-1">💬 Suggestion:</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    "Try 'I understand your concern completely.'"
                  </p>
                  <p className="text-xs text-muted-foreground italic">
                    AI instantly delivers this in Arabic — gentle, diplomatic, and trust-building.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 bg-primary/10 border border-primary/30 rounded-lg text-center">
                <p className="text-xs font-semibold text-primary">Investor Calm</p>
              </div>
              <div className="p-3 bg-accent/10 border border-accent/30 rounded-lg text-center">
                <p className="text-xs font-semibold text-accent">Negotiation Assertive</p>
              </div>
              <div className="p-3 bg-success/10 border border-success/30 rounded-lg text-center">
                <p className="text-xs font-semibold text-success">Diplomatic Harmony</p>
              </div>
            </div>

            <div className="p-3 bg-primary/10 border border-primary/30 rounded-lg">
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-primary">Why it works:</span> Learns your voice and adapts your tone across cultures using personalized modes for different negotiation contexts.
              </p>
            </div>

            <div className="text-center pt-2">
              <p className="text-sm font-semibold text-accent">
                🔒 Unlock in Premium Suite — Your AI Negotiation Twin
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 3. Global Executive Insight Stream */}
        <Card 
          className="bg-gradient-to-br from-success/5 via-card to-primary/5 border-success/30 cursor-pointer hover:border-success/50 transition-all duration-300 relative overflow-hidden"
          onClick={() => setShowPremiumModal(true)}
        >
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-accent/20 text-accent border-accent/30 gap-1">
              <Lock className="h-3 w-3" />
              Premium
            </Badge>
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Users className="h-6 w-6 text-success" />
              Global Executive Insight Stream
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Your meetings talk to you — AI listens to multilingual calls and delivers live emotional intelligence.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 p-4 bg-secondary/30 border border-border rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <Brain className="h-4 w-4 text-success" />
                <p className="text-foreground font-semibold">
                  "Arabic speaker tone softened — confidence rising."
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Brain className="h-4 w-4 text-orange-500" />
                <p className="text-foreground font-semibold">
                  "Chinese partner sentiment shifted to cautious after pricing discussion."
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground">Participant</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground">Language</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground">Tone Trend</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground">Sentiment</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground">Trust Index</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-3 text-foreground">CEO (EN)</td>
                    <td className="py-2 px-3 text-muted-foreground">English</td>
                    <td className="py-2 px-3 text-muted-foreground">Stable</td>
                    <td className="py-2 px-3 text-success">Confident</td>
                    <td className="py-2 px-3 text-success font-semibold">93%</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-3 text-foreground">Partner A</td>
                    <td className="py-2 px-3 text-muted-foreground">Arabic</td>
                    <td className="py-2 px-3 text-success">Positive</td>
                    <td className="py-2 px-3 text-success">Respectful</td>
                    <td className="py-2 px-3 text-success font-semibold">88%</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-foreground">Partner B</td>
                    <td className="py-2 px-3 text-muted-foreground">Chinese</td>
                    <td className="py-2 px-3 text-orange-500">Tentative</td>
                    <td className="py-2 px-3 text-muted-foreground">Neutral</td>
                    <td className="py-2 px-3 text-orange-500 font-semibold">72%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-success/10 border border-success/30 rounded-lg">
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-success">Why it works:</span> Transforms multilingual meetings into a live cultural radar — identifying tone shifts and emotional trends in real time.
              </p>
            </div>

            <div className="text-center pt-2">
              <p className="text-sm font-semibold text-accent">
                🔒 Premium Global Intelligence — Meeting Emotion Radar
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Premium Modal */}
      {showPremiumModal && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-300"
          onClick={() => setShowPremiumModal(false)}
        >
          <Card className="w-full max-w-md mx-4 border-2 border-accent/30 shadow-2xl bg-card/95 animate-in scale-in duration-300">
            <CardContent className="pt-8 pb-8 text-center space-y-4">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-accent/10 border border-accent/30">
                  <Lock className="w-12 h-12 text-accent" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Available in Premium Version
              </h2>
              <p className="text-lg text-muted-foreground">
                This advanced feature is available in the full Orbital Premium Edition.
              </p>
              <p className="text-sm text-muted-foreground/70 pt-2 border-t border-border/50">
                Unlock the future of multilingual executive intelligence
              </p>
            </CardContent>
          </Card>
        </div>
      )}

    </div>
  );
}
