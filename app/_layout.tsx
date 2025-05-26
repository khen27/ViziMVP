import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Platform, LogBox, AppRegistry, View, useColorScheme } from 'react-native';
import Constants from 'expo-constants';
import ChatDataProvider from './context/ChatDataContext';
import { UserProvider } from './context/UserContext';

// Try to load RNLocalize early to avoid module issues
if (Platform.OS !== 'web') {
  try {
    require('react-native-localize');
  } catch (error) {
    console.warn('Failed to load react-native-localize:', error);
  }
}

// Disable developer menu and inspector
if (Constants.expoConfig) {
  Constants.expoConfig.developmentClient = {
    ...Constants.expoConfig.developmentClient,
    silentLaunch: true,
  };
}

// Override the DevMenu if possible
if (
  // @ts-ignore - __DEV__ is a global in React Native
  global.__DEV__ && 
  // @ts-ignore - React DevTools hook
  global.__REACT_DEVTOOLS_GLOBAL_HOOK__
) {
  try {
    // Remove devtools hook to prevent inspector from showing
    // @ts-ignore - React DevTools hook
    global.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = () => {};
  } catch (e) {
    console.warn('Failed to override devtools hook:', e);
  }
}

// Ignore specific warnings that may be false positives
LogBox.ignoreLogs([
  'Required default export not found',
  'TurboModuleRegistry.getEnforcing',
  'Cannot find native module',
  'Component auth has not been registered yet',
  'No filename found'
]);

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Simple custom hook to avoid the filename error
const useAppColorScheme = () => {
  return 'light'; // Always return light theme for now
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'DMSans-Regular': require('../assets/fonts/DMSans-Regular.ttf'),
    'DMSans-Medium': require('../assets/fonts/DMSans-Medium.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <UserProvider>
      <ChatDataProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="interests" options={{ headerShown: false }} />
            <Stack.Screen name="profile-photo" options={{ headerShown: false }} />
            <Stack.Screen name="add-bio" options={{ headerShown: false }} />
            <Stack.Screen name="welcome" options={{ headerShown: false }} />
            <Stack.Screen name="five" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
      </ChatDataProvider>
    </UserProvider>
  );
}
