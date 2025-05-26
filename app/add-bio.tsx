import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, Stack, useLocalSearchParams } from 'expo-router';
import { useUser } from './context/UserContext';
import { db } from './utils/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function AddBioScreen() {
  const router = useRouter();
  const { name, image } = useLocalSearchParams();
  const { setUserData } = useUser();
  const [bio, setBio] = useState('');
  const MAX_LENGTH = 400;
  const MIN_LENGTH = 10;
  const userId = 'testUser'; // Replace with real user ID if available

  const handleContinue = () => {
    // Update context first
    setUserData({ bio });
    console.log('[ONBOARDING] Bio saved to context:', { bio });

    // Try to save to Firebase in the background
    setDoc(doc(db, 'users', userId), {
      bio,
    }, { merge: true })
      .then(() => console.log('[FIREBASE] Bio saved to Firestore'))
      .catch(e => console.error('[FIREBASE] Failed to save bio:', e));

    // Always navigate, don't wait for Firebase
    router.push({
      pathname: '/welcome',
      params: { name, image, bio },
    });
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
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.logoText}>Vizi</Text>
            <Text style={styles.title}>Add your bio</Text>
            <Text style={styles.subtitle}>Let others know a little bit about you</Text>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                multiline
                maxLength={MAX_LENGTH}
                placeholder="I'm a solo traveler & lifelong learner 💡📚 who lives for golden hour hikes 🌄, and trying every weird ice cream flavor 🍦🌀. Fluent in kindness, curiosity, and spontaneous dance breaks 💃🏽✨. Let's turn ordinary days into legendary stories..."
                placeholderTextColor="rgba(0,0,0,0.4)"
                value={bio}
                onChangeText={setBio}
                textAlignVertical="top"
              />
              <Text style={styles.charCount}>{bio.length}/{MAX_LENGTH}</Text>
            </View>

            <TouchableOpacity 
              style={[
                styles.continueButton,
                bio.length < MIN_LENGTH && styles.continueButtonDisabled
              ]} 
              onPress={handleContinue}
              disabled={bio.length < MIN_LENGTH}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  },
  logoText: {
    fontFamily: 'Pacifico',
    fontSize: 42,
    lineHeight: 52,
    letterSpacing: 4.2,
    backgroundColor: 'transparent',
    color: '#836CE8',
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontFamily: 'DMSans-Medium',
    fontSize: 32,
    lineHeight: 42,
    color: '#000',
    letterSpacing: -0.05 * 32,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(0,0,0,0.6)',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#EAF2F9',
    borderRadius: 16,
    padding: 16,
    marginBottom: 40,
  },
  input: {
    flex: 1,
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
    textAlignVertical: 'top',
  },
  charCount: {
    fontFamily: 'DMSans-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: 'rgba(0,0,0,0.4)',
    textAlign: 'right',
    marginTop: 8,
  },
  continueButton: {
    width: 353,
    height: 50,
    backgroundColor: '#0B228C',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: 'rgba(11, 34, 140, 0.5)',
  },
  continueButtonText: {
    color: '#FFF',
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    lineHeight: 20,
  },
}); 