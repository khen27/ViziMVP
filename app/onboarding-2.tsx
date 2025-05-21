import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { router, Stack } from 'expo-router';
import * as Font from 'expo-font';

const { width } = Dimensions.get('window');

// Keep splash screen visible until explicitly hidden
SplashScreen.preventAutoHideAsync();

export default function OnboardingStepTwo() {
  const [appIsReady, setAppIsReady] = useState(false);

  // Load fonts
  const [fontsLoaded] = useFonts({
    'Pacifico': require('../assets/fonts/Pacifico-Regular.ttf'),
    'DMSans-Medium': require('../assets/fonts/DMSans-Medium.ttf'),
  });

  // Prepare the app - load all resources
  React.useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          'Pacifico': require('../assets/fonts/Pacifico-Regular.ttf'),
          'DMSans-Medium': require('../assets/fonts/DMSans-Medium.ttf'),
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
          <View style={styles.titleWrapper}>
            <MaskedView
              style={styles.titleContainer}
              maskElement={
                <Text style={styles.title}>Vizi</Text>
              }
            >
              <LinearGradient
                colors={['#836CE8', '#4694FD']}
                style={styles.titleGradient}
                start={{ x: 0, y: -3.25 }}
                end={{ x: 0, y: 3 }}
              />
            </MaskedView>
          </View>

          <Image 
            source={require('../assets/world-map.png')}
            style={styles.mapImage}
            resizeMode="contain"
          />

          <View style={styles.textFrame}>
            <Text style={styles.mainText}>Real-Time World{'\n'}Group Chats</Text>
            <Text style={styles.subText}>
              Connect instantly with nearby people, join{'\n'}live chats, and explore local gems.
            </Text>
          </View>

          <View style={styles.dotsContainer}>
            <View style={[styles.dot, styles.dotInactive]} />
            <View style={[styles.dot, styles.dotActive]} />
            <View style={[styles.dot, styles.dotInactive]} />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.skipButton}
              onPress={() => router.push('/(tabs)')}
            >
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.continueButton}
              onPress={() => router.push('/sign-in')}
            >
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
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
    paddingTop: 30,
  },
  titleWrapper: {
    width: '100%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    paddingVertical: 10,
    overflow: 'visible',
  },
  titleContainer: {
    height: 60,
    width: 373,
    maxWidth: '100%',
    paddingVertical: 5,
  },
  title: {
    fontFamily: 'Pacifico',
    fontSize: 42,
    lineHeight: 60,
    textAlign: 'center',
    letterSpacing: 4.2,
    paddingHorizontal: 10,
    includeFontPadding: true,
  },
  titleGradient: {
    flex: 1,
  },
  mapImage: {
    width: width,
    height: width * 0.8,
    marginVertical: 20,
  },
  textFrame: {
    width: 373,
    maxWidth: '100%',
    alignItems: 'center',
    gap: 12,
    marginBottom: 32,
  },
  mainText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 32,
    lineHeight: 36,
    textAlign: 'center',
    letterSpacing: -0.05 * 32,
    color: '#000000',
  },
  subText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    letterSpacing: -0.01 * 16,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginBottom: 32,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotActive: {
    width: 24,
    backgroundColor: '#0B228C',
  },
  dotInactive: {
    backgroundColor: 'rgba(11, 34, 140, 0.15)',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: 373,
    maxWidth: '100%',
    gap: 10,
    marginTop: 'auto',
    marginBottom: 20,
  },
  skipButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#EEF5FA',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 35,
  },
  continueButton: {
    flex: 2,
    height: 50,
    backgroundColor: '#0B228C',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 35,
  },
  skipText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.015 * 16,
    color: '#000000',
  },
  continueText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.015 * 16,
    color: '#FFFFFF',
  },
}); 