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
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from 'expo-linear-gradient';
import EmojiRating from '../../components/EmojiRating';
import i18n from '../../utils/i18n';
import { collection, addDoc, serverTimestamp, db, app } from '../../utils/firebase';
import Toast from '../../components/Toast';

const { width, height } = Dimensions.get('window');

// Keep splash screen visible while fonts load
SplashScreen.preventAutoHideAsync();

function TabThreeScreen() {
  const [rating, setRating] = useState<number>(3); // Default to the "Good" emoji (🙂)
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [contactMe, setContactMe] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [, forceUpdate] = useState(0);

  const [fontsLoaded] = useFonts({
    'DMSans-Regular': require('../../assets/fonts/DMSans-Regular.ttf'),
    'DMSans-Medium': require('../../assets/fonts/DMSans-Medium.ttf'),
  });

  // Set up a listener to force a UI update when app becomes active
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

  const handleSubmit = async () => {
    if (!feedbackText.trim()) {
      setErrorMessage('Please enter your feedback before submitting.');
      setShowErrorToast(true);
      return;
    }

    console.log("Submitting feedback:", { rating, feedbackText, contactMe });

    if (!app) {
      setErrorMessage('Something went wrong. Please try again.');
      setShowErrorToast(true);
      return;
    }

    try {
      setIsSubmitting(true);

      // Create feedback data
      const feedbackData = {
        rating,
        feedbackText: feedbackText.trim(),
        contactMe,
      };

      // Use collection reference
      const feedbackCollection = collection(db, "feedback");
      
      let isSubmitted = false;
      try {
        // Try to submit to Firestore with a timeout
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Connection timed out')), 5000)
        );
        
        await Promise.race([
          addDoc(feedbackCollection, feedbackData),
          timeoutPromise
        ]);
        
        isSubmitted = true;
        console.log('Feedback successfully submitted to Firestore');
      } catch (firestoreError) {
        console.warn('Could not write to Firestore, saving locally instead:', firestoreError);
        
        // Save to AsyncStorage directly here to ensure it's saved
        try {
          const offlineData = await AsyncStorage.getItem('offlineFeedback') || '[]';
          const feedbackArray = JSON.parse(offlineData);
          feedbackArray.push({
            ...feedbackData,
            pendingUpload: true,
            timestamp: new Date().toISOString()
          });
          await AsyncStorage.setItem('offlineFeedback', JSON.stringify(feedbackArray));
          console.log('Feedback saved locally successfully');
          isSubmitted = true; // Consider local save a success
        } catch (storageError) {
          console.error('Failed to store feedback locally:', storageError);
          throw new Error('Could not save feedback');
        }
      }

      // If we got here, either Firestore or local storage succeeded
      if (isSubmitted) {
        // Show success toast and reset form
        setShowToast(true);
        setFeedbackText('');
        setRating(3);
        setContactMe(false);
      }

    } catch (error) {
      console.error('Error submitting feedback:', error);
      
      // Only show error toast for truly fatal errors 
      // (not connection issues, which we've already handled)
      setErrorMessage('Something went wrong. Please try again.');
      setShowErrorToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.mainContainer}>
        <LinearGradient
          colors={['#7389EC', '#4694FD']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.contentContainer}>
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
                    selectedEmoji={rating} 
                    onSelect={setRating} 
                  />

                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.textInput}
                      multiline
                      placeholder={i18n.t('feedback.textInputPlaceholder')}
                      placeholderTextColor="rgba(0, 0, 0, 0.3)"
                      value={feedbackText}
                      onChangeText={setFeedbackText}
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

                    <TouchableOpacity 
                      style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
                      onPress={handleSubmit}
                      disabled={isSubmitting}
                    >
                      <Text style={styles.submitButtonText}>
                        {isSubmitting ? 'Submitting...' : i18n.t('feedback.submit')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
          </View>
          
          <View style={styles.homeIndicator} />
        </LinearGradient>

        <Toast
          visible={showToast}
          message="Thanks! We've received your feedback."
          onHide={() => setShowToast(false)}
          icon={<Image source={require('../../assets/icons/icon-toast-tick-circle.png')} style={styles.toastIcon} />}
          backgroundColor="#FFFFFF"
          borderColor="rgba(70, 148, 253, 0.2)"
          shadowColor="rgba(70, 148, 253, 0.1)"
          textColor="#000000"
          topOffset={51}
          duration={3000}
        />
        <Toast
          visible={showErrorToast}
          message={errorMessage}
          onHide={() => setShowErrorToast(false)}
          icon={<Image source={require('../../assets/icons/icon-toast-info-circle.png')} style={styles.toastIcon} />}
          backgroundColor="#FFFFFF"
          borderColor="rgba(255, 163, 0, 0.2)"
          shadowColor="rgba(248, 92, 58, 0.1)"
          textColor="#000000"
          topOffset={51}
          duration={3000}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    position: 'absolute',
    width: '100%',
    height: '86%', // Adjust to leave room for the tab bar
    backgroundColor: '#EAF2F9',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: 'rgba(11, 19, 66, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 24,
    shadowOpacity: 0.5,
    elevation: 10,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 220, // Increased padding to ensure Submit button isn't clipped
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 30,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    lineHeight: 38,
    fontFamily: 'DMSans-Medium',
    textAlign: 'center',
    letterSpacing: -1.6,
    color: '#000000',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'DMSans-Regular',
    textAlign: 'center',
    letterSpacing: -0.24,
    color: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 24,
  },
  inputContainer: {
    width: '100%',
    marginTop: 20,
  },
  textInput: {
    height: 215,
    backgroundColor: '#FFFFFF',
    borderColor: '#D8D8D8',
    borderWidth: 1,
    borderRadius: 25,
    padding: 20,
    paddingTop: 16,
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    color: '#000000',
    textAlignVertical: 'top',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 22,
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
    letterSpacing: -0.24,
    color: '#000000',
  },
  submitButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#0B228C',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  submitButtonText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.24,
    color: '#FFFFFF',
  },
  submitButtonDisabled: {
    opacity: 0.7,
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
  toastIcon: {
    width: 20,
    height: 20,
  },
  errorToast: {
    width: 300,
    borderRadius: 50,
  },
});

export default TabThreeScreen;
