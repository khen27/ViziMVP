import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { useRouter, Stack, useLocalSearchParams } from 'expo-router';

export default function ProfilePhotoScreen() {
  const router = useRouter();
  const { name } = useLocalSearchParams();
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  
  // More reliable simulator detection
  const isSimulator = Platform.OS === 'ios' && !Platform.isPad && !Platform.isTV && process.env.NODE_ENV !== 'production';

  const pickImage = async () => {
    if (isSimulator) {
      // Use default image for iOS simulator
      setImage(Image.resolveAssetSource(require('../assets/profile-pic.png')).uri);
      return;
    }

    // Ask for permission on physical devices
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
    // Pick image
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleContinue = async () => {
    setUploading(true);
    // Here you would upload the image to your backend or save to AsyncStorage
    // For now, just pass the image URI to the next screen
    router.push({
      pathname: '/welcome',
      params: { name, image },
    });
    setUploading(false);
  };

  const handleSkip = () => {
    router.push({
      pathname: '/welcome',
      params: { name },
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
            <Text style={styles.title}>Add your profile photo</Text>
            <Text style={styles.subtitle}>Help others to see who you are with an image.\nMake sure we can see you.</Text>
            <TouchableOpacity style={styles.imageCircle} onPress={pickImage} activeOpacity={0.8}>
              {image ? (
                <Image source={{ uri: image }} style={styles.profileImage} />
              ) : (
                <View style={styles.cameraIconContainer}>
                  <Image source={require('../assets/icons/icon-camera.png')} style={styles.cameraIcon} />
                </View>
              )}
            </TouchableOpacity>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.skipButton} onPress={handleSkip} disabled={uploading}>
                <Text style={styles.skipButtonText}>Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.continueButton} onPress={handleContinue} disabled={uploading}>
                <Text style={styles.continueButtonText}>{uploading ? 'Saving...' : 'Continue'}</Text>
              </TouchableOpacity>
            </View>
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
  imageCircle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: '#0B228C',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginBottom: 60,
  },
  cameraIconContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    width: 80,
    height: 80,
    tintColor: '#0B228C',
    resizeMode: 'contain',
  },
  profileImage: {
    width: 296,
    height: 296,
    borderRadius: 148,
    resizeMode: 'cover',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 353,
    marginTop: 40,
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
    color: '#000',
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    lineHeight: 20,
  },
  continueButton: {
    width: 235,
    height: 50,
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
  },
}); 