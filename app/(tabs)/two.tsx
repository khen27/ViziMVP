import React, { useState, useEffect, useContext } from 'react';
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
  FlatList,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Rect } from 'react-native-svg';
import { getWidgetImageByIndex } from '../utils/imageUtils';
import { ChatDataContext } from '../context/ChatDataContext';
import { BlurView } from 'expo-blur';

// Type definitions for chat data
interface User {
  id: string;
  name: string;
  image: any;
}

interface ChatMessage {
  id: string;
  text: string;
  isTyping?: boolean;
  timestamp: string;
  unreadCount?: number;
}

interface Chat {
  id: string;
  title: string;
  image: any;
  borderColor?: string;
  lastMessage: ChatMessage;
  participants?: string;
}

// Define the possible border colors (same as in GroupChatMarker)
const BORDER_COLORS = ['#FFA300', '#4694FD', '#ED5370'];

export default function TabTwoScreen() {
  // Use the shared chat data context
  const { chatMarkers } = useContext(ChatDataContext);
  
  // Featured users at the top
  const users: User[] = [
    { id: '1', name: 'Martin', image: require('../../assets/people/image-1.png') },
    { id: '2', name: 'Mike', image: require('../../assets/people/image-2.png') },
    { id: '3', name: 'Julia', image: require('../../assets/people/image-3.png') },
    { id: '4', name: 'Mia', image: require('../../assets/people/image-4.png') },
    { id: '5', name: 'Demi', image: require('../../assets/people/image-5.png') },
    { id: '6', name: 'Brian', image: require('../../assets/people/image.png') },
  ];

  // Convert chatMarkers to chat list items
  const dynamicChats = chatMarkers.map(marker => {
    // Determine which border color to use
    const borderColor = marker.borderColorIndex !== undefined ? 
      BORDER_COLORS[marker.borderColorIndex % BORDER_COLORS.length] : undefined;
    
    // Determine which image to use
    const image = marker.imageIndex !== undefined ? 
      getWidgetImageByIndex(marker.imageIndex) : require('../../assets/paddleboarding.png');
    
    // Random message texts for variety
    const messageTexts = [
      'Anyone want to join?',
      'We need more people!',
      'Great event coming up!',
      'Looking forward to this!',
      'Let\'s make this happen!',
    ];
    
    // Random timestamps for variety
    const timestamps = [
      'Just now',
      '5m ago',
      '10m ago',
      '30m ago',
      '1h ago',
      '2h ago',
    ];
    
    return {
      id: marker.id,
      title: marker.name || 'Group Chat',
      image: image,
      borderColor: borderColor,
      lastMessage: {
        id: `m-${marker.id}`,
        text: messageTexts[Math.floor(Math.random() * messageTexts.length)],
        timestamp: timestamps[Math.floor(Math.random() * timestamps.length)],
        unreadCount: Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 1 : undefined,
      },
      participants: marker.participants.toString(),
    };
  });
  
  // Fallback chats if no dynamic chats are available
  const fallbackChats: Chat[] = [
    {
      id: '1',
      title: 'Paddleboarding',
      image: require('../../assets/paddleboarding.png'),
      borderColor: '#ED5370',
      lastMessage: {
        id: 'm1',
        text: 'Super! Is there another photo showing mana...',
        timestamp: '11:14 am'
      }
    },
    {
      id: '2',
      title: 'Morning Walk🏃',
      image: require('../../assets/morning-walk.png'),
      borderColor: '#4694FD',
      lastMessage: {
        id: 'm2',
        text: '',
        isTyping: true,
        timestamp: '11:10 am',
        unreadCount: 2
      }
    },
    {
      id: '3',
      title: 'Olivia Mercado',
      image: require('../../assets/olivia.png'),
      lastMessage: {
        id: 'm3',
        text: 'Lets create a group for trip with ot...',
        timestamp: '07:35 am',
        unreadCount: 5
      }
    },
    {
      id: '4',
      title: 'Miami Slice',
      image: require('../../assets/miami-slice.png'),
      borderColor: '#FFA300',
      lastMessage: {
        id: 'm4',
        text: 'I want to book a table for a large group on ne...',
        timestamp: 'Yesterday'
      }
    },
    {
      id: '5',
      title: 'Cuban Food Tour',
      image: require('../../assets/cuban-food.png'),
      borderColor: '#4694FD',
      lastMessage: {
        id: 'm5',
        text: 'Voice message',
        timestamp: 'Wed'
      }
    },
    {
      id: '6',
      title: 'Martin Pokorný',
      image: require('../../assets/people/image-1.png'),
      lastMessage: {
        id: 'm6',
        text: 'Ahoj, kde jsi?',
        timestamp: 'Tue',
        unreadCount: 5
      }
    },
  ];
  
  const chats = dynamicChats;

  // Renders a user avatar with name
  const renderUser = ({item}: {item: User}) => (
    <View style={styles.userContainer}>
      <Image source={item.image} style={styles.userAvatar} />
      <Text style={styles.userName}>{item.name}</Text>
    </View>
  );

  // Renders each chat list item
  const renderChatItem = ({item}: {item: Chat}) => (
    <View style={styles.chatItemContainer}>
      <View style={styles.chatImageWrapper}>
        <Image source={item.image} style={styles.chatImage} resizeMode="cover" />
        
        {/* Add audience and age range pills if available */}
        <View style={styles.chatImagePillsContainer}>
          <View style={styles.chatImagePillsRow}>
            {/* Left pill could show audience or group type */}
            {item.borderColor && (
              <View style={styles.pillWrapper}>
                <View style={styles.pill}>
                  <Text style={styles.pillText}>Group</Text>
                </View>
              </View>
            )}
            
            {/* Right pill could show age range */}
            <View style={styles.pillWrapper}>
              <View style={styles.pill}>
                <Text style={styles.pillText}>18yr ›</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.chatContent}>
        <View style={styles.chatInfo}>
          <View style={styles.chatTitleContainer}>
            <Text style={styles.chatTitle}>{item.title}</Text>
            <Text style={styles.chatTimestamp}>{item.lastMessage.timestamp}</Text>
          </View>
          
          <View style={styles.chatLastMessage}>
            {item.lastMessage.isTyping ? (
              <View style={styles.typingContainer}>
                <View style={styles.typingDots}>
                  <View style={styles.typingDot1} />
                  <View style={styles.typingDot2} />
                  <View style={styles.typingDot3} />
                </View>
                <Text style={styles.messagePreview}>Mike is typing</Text>
              </View>
            ) : item.lastMessage.text.includes('Voice message') ? (
              <View style={styles.voiceMessageContainer}>
                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <Path 
                    d="M8.8 7C8.8 7.44183 8.44183 7.8 8 7.8C7.55817 7.8 7.2 7.44183 7.2 7C7.2 6.55817 7.55817 6.2 8 6.2C8.44183 6.2 8.8 6.55817 8.8 7Z"
                    fill="#000000"
                  />
                  <Path
                    d="M1.33333 8.00001C1.33333 4.32001 4.32 1.33334 8 1.33334C11.68 1.33334 14.6667 4.32001 14.6667 8.00001C14.6667 11.68 11.68 14.6667 8 14.6667C4.32 14.6667 1.33333 11.68 1.33333 8.00001Z"
                    stroke="#000000"
                    strokeWidth="1.15"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    d="M5.34666 9.96001V6.96001C5.34666 5.06668 7.99999 5.06668 7.99999 6.96001V9.96001"
                    stroke="#000000"
                    strokeWidth="1.15"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    d="M10.6533 9.96001V6.96001C10.6533 5.06668 8 5.06668 8 6.96001"
                    stroke="#000000"
                    strokeWidth="1.15"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
                <Text style={styles.messagePreview}>Voice message</Text>
              </View>
            ) : (
              <Text style={styles.messagePreview}>{item.lastMessage.text}</Text>
            )}
            
            {item.lastMessage.unreadCount && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadCount}>{item.lastMessage.unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );

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
          
          {/* Updated Header */}
          <View style={styles.header}>
            <View style={styles.headerRow}>
              <Text style={styles.headerTitle}>Chats</Text>
              <View style={styles.headerIcons}>
                {/* Search Icon */}
                <TouchableOpacity style={styles.headerIconButton}>
                  <Svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                    <Rect width="50" height="50" rx="25" fill="#EAF2F9"/>
                    <Path d="M30.9338 17.2336C34.5789 20.8786 34.5789 26.7886 30.9338 30.4336C27.2888 34.0786 21.3788 34.0786 17.7338 30.4336C14.0888 26.7886 14.0888 20.8786 17.7338 17.2336C21.3788 13.5885 27.2888 13.5885 30.9338 17.2336" stroke="black" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round"/>
                    <Path d="M35.0002 34.4998L30.9377 30.4373" stroke="black" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round"/>
                  </Svg>
                </TouchableOpacity>
                {/* Inbox Icon */}
                <TouchableOpacity style={styles.headerIconButton}>
                  <Svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                    <Rect x="0" width="50" height="50" rx="25" fill="#EAF2F9"/>
                    <Path d="M25 13.3333V21.5L27.3333 19.1667" stroke="black" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round"/>
                    <Path d="M25.0003 21.5001L22.667 19.1667" stroke="black" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round"/>
                    <Path d="M13.3096 26.1667H18.4546C18.8979 26.1667 19.2946 26.4117 19.4929 26.8084L20.8579 29.5384C21.2546 30.3317 22.0596 30.8334 22.9462 30.8334H27.0646C27.9512 30.8334 28.7562 30.3317 29.1529 29.5384L30.5179 26.8084C30.7162 26.4117 31.1246 26.1667 31.5562 26.1667H36.6429" stroke="black" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round"/>
                    <Path d="M19.1663 15.8184C15.0363 16.425 13.333 18.8517 13.333 23.8334V28.5C13.333 34.3334 15.6663 36.6667 21.4997 36.6667H28.4997C34.333 36.6667 36.6663 34.3334 36.6663 28.5V23.8334C36.6663 18.8517 34.963 16.425 30.833 15.8184" stroke="black" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round"/>
                  </Svg>
                </TouchableOpacity>
              </View>
            </View>
            {/* User avatars row */}
            <View style={styles.userListContainer}>
              <FlatList
                data={users}
                renderItem={renderUser}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.userListContent}
              />
            </View>
          </View>
          
          <View style={styles.chatListHeader}>
            <Text style={styles.chatListHeaderText}>Chats</Text>
          </View>
          
          {/* Main chat list */}
          <ScrollView
            style={styles.chatListContainer}
            contentContainerStyle={[
              styles.chatListContent,
              chats.length === 0 && styles.emptyChatListContent
            ]}
            showsVerticalScrollIndicator={false}
          >
            {chats.length > 0 ? (
              chats.map((chat) => (
                <TouchableOpacity key={chat.id} activeOpacity={0.7}>
                  {renderChatItem({item: chat})}
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyStateContainer}>
                <Text style={styles.emptyStateTitle}>No Chats Yet</Text>
                <Text style={styles.emptyStateMessage}>
                  Create a group chat on the map tab to get started!
                </Text>
              </View>
            )}
          </ScrollView>
          
          {/* Add gradient overlay */}
          <LinearGradient
            colors={['rgba(234, 242, 249, 0)', '#EAF2F9']}
            style={styles.gradientOverlay}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        </View>
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
    height: '92%', // Increased from 86% to cover more of the screen
    backgroundColor: '#EAF2F9',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: 'rgba(11, 19, 66, 0.5)',
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 100,
    shadowOpacity: 0.5,
    elevation: 10,
    overflow: 'hidden', // Added to hide any elements that might be appearing outside bounds
  },
  header: {
    width: '100%',
    height: 222,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingTop: 60,
    paddingHorizontal: 0,
    paddingBottom: 0,
    zIndex: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 18,
  },
  headerTitle: {
    fontFamily: 'DMSans-Bold',
    fontSize: 32,
    lineHeight: 36,
    color: '#000000',
    letterSpacing: -0.05 * 32,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  headerIconButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EAF2F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  userListContainer: {
    marginTop: 0,
    paddingHorizontal: 16,
    height: 79,
    justifyContent: 'center',
  },
  userListContent: {
    gap: 20,
    alignItems: 'center',
  },
  userContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userName: {
    fontFamily: 'DMSans-Medium',
    fontSize: 13,
    lineHeight: 18,
    color: '#000000',
    marginTop: 8,
    textAlign: 'center',
  },
  chatListHeader: {
    paddingHorizontal: 20,
    marginTop: 12,
  },
  chatListHeaderText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    lineHeight: 20,
    color: '#000000',
  },
  chatListContainer: {
    flex: 1,
    marginTop: 10,
  },
  chatListContent: {
    paddingHorizontal: 20,
    paddingBottom: 140, // Increased to ensure content doesn't get cut off
  },
  chatItemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    height: 72,
  },
  chatImageWrapper: {
    width: 72,
    height: 72,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    overflow: 'hidden',
    padding: 0,
  },
  chatImage: {
    width: '100%',
    height: '100%',
    borderRadius: 22,
  },
  chatImagePillsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 4,
    zIndex: 10,
    gap: 8,
  },
  chatImagePillsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    height: 20,
    gap: 4,
  },
  pillWrapper: {
    height: 20,
    justifyContent: 'center',
  },
  pill: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 40,
    height: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 50,
    overflow: 'hidden',
  },
  pillText: {
    fontFamily: 'DMSans-SemiBold',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 10,
    lineHeight: 14,
    color: '#FFFFFF',
    letterSpacing: -0.01 * 10,
    textAlign: 'center',
  },
  chatImageBorder: {
    width: 72,
    height: 72,
    borderRadius: 36,
    position: 'absolute',
    transform: [{rotate: '-90deg'}],
  },
  chatContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  chatInfo: {
    flex: 1,
  },
  chatTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatTitle: {
    fontFamily: 'DMSans-Medium',
    fontSize: 22,
    lineHeight: 28,
    color: '#000000',
    letterSpacing: -0.015 * 22,
  },
  chatTimestamp: {
    fontFamily: 'DMSans-Regular',
    fontSize: 13,
    lineHeight: 16,
    color: 'rgba(0, 0, 0, 0.5)',
    textAlign: 'right',
  },
  chatLastMessage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messagePreview: {
    fontFamily: 'DMSans-Regular',
    fontSize: 13,
    lineHeight: 16,
    color: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  typingDots: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 4,
    width: 13,
    height: 18,
  },
  typingDot1: {
    width: 2,
    height: 2,
    backgroundColor: '#000000',
    borderRadius: 1,
    marginRight: 2,
  },
  typingDot2: {
    width: 3,
    height: 3,
    backgroundColor: '#000000',
    borderRadius: 1.5,
    marginRight: 2,
  },
  typingDot3: {
    width: 4,
    height: 4,
    backgroundColor: '#000000',
    borderRadius: 2,
  },
  voiceMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.5,
    flex: 1,
  },
  unreadBadge: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#0B228C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadCount: {
    fontFamily: 'DMSans-Medium',
    fontSize: 11,
    lineHeight: 14,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    zIndex: 20,
  },
  emptyChatListContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  emptyStateContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateTitle: {
    fontFamily: 'DMSans-Medium',
    fontSize: 24,
    lineHeight: 32,
    color: '#0B228C',
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyStateMessage: {
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(0, 0, 0, 0.6)',
    textAlign: 'center',
  },
});
