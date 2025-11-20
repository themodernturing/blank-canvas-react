import { Button } from "@/components/ui/button";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { useVoiceContext } from "@/contexts/VoiceContext";
import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface FarewellProps {
  onRestart: () => void;
}

export function Farewell({ onRestart }: FarewellProps) {
  const { personalization } = usePersonalization();
  const { speak, isMuted, toggleMute } = useVoiceContext();
  const [textPhase, setTextPhase] = useState(0);

  useEffect(() => {
    // Initial voice message
    speak("Powering down executive systems…");
    
    setTimeout(() => {
      speak("Thank you for using ORBITAL. Your foresight grows stronger each time we connect.");
    }, 2000);

    setTimeout(() => {
      speak(`Pleasure working with you, CEO ${personalization?.name || ""}. ORBITAL will be ready when you return.`);
    }, 5000);

    const timer = setInterval(() => {
      setTextPhase((prev) => (prev < 4 ? prev + 1 : prev));
    }, 2000);

    return () => clearInterval(timer);
  }, [personalization, speak]);

  return (
    <div className="min-h-screen w-full bg-[#0A1628] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Mute toggle */}
      <button
        onClick={toggleMute}
        className="absolute top-6 right-6 z-50 p-2 rounded-full bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors border border-border"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5 text-muted-foreground" />
        ) : (
          <Volume2 className="h-5 w-5 text-accent" />
        )}
      </button>

      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      </div>

      {/* ORBITAL Sphere */}
      <div className="relative z-10 mb-12">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/40 to-primary/10 border-2 border-primary/30 animate-[spin_8s_linear_infinite] flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/60 to-primary/20 border border-primary/40" />
        </div>
      </div>

      {/* Animated Text Sequence */}
      <div className="relative z-10 max-w-2xl text-center space-y-8 px-6">
        <div
          className={`transition-opacity duration-1000 ${
            textPhase >= 0 ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="text-4xl font-bold text-white mb-2">ORBITAL signing off...</h1>
        </div>

        <div
          className={`transition-opacity duration-1000 ${
            textPhase >= 1 ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-lg text-white/80">
            Thank you for spending time in your Executive Command Center.
          </p>
        </div>

        <div
          className={`transition-opacity duration-1000 ${
            textPhase >= 2 ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-base text-white/70 leading-relaxed">
            The more you communicate with ORBITAL,<br />
            the smarter and more attuned it becomes to your leadership style.<br />
            Every decision, every insight refines its intelligence.
          </p>
        </div>

        <div
          className={`transition-opacity duration-1000 ${
            textPhase >= 3 ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-base text-white/70 leading-relaxed">
            Together, you and ORBITAL are building<br />
            a smarter, more adaptive future for {personalization?.company || "your organization"}.
          </p>
        </div>

        <div
          className={`transition-opacity duration-1000 ${
            textPhase >= 4 ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-lg text-white/90">
            See you soon, CEO {personalization?.name || ""}.<br />
            ORBITAL will be ready when you return.
          </p>
        </div>
      </div>

      {/* Restart Button */}
      <div
        className={`relative z-10 mt-16 transition-opacity duration-1000 ${
          textPhase >= 4 ? "opacity-100" : "opacity-0"
        }`}
      >
        <Button
          onClick={onRestart}
          className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-lg rounded-full shadow-glow transition-all duration-300 hover:scale-105"
        >
          Restart ORBITAL →
        </Button>
      </div>
    </div>
  );
}
