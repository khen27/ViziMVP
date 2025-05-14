import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Platform,
  ImageBackground,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
} from '@expo-google-fonts/dm-sans';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';

const { width, height } = Dimensions.get('window');

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function OnboardingScreen() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
  });

  React.useEffect(() => {
    if (fontsLoaded) {
      // Hide splash screen once fonts are loaded
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/onboarding-bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.contentContainer}>
          <Image
            source={require('../assets/vizi-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <View style={styles.textFrame}>
            <Text style={styles.title}>Vizi</Text>
            <Text style={styles.subtitle}>
              Where Journeys Begin and Connections Last...
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/(tabs)')}
          >
            <View style={styles.buttonInner}>
              <Text style={styles.buttonText}>Get Started</Text>
              <View style={styles.arrowContainer}>
                <Ionicons 
                  name="chevron-forward" 
                  size={22} 
                  color="#0B228C" 
                />
              </View>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logo: {
    width: width * 0.6,
    height: width * 0.6,
    marginTop: 80,
    marginBottom: 20,
  },
  textFrame: {
    width: Math.min(373, width * 0.9),
    alignItems: 'center',
    gap: 16,
  },
  title: {
    width: '100%',
    fontFamily: 'DMSans_500Medium',
    fontSize: 44,
    lineHeight: 57,
    textAlign: 'center',
    letterSpacing: -0.05 * 44,
    color: '#FFFFFF',
    marginTop: -10,
  },
  subtitle: {
    width: '100%',
    fontFamily: 'DMSans_400Regular',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    letterSpacing: -0.015 * 16,
    color: '#FFFFFF',
  },
  button: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 50 : 70,
    width: 185,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
  },
  buttonInner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 18,
    paddingVertical: 15,
    gap: 10,
  },
  buttonText: {
    width: 87,
    height: 20,
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    letterSpacing: -0.015 * 16,
    color: '#0B228C',
  },
  arrowContainer: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 