import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, Stack } from 'expo-router';
import Toast from './components/Toast';

export default function SocialMediaScreen() {
  const [instagram, setInstagram] = useState('');
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  const handleContinue = () => {
    if (!instagram.trim()) {
      setShowToast(true);
      return;
    }
    router.push('/(tabs)'); // Navigate to main app tabs
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
              <Text style={styles.title}>What's your Instagram?</Text>
              <Text style={styles.subtitle}>We'd love to connect with you on social media. (Optional)</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Instagram handle"
              placeholderTextColor="#888"
              value={instagram}
              onChangeText={setInstagram}
              autoCapitalize="none"
              returnKeyType="done"
              maxLength={32}
            />
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
          <Toast
            visible={showToast}
            message="Please enter your Instagram"
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
    width: 308,
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
    width: 235,
    height: 50,
    left: 79,
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