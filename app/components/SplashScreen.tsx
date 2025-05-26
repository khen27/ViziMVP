import React from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const LOGO_SIZE = Math.min(width, height) * 0.4;

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Svg width={LOGO_SIZE} height={LOGO_SIZE} viewBox="0 0 154 176">
        <Defs>
          <LinearGradient
            id="gradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0%" stopColor="#836CE8" />
            <Stop offset="100%" stopColor="#4694FD" />
          </LinearGradient>
        </Defs>
        <Path
          d="M19.3511 19.4784C17.8855 26.4551 17.9919 25.1262 17.0494 30.8066C14.3498 47.0776 13 65.4407 13 85.8957C13 109.837 15.7536 128.84 21.2608 142.902C26.768 156.965 35.9681 163 47.1985 163C58.1049 163 65.713 158.443 76.5115 147.053C88.4129 134.5 105.79 104.5 111.198 84.2625C116.598 68.4563 119.992 56.7642 119.992 43.3987C119.992 34.1009 118.722 26.3196 114.618 20.9734C110.623 15.6272 105.407 13 98.4962 13C92.609 13 87.7225 15.2024 84.3282 18.4817C68.2061 34.058 71.1374 67.8173 84.3282 83.7641C92.1913 93.27 101.509 97.539 105.79 98.705C117 101.5 134.2 101.9 141 101.5"
          stroke="url(#gradient)"
          strokeWidth="26"
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 