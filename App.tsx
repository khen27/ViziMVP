// Import basic expo-router entry point
import 'expo-router/entry';
import { LogBox } from 'react-native';
import 'expo-dev-client';
import React, { useEffect } from 'react';
import { View } from 'react-native';

// Disable inspector by setting environment variables
// This needs to happen before any imports
process.env.EXPO_NO_DEV_MENU = 'true';
process.env.EXPO_NO_INSPECTOR = 'true';

// Ignore specific warnings
LogBox.ignoreLogs([
  'Constants.installationId has been deprecated in favor of generating and storing your own ID',
  "Constants.deviceId has been deprecated in favor of expo-application's androidId on Android and identifierForVendor on iOS",
  'Component auth has not been registered yet'
]);

// Disable React DevTools
if (__DEV__) {
  // Attempt to disable DevTools inspector
  (global as any).__REACT_DEVTOOLS_GLOBAL_HOOK__ = { isDisabled: true };
  
  // For older versions
  if ((global as any).__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    (global as any).__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function() {};
  }
}

// Import your main app
import App from './app/_layout';

export default function AppWrapper() {
  useEffect(() => {
    // Additional runtime disabling
    if (typeof window !== 'undefined') {
      const win = window as any;
      if (win.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
        win.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function() {};
      }
    }
  }, []);

  return <App />;
} 