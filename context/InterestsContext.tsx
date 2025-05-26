import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type InterestsContextType = {
  allInterests: string[];
  displayedInterests: string[];
  updateInterests: (interests: string[]) => Promise<void>;
};

const InterestsContext = createContext<InterestsContextType | undefined>(undefined);

export function InterestsProvider({ children }: { children: React.ReactNode }) {
  const [allInterests, setAllInterests] = useState<string[]>([]);
  const [displayedInterests, setDisplayedInterests] = useState<string[]>([]);

  useEffect(() => {
    loadInterests();
  }, []);

  const loadInterests = async () => {
    try {
      const storedInterests = await AsyncStorage.getItem('allInterests');
      const storedDisplayed = await AsyncStorage.getItem('displayedInterests');
      
      if (storedInterests) {
        setAllInterests(JSON.parse(storedInterests));
      }
      if (storedDisplayed) {
        setDisplayedInterests(JSON.parse(storedDisplayed));
      }
    } catch (error) {
      console.error('Error loading interests:', error);
    }
  };

  const updateInterests = async (newInterests: string[]) => {
    try {
      // Save all interests
      await AsyncStorage.setItem('allInterests', JSON.stringify(newInterests));
      setAllInterests(newInterests);

      // Randomly select 5 interests to display
      const shuffled = [...newInterests].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 5);
      
      await AsyncStorage.setItem('displayedInterests', JSON.stringify(selected));
      setDisplayedInterests(selected);
    } catch (error) {
      console.error('Error updating interests:', error);
    }
  };

  return (
    <InterestsContext.Provider value={{ allInterests, displayedInterests, updateInterests }}>
      {children}
    </InterestsContext.Provider>
  );
}

export function useInterests() {
  const context = useContext(InterestsContext);
  if (context === undefined) {
    throw new Error('useInterests must be used within an InterestsProvider');
  }
  return context;
} 