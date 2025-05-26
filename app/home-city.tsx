import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Platform, Image } from 'react-native';
import { useRouter, Stack, useLocalSearchParams } from 'expo-router';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from '@/components/Toast';

export default function HomeCityScreen() {
  const [city, setCity] = useState('');
  const [showOnProfile, setShowOnProfile] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();
  const { name } = useLocalSearchParams();

  const handleContinue = () => {
    if (!city.trim()) {
      setShowToast(true);
      return;
    }
    router.push({
      pathname: '/interests',
      params: { name }
    });
  };

  const handleSkip = () => {
    router.push({
      pathname: '/interests',
      params: { name }
    });
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.card}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.content}>
              {/* Back Button */}
              <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Image 
                  source={require('@/assets/icons/city-back-button.png')}
                  style={styles.backButtonImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <View style={styles.headerSection}>
                <Text style={styles.title}>Where's home for you?</Text>
                <Text style={styles.subtitle}>Choose your hometown to help others connect with you more easily.</Text>
              </View>

              <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Search your city</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. 🇺🇸 Miami, FL, USA"
                  placeholderTextColor="rgba(0,0,0,0.3)"
                  value={city}
                  onChangeText={setCity}
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.toggleSection}>
                <View style={styles.toggleContainer}>
                  <Text style={styles.toggleLabel}>Show on your profile</Text>
                  <TouchableOpacity 
                    style={styles.toggleTouchable}
                    onPress={() => setShowOnProfile(!showOnProfile)}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={showOnProfile ? ['#7C62DF', '#358AF7'] : ['#DEE6ED', '#DEE6ED']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.toggleTrack}
                    >
                      <View style={[styles.toggleThumb, showOnProfile && styles.toggleThumbActive]} />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
                <Text style={styles.toggleDescription}>Let others see this on your profile</Text>
              </View>
            </View>

            <View style={styles.bottomButtons}>
              <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipButtonText}>Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.continueButtonContainer} 
                onPress={handleContinue}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#7C62DF', '#358AF7']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.continueButton}
                >
                  <Text style={styles.continueButtonText}>Continue</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4694FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EAF2F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonImage: {
    width: 24,
    height: 24,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 0,
  },
  title: {
    fontFamily: 'DMSans-Medium',
    fontSize: 32,
    lineHeight: 42,
    color: '#000',
    letterSpacing: -0.05 * 32,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(0,0,0,0.6)',
    textAlign: 'center',
    letterSpacing: -0.01 * 16,
    marginBottom: 120,
  },
  inputSection: {
    marginBottom: 60,
  },
  inputLabel: {
    fontFamily: 'DMSans-SemiBold',
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ACACAC',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    color: '#000',
  },
  toggleSection: {
    marginBottom: '8%',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  toggleLabel: {
    fontFamily: 'DMSans-SemiBold',
    fontSize: 16,
    color: '#000',
  },
  toggleDescription: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    color: 'rgba(0,0,0,0.5)',
    marginLeft: 4,
  },
  toggleTouchable: {
    width: 48,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  toggleTrack: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    justifyContent: 'center',
  },
  toggleThumb: {
    position: 'absolute',
    width: 22,
    height: 22,
    backgroundColor: '#FFFFFF',
    borderRadius: 11,
    left: 4,
    top: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleThumbActive: {
    left: 'auto',
    right: 4,
  },
  bottomButtons: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 353,
    alignSelf: 'center',
    height: 50,
  },
  skipButton: {
    width: 108,
    height: 50,
    backgroundColor: '#EEF5FA',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButtonText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    lineHeight: 20,
    color: '#000',
    letterSpacing: -0.015 * 16,
    textAlign: 'center',
  },
  continueButtonContainer: {
    width: 235,
    height: 50,
    borderRadius: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 35,
    borderRadius: 50,
    width: 235,
    height: 50,
  },
  continueButtonText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    lineHeight: 20,
    color: '#FFFFFF',
    letterSpacing: -0.015 * 16,
    textAlign: 'center',
  },
}); 