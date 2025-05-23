import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { DMSans_400Regular, DMSans_500Medium } from '@expo-google-fonts/dm-sans';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import { router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

// Import line for auth
import { app } from '../utils/firebase';

const { width } = Dimensions.get('window');

// Prevent auto-hiding splash screen
SplashScreen.preventAutoHideAsync();

export default function SignIn() {
  const insets = useSafeAreaInsets();
  const [appIsReady, setAppIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Load fonts
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    Pacifico_400Regular,
  });

  // Instead of using auth from mock firebase, create a simple signin function
  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      
      // For now, we'll just simulate a successful sign-in
      console.log('Google sign-in simulation');
      
      // Navigate to main app screen after a short delay
      setTimeout(() => {
        setIsLoading(false);
        router.push('/name');
      }, 1000);
      
    } catch (error) {
      console.error('Error during sign-in:', error);
      Alert.alert('Authentication Failed', 'Failed to sign in. Please try again.');
      setIsLoading(false);
    }
  };

  // Prepare the app - load all resources
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          DMSans_400Regular,
          DMSans_500Medium,
          Pacifico_400Regular,
        });
        
        // Artificially delay for a smoother transition
        await new Promise(resolve => setTimeout(resolve, 50));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell app that we're ready
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  // Callback to hide splash screen
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  // Don't show anything until everything is ready
  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.content}>
        {/* Vizi logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.viziLogo}>Vizi</Text>
        </View>

        <View style={styles.textFrame}>
          <Text style={styles.welcome}>Welcome to Vizi</Text>
          <Text style={styles.subtitle}>
            Join real-time group chats with others nearby who match your vibe.
          </Text>
        </View>

        <View style={styles.buttonStack}>
          <TouchableOpacity style={styles.primaryButton}>
            <Image source={require('../../assets/icons/icon-apple.png')} style={styles.buttonIcon} />
            <Text style={styles.primaryButtonText}>Sign in with Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.secondaryButton, isLoading && styles.disabledButton]}
            onPress={signInWithGoogle}
            disabled={isLoading}
          >
            <Image source={require('../../assets/icons/icon-google.png')} style={styles.buttonIcon} />
            <Text style={styles.secondaryButtonText}>
              {isLoading ? 'Signing in...' : 'Sign in with Google'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.termsContainer}>
          <Text style={styles.terms}>
            By continuing, you agree to our <Text style={styles.link} onPress={() => router.push('/(tabs)')}>Terms of service</Text> and <Text style={styles.link} onPress={() => router.push('/')}>Privacy Policy</Text>.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingTop: 0, // Remove top padding to center content better
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    paddingHorizontal: 20, // Add horizontal padding to prevent clipping
  },
  viziLogo: {
    fontFamily: 'Pacifico_400Regular',
    fontSize: 100, // Keeping the Vizi logo size as is
    color: '#6B85F6',
    textAlign: 'center',
    includeFontPadding: true,
    textShadowColor: 'rgba(70, 148, 253, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
    paddingHorizontal: 10, // Add horizontal padding to prevent clipping
  },
  textFrame: {
    width: '100%',
    maxWidth: 373,
    alignItems: 'center',
    marginBottom: 40,
  },
  welcome: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 28,
    lineHeight: 32,
    textAlign: 'center',
    letterSpacing: -0.05 * 28,
    color: '#000000',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    letterSpacing: -0.01 * 16,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  buttonStack: {
    width: '100%',
    maxWidth: 373, 
    gap: 12,
    marginBottom: 30,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    borderRadius: 50,
    height: 52,
    width: '100%',
    paddingHorizontal: 24,
  },
  primaryButtonText: {
    color: '#fff',
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    lineHeight: 21,
    textAlign: 'center',
    letterSpacing: -0.05 * 16,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    height: 52,
    width: '100%',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingHorizontal: 24,
  },
  disabledButton: {
    opacity: 0.7,
    backgroundColor: '#f5f5f5',
  },
  secondaryButtonText: {
    color: '#000',
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    lineHeight: 21,
    textAlign: 'center',
    letterSpacing: -0.05 * 16,
  },
  buttonIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
    resizeMode: 'contain',
  },
  termsContainer: {
    width: '100%',
    maxWidth: 373,
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    paddingHorizontal: 20,
  },
  terms: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    color: '#000000',
  },
  link: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#4694FD',
    textDecorationLine: 'underline',
  },
}); 