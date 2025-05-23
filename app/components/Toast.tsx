import React, { useEffect } from 'react';
import { Animated, StyleSheet, Text, View, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export type ToastProps = {
  message: string;
  visible: boolean;
  onHide: () => void;
  duration?: number;
  icon?: React.ReactNode;
  backgroundColor?: string;
  borderColor?: string;
  shadowColor?: string;
  textColor?: string;
  topOffset?: number;
};

export const Toast: React.FC<ToastProps> = ({
  message,
  visible,
  onHide,
  duration = 2500,
  icon,
  backgroundColor = '#FFFFFF',
  borderColor = 'rgba(139, 92, 246, 0.2)',
  shadowColor = 'rgba(248, 92, 58, 0.1)',
  textColor = '#000',
  topOffset = 0,
}) => {
  const translateY = React.useRef(new Animated.Value(-80)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(translateY, {
          toValue: -80,
          duration: 300,
          useNativeDriver: true,
        }).start(() => onHide());
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor,
          borderColor,
          shadowColor,
          transform: [{ translateY }],
          top: 80 + topOffset,
        },
      ]}
      pointerEvents="none"
    >
      <View style={styles.icon}>{icon}</View>
      <Text style={[styles.text, { color: textColor }]}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 80,
    alignSelf: 'center',
    width: 260,
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingRight: 14,
    paddingLeft: 10,
    gap: 6,
    borderRadius: 50,
    borderWidth: 1,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 8,
    zIndex: 9999,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.015,
    flex: 1,
    textAlign: 'left',
    flexWrap: 'wrap',
  },
});

export default Toast; 