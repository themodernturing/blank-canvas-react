import React, { createContext, useContext, ReactNode } from 'react';
import { useVoice } from '@/hooks/useVoice';

interface VoiceContextType {
  speak: (text: string, options?: { priority?: 'high' | 'medium' | 'low'; onStart?: () => void; onEnd?: () => void; onError?: (error: Error) => void }) => void;
  speakOnce: (key: string, text: string, options?: { priority?: 'high' | 'medium' | 'low'; onStart?: () => void; onEnd?: () => void; onError?: (error: Error) => void }) => void;
  stop: () => void;
  isSpeaking: boolean;
  isMuted: boolean;
  toggleMute: () => void;
  clearSessionMemory: () => void;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export function VoiceProvider({ children }: { children: ReactNode }) {
  const voice = useVoice();

  return (
    <VoiceContext.Provider value={voice}>
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoiceContext() {
  const context = useContext(VoiceContext);
  if (context === undefined) {
    throw new Error('useVoiceContext must be used within a VoiceProvider');
  }
  return context;
}
