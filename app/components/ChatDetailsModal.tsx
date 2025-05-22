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
  tags: ['Traveling', 'Cooking'],
  distance: 0.7,
  createdBy: 'John Doe',
  createdAt: 'Today, 10:30 AM',
  imageIndex: 0,
  borderColorIndex: 0,
  audience: 'Women',
  ageRange: '18yr > 50yr',
};

const ChatDetailsModal: React.FC<ChatDetailsModalProps> = ({
  visible,
  onClose,
  onJoin,
  chatData = defaultChatData,
}) => {
  // Use the default chat data if chatData is null
  const actualChatData = chatData || defaultChatData;
  
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
      <View style={styles.container}>
        <View style={[styles.modalContent, { height: modalHeight }]}>
          {/* Header with Grabber */}
          <View style={styles.header}>
            <Image 
              source={require('../../assets/icons/Grabber.png')}
              style={styles.grabber}
            />
          </View>

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
              <View style={styles.tagItem}>
                <Text style={styles.tagText}>Wellness</Text>
              </View>
              <View style={styles.tagItem}>
                <Text style={styles.tagText}>Dog-Friendly</Text>
              </View>
              <View style={styles.tagItem}>
                <Text style={styles.tagText}>⚽ Sports</Text>
              </View>
            </View>

            {/* View Chat Button */}
            <TouchableOpacity 
              style={styles.viewChatButton}
              onPress={onJoin}
            >
              <Text style={styles.viewChatButtonText}>View Chat</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 0,
  },
  grabber: {
    width: 36,
    height: 5,
    resizeMode: 'contain',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 50,
  },
  imageContainer: {
    width: '100%',
    height: 245,
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
    marginBottom: 24,
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
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0B228C',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  viewChatButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
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