import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GroupChatScreen() {
  const { name, image } = useLocalSearchParams();
  const router = useRouter();

  // initial placeholder messages
  const [messages, setMessages] = useState([
    { id: '1', sender: 'Martin', text: 'Hey everyone! Looking forward to our beach brunch this weekend!' },
    { id: '2', sender: 'Julia', text: 'Me too! Should I bring anything?' },
    { id: '3', sender: 'Martin', text: "Just bring yourself! I'll handle the food." },
  ]);

  const [draft, setDraft] = useState('');

  const handleSend = () => {
    if (!draft.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: 'You', text: draft.trim() },
    ]);
    setDraft('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backChevron}>‹</Text>
        </Pressable>
        <Image
          source={typeof image === 'string' ? { uri: image } : require('../../assets/paddleboarding.png')}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>{messages.length} participants</Text>
        </View>
        <View style={{ flex: 1 }} />
        <Pressable style={styles.menuButton}>
          <Text style={styles.menuDots}>⋯</Text>
        </Pressable>
      </View>

      {/* Chat messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatList}
        renderItem={({ item }) => (
          <View style={[styles.bubbleRow, item.sender === 'You' && styles.youRow]}>
            {item.sender !== 'You' && (
              <Image 
                source={
                  item.sender === 'Martin' 
                    ? require('../../assets/people/image-1.png') 
                    : require('../../assets/people/image-3.png')
                } 
                style={styles.bubbleAvatar} 
              />
            )}
            <View style={[styles.bubble, item.sender === 'You' ? styles.youBubble : styles.theirBubble]}>
              <Text style={styles.bubbleText}>{item.text}</Text>
            </View>
          </View>
        )}
      />

      {/* Input bar */}
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        keyboardVerticalOffset={80}
      >
        <View style={styles.inputBar}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message…"
            value={draft}
            onChangeText={setDraft}
            multiline
          />
          <Pressable onPress={handleSend} style={styles.sendButton}>
            <Text style={styles.sendIcon}>➤</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAF2F9' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#4A90FA',
  },
  backButton: { padding: 6 },
  backChevron: { color: '#fff', fontSize: 24 },
  avatar: { width: 36, height: 36, borderRadius: 18, marginHorizontal: 8 },
  title: { color: '#fff', fontSize: 18, fontWeight: '600' },
  subtitle: { color: '#e0eaff', fontSize: 12 },
  menuButton: { padding: 6 },
  menuDots: { color: '#fff', fontSize: 18 },

  chatList: { padding: 12 },
  bubbleRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 12 },
  youRow: { justifyContent: 'flex-end' },
  bubbleAvatar: { width: 28, height: 28, borderRadius: 14, marginRight: 6 },
  bubble: { maxWidth: '75%', padding: 10, borderRadius: 16 },
  theirBubble: { backgroundColor: '#fff', borderTopLeftRadius: 4 },
  youBubble: { backgroundColor: '#4A90FA', borderTopRightRadius: 4 },
  bubbleText: { color: '#000' },

  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 12,
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  textInput: { flex: 1, fontSize: 16, maxHeight: 80 },
  sendButton: {
    backgroundColor: '#4A90FA',
    borderRadius: 20,
    padding: 10,
    marginLeft: 8,
  },
  sendIcon: { color: '#fff', fontSize: 16 },
}); 