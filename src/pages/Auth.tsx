import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Zap, BarChart3, Shield, ArrowRight } from "lucide-react";

export default function Auth() {
  const { user, signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleSignIn = async () => {
    await signInWithGoogle();
  };

  const features = [
    {
      icon: Zap,
      title: "Rapid Decision Intelligence",
      description: "Transform complex data into instant executive insights",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: BarChart3,
      title: "Predictive Analytics",
      description: "AI-powered forecasting for strategic advantage",
      color: "text-cyan",
      bgColor: "bg-cyan/10",
    },
    {
      icon: Shield,
      title: "Executive Command",
      description: "Centralized control over all business operations",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-cyan to-accent opacity-80 animate-[spin_2s_linear_infinite]" />
          <div className="absolute inset-2 rounded-full bg-background" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12 overflow-hidden relative">
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan/10 rounded-full blur-[120px]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8 max-w-4xl w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-primary">Executive Command Center</span>
        </div>

        {/* Logo / Title */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-primary tracking-tight">
            ORBITAL
          </h1>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto">
            Your AI-Powered Executive Command Center for Instant Strategic Intelligence
          </p>
        </div>

        {/* Sign in button */}
        <div className="flex flex-col items-center gap-3">
          <Button
            onClick={handleSignIn}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow px-8 py-6 text-lg gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
            <ArrowRight className="w-5 h-5" />
          </Button>
          <p className="text-sm text-muted-foreground">
            No credit card required • Instant access • Enterprise-grade security
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 space-y-4 hover:border-primary/30 transition-colors"
            >
              <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA section */}
        <div className="w-full mt-12 bg-card/30 backdrop-blur-sm border border-border rounded-2xl p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Join Elite Executives</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Experience the future of executive decision-making with AI-powered intelligence at your fingertips
          </p>
          <Button
            onClick={handleSignIn}
            variant="outline"
            size="lg"
            className="border-primary/50 text-primary hover:bg-primary/10"
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </div>
  );
}
