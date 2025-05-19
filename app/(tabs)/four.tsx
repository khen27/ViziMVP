import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, G, Mask } from 'react-native-svg';

export default function TabFourScreen() {
  return (
    <View style={styles.mainContainer}>
      <LinearGradient
        colors={['#7389EC', '#4694FD']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.contentContainer}>
          <StatusBar barStyle="dark-content" />
          
          {/* Page Title */}
          <Text style={styles.pageTitle}>Notifications</Text>
          
          <SafeAreaView style={styles.safeArea}>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Today's Notifications Section */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Today</Text>
                
                {/* Swimming Group Chat Notification */}
                <View style={styles.notificationCard}>
                  <View style={styles.notificationHeader}>
                    <View style={styles.profileImageContainer}>
                      <Image 
                        source={require('../../assets/test-profile-image.png')}
                        style={styles.profileImage}
                      />
                      <View style={styles.newBadgeContainer}>
                        <Text style={styles.newBadgeText}>New</Text>
                      </View>
                    </View>
                    
                    <View style={styles.notificationContent}>
                      <View style={styles.notificationTitleRow}>
                        <Text style={styles.notificationTitle}>Swimming group chat</Text>
                        <Text style={styles.notificationTime}>7m ago</Text>
                      </View>
                      <Text style={styles.notificationDescription}>
                        Ben G. just create a swimming group chat.
                      </Text>
                      <View style={styles.actionButtonsContainer}>
                        <TouchableOpacity style={styles.declineButton}>
                          <Text style={styles.declineButtonText}>Decline</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.acceptButton}>
                          <Text style={styles.acceptButtonText}>Join Group</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
                
                {/* Feature Alert Notification */}
                <View style={styles.notificationCard}>
                  <View style={styles.notificationHeader}>
                    <View style={styles.logoContainer}>
                      <Text style={styles.logoText}>v</Text>
                    </View>
                    
                    <View style={styles.notificationContent}>
                      <View style={styles.notificationTitleRow}>
                        <Text style={styles.notificationTitle}>New Feature Alert!</Text>
                        <Text style={styles.notificationTime}>7h ago</Text>
                      </View>
                      <Text style={styles.notificationDescription}>
                        You can now send voice notes in chat!
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              
              {/* Tomorrow's Notifications Section */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Tomorrow</Text>
                
                {/* Security Notification */}
                <View style={styles.notificationCard}>
                  <View style={styles.notificationHeader}>
                    <View style={styles.iconContainer}>
                      <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <Path
                          d="M8.32 8.32C8.32 8.32 11.5 10.5 13.5 8.32"
                          stroke="#4694FD"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <Path
                          d="M2 11C2 4 4 2 11 2C18 2 20 4 20 11C20 18 18 20 11 20C4 20 2 18 2 11Z"
                          stroke="#4694FD"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </Svg>
                    </View>
                    
                    <View style={styles.notificationContent}>
                      <View style={styles.notificationTitleRow}>
                        <Text style={styles.notificationTitle}>Your account security</Text>
                        <Text style={styles.notificationTime}>1d ago</Text>
                      </View>
                      <Text style={styles.notificationDescription}>
                        Update your password for better protection.
                      </Text>
                    </View>
                  </View>
                </View>
                
                {/* Friend Request Notification */}
                <View style={styles.notificationCard}>
                  <View style={styles.notificationHeader}>
                    <View style={styles.profileImageContainer}>
                      <Image 
                        source={require('../../assets/jodi-frank.png')}
                        style={styles.profileImage}
                      />
                    </View>
                    
                    <View style={styles.notificationContent}>
                      <View style={styles.notificationTitleRow}>
                        <Text style={styles.notificationTitle}>Jodi Frank</Text>
                        <Text style={styles.notificationTime}>1d ago</Text>
                      </View>
                      <Text style={styles.notificationDescription}>
                        You got a friend request from Jodi Frank.
                      </Text>
                      <View style={styles.actionButtonsContainer}>
                        <TouchableOpacity style={styles.declineButton}>
                          <Text style={styles.declineButtonText}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.acceptButton}>
                          <Text style={styles.acceptButtonText}>Confirm Add</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
                
                {/* Yoga Group Chat Notification */}
                <View style={styles.notificationCard}>
                  <View style={styles.notificationHeader}>
                    <View style={styles.profileImageContainer}>
                      <Image 
                        source={require('../../assets/laura-wagner.png')}
                        style={styles.profileImage}
                      />
                    </View>
                    
                    <View style={styles.notificationContent}>
                      <View style={styles.notificationTitleRow}>
                        <Text style={styles.notificationTitle}>Yoga with Pets group chat</Text>
                        <Text style={styles.notificationTime}>1d ago</Text>
                      </View>
                      <Text style={styles.notificationDescription}>
                        Laura Wagner just create a Yoga with Pets group chat.
                      </Text>
                      <View style={styles.actionButtonsContainer}>
                        <TouchableOpacity style={styles.declineButton}>
                          <Text style={styles.declineButtonText}>Decline</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.acceptButton}>
                          <Text style={styles.acceptButtonText}>Join Group</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
        
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
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: 'rgba(11, 19, 66, 0.5)',
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 100,
    shadowOpacity: 0.5,
    elevation: 10,
  },
  pageTitle: {
    fontFamily: 'DMSans-Medium',
    fontSize: 32,
    lineHeight: 36,
    textAlign: 'center',
    letterSpacing: -0.05 * 32,
    color: '#000000',
    marginTop: 76,
    marginBottom: 34,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Extra padding to avoid tab bar overlap
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.015 * 16,
    color: 'rgba(0, 0, 0, 0.5)',
    marginBottom: 12,
    paddingHorizontal: 14,
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    marginBottom: 12,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  profileImageContainer: {
    width: 57,
    height: 57,
    borderRadius: 50,
    position: 'relative',
  },
  profileImage: {
    width: 57,
    height: 57,
    borderRadius: 50,
  },
  newBadgeContainer: {
    position: 'absolute',
    top: 0,
    left: -7,
    backgroundColor: '#FFA300',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 20,
    transform: [{ rotate: '-19.4deg' }],
    shadowColor: 'rgba(255, 255, 255, 0.25)',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  newBadgeText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 12,
    lineHeight: 12,
    color: '#FFFFFF',
    letterSpacing: -0.005 * 12,
  },
  logoContainer: {
    width: 57,
    height: 57,
    borderRadius: 50,
    backgroundColor: 'rgba(70, 148, 253, 1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontFamily: 'Pacifico-Regular',
    fontSize: 22,
    color: '#FFFFFF',
    letterSpacing: 0.1 * 22,
  },
  iconContainer: {
    width: 57,
    height: 57,
    borderRadius: 50,
    backgroundColor: '#EAF2F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    lineHeight: 22,
    color: '#000000',
    letterSpacing: -0.015 * 16,
  },
  notificationTime: {
    fontFamily: 'DMSans-Medium',
    fontSize: 12,
    lineHeight: 22,
    color: 'rgba(0, 0, 0, 0.5)',
    letterSpacing: -0.015 * 12,
  },
  notificationDescription: {
    fontFamily: 'DMSans-Regular',
    fontSize: 13,
    lineHeight: 20,
    color: 'rgba(0, 0, 0, 0.5)',
    letterSpacing: -0.015 * 13,
    marginBottom: 8,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
    marginTop: 8,
  },
  declineButton: {
    backgroundColor: '#EAF2F9',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  declineButtonText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 13,
    lineHeight: 20,
    color: '#000000',
    letterSpacing: -0.015 * 13,
  },
  acceptButton: {
    backgroundColor: '#0B228C',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptButtonText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 13,
    lineHeight: 20,
    color: '#FFFFFF',
    letterSpacing: -0.015 * 13,
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
