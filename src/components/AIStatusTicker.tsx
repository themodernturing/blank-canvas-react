import { useEffect, useState } from "react";

const statusUpdates = [
  "Scanning vendor reliability metrics…",
  "Reanalyzing market expansion forecast…",
  "Compliance logs updated…",
  "Tone shift detected in negotiation thread…",
  "Forecast refreshed successfully.",
  "Risk assessment cycle complete…",
  "Strategic alignment verified…",
  "Performance benchmarks updated…"
];

export function AIStatusTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % statusUpdates.length);
        setIsVisible(true);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-40 px-6 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-accent/20 shadow-sm">
      <div
        className={`text-xs text-muted-foreground flex items-center gap-2 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
        {statusUpdates[currentIndex]}
      </div>
    </div>
  );
}
