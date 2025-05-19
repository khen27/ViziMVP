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
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Rect } from 'react-native-svg';

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

export default function TabTwoScreen() {
  // Featured users at the top
  const users: User[] = [
    { id: '1', name: 'Martin', image: require('../../assets/people/image-1.png') },
    { id: '2', name: 'Mike', image: require('../../assets/people/image-2.png') },
    { id: '3', name: 'Julia', image: require('../../assets/people/image-3.png') },
    { id: '4', name: 'Mia', image: require('../../assets/people/image-4.png') },
    { id: '5', name: 'Demi', image: require('../../assets/people/image-5.png') },
    { id: '6', name: 'Brian', image: require('../../assets/people/image.png') },
  ];

  // Chat list data
  const chats: Chat[] = [
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
        {item.borderColor && (
          <View style={[styles.chatImageBorder, { backgroundColor: item.borderColor }]} />
        )}
        <Image source={item.image} style={styles.chatImage} />
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
            contentContainerStyle={styles.chatListContent}
            showsVerticalScrollIndicator={false}
          >
            {chats.map((chat) => (
              <TouchableOpacity key={chat.id} activeOpacity={0.7}>
                {renderChatItem({item: chat})}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* Bottom navigation bar - now inside the white background */}
        <View style={styles.navigationBar}>
          <TouchableOpacity style={styles.navItem}>
            <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <Path
                d="M3.5 10.5L14 3.5L24.5 10.5V22.1667C24.5 22.7855 24.2542 23.379 23.8166 23.8166C23.379 24.2542 22.7855 24.5 22.1667 24.5H5.83333C5.21449 24.5 4.621 24.2542 4.18342 23.8166C3.74583 23.379 3.5 22.7855 3.5 22.1667V10.5Z"
                stroke="#90C2FF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M10.5 24.5V14H17.5V24.5"
                stroke="#90C2FF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
            <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <Path
                d="M4.66699 23.334H23.3337V7.00065C23.3337 6.38181 23.0878 5.78832 22.6502 5.35074C22.2127 4.91315 21.6192 4.66732 21.0003 4.66732H7.00033C6.38149 4.66732 5.788 4.91315 5.35042 5.35074C4.91283 5.78832 4.66699 6.38181 4.66699 7.00065V23.334Z"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M9.33301 9.33398H18.6663"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M9.33301 14H14.0003"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem}>
            <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <Path
                d="M14 24.5C19.799 24.5 24.5 19.799 24.5 14C24.5 8.20101 19.799 3.5 14 3.5C8.20101 3.5 3.5 8.20101 3.5 14C3.5 19.799 8.20101 24.5 14 24.5Z"
                stroke="#90C2FF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M10.6162 10.616C10.3521 10.8807 10.143 11.1957 10.0009 11.5434C9.85868 11.891 9.78631 12.2645 9.78631 12.6416C9.78631 13.0188 9.85868 13.3923 10.0009 13.7399C10.143 14.0876 10.3521 14.4025 10.6162 14.6673C10.881 14.9314 11.1959 15.1406 11.5436 15.2827C11.8912 15.4249 12.2647 15.4973 12.6419 15.4973C13.019 15.4973 13.3925 15.4249 13.7402 15.2827C14.0878 15.1406 14.4028 14.9314 14.6675 14.6673"
                stroke="#90C2FF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M12.8328 10.4998H12.8445"
                stroke="#90C2FF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M17.4995 17.4998H17.5112"
                stroke="#90C2FF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem}>
            <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <Path
                d="M21 12.25C21 18.0833 14 23.3333 14 23.3333C14 23.3333 7 18.0833 7 12.25C7 10.1283 7.84285 8.09432 9.34315 6.59403C10.8434 5.09373 12.8774 4.25088 14.9991 4.25088C17.1208 4.25088 19.1548 5.09373 20.6551 6.59403C22.1554 8.09432 22.9983 10.1283 22.9983 12.25H21Z"
                stroke="#90C2FF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M14 15.1668C15.6569 15.1668 17 13.8236 17 12.1668C17 10.5099 15.6569 9.16675 14 9.16675C12.3431 9.16675 11 10.5099 11 12.1668C11 13.8236 12.3431 15.1668 14 15.1668Z"
                stroke="#90C2FF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem}>
            <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <Path
                d="M14 16.3332C16.3012 16.3332 18.1667 14.4677 18.1667 12.1665C18.1667 9.86536 16.3012 7.99984 14 7.99984C11.6989 7.99984 9.83337 9.86536 9.83337 12.1665C9.83337 14.4677 11.6989 16.3332 14 16.3332Z"
                stroke="#90C2FF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M7 22.1668C7 18.9548 10.134 16.3335 14 16.3335C17.866 16.3335 21 18.9548 21 22.1668"
                stroke="#90C2FF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
        </View>
        {/* Home indicator line */}
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
    flex: 1, // Fill the whole screen
    backgroundColor: '#EAF2F9',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: 'rgba(11, 19, 66, 0.5)',
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 100,
    shadowOpacity: 0.5,
    elevation: 10,
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
    paddingBottom: 90, // Extra space at bottom
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
  },
  chatImageBorder: {
    width: 72,
    height: 72,
    borderRadius: 36,
    position: 'absolute',
    transform: [{rotate: '-90deg'}],
  },
  chatImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
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
    backgroundColor: 'rgba(234, 242, 249, 0.8)',
  },
  navigationBar: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 60,
    paddingHorizontal: 24,
    gap: 24,
    bottom: 35,
    left: 0,
  },
  navItem: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navItemActive: {
    backgroundColor: '#0B228C',
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
