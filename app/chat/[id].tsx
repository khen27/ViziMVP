import React, { useState, useContext, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView, 
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { ChatDataContext } from '@/context/ChatDataContext';
import { getWidgetImageByIndex } from '@/utils/imageUtils';

// Border colors matching GroupChatMarker in other components
const BORDER_COLORS = ['#FFA300', '#4694FD', '#ED5370'];

// Add types for clarity
interface ChatMessage {
  id: string;
  text: string;
  sender?: string;
  timestamp: string;
  senderImage?: any;
  isMine: boolean;
  reactions?: { emoji: string; count: number }[];
}
interface Participant {
  name: string;
  image: any;
}

export default function ChatScreen() {
  const params = useLocalSearchParams();
  const { id, isIndividual, name, image } = params;
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [inputText, setInputText] = useState('');
  const { chatMarkers } = useContext(ChatDataContext);
  
  // Individual chat mode
  const isIndividualChat = isIndividual === 'true';
  const personName = isIndividualChat ? name : undefined;
  let personImage: any = undefined;
  if (isIndividualChat) {
    if (typeof image === 'string') {
      personImage = { uri: image };
    } else if (typeof image === 'number') {
      personImage = image;
    } else if (image && typeof image === 'object' && !Array.isArray(image) && 'uri' in image) {
      personImage = { uri: (image as { uri: string }).uri };
    }
  }

  // Find the chat marker with matching ID
  const chatMarker = chatMarkers.find(marker => marker.id === id);
  
  // Determine the image source based on the chat marker
  const getImageSource = () => {
    if (chatMarker) {
      if (chatMarker.imageUrl) {
        return { uri: chatMarker.imageUrl };
      } else if (chatMarker.imageIndex !== undefined) {
        return getWidgetImageByIndex(chatMarker.imageIndex);
      }
    }
    // Fallback image
    return require('@/assets/paddleboarding.png');
  };
  
  // Determine border color
  const getBorderColor = () => {
    if (chatMarker && chatMarker.borderColorIndex !== undefined) {
      return BORDER_COLORS[chatMarker.borderColorIndex % BORDER_COLORS.length];
    }
    // Default border color
    return '#ED5370';
  };
  
  // For individual chat, use only two participants: you and the person
  const [messages, setMessages] = useState<ChatMessage[]>(
    isIndividualChat
      ? [
          {
            id: '1',
            text: 'Hi! How are you?',
            sender: personName as string,
            timestamp: '10:30 AM',
            senderImage: personImage,
            isMine: false,
            reactions: [],
          },
        ]
      : [
          {
            id: '1',
            text: 'Hey everyone! Looking forward to our beach brunch this weekend!',
            sender: 'Martin',
            timestamp: '10:30 AM',
            senderImage: require('@/assets/people/image-1.png'),
            isMine: false,
            reactions: [],
          },
          {
            id: '2',
            text: 'Me too! Should I bring anything?',
            sender: 'Julia',
            timestamp: '10:35 AM',
            senderImage: require('@/assets/people/image-3.png'),
            isMine: false,
            reactions: [],
          },
          {
            id: '3',
            text: 'Just bring yourself! I\'ll handle the food.',
            sender: 'Martin',
            timestamp: '10:40 AM',
            senderImage: require('@/assets/people/image-1.png'),
            isMine: false,
            reactions: [],
          },
          {
            id: '4',
            text: 'I will if the weather is sunny. Yesterday, at sunrise, there were some great 🔥🔥 photos.',
            timestamp: '11:10 AM',
            sender: 'Mike',
            senderImage: require('@/assets/people/image-2.png'),
            isMine: true,
            reactions: [
              { emoji: '😍', count: 4 },
              { emoji: '😢', count: 2 },
            ]
          },
          {
            id: '5',
            text: 'Super! Is there another photo showing manatees and 🐬 dolphins? I want to show my friends.',
            sender: 'Julia',
            timestamp: '11:14 AM',
            senderImage: require('@/assets/people/image-3.png'),
            isMine: false,
            reactions: [],
          },
        ]
  );

  const chat = {
    id: id,
    title: chatMarker?.name || 'Chat Group',
    image: getImageSource(),
    borderColor: getBorderColor(),
    participants: 'Jaydon, Mary, Yulia, +10',
    messages,
  };

  // Dynamically update the chat title when chatMarker changes
  useEffect(() => {
    if (chatMarker?.name) {
      // Update the chat title if we found a matching chatMarker
      chat.title = chatMarker.name;
    }
  }, [chatMarker]);

  const participantList = [
    { name: 'Martin', image: require('@/assets/people/image-1.png') },
    { name: 'Mike', image: require('@/assets/people/image-2.png') },
    { name: 'Julia', image: require('@/assets/people/image-3.png') },
    { name: 'Mia', image: require('@/assets/people/image-4.png') },
    { name: 'Demi', image: require('@/assets/people/image-5.png') },
  ];

  // For individual chat, always reply as the person
  const sampleReplies = isIndividualChat
    ? [
        'I\'m good, thanks!',
        'How are you?',
        'That sounds nice!',
        'Let me know if you need anything.',
        'Haha, thanks!',
        'See you soon!',
        'Great to hear from you!',
        'Sure, I\'ll be there!',
      ]
    : [
        'Thanks for your message!',
        'That sounds great!',
        'I agree!',
        'Let me check and get back to you.',
        'Awesome!',
        'Can you share more details?',
        'I will join!',
        'Looking forward to it!',
        'Haha, good one!',
        'See you there!',
      ];

  const handleSend = () => {
    if (inputText.trim().length > 0) {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const hour12 = hours % 12 === 0 ? 12 : hours % 12;
      const timestamp = `${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
      setMessages(prev => ([
        ...prev,
        {
          id: Date.now().toString(),
          text: inputText.trim(),
          isMine: true,
          timestamp,
          sender: 'You',
          senderImage: require('@/assets/people/image-2.png'),
          reactions: [],
        }
      ]));
      setInputText('');

      // Simulate a reply after a short delay
      setTimeout(() => {
        if (isIndividualChat) {
          const replyText = sampleReplies[Math.floor(Math.random() * sampleReplies.length)];
          const replyTimestamp = `${hour12}:${(minutes + 1).toString().padStart(2, '0')} ${ampm}`;
          setMessages(prev => ([
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              text: replyText,
              isMine: false,
              sender: personName as string,
              senderImage: personImage,
              timestamp: replyTimestamp,
              reactions: [],
            }
          ]));
        } else {
          // ... existing group chat reply logic ...
          const others = participantList.filter(p => p.name !== 'You');
          const randomParticipant = others[Math.floor(Math.random() * others.length)];
          const replyText = sampleReplies[Math.floor(Math.random() * sampleReplies.length)];
          const replyTimestamp = `${hour12}:${(minutes + 1).toString().padStart(2, '0')} ${ampm}`;
          setMessages(prev => ([
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              text: replyText,
              isMine: false,
              sender: randomParticipant.name,
              senderImage: randomParticipant.image,
              timestamp: replyTimestamp,
              reactions: [],
            }
          ]));
        }
      }, 900);
    }
  };

  // Function to format participants text with +10 in blue
  const formatParticipants = (text: string) => {
    if (!text) return null;
    const parts = text.split('+');
    
    if (parts.length > 1) {
      return (
        <Text style={styles.headerSubtitle}>
          <Text style={styles.regularText}>{parts[0]}</Text>
          <Text style={styles.blueText}>+{parts[1]}</Text>
        </Text>
      );
    }
    
    return <Text style={styles.headerSubtitle}>{text}</Text>;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#EAF2F9', '#EAF2F9']}
        style={StyleSheet.absoluteFill}
      >
        <Stack.Screen 
          options={{
            headerShown: false,
          }}
        />
        <StatusBar barStyle="dark-content" />
        
        {/* Header */}
        <View
          style={{
            paddingTop: insets.top,
            height: insets.top + 100,
            backgroundColor: '#FFFFFF',
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
            zIndex: 10,
            position: 'relative',
            overflow: 'visible',
          }}
        >
          <View
            style={{
              position: 'absolute',
              top: insets.top + 40,
              left: 0,
              right: 0,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
            }}
          >
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path d="M15 18L9 12L15 6" stroke="#000000" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round"/>
              </Svg>
            </TouchableOpacity>
            
            <View style={styles.headerCenterContent}>
              <View style={styles.avatarWrapper}>
                <View style={[styles.avatarBorder, { borderColor: isIndividualChat ? '#4694FD' : chat.borderColor }]}>
                  <View style={styles.avatarContainer}>
                    <Image source={isIndividualChat ? personImage : chat.image} style={styles.avatarImage} />
                  </View>
                </View>
              </View>
              
              <View style={styles.headerTextContainer}>
                <Text style={styles.headerTitle}>{isIndividualChat ? personName : chat.title}</Text>
                {!isIndividualChat && formatParticipants(chat.participants)}
              </View>
            </View>
            
            <TouchableOpacity style={styles.dotsButton}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill="black" />
                <Path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" fill="black" />
                <Path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" fill="black" />
              </Svg>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Messages area with gradient overlay at the top */}
        <LinearGradient
          colors={['rgba(234, 242, 249, 1)', 'rgba(234, 242, 249, 0)']}
          style={styles.messagesGradient}
          pointerEvents="none"
        />
        
        <ScrollView 
          style={styles.messagesContainer}
          contentContainerStyle={[
            styles.messagesContent,
            { paddingBottom: 80 + insets.bottom }
          ]}
        >
          {chat.messages.map(message => (
            <View key={message.id} style={[
              styles.messageRow,
              message.isMine ? styles.myMessageRow : styles.theirMessageRow
            ]}>
              {!message.isMine && (
                <Image source={message.senderImage} style={styles.messageSenderImage} />
              )}
              
              <View style={styles.messageContent}>
                {!message.isMine && message.sender && (
                  <Text style={styles.messageSender}>{message.sender}</Text>
                )}
                
                {message.isMine ? (
                  <LinearGradient
                    colors={["#836CE8", "#4694FD"]}
                    start={{ x: 0.7, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientMessageBubble}
                  >
                    <Text style={styles.gradientMessageText}>{message.text}</Text>
                    <View style={styles.messageTimeContainer}>
                      <Text style={[styles.messageTime, styles.myMessageTime]}>{message.timestamp}</Text>
                      <Svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{opacity: 0.7}}>
                        <Path d="M1 6L4 9L11 2" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                      </Svg>
                    </View>
                  </LinearGradient>
                ) : (
                  <View style={[styles.messageBubble, styles.theirMessageBubble]}>
                    <Text style={styles.theirMessageText}>{message.text}</Text>
                    <View style={styles.messageTimeContainer}>
                      <Text style={[styles.messageTime, styles.theirMessageTime]}>{message.timestamp}</Text>
                    </View>
                  </View>
                )}
                
                {Array.isArray(message.reactions) && message.reactions.length > 0 && message.isMine && (
                  <View style={[styles.reactionsRow, { marginLeft: 14 }]}>
                    {message.reactions.map((reaction, index) => (
                      <View
                        key={index}
                        style={[index === 0 ? styles.primaryReactionPill : styles.secondaryReactionPill, styles.reactionPill]}
                      >
                        <Text style={[styles.reactionCount, index === 0 ? styles.primaryReactionCount : styles.secondaryReactionCount]}>{reaction.count}</Text>
                        <Text style={styles.reactionEmoji}>{reaction.emoji}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
        
        {/* Input area */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.addButton}>
              <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <Path d="M12 6V18" stroke="#000000" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round"/>
                <Path d="M18 12H6" stroke="#000000" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round"/>
              </Svg>
            </TouchableOpacity>
            
            <TextInput
              style={styles.input}
              placeholder="Type something..."
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Image source={require('@/assets/icons/icon-microphone.png')} style={styles.microphoneIcon} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF2F9',
  },
  header: {
    width: '100%',
    height: 120,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    shadowOpacity: 1,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EAF2F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenterContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 12,
  },
  avatarWrapper: {
    width: 50,
    height: 50,
    position: 'relative',
  },
  avatarBorder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  avatarContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  headerTextContainer: {
    marginLeft: 8,
  },
  headerTitle: {
    fontFamily: 'DMSans-Bold',
    fontSize: 16,
    lineHeight: 22,
    color: '#000000',
    letterSpacing: -0.015 * 16,
  },
  headerSubtitle: {
    fontFamily: 'DMSans-Regular',
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.01 * 13,
  },
  regularText: {
    color: 'rgba(0, 0, 0, 0.5)',
  },
  blueText: {
    color: '#4694FD',
  },
  dotsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EAF2F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesGradient: {
    position: 'absolute',
    top: 120,
    left: 0,
    right: 0,
    height: 98,
    zIndex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 10,
    paddingTop: 20,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '80%',
  },
  myMessageRow: {
    alignSelf: 'flex-end',
  },
  theirMessageRow: {
    alignSelf: 'flex-start',
  },
  messageSenderImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  messageContent: {
    flex: 1,
  },
  messageSender: {
    fontFamily: 'DMSans-Medium',
    fontSize: 13,
    lineHeight: 18,
    color: '#000000',
    marginBottom: 4,
    letterSpacing: -0.005 * 13,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 20,
    maxWidth: '100%',
  },
  myMessageBubble: {
    backgroundColor: '#4694FD',
    borderRadius: 20,
    borderTopRightRadius: 4,
  },
  theirMessageBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.015 * 16,
    marginBottom: 8,
  },
  myMessageText: {
    color: '#FFFFFF',
  },
  theirMessageText: {
    color: '#000000',
  },
  messageTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  messageTime: {
    fontFamily: 'DMSans-Regular',
    fontSize: 11,
    lineHeight: 11,
  },
  myMessageTime: {
    color: 'rgba(255, 255, 255, 0.6)',
    marginRight: 4,
  },
  theirMessageTime: {
    color: 'rgba(0, 0, 0, 0.6)',
  },
  reactionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
    marginBottom: 6,
    alignSelf: 'flex-end',
    width: 270,
    paddingLeft: 14,
  },
  reactionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 39,
    height: 26,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 5,
    gap: 2,
  },
  primaryReactionPill: {
    backgroundColor: '#0B228C',
  },
  secondaryReactionPill: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAF2F9',
  },
  reactionCount: {
    fontFamily: 'DMSans-Medium',
    fontSize: 13,
    lineHeight: 13,
    fontWeight: '500',
    letterSpacing: -0.005 * 13,
  },
  primaryReactionCount: {
    color: '#FFFFFF',
  },
  secondaryReactionCount: {
    color: '#000000',
  },
  reactionEmoji: {
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    lineHeight: 16,
    color: '#000000',
  },
  keyboardAvoidingView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 4,
    gap: 10,
    width: 373,
    height: 58,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 30,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EAF2F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: '#000000',
    paddingHorizontal: 8,
    maxHeight: 100,
    marginHorizontal: 8,
  },
  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0B228C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  microphoneIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  gradientMessageBubble: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 4,
    maxWidth: 270,
    alignSelf: 'flex-end',
  },
  gradientMessageText: {
    color: '#FFFFFF',
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.015 * 16,
    marginBottom: 8,
  },
}); 