import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

interface Props {
  title: string;
  subtitle?: string;
}
export default function Header({ title, subtitle }: Props) {
  return (
    <View style={{ marginTop: 16 }}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontFamily: 'DM Sans',
    fontSize: 32,
    lineHeight: 42,
    fontWeight: '500',
    textAlign: 'center',
    color: colors.black,
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 8,
    fontFamily: 'DM Sans',
    fontSize: 16,
    lineHeight: 24,
    color: colors.grayDark,
  },
}); 