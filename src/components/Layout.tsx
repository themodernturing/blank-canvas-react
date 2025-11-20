import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Brain, LogOut, Volume2, VolumeX } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AIEvolutionModal } from "@/components/AIEvolutionModal";
import { useVoiceContext } from "@/contexts/VoiceContext";

interface LayoutProps {
  children: React.ReactNode;
  onExit?: () => void;
}

export function Layout({ children, onExit }: LayoutProps) {
  const [showEvolution, setShowEvolution] = useState(false);
  const { isMuted, toggleMute } = useVoiceContext();
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-50 h-14 border-b border-border flex items-center justify-between px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <SidebarTrigger />
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className="gap-2 text-xs"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              {onExit && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onExit}
                  className="gap-2 text-xs text-accent hover:text-accent/80 hover:bg-accent/10"
                >
                  End Session
                  <LogOut className="h-3 w-3" />
                </Button>
              )}
            </div>
          </header>
          <main className="flex-1 p-6 transition-opacity duration-300 ease-in-out">
            {children}
          </main>
          <footer className="h-10 border-t border-border flex items-center justify-center px-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowEvolution(true)}
              className="gap-2 text-xs text-muted-foreground hover:text-foreground"
            >
              <Brain className="h-3 w-3" />
              AI Evolution Log
            </Button>
          </footer>
        </div>
        <AIEvolutionModal open={showEvolution} onOpenChange={setShowEvolution} />
      </div>
    </SidebarProvider>
  );
}
