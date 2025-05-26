// This is a mock implementation of Firebase for development
// Replace with real Firebase implementation when ready

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection as fbCollection, 
  addDoc as fbAddDoc,
  serverTimestamp as fbServerTimestamp,
  initializeFirestore,
  persistentLocalCache,
  persistentSingleTabManager,
  enableMultiTabIndexedDbPersistence,
  CACHE_SIZE_UNLIMITED,
  Firestore
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebaseConfig from './firebaseConfig';
import { Platform } from 'react-native';

// Handle potential import errors by wrapping initialization in try/catch
let app;
let db: Firestore;

try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  
  // Initialize Firestore with better settings for mobile
  try {
    // Better setup for mobile with persistent cache
    db = initializeFirestore(app, {
      localCache: persistentLocalCache({
        tabManager: persistentSingleTabManager({}),
        cacheSizeBytes: CACHE_SIZE_UNLIMITED
      })
    });

    console.log('Firestore initialized successfully');
  } catch (error) {
    console.error('Error initializing Firestore:', error);
    // Fallback to standard initialization
    db = getFirestore(app);
  }
} catch (error) {
  console.error('Failed to initialize Firebase:', error);
  // Create dummy implementations for offline mode
  app = null;
  db = null as any;
}

// Helper functions for Firestore operations
const collection = (db: any, path: string) => {
  if (!db) {
    console.warn('Firestore not initialized, using offline mode');
    return null;
  }
  return fbCollection(db, path);
};

const addDoc = async (collectionRef: any, data: any) => {
  if (!collectionRef) {
    console.warn('Collection reference is null, storing locally only');
    try {
      const offlineData = await AsyncStorage.getItem('offlineFeedback') || '[]';
      const feedbackArray = JSON.parse(offlineData);
      feedbackArray.push({
        ...data, 
        pendingUpload: true, 
        timestamp: new Date().toISOString()
      });
      await AsyncStorage.setItem('offlineFeedback', JSON.stringify(feedbackArray));
      console.log('Feedback stored locally for later upload');
      return { id: 'local-' + Date.now() };
    } catch (storageError) {
      console.error('Failed to store feedback locally:', storageError);
      throw storageError;
    }
  }
  
  try {
    // Try to add the document to Firestore
    const result = await fbAddDoc(collectionRef, {
      ...data,
      createdAt: fbServerTimestamp()
    });
    return result;
  } catch (error) {
    console.error('Firestore error:', error);
    
    // Store data locally when offline using AsyncStorage
    try {
      const offlineData = await AsyncStorage.getItem('offlineFeedback') || '[]';
      const feedbackArray = JSON.parse(offlineData);
      feedbackArray.push({
        ...data, 
        pendingUpload: true, 
        timestamp: new Date().toISOString()
      });
      await AsyncStorage.setItem('offlineFeedback', JSON.stringify(feedbackArray));
      console.log('Feedback stored locally for later upload');
    } catch (storageError) {
      console.error('Failed to store feedback locally:', storageError);
    }
    
    throw error;
  }
};

// Server timestamp
const serverTimestamp = () => fbServerTimestamp();

// Export Firebase instances and helper functions
export { app, db, collection, addDoc, serverTimestamp };

// Default export for Expo Router
export default function FirebaseUtil() {
  return null;
} 