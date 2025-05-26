import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from 'theme/theme';

interface NavBtn {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  /** outline or fill */
  variant?: 'primary' | 'ghost';
}

interface Props {
  left: NavBtn;
  right: NavBtn;
}

export default function FooterNav({ left, right }: Props) {
  const insets = useSafeAreaInsets();

  const Btn = ({ label, onPress, disabled, variant }: NavBtn) => {
    const isGhost = variant === 'ghost';
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={[
          styles.btn,
          isGhost ? styles.ghost : styles.primary,
          disabled && { opacity: 0.4 },
        ]}
      >
        <Text style={[styles.btnTxt, isGhost && styles.ghostTxt]}>{label}</Text>
      </Pressable>
    );
  };

  return (
    <View style={[styles.row, { paddingBottom: insets.bottom + 8 }]}> 
      <Btn {...left} />
      <Btn {...right} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'transparent',
  },
  btn: {
    flex: 1,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: { backgroundColor: colors.primary },
  ghost: { borderWidth: 1, borderColor: colors.primary, backgroundColor: colors.white },
  btnTxt: { fontFamily: 'DM Sans', fontSize: 16, color: colors.white, fontWeight: '500' },
  ghostTxt: { color: colors.primary },
}); 