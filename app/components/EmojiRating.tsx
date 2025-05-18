import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import Svg, { Rect, Path, G, RadialGradient, Stop, Defs } from 'react-native-svg';
import i18n from '@/app/utils/i18n';

interface EmojiRatingProps {
  selectedEmoji: number;
  onSelect: (index: number) => void;
}

const EmojiRating: React.FC<EmojiRatingProps> = ({ selectedEmoji, onSelect }) => {
  const emojis = [
    { icon: '😭', labelKey: 'feedback.emojis.poor' },
    { icon: '😔', labelKey: 'feedback.emojis.fair' },
    { icon: '😐', labelKey: 'feedback.emojis.okay' },
    { icon: '🙂', labelKey: 'feedback.emojis.good' },
    { icon: '🥰', labelKey: 'feedback.emojis.perfect' },
  ];

  // Function to render SVG for selected emoji
  const renderSelectedEmojiSVG = (emoji: string, labelKey: string) => {
    return (
      <View style={styles.selectedEmojiContainer}>
        <View style={styles.emojiLabel}>
          <Text style={styles.emojiLabelText}>{i18n.t(labelKey)}</Text>
        </View>
        <Svg width="65" height="65" viewBox="0 0 65 65" style={styles.svgContainer}>
          <Defs>
            <RadialGradient
              id="paint0_radial"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(53.2187 65.4375) rotate(-120.466) scale(72.1125 121.843)"
            >
              <Stop stopColor="#836CE8" />
              <Stop offset="1" stopColor="#4694FD" />
            </RadialGradient>
          </Defs>
          <Rect width="65" height="65" rx="22" fill="#4694FD" />
          <Rect width="65" height="65" rx="22" fill="url(#paint0_radial)" />
          <View style={styles.emojiOverlay}>
            <Text style={styles.selectedEmojiText}>{emoji}</Text>
          </View>
        </Svg>
      </View>
    );
  };

  return (
    <View style={styles.emojiContainer}>
      {emojis.map((emoji, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.emojiButton,
            selectedEmoji !== index && styles.unselectedEmoji,
          ]}
          onPress={() => onSelect(index)}
        >
          {selectedEmoji === index ? (
            renderSelectedEmojiSVG(emoji.icon, emoji.labelKey)
          ) : (
            <View style={styles.unselectedEmojiContent}>
              <Text style={styles.emoji}>{emoji.icon}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 360,
    marginVertical: 25,
  },
  emojiButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 65,
    height: 65,
  },
  unselectedEmoji: {
    width: 44,
    height: 44,
  },
  unselectedEmojiContent: {
    width: 44,
    height: 44,
    backgroundColor: '#BBC2C7',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: {
        mixBlendMode: 'luminosity',
      },
      // In native, we can't use mix-blend-mode directly, opacity approximates it
      default: {
        opacity: 0.9
      }
    }),
  },
  emoji: {
    fontSize: 22,
    textAlign: 'center',
    color: '#000000',
    opacity: 0.7,
  },
  selectedEmojiContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: 80,
    height: 80,
  },
  svgContainer: {
    position: 'relative',
  },
  emojiOverlay: {
    position: 'absolute',
    width: 65,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedEmojiText: {
    fontSize: 32,
    color: '#000000',
  },
  emojiLabel: {
    position: 'absolute',
    minWidth: 47,
    height: 20,
    backgroundColor: '#0B228C',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    top: -10,
    paddingHorizontal: 10,
  },
  emojiLabelText: {
    fontSize: 13,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default EmojiRating; 