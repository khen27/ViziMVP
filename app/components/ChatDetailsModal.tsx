import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
  Dimensions,
  Platform,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { getWidgetImageByIndex } from '../utils/imageUtils';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

interface ChatDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  onJoin?: () => void;
  chatData?: {
    id: string;
    name?: string;
    location?: string;
    description?: string;
    imageUrl: string | null;
    participants: number;
    duration?: string;
    tags?: string[];
    distance?: number;
    createdBy?: string;
    createdAt?: string;
    imageIndex?: number;
    borderColorIndex?: number;
    audience?: string;
    ageRange?: string;
  };
}

// Border colors matching GroupChatMarker
const BORDER_COLORS = ['#FFA300', '#4694FD', '#ED5370'];

// Use the first image from our map-widget-pics folder as default
const defaultImage = getWidgetImageByIndex(0);

const defaultChatData = {
  id: '1',
  name: 'Miami Food Tour',
  location: '584 NW 26th St, Miami, FL 33127',
  description: 'Join us for a tour of the best food spots in Miami! We\'ll be visiting the local favorites and trying out some amazing dishes.',
  imageUrl: null,
  participants: 12,
  duration: '12 hours',
  tags: ['Wellness', 'Dog-Friendly', 'Sports', 'Traveling', 'Cooking'],
  distance: 0.7,
  createdBy: 'John Doe',
  createdAt: 'Today, 10:30 AM',
  imageIndex: 0,
  borderColorIndex: 0,
  audience: 'Women',
  ageRange: '18yr > 50yr',
};

// Map of tag names to emojis - used for fallback when tag doesn't include emoji
const TAG_EMOJIS: Record<string, string> = {
  'Wellness': '🧘',
  'Dog-Friendly': '🐕',
  'Sports': '⚽',
  'Traveling': '✈️',
  'Cooking': '👨‍🍳',
  'Music': '🎵',
  'Art': '🎨',
  'Reading': '📚',
  'Gaming': '🎮',
  'Outdoors': '🏞️',
  'Fitness': '💪',
  'Movies': '🎬',
  'Camping': '🏕️',
  'Beach trips': '🏖️',
  'Swimming': '🏊',
  'Hiking': '🥾',
  'Theatre': '🎭',
  'Photography': '📷',
};

