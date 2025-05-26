import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';

interface Props {
  label: string;
  helperText?: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
}
export default function Toggle({ label, helperText, value, onValueChange }: Props) {
  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={styles.label}>{label}</Text>
        {helperText ? <Text style={styles.desc}>{helperText}</Text> : null}
      </View>
      <Switch
        trackColor={{ false: colors.grayBorder, true: colors.primary }}
        thumbColor={colors.white}
        value={value}
        onValueChange={onValueChange}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.xl },
  label: { fontFamily: typography.fontFamily, fontWeight: typography.weight.medium, fontSize: typography.size.md, color: colors.black },
  desc: { color: colors.grayDark, fontSize: typography.size.sm, marginTop: spacing.xs, width: 260 },
}); 