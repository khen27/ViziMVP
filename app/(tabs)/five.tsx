import { StyleSheet, SafeAreaView, StatusBar, Image, TouchableOpacity, Text, ImageBackground, Share } from 'react-native';
import { View } from '@/components/Themed';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef } from 'react';
import { ScrollView } from 'react-native';
import Svg, { Path, Rect, Mask, G, Defs, Filter, FeFlood, FeColorMatrix, FeOffset, FeBlend, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import ViewShot, { captureRef } from 'react-native-view-shot';

export default function TabFiveScreen() {
  const viewShotRef = useRef<ViewShot>(null);

  const handleShare = async () => {
    try {
      if (!viewShotRef.current) {
        console.error("ViewShot ref is not available");
        return;
      }
      const uri = await captureRef(viewShotRef, {
        format: 'png',
        quality: 1,
      });
      await Share.share({
        url: uri,
        message: "Hey, this is my profile on Vizi! You should join me ✨"
      });
    } catch (error) {
      console.error("Error sharing profile:", error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <LinearGradient
        colors={['#7389EC', '#4694FD']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <ViewShot ref={viewShotRef} style={styles.contentContainer}>
          <StatusBar barStyle="light-content" />
          
          {/* Header/Background Image */}
          <ImageBackground 
            source={require('../../assets/gym-background.png')} 
            style={styles.headerImage}
            imageStyle={{ opacity: 1 }}
          >
            <View style={styles.gradientOverlay} />
            <LinearGradient
              colors={['transparent', '#EAF2F9']}
              style={styles.headerGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
            
            {/* Header Row */}
            <View style={styles.headerRow}>
              <View style={styles.transparentView} />
            </View>
          </ImageBackground>
          
          {/* Profile Image */}
          <View style={styles.profileImageContainer}>
            <Image 
              source={require('../../assets/profile-pic.png')}
              style={styles.profileImage}
            />
          </View>
          
          <View style={styles.contentWrapper}>
            <SafeAreaView style={styles.safeArea}>
              <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.content}>
                  {/* Profile information */}
                  <View style={styles.profileInfoContainer}>
                    {/* Full name */}
                    <Text style={styles.fullNameText}>Karl Henderson</Text>
                    
                    {/* Location information */}
                    <View style={styles.locationContainer}>
                      <View style={styles.flagContainer}>
                        <Svg width="24" height="18" viewBox="0 0 78 59" fill="none">
                          <Mask id="mask0_1_27" style={{maskType: 'luminance'}} maskUnits="userSpaceOnUse" x="0" y="0" width="78" height="59">
                            <Path d="M0 0H77.4V58.05H0V0Z" fill="white"/>
                          </Mask>
                          <G mask="url(#mask0_1_27)">
                            <Path fillRule="evenodd" clipRule="evenodd" d="M0 0V58.05H77.4V0H0Z" fill="#E31D1C"/>
                            <Mask id="mask1_1_27" style={{maskType: 'luminance'}} maskUnits="userSpaceOnUse" x="0" y="0" width="78" height="59">
                              <Path fillRule="evenodd" clipRule="evenodd" d="M0 0V58.05H77.4V0H0Z" fill="white"/>
                            </Mask>
                            <G mask="url(#mask1_1_27)">
                              <Path fillRule="evenodd" clipRule="evenodd" d="M0 -4.83749V29.025H77.4V-4.83749H0Z" fill="#F7FCFF"/>
                            </G>
                            <Path fillRule="evenodd" clipRule="evenodd" d="M0 0V58.05L43.5375 29.025L0 0Z" fill="#3D58DB"/>
                          </G>
                        </Svg>
                      </View>
                      <Text style={styles.locationText}>Prague, Czech Republic</Text>
                      <Text style={styles.dot}>•</Text>
                      <Text style={styles.friendsText}>113k Friends</Text>
                    </View>
                    
                    {/* Interest icons */}
                    <View style={styles.interestsContainer}>
                      <View style={styles.interestItem}>
                        <TouchableOpacity style={styles.interestIconButton}>
                          <Text style={styles.interestEmoji}>✈️</Text>
                        </TouchableOpacity>
                        <Text style={styles.interestLabel}>Travel</Text>
                      </View>
                      
                      <View style={styles.interestItem}>
                        <TouchableOpacity style={styles.interestIconButton}>
                          <Text style={styles.interestEmoji}>🍔</Text>
                        </TouchableOpacity>
                        <Text style={styles.interestLabel}>Food</Text>
                      </View>
                      
                      <View style={styles.interestItem}>
                        <TouchableOpacity style={styles.interestIconButton}>
                          <Text style={styles.interestEmoji}>🌊</Text>
                        </TouchableOpacity>
                        <Text style={styles.interestLabel}>Sea</Text>
                      </View>
                      
                      <View style={styles.interestItem}>
                        <TouchableOpacity style={styles.interestIconButton}>
                          <Text style={styles.interestEmoji}>🏸</Text>
                        </TouchableOpacity>
                        <Text style={styles.interestLabel}>Badminton</Text>
                      </View>
                      
                      <View style={styles.interestItem}>
                        <TouchableOpacity style={styles.interestIconButton}>
                          <Text style={styles.interestEmoji}>☕</Text>
                        </TouchableOpacity>
                        <Text style={styles.interestLabel}>Coffee</Text>
                      </View>
                    </View>
                    
                    {/* Profile action buttons */}
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.editButtonText}>Edit Profile</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                        <Text style={styles.shareButtonText}>Share Profile</Text>
                      </TouchableOpacity>
                    </View>
                    
                    {/* Bio text */}
                    <Text style={styles.bioText}>
                      I'm a multi-faceted startup founder and USA expat 🇨🇿 always chasing new PRs 🏋️‍♂️ and passport stamps 🌍✈️. I speak English, Spanish, and some Czech. Fueled by bubble tea 🧋 and weekend brunch mimosas 🥂, I thrive on spontaneous night-train escapes 🚆 or impromptu road-trip adventures 🚗💨. My year splits between snowboarding 🏂 in winter and mastering wake-boarding & swimming laps 🏊‍♂️ in summer—balanced out by sauna & jacuzzi recovery sessions 🧖‍♂️💦. Whether I'm dialing in Olympic lifts, firing up the barbecue 🍖🔥, or diving into the latest anime binge 🎌, I live for an active, entrepreneurial life. Let's turn every moment into our next epic story! 🔥✨
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
          </View>
        </ViewShot>
        
        <View style={styles.homeIndicator} />
      </LinearGradient>
    </View>
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
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    shadowColor: 'rgba(11, 19, 66, 0.5)', // Updated shadow color per design
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 100, // Increased per design
    shadowOpacity: 0.5,
    elevation: 10,
    overflow: 'hidden', // Ensures the rounded corners work with the image
  },
  headerImage: {
    width: '100%',
    height: 250, // Increased height for better use of screen space
    position: 'relative',
  },
  gradientOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.55)', // Darker overlay to match reference
    zIndex: 1,
  },
  headerGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 20,
    top: 60,
    zIndex: 3,
  },
  transparentView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentWrapper: {
    flex: 1,
    paddingTop: 45, // Further reduced padding to bring content closer to profile picture
    backgroundColor: '#EAF2F9',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#EAF2F9',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#EAF2F9',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
    paddingTop: 15, // Reduced top padding to tighten layout
    backgroundColor: '#EAF2F9',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
    backgroundColor: '#EAF2F9',
  },
  profileInfoContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 12, // Reduced gap between elements
    marginTop: 8, // Further reduced margin to bring content closer to profile picture
    backgroundColor: 'transparent',
  },
  fullNameText: {
    fontFamily: 'DMSans-Bold',
    fontSize: 36,
    lineHeight: 40,
    textAlign: 'center',
    letterSpacing: -0.05 * 36,
    color: '#000000',
    width: '100%',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    height: 24,
    backgroundColor: 'transparent',
  },
  flagContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  locationText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
    backgroundColor: 'transparent',
  },
  dot: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
    backgroundColor: 'transparent',
  },
  friendsText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
    backgroundColor: 'transparent',
  },
  interestsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 72,
    marginTop: 16,
    backgroundColor: 'transparent',
  },
  interestItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    width: 64,
    height: 72, // Increased height to accommodate larger emojis
    backgroundColor: 'transparent',
  },
  interestIconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: '#EAF2F9',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 0,
  },
  interestEmoji: {
    fontSize: 22,
    lineHeight: 26,
    backgroundColor: 'transparent',
    marginTop: 1, // Slightly adjust vertical position of emoji
  },
  interestLabel: {
    fontFamily: 'DMSans-Medium',
    fontSize: 12,
    lineHeight: 18,
    color: '#000000',
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    gap: 10,
    marginTop: 16,
    backgroundColor: 'transparent',
  },
  editButton: {
    flex: 1,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 35,
    backgroundColor: '#FFFFFF',
  },
  editButtonText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    lineHeight: 20,
    color: '#000000',
    letterSpacing: -0.015 * 16,
  },
  shareButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#0B228C',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 35,
  },
  shareButtonText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    lineHeight: 20,
    color: '#FFFFFF',
    letterSpacing: -0.015 * 16,
  },
  bioText: {
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    letterSpacing: -0.015 * 16,
    color: '#000000',
    marginTop: 16,
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
  profileImageContainer: {
    position: 'absolute',
    width: 140,
    height: 140,
    left: '50%',
    marginLeft: -70,
    top: 170, // Positioned lower to match increased header height
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: 'transparent',
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
  },
});
