import React, { useRef, useEffect, useMemo } from 'react';
import { View, Text, Image, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';
import { getWidgetImageByIndex } from '../utils/imageUtils';

// Define the border colors
const BORDER_COLORS = ['#FFA300', '#4694FD', '#ED5370'];

interface GroupChatMarkerProps {
  imageUrl?: string | null;
  participants?: number;
  latitude: number;
  longitude: number;
  onPress?: () => void;
  imageIndex?: number; // Optional index to specify which image to use
  borderColorIndex?: number; // Optional index to specify border color
  progress?: number; // 0-1, percent of time left
}

const SIZE = 60; // Outer circle size
const STROKE_WIDTH = 5;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const GroupChatMarker: React.FC<GroupChatMarkerProps> = ({
  imageUrl,
  participants = Math.floor(Math.random() * 48) + 2,
  latitude,
  longitude,
  onPress,
  imageIndex,
  borderColorIndex,
  progress = 0.75, // Default to 75% for now
}) => {
  // Determine which image to use
  const imageSource = imageUrl 
    ? { uri: imageUrl } 
    : imageIndex !== undefined 
      ? getWidgetImageByIndex(imageIndex)
      : getWidgetImageByIndex(Math.abs(Math.floor(latitude * longitude) % 15));
      
  // Determine which border color to use
  const borderColor = useMemo(() => {
    if (borderColorIndex !== undefined) {
      return BORDER_COLORS[borderColorIndex % BORDER_COLORS.length];
    }
    // Use a hash of the coordinates to select a stable color
    const colorIndex = Math.abs(Math.floor((latitude * 100 + longitude * 100) % BORDER_COLORS.length));
    return BORDER_COLORS[colorIndex];
  }, [latitude, longitude, borderColorIndex]);
    
  // Animation for marker appearance
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const pressAnim = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    // Animate marker appearing on the map
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () => {
    Animated.timing(pressAnim, {
      toValue: 0.9,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(pressAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  // Arc calculations
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  return (
    <TouchableWithoutFeedback 
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View 
        style={[
          styles.container, 
          {
            transform: [
              { scale: scaleAnim },
              { scale: pressAnim },
            ],
          }
        ]}
      >
        {/* Progress Arc Border */}
        <View style={styles.svgWrapper}>
          <Svg width={SIZE} height={SIZE}>
            <G rotation={-90} origin={`${SIZE / 2}, ${SIZE / 2}`}>
              {/* White background arc */}
              <Circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                stroke="#fff"
                strokeWidth={STROKE_WIDTH}
                fill="none"
              />
              {/* Colored progress arc */}
              <Circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                stroke={borderColor}
                strokeWidth={STROKE_WIDTH}
                fill="none"
                strokeDasharray={`${CIRCUMFERENCE}, ${CIRCUMFERENCE}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </G>
          </Svg>
          {/* Image in the center */}
          <View style={styles.imageWrapper}>
            <Image
              source={imageSource}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </View>
        {/* Participants badge */}
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{participants}</Text>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
  },
  svgWrapper: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  imageWrapper: {
    position: 'absolute',
    top: STROKE_WIDTH,
    left: STROKE_WIDTH,
    width: SIZE - STROKE_WIDTH * 2,
    height: SIZE - STROKE_WIDTH * 2,
    borderRadius: (SIZE - STROKE_WIDTH * 2) / 2,
    overflow: 'hidden',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: (SIZE - STROKE_WIDTH * 2) / 2,
    backgroundColor: '#F0F0F0',
  },
  badgeContainer: {
    position: 'absolute',
    top: -5,
    alignSelf: 'center',
    width: 32,
    height: 21,
    borderRadius: 10.5,
    backgroundColor: '#0B228C',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 1,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'DMSans-Medium',
  },
});

export default GroupChatMarker; 