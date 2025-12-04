import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useVoice } from "@/hooks/useVoice";
import { Volume2, VolumeX } from "lucide-react";

interface WelcomeBackProps {
  userName: string;
  companyName: string;
  totalLogins: number;
  lastLoginAt: string | null;
  onComplete: () => void;
}

export function WelcomeBack({
  userName,
  companyName,
  totalLogins,
  lastLoginAt,
  onComplete,
}: WelcomeBackProps) {
  const [phase, setPhase] = useState<"syncing" | "greeting">("syncing");
  const [syncStep, setSyncStep] = useState(0);
  const [isEntering, setIsEntering] = useState(false);
  const { speak, stop, isMuted, toggleMute } = useVoice();
  const speakRef = useRef(speak);
  const stopRef = useRef(stop);

  useEffect(() => {
    speakRef.current = speak;
    stopRef.current = stop;
  }, [speak, stop]);

  const syncMessages = [
    "Reconnecting to ORBITAL...",
    "Syncing your executive data...",
    "Restoring command center...",
  ];

  // Calculate days since last login
  const daysSinceLastLogin = lastLoginAt
    ? Math.floor((Date.now() - new Date(lastLoginAt).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  // Sync sequence
  useEffect(() => {
    // Start sync sequence with voice
    speakRef.current("Reconnecting to ORBITAL.");

    const timers: NodeJS.Timeout[] = [];

    // Step 2: 4 seconds
    timers.push(
      setTimeout(() => {
        setSyncStep(1);
        speakRef.current("Syncing your executive data.");
      }, 4000)
    );

    // Step 3: 8 seconds
    timers.push(
      setTimeout(() => {
        setSyncStep(2);
        speakRef.current("Restoring command center.");
      }, 8000)
    );

    // Transition to greeting: 12 seconds
    timers.push(
      setTimeout(() => {
        setPhase("greeting");
      }, 12000)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  const handleEnter = () => {
    if (isEntering) return;
    setIsEntering(true);
    
    stopRef.current();
    
    setTimeout(() => {
      speakRef.current(`Welcome back, ${userName}. ORBITAL is ready for ${companyName}.`);
    }, 300);

    setTimeout(() => {
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

      {/* Syncing Phase */}
      {phase === "syncing" && (
        <div className="relative z-10 flex flex-col items-center gap-8 animate-fade-in">
          {/* Spinning/pulsing orb */}
          <div className="relative w-28 h-28">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-cyan to-accent opacity-80 animate-[spin_2s_linear_infinite]" />
            <div className="absolute inset-2 rounded-full bg-background" />
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/50 via-cyan/50 to-accent/50 blur-md animate-pulse" />
          </div>

          <div className="text-center space-y-4 min-h-[80px]">
            <p className="text-xl text-muted-foreground animate-fade-in">
              {syncMessages[syncStep]}
            </p>
            
            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2">
              {syncMessages.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index <= syncStep
                      ? "bg-primary scale-100"
                      : "bg-muted scale-75"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Greeting Phase */}
      {phase === "greeting" && (
        <div className="relative z-10 flex flex-col items-center gap-8 animate-fade-in max-w-md px-4">
          {/* Glowing orb */}
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-cyan to-accent opacity-90 animate-[spin_8s_linear_infinite]" />
            <div className="absolute inset-2 rounded-full bg-background" />
            <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl animate-pulse" />
          </div>

          {/* Greeting card */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 space-y-6 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, {userName}
              </h1>
              <p className="text-muted-foreground">
                {companyName} Command Center
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{totalLogins}</p>
                <p className="text-xs text-muted-foreground">Session #{totalLogins}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-cyan">
                  {daysSinceLastLogin === 0 ? "Today" : `${daysSinceLastLogin}d`}
                </p>
                <p className="text-xs text-muted-foreground">
                  {daysSinceLastLogin === 0 ? "Last visit" : "Since last visit"}
                </p>
              </div>
            </div>
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
