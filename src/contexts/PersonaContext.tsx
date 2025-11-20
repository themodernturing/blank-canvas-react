import React, { createContext, useContext, ReactNode, useCallback, useState } from 'react';
import { useVoiceContext } from './VoiceContext';

type PersonaType = 'narrator' | 'nexus' | 'luna' | 'aras' | 'selene' | 'faris' | 'lyra' | 'orion' | 'nova';

interface SpeakOptions {
  key?: string;
  priority?: 'high' | 'medium' | 'low';
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: Error) => void;
}

interface PersonaContextType {
  currentPersona: PersonaType;
  switchPersona: (persona: PersonaType, introText?: string) => Promise<void>;
  speakAsPersona: (text: string, persona?: PersonaType, options?: SpeakOptions) => void;
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export function PersonaProvider({ children }: { children: ReactNode }) {
  const { speak, speakOnce, stop, isSpeaking } = useVoiceContext();
  const [currentPersona, setCurrentPersona] = useState<PersonaType>('narrator');

  const switchPersona = useCallback(async (persona: PersonaType, introText?: string) => {
    // Stop any current speech
    if (isSpeaking) {
      stop();
      // Wait for fade out
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    setCurrentPersona(persona);

    // Play subtle chime (using a very brief tone)
    if (persona !== 'narrator') {
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    }

    // Wait for chime + fade-in delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Speak intro if provided
    if (introText) {
      speak(introText, { priority: 'high' });
    }
  }, [speak, stop, isSpeaking]);

  const speakAsPersona = useCallback((text: string, persona?: PersonaType, options?: SpeakOptions) => {
    const voiceOptions = {
      priority: options?.priority || 'medium',
      onStart: options?.onStart,
      onEnd: options?.onEnd,
      onError: options?.onError,
    };

    if (persona && persona !== currentPersona) {
      // Switch persona and speak - switchPersona handles the speaking
      switchPersona(persona, text);
      return; // Return early to prevent duplicate speaking
    }
    
    // Only speak if we're not switching personas
    if (options?.key) {
      speakOnce(options.key, text, voiceOptions);
    } else {
      speak(text, voiceOptions);
    }
  }, [speak, speakOnce, currentPersona, switchPersona]);

  return (
    <PersonaContext.Provider value={{ currentPersona, switchPersona, speakAsPersona }}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  const context = useContext(PersonaContext);
  if (context === undefined) {
    throw new Error('usePersona must be used within a PersonaProvider');
  }
  return context;
}
