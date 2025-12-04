import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { useVoice } from "@/hooks/useVoice";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Volume2, VolumeX } from "lucide-react";

interface OnboardingProps {
  onComplete: () => void;
}

const TOTAL_ONBOARDING_DURATION_MS = 19000;

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [isInitializing, setIsInitializing] = useState(false);
  const [initializationStep, setInitializationStep] = useState(0);
  const [showText, setShowText] = useState(false);
  const [isDebouncing, setIsDebouncing] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const { setPersonalization } = usePersonalization();
  const { speak, stop, isMuted, toggleMute, isSpeaking } = useVoice();
  const { user } = useAuth();
  
  const speakRef = useRef(speak);
  const stopRef = useRef(stop);

  useEffect(() => {
    speakRef.current = speak;
    stopRef.current = stop;
  }, [speak, stop]);

  const initializationMessages = [
    "Initializing executive intelligence environment...",
    "Analyzing company systems...",
    "Preparing foresight modules...",
    "Finalizing your personalized setup..."
  ];

  // Voice welcome on mount
  useEffect(() => {
    if (step === 1) {
      speakRef.current("Welcome to ORBITAL — your digital AI companion.");
    } else if (step === 2 && !isInitializing) {
      speakRef.current("To begin, please enter your name and company to initialize your AI environment.");
    }
  }, [step, isInitializing]);

  const handleStart = () => {
    setStep(2);
  };

  const handleInitialize = () => {
    if (!name.trim() || !company.trim() || isDebouncing) return;
    
    setIsDebouncing(true);
    setIsInitializing(true);
    setInitializationStep(0);
    setShowText(false);

    // t=0.0s: First voice line + text fade
    speakRef.current("Initializing executive intelligence environment…");
    setTimeout(() => setShowText(true), 500);

    // t=4.5s: Second voice line
    setTimeout(() => {
      setShowText(false);
      speakRef.current("Analyzing company systems…");
    }, 4500);
    setTimeout(() => {
      setInitializationStep(1);
      setShowText(true);
    }, 5000);

    // t=9.0s: Third voice line
    setTimeout(() => {
      setShowText(false);
      speakRef.current("Preparing foresight modules…");
    }, 9000);
    setTimeout(() => {
      setInitializationStep(2);
      setShowText(true);
    }, 9500);

    // t=13.5s: Fourth voice line
    setTimeout(() => {
      setShowText(false);
      speakRef.current("Finalizing your personalized setup…");
    }, 13500);
    setTimeout(() => {
      setInitializationStep(3);
      setShowText(true);
    }, 14000);

    // t=19.0s: Transition to completion screen
    setTimeout(() => {
      setShowText(false);
      speakRef.current("Initialization complete. Your AI companion is ready.");
      setStep(3);
      setIsInitializing(false);
      setIsDebouncing(false);
    }, TOTAL_ONBOARDING_DURATION_MS);
  };

  const handleEnter = async () => {
    if (isEntering) return;
    setIsEntering(true);

    // Stop any current voice
    stopRef.current();

    // Save to database if user is authenticated
    if (user) {
      try {
        const { error } = await supabase.from("profiles").upsert(
          {
            user_id: user.id,
            full_name: name.trim(),
            company_name: company.trim(),
            onboarding_completed: true,
            email: user.email,
          },
          { onConflict: "user_id" }
        );

        if (error) {
          console.error("Error saving profile:", error);
          toast.error("Failed to save profile. Please try again.");
          setIsEntering(false);
          return;
        }
      } catch (err) {
        console.error("Error saving profile:", err);
        toast.error("Failed to save profile. Please try again.");
        setIsEntering(false);
        return;
      }
    }

    // Set greeting flag before speaking
    sessionStorage.setItem("orbital_greeted_this_session", "true");

    // Delay slightly before voice
    setTimeout(() => {
      speakRef.current(`Good morning, CEO ${name}. ORBITAL systems are now active for ${company}.`);
    }, 300);

    // Save to local personalization and complete
    setTimeout(() => {
      setPersonalization({ name: name.trim(), company: company.trim() });
      onComplete();
    }, 4500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center overflow-hidden">
      {/* Mute toggle */}
      <button
        onClick={toggleMute}
        className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5 text-foreground" />
        ) : (
          <Volume2 className="h-5 w-5 text-accent" />
        )}
      </button>

      {/* Ambient background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      </div>

      {/* Step 1: Welcome */}
      {step === 1 && (
        <div className="relative z-10 flex flex-col items-center gap-8 animate-fade-in">
          {/* Rotating ORBITAL sphere */}
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-cyan to-accent opacity-80 animate-[spin_8s_linear_infinite]" />
            <div className="absolute inset-2 rounded-full bg-background" />
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/50 via-cyan/50 to-accent/50 blur-md animate-pulse" />
          </div>

          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Welcome to ORBITAL</h1>
            <p className="text-lg text-muted-foreground">Your Digital AI Companion</p>
          </div>

          <Button 
            onClick={handleStart}
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 min-w-[200px] shadow-glow"
          >
            Start
          </Button>
        </div>
      )}

      {/* Step 2: Initialization & Personalization */}
      {step === 2 && !isInitializing && (
        <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-md px-4 animate-fade-in">
          {/* Smaller orb */}
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-cyan to-accent opacity-60 animate-[spin_8s_linear_infinite]" />
            <div className="absolute inset-1 rounded-full bg-background" />
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Initialize ORBITAL</h2>
            <p className="text-sm text-muted-foreground">Please enter your details to initialize your AI environment.</p>
          </div>

          <div className="w-full space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Your Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="bg-card border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-foreground">Company Name</Label>
              <Input
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Enter company name"
                className="bg-card border-border"
              />
            </div>

            <Button 
              onClick={handleInitialize}
              disabled={!name.trim() || !company.trim() || isDebouncing}
              size="lg"
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow"
            >
              Initialize ORBITAL →
            </Button>
          </div>
        </div>
      )}

      {/* Step 2b: Initializing animation */}
      {step === 2 && isInitializing && (
        <div className="relative z-10 flex flex-col items-center gap-8 animate-fade-in">
          {/* Faster spinning orb during initialization with brightness sync */}
          <div className="relative w-24 h-24">
            <div 
              className={`absolute inset-0 rounded-full bg-gradient-to-br from-primary via-cyan to-accent animate-[spin_2s_linear_infinite] transition-opacity duration-300 ${
                isSpeaking ? 'opacity-100' : 'opacity-80'
              }`} 
            />
            <div className="absolute inset-2 rounded-full bg-background" />
            <div 
              className={`absolute inset-4 rounded-full bg-gradient-to-br from-primary/50 via-cyan/50 to-accent/50 blur-md animate-pulse transition-opacity duration-300 ${
                isSpeaking ? 'opacity-100' : 'opacity-70'
              }`} 
            />
          </div>

          <div className="text-center space-y-4 min-h-[60px]">
            <p 
              className={`text-lg text-muted-foreground transition-opacity duration-500 ${
                showText ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {initializationMessages[initializationStep]}
            </p>
          </div>
        </div>
      )}

      {/* Step 3: Initialization Complete */}
      {step === 3 && (
        <div className="relative z-10 flex flex-col items-center gap-8 animate-fade-in">
          {/* Glowing orb */}
          <div className="relative w-28 h-28">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-cyan to-accent opacity-90 animate-[spin_8s_linear_infinite]" />
            <div className="absolute inset-2 rounded-full bg-background" />
            <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl animate-pulse" />
          </div>

          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Initialization Complete</h2>
            <p className="text-lg text-muted-foreground">Your AI Companion is ready.</p>
          </div>

          <Button 
            onClick={handleEnter}
            disabled={isEntering}
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 min-w-[200px] shadow-glow"
          >
            {isEntering ? "Entering..." : "Enter ORBITAL →"}
          </Button>
        </div>
      )}
    </div>
  );
}
