import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, Stack } from 'expo-router';
import Toast from './components/Toast';
import { useUser } from './context/UserContext';
import { db } from './utils/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function NameScreen() {
  const [name, setName] = useState('');
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();
  const { setUserData } = useUser();
  const userId = 'testUser'; // Replace with real user ID if available

  const handleContinue = () => {
    if (!name.trim()) {
      setShowToast(true);
      return;
    }

    // Update context first
    setUserData({ name: name.trim() });
    console.log('[ONBOARDING] Name saved to context:', { name: name.trim() });

    // Try to save to Firebase in the background
    setDoc(doc(db, 'users', userId), {
      name: name.trim(),
    }, { merge: true })
      .then(() => console.log('[FIREBASE] Name saved to Firestore'))
      .catch(e => console.error('[FIREBASE] Failed to save name:', e));

    // Always navigate, don't wait for Firebase
    router.push({ pathname: '/age-verification', params: { name: name.trim() } });
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient
        colors={["#836CE8", "#4694FD"]}
        style={styles.gradient}
        start={{ x: 0.24, y: 0.78 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.card}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>Vizi</Text>
            </View>
            <View style={styles.headerSection}>
              <Text style={styles.title}>Get Started</Text>
              <Text style={styles.subtitle}>We need some information to help you have the best experience possible.</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Your name"
              placeholderTextColor="#888"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              returnKeyType="done"
              maxLength={32}
            />
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
          <Toast
            visible={showToast}
            message="Please enter your name"
            onHide={() => setShowToast(false)}
            icon={<Image source={require('../assets/icons/icon-danger.png')} style={{ width: 20, height: 20 }} />}
            backgroundColor="#FFFFFF"
            borderColor="rgba(237, 83, 112, 0.2)"
            shadowColor="rgba(248, 92, 58, 0.1)"
            textColor="#ED5370"
            topOffset={51}
            duration={3000}
          />
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  card: {
    position: 'absolute',
    width: 393,
    height: 786,
    left: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 43,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: 'rgba(11, 19, 66, 0.10)',
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 24,
    shadowOpacity: 0.5,
    elevation: 10,
  },
  logoContainer: {
    width: 353,
    alignItems: 'center',
    marginBottom: 8,
  },
  logoText: {
    fontFamily: 'Pacifico',
    fontSize: 42,
    lineHeight: 52,
    letterSpacing: 4.2,
    backgroundColor: 'transparent',
    color: '#836CE8',
    textAlign: 'center',
  },
  headerSection: {
    marginTop: 8,
    marginBottom: 32,
    width: 353,
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: 'DMSans-Medium',
    fontSize: 32,
    lineHeight: 42,
    color: '#000',
    letterSpacing: -0.05 * 32,
    textAlign: 'center',
    width: 353,
  },
  subtitle: {
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(0,0,0,0.6)',
    marginTop: 8,
    width: 353,
    textAlign: 'center',
  },
  input: {
    width: 342,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ACACAC',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    color: '#000',
    marginTop: 40,
    marginBottom: 40,
  },
  continueButton: {
    position: 'absolute',
    width: 353,
    height: 50,
    left: 20,
    top: 688,
    backgroundColor: '#0B228C',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFF',
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.015 * 16,
  },
}); 