import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radii, typography } from '../theme';

export default function TokenPreview() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎨 Token Preview</Text>
      <Text style={styles.textSm}>Small Text</Text>
      <Text style={styles.textMd}>Medium Text</Text>
      <Text style={styles.textLg}>Large Text</Text>
      <View style={styles.boxRow}>
        <View style={[styles.box, { backgroundColor: colors.primary }]} />
        <View style={[styles.box, { backgroundColor: colors.gradientStart }]} />
        <View style={[styles.box, { backgroundColor: colors.gradientEnd }]} />
        <View style={[styles.box, { backgroundColor: colors.grayLight }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    marginTop: spacing.xxl,
    borderTopWidth: 1,
    borderTopColor: colors.grayBorder,
  },
  header: {
    fontFamily: typography.fontFamily,
    fontWeight: typography.weight.semiBold as any,
    fontSize: typography.size.xl,
    lineHeight: typography.lineHeight.xl,
    marginBottom: spacing.md,
  },
  textSm: {
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    marginBottom: spacing.sm,
  },
  textMd: {
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    marginBottom: spacing.sm,
  },
  textLg: {
    fontSize: typography.size.lg,
    lineHeight: typography.lineHeight.lg,
    marginBottom: spacing.sm,
  },
  boxRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  box: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
  },
}); 