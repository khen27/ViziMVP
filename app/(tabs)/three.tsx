import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  AppState,
} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from 'expo-linear-gradient';
import EmojiRating from '@/app/components/EmojiRating';
import i18n from '@/app/utils/i18n';

const { width, height } = Dimensions.get('window');

// Keep splash screen visible while fonts load
SplashScreen.preventAutoHideAsync();

export default function TabThreeScreen() {
  const [selectedEmoji, setSelectedEmoji] = useState(3); // Default to the "Good" emoji (🙂)
  const [contactMe, setContactMe] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [, forceUpdate] = useState(0);

  const [fontsLoaded] = useFonts({
    'DMSans-Regular': require('@/assets/fonts/DMSans-Regular.ttf'),
    'DMSans-Medium': require('@/assets/fonts/DMSans-Medium.ttf'),
  });

  // Set up a listener to force a UI update when app becomes active
  // This ensures language changes are reflected
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        forceUpdate(prev => prev + 1);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  React.useEffect(() => {
    if (fontsLoaded) {
      // Hide splash screen once fonts are loaded
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <LinearGradient
        colors={['#EAF2F9', '#C9DEFC']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.safeArea}>
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.content}>
              <View style={styles.header}>
                <Text style={styles.title}>{i18n.t('feedback.title')}</Text>
                <Text style={styles.subtitle}>
                  {i18n.t('feedback.subtitle')}
                </Text>
              </View>

              <EmojiRating 
                selectedEmoji={selectedEmoji} 
                onSelect={setSelectedEmoji} 
              />

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  multiline
                  placeholder={i18n.t('feedback.textInputPlaceholder')}
                  placeholderTextColor="rgba(0, 0, 0, 0.3)"
                  value={feedback}
                  onChangeText={setFeedback}
                />

                <View style={styles.checkboxContainer}>
                  <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => setContactMe(!contactMe)}
                  >
                    {contactMe && <View style={styles.checkboxInner} />}
                  </TouchableOpacity>
                  <Text style={styles.checkboxLabel}>
                    {i18n.t('feedback.contactMe')}
                  </Text>
                </View>

                <TouchableOpacity style={styles.submitButton}>
                  <Text style={styles.submitButtonText}>{i18n.t('feedback.submit')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    paddingTop: 50,
  },
  header: {
    width: 373,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    width: '100%',
    fontSize: 32,
    lineHeight: 36,
    fontFamily: 'DMSans-Medium',
    textAlign: 'center',
    letterSpacing: -0.05 * 32,
    color: '#000000',
    marginBottom: 16,
  },
  subtitle: {
    width: '100%',
    fontSize: 16,
    lineHeight: 20,
    fontFamily: 'DMSans-Regular',
    textAlign: 'center',
    letterSpacing: -0.015 * 16,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  inputContainer: {
    width: 353,
    marginTop: 20,
  },
  textInput: {
    height: 278,
    backgroundColor: '#FFFFFF',
    borderColor: '#D8D8D8',
    borderWidth: 1,
    borderRadius: 25,
    padding: 20,
    paddingTop: 15,
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    color: '#000000',
    textAlignVertical: 'top',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#ACACAC',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#0B228C',
  },
  checkboxLabel: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.015 * 16,
    color: '#000000',
  },
  submitButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#0B228C',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  submitButtonText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.015 * 16,
    color: '#FFFFFF',
  },
  homeIndicator: {
    width: 134,
    height: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center',
  },
});
