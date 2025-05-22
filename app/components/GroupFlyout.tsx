import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageSourcePropType,
  Platform,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';

// Get the screen dimensions
const { width: screenWidth } = Dimensions.get('window');

// Component props definition
interface GroupFlyoutProps {
  group: {
    audience: string;
    ageRange: string;
    image: ImageSourcePropType;
    title: string;
    members: string[];
    description: string;
    location: string;
    tags: string[];
  };
  onViewChatPress?: () => void;
}

// Random avatar selection
const getRandomAvatar = () => {
  const avatars = [
    require('../../assets/people/image-1.png'),
    require('../../assets/people/image-2.png'),
    require('../../assets/people/image-3.png'),
    require('../../assets/people/image-4.png'),
    require('../../assets/people/image-5.png'),
    require('../../assets/people/image.png'),
  ];
  return avatars[Math.floor(Math.random() * avatars.length)];
};

const MAX_CONTENT_WIDTH = 353;

const GroupFlyout: React.FC<GroupFlyoutProps> = ({ group, onViewChatPress }) => {
  // Generate random member count between 1 and 99
  const memberCount = Math.floor(Math.random() * 90) + 10;

  // Use up to 3 avatars from group.members if available, else random
  const avatarImages = group.members && group.members.length >= 3
    ? group.members.slice(0, 3).map((uri) => ({ uri }))
    : [getRandomAvatar(), getRandomAvatar(), getRandomAvatar()];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{
          width: 36,
          height: 5,
          borderRadius: 2.5,
          backgroundColor: 'rgba(60,60,67,0.3)',
          alignSelf: 'center',
          marginVertical: 8,
        }} />
        
        {/* Group image with pills */}
        <View style={styles.imageContainer}>
          <Image source={group.image} style={styles.backgroundImage} resizeMode="cover" />
          
          {/* Pills container - positioned as in the reference design */}
          <View style={styles.pillsContainer}>
            <View style={styles.pillsRow}>
              {/* Left pill (audience) */}
              <View style={styles.leftPillWrapper}>
                <View style={styles.pill}>
                  <Text style={styles.pillText}>{group.audience}</Text>
                </View>
              </View>
              
              {/* Right pill (age range) */}
              <View style={styles.rightPillWrapper}>
                <View style={styles.pill}>
                  <Text style={styles.pillText}>{group.ageRange}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Group info section */}
        <View style={styles.infoContainer}>
          {/* Title and members row */}
          <View style={styles.titleRow}>
            <Text style={styles.title}>{group.title}</Text>
            <View style={styles.membersContainer}>
              <View style={styles.avatarsStack}>
                {avatarImages.map((img, i) => (
                  <Image
                    key={i}
                    source={img}
                    style={[styles.avatar, i === 1 && styles.avatar2, i === 2 && styles.avatar3, { zIndex: 3 - i }]}
                  />
                ))}
              </View>
              <Text style={styles.memberCount}>+{memberCount}</Text>
            </View>
          </View>
          {/* Description */}
          <Text style={styles.description}>{group.description}</Text>
          {/* Location with map pin icon */}
          <View style={styles.locationRow}>
            <View style={styles.locationIcon}>
              <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <Path
                  d="M14 7C12.9 7 12.0001 7.9 12.0001 9C12.0001 10.1 12.9 11 14 11C15.1 11 16 10.1 16 9C16 7.9 15.1 7 14 7Z"
                  stroke="black"
                  strokeWidth="1.15"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M21 12C21 17.8333 14 23.3333 14 23.3333C14 23.3333 7 17.8333 7 12C7 9.34784 8.05357 6.8043 9.92893 4.92893C11.8043 3.05357 14.3478 2 17 2C19.6522 2 22.1957 3.05357 24.0711 4.92893C25.9464 6.8043 27 9.34784 27 12Z"
                  stroke="black"
                  strokeWidth="1.15"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
            <Text style={styles.location}>{group.location}</Text>
          </View>
          {/* Tags */}
          <View style={styles.tagsContainer}>
            {group.tags.map((tag, index) => (
              <View key={index} style={styles.tagChip}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
          {/* View Chat button */}
          <TouchableOpacity style={styles.button} onPress={onViewChatPress}>
            <Text style={styles.buttonText}>View Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 537,
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    shadowColor: 'rgba(9,65,115,0.05)',
    shadowOffset: { width: 0, height: -8 },
    shadowRadius: 60,
    elevation: 10,
    paddingTop: 20,
    paddingBottom: 60,
    zIndex: 100,
  },
  grabber: {
    width: 36,
    height: 5,
    backgroundColor: 'rgba(60, 60, 67, 0.3)',
    borderRadius: 2.5,
    marginBottom: 16,
    alignSelf: 'center',
  },
  imageContainer: {
    width: MAX_CONTENT_WIDTH,
    height: 245,
    borderRadius: 22,
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    borderRadius: 22,
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
  infoContainer: {
    width: MAX_CONTENT_WIDTH,
    gap: 16,
    alignSelf: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontFamily: 'DMSans-Bold',
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: -0.015 * 24,
    color: '#000',
    fontWeight: '600',
    flex: 1,
  },
  membersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  avatarsStack: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 68,
    height: 36,
    position: 'relative',
    marginRight: 8,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EAF2F9',
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#fff',
    left: 0,
  },
  avatar2: {
    left: 16,
  },
  avatar3: {
    left: 32,
  },
  memberCount: {
    fontFamily: 'DMSans-Bold',
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
    marginLeft: 4,
  },
  description: {
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: 'rgba(0,0,0,0.5)',
    letterSpacing: -0.01 * 16,
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  locationIcon: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  location: {
    fontFamily: 'DMSans-Bold',
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
    letterSpacing: -0.01 * 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  tagChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: '#EAF2F9',
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 13,
    lineHeight: 18,
    color: '#000',
    letterSpacing: -0.01 * 13,
    fontWeight: '500',
  },
  button: {
    width: '100%',
    backgroundColor: '#0B228C',
    borderRadius: 50,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 16,
  },
  buttonText: {
    fontFamily: 'DMSans-Bold',
    fontSize: 16,
    lineHeight: 20,
    color: '#fff',
    letterSpacing: -0.015 * 16,
    fontWeight: '500',
  },
});

export default GroupFlyout; 