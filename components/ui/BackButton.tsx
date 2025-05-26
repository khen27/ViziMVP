import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing } from '../../theme';

export default function BackButton() {
  const router = useRouter();
  return (
    <Pressable onPress={router.back} style={styles.circle}>
      <Ionicons name="chevron-back" size={24} color={colors.white} />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 40,
    height: 40,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(0,0,0,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
}); 