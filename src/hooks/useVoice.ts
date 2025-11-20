import { useState, useRef, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface VoiceOptions {
  voiceId?: string;
  priority?: 'high' | 'medium' | 'low';
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: Error) => void;
}

interface QueueItem {
  text: string;
  options?: VoiceOptions;
  priority: number;
}

// Session memory for one-time greetings
const sessionGreetings = new Set<string>();

export function useVoice() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem('voiceMuted') === 'true';
  });
  const queueRef = useRef<QueueItem[]>([]);
  const isProcessingRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const processQueue = useCallback(async () => {
    if (isProcessingRef.current || queueRef.current.length === 0 || isMuted) {
      return;
    }

    // Sort queue by priority (higher number = higher priority)
    queueRef.current.sort((a, b) => b.priority - a.priority);

    isProcessingRef.current = true;
    const { text, options } = queueRef.current.shift()!;

    try {
      setIsSpeaking(true);
      options?.onStart?.();

      // Call ElevenLabs TTS via edge function
      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { 
          text,
          voiceId: options?.voiceId || '21m00Tcm4TlvDq8ikWAM' // Rachel voice
        }
      });

      if (error) {
        // Check for quota error
        if (error.message?.includes('QUOTA_EXCEEDED')) {
          toast({
            title: "ElevenLabs Credits Depleted",
            description: "Please add more credits at elevenlabs.io to continue using voice features.",
            variant: "destructive",
          });
        }
        throw error;
      }
      
      if (!data?.audioContent) throw new Error('No audio content received');

      // Convert base64 to audio blob and play
      const audioBlob = new Blob(
        [Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0))],
        { type: 'audio/mpeg' }
      );
      const audioUrl = URL.createObjectURL(audioBlob);
      
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.volume = 1.0;

      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        setIsSpeaking(false);
        options?.onEnd?.();
        isProcessingRef.current = false;
        audioRef.current = null;
        processQueue();
      };

      audio.onerror = (event) => {
        console.error('Audio playback error:', event);
        URL.revokeObjectURL(audioUrl);
        const error = new Error('Audio playback failed');
        options?.onError?.(error);
        setIsSpeaking(false);
        isProcessingRef.current = false;
        audioRef.current = null;
        processQueue();
      };

      // Play with user interaction handling
      try {
        await audio.play();
      } catch (playError: any) {
        if (playError.name === 'NotAllowedError') {
          console.warn('Autoplay prevented - user interaction required first');
          URL.revokeObjectURL(audioUrl);
          setIsSpeaking(false);
          isProcessingRef.current = false;
          audioRef.current = null;
          processQueue();
        } else {
          throw playError;
        }
      }
    } catch (error) {
      console.error('Voice synthesis error:', error);
      const err = error instanceof Error ? error : new Error('Unknown error');
      options?.onError?.(err);
      setIsSpeaking(false);
      isProcessingRef.current = false;
      processQueue();
    }
  }, [isMuted]);

  const speak = useCallback((text: string, options?: VoiceOptions) => {
    const priorityMap = { high: 3, medium: 2, low: 1 };
    const priority = priorityMap[options?.priority || 'medium'];
    
    // Handle pause separators ("|")
    if (text.includes('|')) {
      const segments = text.split('|');
      segments.forEach((segment, index) => {
        const segmentText = segment.trim();
        if (segmentText) {
          queueRef.current.push({ 
            text: segmentText, 
            options: {
              ...options,
              onEnd: index < segments.length - 1 
                ? () => {
                    // Add 1-second pause between segments
                    setTimeout(() => {
                      options?.onEnd?.();
                    }, 1000);
                  }
                : options?.onEnd
            }, 
            priority 
          });
        }
      });
    } else {
      queueRef.current.push({ text, options, priority });
    }
    
    processQueue();
  }, [processQueue]);

  const speakOnce = useCallback((key: string, text: string, options?: VoiceOptions) => {
    if (sessionGreetings.has(key)) {
      return; // Already spoken in this session
    }
    sessionGreetings.add(key);
    speak(text, options);
  }, [speak]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    
    queueRef.current = [];
    setIsSpeaking(false);
    isProcessingRef.current = false;
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newMuted = !prev;
      localStorage.setItem('voiceMuted', String(newMuted));
      if (newMuted) {
        stop();
      }
      return newMuted;
    });
  }, [stop]);

  const clearSessionMemory = useCallback(() => {
    sessionGreetings.clear();
  }, []);

  return {
    speak,
    speakOnce,
    stop,
    isSpeaking,
    isMuted,
    toggleMute,
    clearSessionMemory
  };
}
