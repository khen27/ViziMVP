import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';

interface Props {
  title: string;
  subtitle?: string;
}
export default function Header({ title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { marginTop: spacing.xl + spacing.lg, marginBottom: spacing.xl, alignItems: 'center' },
  title: {
    fontFamily: typography.fontFamily,
    fontSize: typography.size.xl,
    lineHeight: typography.lineHeight.xl,
    fontWeight: typography.weight.medium,
    textAlign: 'center',
    color: colors.black,
  },
  subtitle: {
    textAlign: 'center',
    marginTop: spacing.md,
    fontFamily: typography.fontFamily,
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    color: colors.grayDark,
  },
}); 