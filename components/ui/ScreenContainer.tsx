import React from 'react';
import { SafeAreaView, View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, radii } from '../../theme';

export interface ScreenContainerProps {
  children: React.ReactNode;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Convert Figma's 146.03° angle to start/end coordinates
const angle = 146.03;
const radian = (angle - 90) * (Math.PI / 180);
const gradientSize = Math.sqrt(2);
const x = Math.cos(radian) * gradientSize;
const y = Math.sin(radian) * gradientSize;

export default function ScreenContainer({ children }: ScreenContainerProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Map container with gradients */}
      <View style={styles.mapContainer}>
        {/* Radial gradient base */}
        <View style={styles.radialGradient}>
          <LinearGradient
            colors={[colors.gradientStart, colors.gradientEnd]}
            style={[StyleSheet.absoluteFill, {
              transform: [
                { scale: 2.1804 }, // 218.04%
                { translateX: -screenWidth * 0.2392 }, // 23.92%
                { translateY: -screenHeight * 0.784 }, // 78.4%
              ],
            }]}
            start={{ x: 0.5, y: 0.5 }}
            end={{ x: 1, y: 1 }}
          />
        </View>
        
        {/* Linear gradient overlay */}
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientEnd]}
          style={StyleSheet.absoluteFill}
          start={{ x: (1 - x) / 2, y: (1 - y) / 2 }}
          end={{ x: (1 + x) / 2, y: (1 + y) / 2 }}
          locations={[0.4731, 0.8807]} // 47.31% and 88.07%
        />

        {/* Semi-transparent white panel */}
        <View style={styles.mapPanel}>
          {/* Main content */}
          <View style={styles.content}>{children}</View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mapContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  radialGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  mapPanel: {
    flex: 1,
    marginBottom: 16, // Figma's bottom offset
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
}); 