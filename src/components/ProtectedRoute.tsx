import { useEffect, useState, ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Onboarding } from "./Onboarding";
import { WelcomeBack } from "./WelcomeBack";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [checkingProfile, setCheckingProfile] = useState(true);
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean | null>(null);
  const [profileData, setProfileData] = useState<{
    full_name: string | null;
    company_name: string | null;
    total_logins: number | null;
    last_login_at: string | null;
  } | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);

  // Dev testing mode
  const isPreviewEnv = window.location.hostname.includes("lovable.app") || 
                       window.location.hostname.includes("localhost");
  const forceOnboarding = searchParams.get("force-onboarding") === "true";
  const forceWelcome = searchParams.get("force-welcome") === "true";
  const isDevTestingMode = isPreviewEnv && (forceOnboarding || forceWelcome);

  // Handle dev testing mode
  useEffect(() => {
    if (isDevTestingMode) {
      setCheckingProfile(false);
      if (forceOnboarding) {
        setShowOnboarding(true);
        setShowWelcomeBack(false);
      } else if (forceWelcome) {
        setShowOnboarding(false);
        setShowWelcomeBack(true);
        setProfileData({
          full_name: "Test User",
          company_name: "Test Company",
          total_logins: 5,
          last_login_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        });
      }
    }
  }, [isDevTestingMode, forceOnboarding, forceWelcome]);

  // Check authentication and profile
  useEffect(() => {
    if (isDevTestingMode) return;

    if (!loading && !user) {
      navigate("/auth", { replace: true });
      return;
    }

    if (user) {
      checkUserProfile();
    }
  }, [user, loading, navigate, isDevTestingMode]);

  const checkUserProfile = async () => {
    if (!user) return;

    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("onboarding_completed, full_name, company_name, total_logins, last_login_at")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching profile:", error);
      }

      const completed = profile?.onboarding_completed ?? false;
      setOnboardingCompleted(completed);
      setProfileData(profile);

      if (!completed) {
        setShowOnboarding(true);
      } else {
        // Check if we've already shown WelcomeBack this session
        const alreadyWelcomed = sessionStorage.getItem("orbital_welcomed_this_session");
        if (!alreadyWelcomed) {
          setShowWelcomeBack(true);
        }
      }
    } catch (err) {
      console.error("Error checking profile:", err);
      // Default to showing onboarding if profile check fails
      setShowOnboarding(true);
    } finally {
      setCheckingProfile(false);
    }
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setOnboardingCompleted(true);
    sessionStorage.setItem("orbital_greeted_this_session", "true");
  };

  const handleWelcomeBackComplete = () => {
    setShowWelcomeBack(false);
    sessionStorage.setItem("orbital_welcomed_this_session", "true");
    sessionStorage.setItem("orbital_greeted_this_session", "true");
  };

  // Loading state
  if (loading || checkingProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-cyan to-accent opacity-80 animate-[spin_2s_linear_infinite]" />
          <div className="absolute inset-2 rounded-full bg-background" />
        </div>
        {isPreviewEnv && !user && (
          <div className="absolute top-4 left-4 px-2 py-1 bg-warning/20 text-warning text-xs rounded">
            DEV MODE (Auth Bypassed)
          </div>
        )}
      </div>
    );
  }

  // Dev testing mode indicator
  const devModeIndicator = isDevTestingMode && (
    <div className="fixed top-4 left-4 z-[100] px-3 py-1.5 bg-warning/20 text-warning text-xs rounded-full border border-warning/30">
      DEV MODE: {forceOnboarding ? "Force Onboarding" : "Force WelcomeBack"}
    </div>
  );

  // Show Onboarding
  if (showOnboarding) {
    return (
      <>
        {devModeIndicator}
        <Onboarding onComplete={handleOnboardingComplete} />
      </>
    );
  }

  // Show WelcomeBack
  if (showWelcomeBack && profileData) {
    return (
      <>
        {devModeIndicator}
        <WelcomeBack
          userName={profileData.full_name || "Executive"}
          companyName={profileData.company_name || "Your Company"}
          totalLogins={profileData.total_logins || 1}
          lastLoginAt={profileData.last_login_at}
          onComplete={handleWelcomeBackComplete}
        />
      </>
    );
  }

  // Render protected content
  return (
    <>
      {devModeIndicator}
      {children}
    </>
  );
}