const ChatDetailsModal: React.FC<ChatDetailsModalProps> = ({
  visible,
  onClose,
  onJoin,
  chatData = defaultChatData,
}) => {
  // Use the default chat data if chatData is null
  const actualChatData = chatData || defaultChatData;
  const insets = useSafeAreaInsets();
  
  const screenHeight = Dimensions.get('window').height;
  const modalHeight = screenHeight * 0.8; // 80% of screen height
  
  // Animation for the join button
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    if (visible) {
      // Start pulsing animation when modal becomes visible
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      // Stop animation when modal is hidden
      pulseAnim.stopAnimation();
    }
  }, [visible]);

  // Use the actualChatData or default
  const borderColor = BORDER_COLORS[
    actualChatData.borderColorIndex !== undefined 
      ? actualChatData.borderColorIndex % BORDER_COLORS.length 
      : 0
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'flex-start' }}>
        <TouchableOpacity 
          style={{ flex: 1, position: 'absolute', width: '100%', height: '100%' }}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.container}>
          {/* Header with Grabber */}
          <View style={styles.grabber} />
          
          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Main Image */}
            <View style={styles.imageContainer}>
              <Image
                source={actualChatData.imageUrl ? { uri: actualChatData.imageUrl } : defaultImage}
                style={styles.headerImage}
                resizeMode="cover"
              />
              
              {/* Pills Container */}
              <View style={styles.pillsContainer}>
                <View style={styles.pillsRow}>
                  {/* Left pill (audience) */}
                  <View style={styles.leftPillWrapper}>
                    <View style={styles.pill}>
                      <Text style={styles.pillText}>{actualChatData.audience || 'General'}</Text>
                    </View>
                  </View>
                  
                  {/* Right pill (age range) */}
                  <View style={styles.rightPillWrapper}>
                    <View style={styles.pill}>
                      <Text style={styles.pillText}>{actualChatData.ageRange || '18yr >'}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Group Name Row with Avatars */}
            <View style={styles.groupNameRow}>
              <Text style={styles.chatName}>{actualChatData.name || 'Group Chat'}</Text>
              <View style={styles.avatarsRow}>
                <Text style={styles.plusCount}>+10</Text>
                <View style={styles.avatarsStack}>
                  <Image source={require('../../assets/people/image-1.png')} style={styles.avatar} />
                  <Image source={require('../../assets/people/image-3.png')} style={[styles.avatar, styles.avatar3]} />
                  {/* Middle avatar - larger and in front */}
                  <Image source={require('../../assets/people/image-2.png')} style={[styles.avatarCenter]} />
                </View>
              </View>
            </View>

            {/* Description text - only show if there's a description */}
            {actualChatData.description ? (
              <Text style={styles.description}>
                {actualChatData.description}
              </Text>
            ) : null}

            {/* Location row with icon */}
            <View style={styles.locationRow}>
              <Image 
                source={require('../../assets/icons/icon-group-chat-location.png')} 
                style={styles.locationIcon} 
              />
              <Text style={styles.locationText}>{actualChatData.location || '584 NW 26th St, Miami, FL 33127'}</Text>
            </View>

            {/* Interest Tags */}
            <View style={styles.interestTagsContainer}>
              {(actualChatData.tags || []).map((tag, index) => {
                // Get the emoji for this tag
                const emoji = TAG_EMOJIS[tag] || '🏷️';
                
                return (
                  <View key={index} style={styles.tagItem}>
                    <Text style={styles.tagText}>{emoji} {tag}</Text>
                  </View>
                );
              })}
              {/* Show fallback tags if no tags are provided */}
              {(!actualChatData.tags || actualChatData.tags.length === 0) && (
                <>
                  <View style={styles.tagItem}>
                    <Text style={styles.tagText}>🧘 Wellness</Text>
                  </View>
                  <View style={styles.tagItem}>
                    <Text style={styles.tagText}>🐕 Dog-Friendly</Text>
                  </View>
                  <View style={styles.tagItem}>
                    <Text style={styles.tagText}>⚽ Sports</Text>
                  </View>
                </>
              )}
            </View>

            {/* View Chat Button */}
            <TouchableOpacity 
              style={styles.viewChatButton}
              onPress={onJoin}
              activeOpacity={0.8}
            >
              <Text style={styles.viewChatButtonText}>View Chat</Text>
            </TouchableOpacity>
            <View style={{ height: 20 }} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 180,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: 'rgba(9,65,115,0.15)',
    shadowOffset: { width: 0, height: -8 },
    shadowRadius: 60,
    elevation: 10,    // for Android
    paddingTop: 0,
    zIndex: 100,
    height: 'auto',
  },
  grabber: {
    width: 36,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgba(60,60,67,0.3)',
    alignSelf: 'center',
    marginVertical: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 0, // no extra padding at the bottom
  },
  imageContainer: {
    width: '100%',
    height: 225,
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
    marginTop: -10,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 22,
  },
  imageGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  pillsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 12,
    zIndex: 10,
  },
  pillsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  leftPillWrapper: {
    height: 28,
    justifyContent: 'center',
  },
  rightPillWrapper: {
    height: 28,
    justifyContent: 'center',
  },
  pill: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    height: 28,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 50,
    overflow: 'hidden',
  },
  pillText: {
    fontFamily: 'DMSans-SemiBold',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
    color: '#FFFFFF',
    letterSpacing: -0.015 * 14,
    textAlign: 'center',
  },
  chatName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    color: '#000',
    fontFamily: 'DMSans-Bold',
  },
  description: {
    width: '100%',
    fontFamily: 'DMSans-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.01 * 16,
    color: 'rgba(0, 0, 0, 0.5)',
    marginBottom: 16,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 28,
    marginBottom: 16,
    gap: 8,
  },
  locationIcon: {
    width: 28,
    height: 28,
  },
  locationText: {
    flex: 1,
    fontFamily: 'DMSans-SemiBold',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.01 * 16,
    color: '#000000',
  },
  interestTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    gap: 8,
  },
  tagItem: {
    backgroundColor: '#EAF2F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  tagText: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'DMSans-Medium',
  },
  viewChatButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0B228C',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0, // no margin below the button
    shadowColor: '#0B228C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  viewChatButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'DMSans-Medium',
  },
  groupNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 36,
    marginBottom: 10,
    gap: 6,
  },
  avatarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 36,
  },
  plusCount: {
    fontFamily: 'DMSans-Medium',
    fontSize: 13,
    color: '#000',
    fontWeight: '500',
    marginRight: 4,
  },
  avatarsStack: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 68,
    height: 36,
    position: 'relative',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EAF2F9',
    borderWidth: 2,
    borderColor: '#fff',
    position: 'absolute',
    left: 0,
    top: 4,
    zIndex: 1,
  },
  avatarCenter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EAF2F9',
    borderWidth: 2,
    borderColor: '#fff',
    position: 'absolute',
    left: 18,
    top: 2,
    zIndex: 3,
  },
  avatar2: {
    left: 18,
    zIndex: 2,
  },
  avatar3: {
    left: 40,
    top: 4,
    zIndex: 1,
  },
});

export default ChatDetailsModal; 