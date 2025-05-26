import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface CustomSliderProps {
  value: number;
  minimumValue: number;
  maximumValue: number;
  step?: number;
  onValueChange: (value: number) => void;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
  thumbTintColor?: string;
  style?: StyleProp<ViewStyle>;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  value,
  minimumValue,
  maximumValue,
  step = 1,
  onValueChange,
  minimumTrackTintColor = '#0B228C',
  maximumTrackTintColor = '#D8D8D8',
  thumbTintColor = '#EAF2F9',
  style,
}) => {
  const [width, setWidth] = useState(0);
  const [initialValue] = useState(value);
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [offset, setOffset] = useState(0);

  // Calculate thumb position based on value
  const calculateThumbPosition = (val: number) => {
    return ((val - minimumValue) / (maximumValue - minimumValue)) * width;
  };

  useEffect(() => {
    if (width > 0) {
      const position = calculateThumbPosition(value);
      animatedValue.setValue(position);
    }
  }, [value, width, minimumValue, maximumValue, animatedValue]);

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        let currentValue = 0;
        animatedValue.extractOffset();
        animatedValue.addListener(({ value: val }) => {
          currentValue = val;
        });
        setOffset(currentValue);
      },
      onPanResponderMove: (_, gestureState) => {
        let newValue = offset + gestureState.dx;
        
        // Ensure the value doesn't go beyond boundaries
        if (newValue < 0) newValue = 0;
        if (newValue > width) newValue = width;
        
        // Apply step if specified
        const valueRange = maximumValue - minimumValue;
        const stepCount = valueRange / step;
        const stepSize = width / stepCount;
        
        if (step > 0 && stepSize > 0) {
          newValue = Math.round(newValue / stepSize) * stepSize;
        }
        
        animatedValue.setValue(gestureState.dx);
      },
      onPanResponderRelease: () => {
        let currentValue = 0;
        animatedValue.addListener(({ value: val }) => {
          currentValue = val;
        });
        
        // Calculate the updated value
        const position = offset + currentValue;
        const newValue = minimumValue + ((position / width) * (maximumValue - minimumValue));
        
        // Apply step to final value
        const steppedValue = step > 0 ? Math.round(newValue / step) * step : newValue;
        
        // Ensure value is within bounds
        const finalValue = Math.max(minimumValue, Math.min(maximumValue, steppedValue));
        
        // Reset animation offset
        animatedValue.flattenOffset();
        
        // Update the actual position to match the stepped value
        animatedValue.setValue(calculateThumbPosition(finalValue));
        
        // Call onValueChange with the updated value
        onValueChange(finalValue);
      },
    })
  ).current;

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width: layoutWidth } = event.nativeEvent.layout;
    setWidth(layoutWidth);
    animatedValue.setValue(calculateThumbPosition(initialValue));
  };

  const thumbLeft = animatedValue.interpolate({
    inputRange: [0, width],
    outputRange: [0, width],
    extrapolate: 'clamp',
  });

  return (
    <View style={[styles.container, style]} onLayout={handleLayout}>
      {/* Background track */}
      <View 
        style={[
          styles.track, 
          { backgroundColor: maximumTrackTintColor }
        ]} 
      />
      
      {/* Filled track */}
      <Animated.View 
        style={[
          styles.filledTrack, 
          { 
            backgroundColor: minimumTrackTintColor,
            width: thumbLeft 
          }
        ]} 
      />
      
      {/* Thumb */}
      <Animated.View 
        style={[
          styles.thumbContainer, 
          { 
            transform: [{ translateX: thumbLeft }],
            backgroundColor: thumbTintColor,
          }
        ]}
        {...panResponder.panHandlers}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
  },
  track: {
    height: 3,
    borderRadius: 3,
    width: '100%',
    position: 'absolute',
  },
  filledTrack: {
    height: 3,
    borderRadius: 3,
    position: 'absolute',
    left: 0,
  },
  thumbContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    position: 'absolute',
    backgroundColor: '#EAF2F9',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    transform: [{ translateX: -19 }], // Half the width to center the thumb
  },
});

export default CustomSlider; 