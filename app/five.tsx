import React, { useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { useUser } from './context/UserContext';

interface Interest {
  id: string;
  emoji: string;
  label: string;
}

export default function ProfileScreen() {
  const { name, image, bio, interests } = useUser();

  useEffect(() => {
    console.log('[PROFILE] Rendering with data:', { name, image, bio, interests });
  }, [name, image, bio, interests]);

  // Get 5 random interests
  const displayInterests = useMemo(() => {
    if (!interests || interests.length === 0) return [];
    return shuffleArray<Interest>(interests).slice(0, 5);
  }, [interests]);

  // Helper function to shuffle array
  function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

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
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.profileContainer}>
              <Image
                source={image ? { uri: image } : require('../assets/profile-pic.png')}
                style={styles.profileImage}
              />
              <Text style={styles.name}>{name}</Text>
              
              {/* Location and Friends Count */}
              <View style={styles.locationContainer}>
                <Text style={styles.flagEmoji}>🇨🇿</Text>
                <Text style={styles.locationText}>Prague, Czech Republic</Text>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.friendsCount}>113k Friends</Text>
              </View>

              {/* Interests */}
              <View style={styles.interestsContainer}>
                {displayInterests.map((interest: Interest, index: number) => (
                  <View key={index} style={styles.interestItem}>
                    <View style={styles.interestIconContainer}>
                      <Text style={styles.interestIcon}>{interest.emoji}</Text>
                    </View>
                    <Text style={styles.interestLabel}>{interest.label}</Text>
                  </View>
                ))}
              </View>

              {/* Action Buttons */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.editButtonText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shareButton}>
                  <Text style={styles.shareButtonText}>Share Profile</Text>
                </TouchableOpacity>
              </View>

              {/* Bio */}
              <Text style={styles.bio}>{bio}</Text>
            </View>
          </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 32,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    marginBottom: 16,
  },
  name: {
    fontFamily: 'DMSans-Medium',
    fontSize: 32,
    lineHeight: 42,
    color: '#000',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  flagEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  locationText: {
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
  },
  dot: {
    marginHorizontal: 8,
    color: '#000',
  },
  friendsCount: {
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
  },
  interestsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  interestItem: {
    alignItems: 'center',
    width: 60,
  },
  interestIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  interestIcon: {
    fontSize: 24,
  },
  interestLabel: {
    fontFamily: 'DMSans-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: '#000',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
    paddingHorizontal: 20,
    width: '100%',
  },
  editButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    color: '#000',
  },
  shareButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#0B228C',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButtonText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  bio: {
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
}); 