import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radii, typography } from '../../theme';

interface NavBtn {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}
interface Props {
  left: NavBtn;
  right: NavBtn;
}

export default function FooterNav({ left, right }: Props) {
  const insets = useSafeAreaInsets();

  const Btn = ({ label, onPress, disabled }: NavBtn) => (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.btn,
        disabled && { opacity: 0.4 },
        label === 'Skip' ? styles.ghost : styles.primary,
      ]}
    >
      <Text style={[styles.btnTxt, label === 'Skip' && styles.ghostTxt]}>{label}</Text>
    </Pressable>
  );

  return (
    <View style={[styles.row, { paddingBottom: insets.bottom + spacing.sm }]}> 
      <Btn {...left} />
      <Btn {...right} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: colors.white,
  },
  btn: {
    flex: 1,
    height: 56,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: { backgroundColor: colors.primary },
  ghost: { borderWidth: 1, borderColor: colors.primary, backgroundColor: colors.white },
  btnTxt: { fontFamily: typography.fontFamily, fontSize: typography.size.md, color: colors.white, fontWeight: typography.weight.medium },
  ghostTxt: { color: colors.primary },
}); 