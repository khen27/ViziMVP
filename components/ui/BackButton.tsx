import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Svg, Rect, Path } from 'react-native-svg';

export default function BackButton() {
  const router = useRouter();
  return (
    <Pressable onPress={router.back} style={styles.circle}>
      <Svg width={50} height={50} viewBox="0 0 50 50" fill="none">
        <Rect width={50} height={50} rx={25} fill="#EAF2F9" />
        <Path
          d="M9 16.5L1 9L9 1.5"
          stroke="#000000"
          strokeWidth={1.15}
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(16.07, 11.61)"
        />
      </Svg>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
}); 