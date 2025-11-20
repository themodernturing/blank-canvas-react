import React, { createContext, useContext, useState, useEffect } from 'react';

interface PersonalizationData {
  name: string;
  company: string;
}

interface PersonalizationContextType {
  personalization: PersonalizationData | null;
  setPersonalization: (data: PersonalizationData) => void;
  clearPersonalization: () => void;
}

const PersonalizationContext = createContext<PersonalizationContextType | undefined>(undefined);

export function PersonalizationProvider({ children }: { children: React.ReactNode }) {
  const [personalization, setPersonalizationState] = useState<PersonalizationData | null>(() => {
    const stored = localStorage.getItem('orbital_personalization');
    return stored ? JSON.parse(stored) : null;
  });

  const setPersonalization = (data: PersonalizationData) => {
    setPersonalizationState(data);
    localStorage.setItem('orbital_personalization', JSON.stringify(data));
  };

  const clearPersonalization = () => {
    setPersonalizationState(null);
    localStorage.removeItem('orbital_personalization');
  };

  return (
    <PersonalizationContext.Provider value={{ personalization, setPersonalization, clearPersonalization }}>
      {children}
    </PersonalizationContext.Provider>
  );
}

export function usePersonalization() {
  const context = useContext(PersonalizationContext);
  if (context === undefined) {
    throw new Error('usePersonalization must be used within a PersonalizationProvider');
  }
  return context;
}
