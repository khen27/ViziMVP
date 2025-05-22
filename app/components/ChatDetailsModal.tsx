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
          {/* Header with Close Button */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="chevron-down" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Main Image */}
            <View style={[styles.imageContainer, { borderColor }]}>
              <Image
                source={actualChatData.imageUrl ? { uri: actualChatData.imageUrl } : defaultImage}
                style={styles.headerImage}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['rgba(0,0,0,0.5)', 'transparent']}
                style={styles.imageGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
              />
              <View style={styles.participantsContainer}>
                <View style={styles.participantsBadge}>
                  <Text style={styles.participantsText}>{actualChatData.participants} people</Text>
                </View>
              </View>
            </View>

            {/* Chat Name */}
            <Text style={styles.chatName}>{actualChatData.name || 'Group Chat'}</Text>

            {/* Location Info */}
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={18} color="#555" />
              <Text style={styles.locationText}>{actualChatData.location || 'Location not specified'}</Text>
            </View>

            {/* Distance and Duration */}
            <View style={styles.metaContainer}>
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={18} color="#555" />
                <Text style={styles.metaText}>{actualChatData.duration || '12 hours'}</Text>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaItem}>
                <Ionicons name="navigate-outline" size={18} color="#555" />
                <Text style={styles.metaText}>{actualChatData.distance || 0} miles away</Text>
              </View>
            </View>

            {/* Tags */}
            <View style={styles.tagsContainer}>
              {(actualChatData.tags || ['General']).map((tag) => (
                <View key={tag} style={styles.tagItem}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>

            {/* Description */}
            <View style={styles.descriptionContainer}>
              <Text style={styles.sectionTitle}>About</Text>
              <Text style={styles.descriptionText}>{actualChatData.description || 'No description available.'}</Text>
            </View>

            {/* Created By Info */}
            <View style={styles.creatorContainer}>
              <Text style={styles.creatorLabel}>Created by</Text>
              <Text style={styles.creatorName}>{actualChatData.createdBy || 'Anonymous'}</Text>
              <Text style={styles.creationTime}>{actualChatData.createdAt || 'Recently'}</Text>
            </View>

            {/* Join Button with animation */}
            <Animated.View style={{ 
              transform: [{ scale: pulseAnim }],
              width: '100%',
            }}>
              <TouchableOpacity 
                style={styles.joinButton}
                onPress={onJoin}
              >
                <LinearGradient
                  colors={['#836CE8', '#4694FD']}
                  style={styles.joinButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.joinButtonText}>Join Chat</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
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
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  closeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EAF2F9',
    alignItems: 'center',
    justifyContent: 'center',
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
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
  },
  imageGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  participantsContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  participantsBadge: {
    backgroundColor: '#0B228C',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 100,
  },
  participantsText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'DMSans-Medium',
  },
  chatName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    color: '#000',
    fontFamily: 'DMSans-Bold',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  locationText: {
    fontSize: 15,
    color: '#555',
    marginLeft: 5,
    fontFamily: 'DMSans-Regular',
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  metaText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 5,
    fontFamily: 'DMSans-Regular',
  },
  metaDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#DDD',
    marginHorizontal: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  tagItem: {
    backgroundColor: '#EAF2F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    fontSize: 14,
    color: '#0B228C',
    fontFamily: 'DMSans-Medium',
  },
  descriptionContainer: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    fontFamily: 'DMSans-Medium',
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#555',
    fontFamily: 'DMSans-Regular',
  },
  creatorContainer: {
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 12,
    marginBottom: 30,
  },
  creatorLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
    fontFamily: 'DMSans-Regular',
  },
  creatorName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    fontFamily: 'DMSans-Medium',
  },
  creationTime: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'DMSans-Regular',
  },
  joinButton: {
    width: '100%',
    height: 50,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 10,
  },
  joinButtonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'DMSans-Medium',
  },
});

export default ChatDetailsModal; 