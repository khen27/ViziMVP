import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, Stack, useLocalSearchParams } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();
  const { name } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient
        colors={["#836CE8", "#4694FD"]}
        style={styles.gradient}
        start={{ x: 0.8187, y: 0.8375 }}
        end={{ x: 0, y: 0 }}
      >
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.container}>
          <View style={styles.card}>
            <View style={styles.content}>
              <View style={styles.iconContainer}>
                <Image 
                  source={require('@/assets/icons/icon-vizi-onboard-final.png')}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.title}>
                  Welcome to Vizi{'\n'}{name}!
                </Text>
                <Text style={styles.subtitle}>
                  Your account has been successfully{'\n'}created. Get ready to connect!
                </Text>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => router.push('/(tabs)')}
                >
                  <Text style={styles.buttonText}>Let's Start!</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.homeIndicator}>
              <View style={styles.homeIndicatorBar} />
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
    width: '100%',
    height: 801,
    left: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 35,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 100,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 22,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 'auto',
  },
  title: {
    fontFamily: 'DMSans-Medium',
    fontSize: 36,
    lineHeight: 40,
    textAlign: 'center',
    color: '#000000',
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: 'DMSans-Medium',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    color: '#000000',
    opacity: 0.5,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#0B228C',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  homeIndicator: {
    width: '100%',
    height: 34,
    position: 'absolute',
    bottom: 0,
    left: 20,
    alignItems: 'center',
  },
  homeIndicatorBar: {
    width: 134,
    height: 5,
    backgroundColor: '#000000',
    borderRadius: 100,
    position: 'absolute',
    bottom: 8,
  },
}); 