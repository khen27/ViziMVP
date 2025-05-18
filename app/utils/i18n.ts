import { I18n } from 'i18n-js';
import { AppState, Platform, NativeModules } from 'react-native';

// Import all translation files
import en from '../translations/en.json';
import cs from '../translations/cs.json';

// Create the i18n instance
const i18n = new I18n({
  en,
  cs,
});

// Helper function to get device locale without requiring RNLocalize
// This is a fallback in case the native module isn't available
const getDeviceLocale = (): string => {
  try {
    // Try to get the locale from RNLocalize
    const RNLocalize = require('react-native-localize');
    const locales = RNLocalize.getLocales();
    return locales.length > 0 ? locales[0].languageCode : 'en';
  } catch (error) {
    // Fallback to system settings if RNLocalize is not available
    if (Platform.OS === 'ios') {
      return (
        NativeModules.SettingsManager?.settings?.AppleLocale ||
        NativeModules.SettingsManager?.settings?.AppleLanguages?.[0] ||
        'en'
      );
    } else if (Platform.OS === 'android') {
      return NativeModules.I18nManager?.localeIdentifier || 'en';
    }
    return 'en'; // Default to English
  }
};

// Set the locale once at the beginning of your app
const setI18nConfig = () => {
  // ALWAYS use English for now, as requested
  i18n.locale = 'en';
  
  // When a value is missing from a language, fallback to English
  i18n.enableFallback = true;
  i18n.defaultLocale = 'en';
};

// Set the locale configuration at startup
setI18nConfig();

// Use AppState to detect changes in application state
// When app becomes active, check if locale has changed
AppState.addEventListener('change', (nextAppState) => {
  if (nextAppState === 'active') {
    setI18nConfig();
  }
});

// Handle the case when we explicitly want to change the language
export const changeLanguage = (locale: string) => {
  i18n.locale = locale;
};

// Export a wrapper function for translation to avoid the "t is not a function" error
const t = (key: string, options = {}) => {
  return i18n.translate(key, options);
};

// Add the t function to the i18n object
const i18nWithT = {
  ...i18n,
  t
};

export default i18nWithT; 