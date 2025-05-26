import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { db } from '../utils/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

interface Interest {
  id: string;
  emoji: string;
  label: string;
}

interface UserData {
  name: string;
  image: string | null;
  bio: string;
  interests: Interest[];
}

interface UserContextType extends UserData {
  setUserData: (data: Partial<UserData>) => void;
}

const defaultUserData: UserData = {
  name: '',
  image: null,
  bio: '',
  interests: [],
};

const STORAGE_KEY = '@user_data';

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const userId = 'testUser'; // Replace with real user ID if available

  // Load initial data from Firebase or AsyncStorage
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Check network state first
        const netInfo = await NetInfo.fetch();
        console.log('[USER_CONTEXT] Network status:', netInfo.isConnected ? 'online' : 'offline');

        // Try to load from AsyncStorage first
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          console.log('[USER_CONTEXT] Loaded data from AsyncStorage:', parsedData);
          setUserData(parsedData);
        }

        // Only try Firebase if we're online
        if (netInfo.isConnected) {
          const docRef = doc(db, 'users', userId);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const data = docSnap.data() as UserData;
            console.log('[USER_CONTEXT] Loaded data from Firebase:', data);
            setUserData(data);
            // Update AsyncStorage with latest data
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          } else {
            console.log('[USER_CONTEXT] No data in Firebase, using local data');
          }
        } else {
          console.log('[USER_CONTEXT] Offline mode - using AsyncStorage data only');
        }
      } catch (error) {
        console.error('[USER_CONTEXT] Error loading data:', error);
        // If we failed to load from Firebase but have AsyncStorage data, that's okay
        // We'll sync when we're back online
      }
    };

    loadUserData();

    // Set up network state listener
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      console.log('[USER_CONTEXT] Network state changed:', state.isConnected ? 'online' : 'offline');
      if (state.isConnected) {
        // Try to sync with Firebase when we come back online
        loadUserData();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value: UserContextType = {
    ...userData,
    setUserData: async (data: Partial<UserData>) => {
      setUserData(prev => {
        const newData = { ...prev, ...data };
        console.log('[USER_CONTEXT] State updated:', newData);
        
        // Save to AsyncStorage first
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
          .then(() => console.log('[USER_CONTEXT] Saved to AsyncStorage'))
          .catch(e => console.error('[USER_CONTEXT] Failed to save to AsyncStorage:', e));

        // Check network state before trying Firebase
        NetInfo.fetch().then((state: NetInfoState) => {
          if (state.isConnected) {
            // Try to save to Firebase
            setDoc(doc(db, 'users', userId), newData, { merge: true })
              .then(() => console.log('[USER_CONTEXT] Saved to Firebase'))
              .catch(e => console.error('[USER_CONTEXT] Failed to save to Firebase:', e));
          } else {
            console.log('[USER_CONTEXT] Offline - changes will sync when online');
          }
        });

        return newData;
      });
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

// Add default export
export default UserProvider; 