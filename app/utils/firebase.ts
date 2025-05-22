// This is a mock implementation of Firebase for development
// Replace with real Firebase implementation when ready

// Mock auth user type
type User = {
  email: string;
  uid: string;
  displayName: string | null;
};

// Mock auth object
const auth = {
  currentUser: null as User | null,
  
  // Mock sign in method
  signIn: async (email: string, password: string) => {
    console.log('Mock sign in with:', email, password);
    return {
      user: {
        email,
        uid: 'mock-user-id',
        displayName: 'Test User'
      }
    };
  },
  
  // Mock sign out method
  signOut: async () => {
    console.log('Mock sign out');
    return true;
  }
};

// Mock app object
const app = {
  name: 'mock-app'
};

export { app, auth };

// Default export for Expo Router
export default function MockFirebase() {
  // This component does nothing, it's just to satisfy Expo Router
  return null;
} 