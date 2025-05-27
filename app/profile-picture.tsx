import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, Image } from 'react-native';
import { useRouter, Stack, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import Toast from '@/components/Toast';
import CameraIcon from '@/assets/icons/icon-camera';

export default function ProfilePictureScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();
  const { name, city } = useLocalSearchParams();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      setShowToast(true);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleContinue = () => {
    if (!image) {
      setShowToast(true);
      return;
    }
    router.push({
      pathname: '/interests',
      params: { name, city, image }
    });
  };

  const handleSkip = () => {
    router.push({
      pathname: '/interests',
      params: { name, city }
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
                <Text style={styles.title}>Add a profile picture</Text>
                <Text style={styles.subtitle}>Help others recognize you by adding a profile picture.</Text>
              </View>

              <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.profileImage} />
                ) : (
                  <View style={styles.placeholderContainer}>
                    <CameraIcon />
                    <Text style={styles.uploadText}>Upload photo</Text>
                  </View>
                )}
              </TouchableOpacity>

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
            </View>
          </SafeAreaView>
        </View>
        <Toast
          visible={showToast}
          message={image ? "Please select a photo to continue" : "Please allow access to your photos"}
          onHide={() => setShowToast(false)}
          icon={<Image source={require('@/assets/icons/icon-danger.png')} style={{ width: 20, height: 20 }} />}
          backgroundColor="#FFFFFF"
          borderColor="rgba(237, 83, 112, 0.2)"
          shadowColor="rgba(248, 92, 58, 0.1)"
          textColor="#ED5370"
          topOffset={51}
          duration={3000}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4694FD',
  },
  card: {
    flex: 1,
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
    marginBottom: 60,
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
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#EAF2F9',
    alignSelf: 'center',
    marginBottom: 60,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  placeholderContainer: {
    alignItems: 'center',
  },
  cameraIcon: {
    width: 48,
    height: 48,
    marginBottom: 12,
  },
  uploadText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    color: '#000000',
    opacity: 0.5,
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
    marginTop: 'auto',
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