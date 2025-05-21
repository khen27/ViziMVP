import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { DMSans_400Regular, DMSans_500Medium } from '@expo-google-fonts/dm-sans';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

const { width, height } = Dimensions.get('window');

// Prevent auto-hiding splash screen
SplashScreen.preventAutoHideAsync();

export default function SignInScreen() {
  const insets = useSafeAreaInsets();
  const [appIsReady, setAppIsReady] = useState(false);
  
  // Load fonts
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    Pacifico_400Regular,
  });

  // Prepare the app - load all resources
  React.useEffect(() => {
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
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
        <View style={styles.content}>
          {/* Simpler approach for Vizi logo */}
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
              <Image source={require('../assets/icons/icon-apple.png')} style={styles.buttonIcon} />
              <Text style={styles.primaryButtonText}>Sign in with Apple</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Image source={require('../assets/icons/icon-google.png')} style={styles.buttonIcon} />
              <Text style={styles.secondaryButtonText}>Sign in with Google</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.termsContainer}>
            <Text style={styles.terms}>
              By continuing, you agree to our <Text style={styles.link} onPress={() => router.push('/(tabs)')}>Terms of service</Text> and <Text style={styles.link} onPress={() => router.push('/')}>Privacy Policy</Text>.
            </Text>
          </View>
        </View>
      </SafeAreaView>

      {/* Add blue gradient background at bottom */}
      <LinearGradient
        colors={['#7389EC', '#4694FD']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.bottomGradient}
      />
    </>
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
    justifyContent: 'flex-start',
    paddingTop: 140,
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    paddingVertical: 20,
  },
  viziLogo: {
    fontFamily: 'Pacifico_400Regular',
    fontSize: 100,
    color: '#6B85F6', // Blue color similar to the gradient
    textAlign: 'center',
    includeFontPadding: true,
    textShadowColor: 'rgba(70, 148, 253, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  textFrame: {
    width: 373,
    maxWidth: '100%',
    alignItems: 'center',
    marginBottom: 60,
  },
  welcome: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 32,
    lineHeight: 36,
    textAlign: 'center',
    letterSpacing: -0.05 * 32,
    color: '#000000',
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    letterSpacing: -0.01 * 16,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  buttonStack: {
    width: '100%',
    maxWidth: 373, 
    gap: 16,
    marginBottom: 60,
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
  secondaryButtonText: {
    color: '#000',
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    lineHeight: 21,
    textAlign: 'center',
    letterSpacing: -0.05 * 16,
  },
  buttonIcon: {
    width: 28,
    height: 28,
    marginRight: 12,
    resizeMode: 'contain',
  },
  termsContainer: {
    width: 373,
    maxWidth: '100%',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 30,
  },
  terms: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 12,
    lineHeight: 22,
    textAlign: 'center',
    color: '#000000',
  },
  link: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 12,
    lineHeight: 22,
    color: '#4694FD',
    textDecorationLine: 'underline',
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 130,
    zIndex: -1,
  },
}); 